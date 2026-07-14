import { Controller, Get, Post, Patch, Param, Body, HttpCode, HttpStatus, UseGuards, Req, HttpException } from '@nestjs/common';
import { handleGatewayError } from '../utils/gateway-error';
import { GatewayAuthGuard } from '../guards/auth.guard';
import { NexusGateway } from '../gateway/nexus.gateway';

@Controller('api/v1')
export class WorkflowsController {
  private readonly workflowUrl = process.env.WORKFLOW_SERVICE_URL || 'http://127.0.0.1:5003/api/v1';
  private readonly aiUrl = process.env.AI_SERVICE_URL || 'http://127.0.0.1:8000';
  private readonly walletUrl = process.env.WALLET_SERVICE_URL || 'http://127.0.0.1:5005/api/v1';

  constructor(private readonly nexusGateway: NexusGateway) {}

  private getMode(req: any, body?: any): 'LIVE' | 'DEMO' {
    const modeHeader = req.headers['x-execution-mode'];
    if (modeHeader === 'DEMO' || modeHeader === 'demo') return 'DEMO';
    if (modeHeader === 'LIVE' || modeHeader === 'live') return 'LIVE';
    
    if (body && (body.mode === 'DEMO' || body.mode === 'demo')) return 'DEMO';
    if (body && (body.mode === 'LIVE' || body.mode === 'live')) return 'LIVE';
    
    if (req.query && (req.query.mode === 'DEMO' || req.query.mode === 'demo')) return 'DEMO';
    if (req.query && (req.query.mode === 'LIVE' || req.query.mode === 'live')) return 'LIVE';
    
    return 'LIVE';
  }

  @Post('workflows')
  @UseGuards(GatewayAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async createWorkflow(@Req() req: any, @Body() body: any) {
    const userId = req.user.id;
    const start = Date.now();
    const mode = this.getMode(req, body);

    if (mode === 'LIVE') {
      // 1. Fetch user wallet balance
      let balance = 0;
      try {
        const balanceRes = await fetch(`${this.walletUrl}/wallet/balance?userId=${userId}`);
        if (balanceRes.ok) {
          const balanceData = await balanceRes.json();
          const rawAvail = balanceData.available !== undefined ? balanceData.available : (balanceData.data?.available || 0);
          balance = Number(rawAvail);
        }
      } catch (e) {
        console.error('[WALLET_CHECK_ERROR] Failed to fetch balance for template creation:', e);
      }

      const estimatedCost = Number(body.estimatedCost || 0);

      // 2. Reject if balance < estimatedCost
      if (balance < estimatedCost) {
        throw new HttpException({
          success: false,
          message: 'Insufficient wallet balance. Please deposit funds before running a workflow.'
        }, HttpStatus.PAYMENT_REQUIRED);
      }
    }

    try {
      const res = await fetch(`${this.workflowUrl}/workflows`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...body, userId }),
      });
      return await res.json();
    } catch (err: any) {
      return handleGatewayError(err, 'Workflow Service', 'POST /workflows', start);
    }
  }

  @Patch('workflows/:id')
  async updateWorkflow(@Param('id') id: string, @Body() body: any) {
    const start = Date.now();
    try {
      const res = await fetch(`${this.workflowUrl}/workflows/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      return await res.json();
    } catch (err: any) {
      return handleGatewayError(err, 'Workflow Service', `PATCH /workflows/${id}`, start);
    }
  }

  @Post('workflows/:id/run')
  @UseGuards(GatewayAuthGuard)
  async runWorkflow(@Req() req: any, @Param('id') id: string) {
    const userId = req.user.id;
    const start = Date.now();
    const mode = this.getMode(req);

    if (mode === 'LIVE') {
      // 1. Fetch workflow template to get estimatedCost
      let estimatedCost = 0;
      try {
        const wfRes = await fetch(`${this.workflowUrl}/workflows/${id}`);
        if (wfRes.ok) {
          const wfData = await wfRes.json();
          if (wfData.success && wfData.data) {
            estimatedCost = Number(wfData.data.estimatedCost || 0);
          }
        }
      } catch (e) {
        console.error('[WORKFLOW_CHECK_ERROR] Failed to fetch workflow estimatedCost:', e);
      }

      // 2. Fetch user wallet balance
      let balance = 0;
      try {
        const balanceRes = await fetch(`${this.walletUrl}/wallet/balance?userId=${userId}`);
        if (balanceRes.ok) {
          const balanceData = await balanceRes.json();
          const rawAvail = balanceData.available !== undefined ? balanceData.available : (balanceData.data?.available || 0);
          balance = Number(rawAvail);
        }
      } catch (e) {
        console.error('[WALLET_CHECK_ERROR] Failed to fetch balance for workflow run:', e);
      }

      // 3. Reject if balance < estimatedCost
      if (balance < estimatedCost) {
        throw new HttpException({
          success: false,
          message: 'Insufficient wallet balance. Please deposit funds before running a workflow.'
        }, HttpStatus.PAYMENT_REQUIRED);
      }

      // 4. Lock estimated cost in escrow
      try {
        const lockRes = await fetch(`${this.walletUrl}/wallet/escrow/lock`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, amount: estimatedCost, reference: `Workflow SLA Lock | Run ID: ${id}` }),
        });
        const lockData = await lockRes.json();
        if (!lockData.success) {
          throw new HttpException({
            success: false,
            message: `Escrow hold failed: ${lockData.message || 'Unknown error'}`
          }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
      } catch (e: any) {
        if (e instanceof HttpException) throw e;
        throw new HttpException({
          success: false,
          message: `Failed to lock escrow reserves: ${e.message}`
        }, HttpStatus.INTERNAL_SERVER_ERROR);
      }

      try {
        const res = await fetch(`${this.workflowUrl}/workflows/${id}/run`, {
          method: 'POST',
        });
        return await res.json();
      } catch (err: any) {
        return handleGatewayError(err, 'Workflow Service', `POST /workflows/${id}/run`, start);
      }
    } else {
      // DEMO mode:
      // Update workflow status to completed in workflow-service
      try {
        await fetch(`${this.workflowUrl}/workflows/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'completed' }),
        });
      } catch (e) {
        console.error('Failed to update status for demo run:', e);
      }

      return {
        success: true,
        message: 'Simulated workflow completed successfully (Demo Mode)',
        data: {
          id,
          status: 'Demo Completed',
        }
      };
    }
  }

  @Post('workflows/:id/pause')
  @UseGuards(GatewayAuthGuard)
  async pauseWorkflow(@Req() req: any, @Param('id') id: string) {
    const start = Date.now();
    try {
      const res = await fetch(`${this.workflowUrl}/workflows/${id}/pause`, {
        method: 'POST',
      });
      return await res.json();
    } catch (err: any) {
      return handleGatewayError(err, 'Workflow Service', `POST /workflows/${id}/pause`, start);
    }
  }

  @Post('workflows/:id/resume')
  @UseGuards(GatewayAuthGuard)
  async resumeWorkflow(@Req() req: any, @Param('id') id: string) {
    const start = Date.now();
    try {
      const res = await fetch(`${this.workflowUrl}/workflows/${id}/resume`, {
        method: 'POST',
      });
      return await res.json();
    } catch (err: any) {
      return handleGatewayError(err, 'Workflow Service', `POST /workflows/${id}/resume`, start);
    }
  }

  @Post('workflows/:id/cancel')
  @UseGuards(GatewayAuthGuard)
  async cancelWorkflow(@Req() req: any, @Param('id') id: string) {
    const start = Date.now();
    try {
      const res = await fetch(`${this.workflowUrl}/workflows/${id}/cancel`, {
        method: 'POST',
      });
      return await res.json();
    } catch (err: any) {
      return handleGatewayError(err, 'Workflow Service', `POST /workflows/${id}/cancel`, start);
    }
  }

  @Post('workflows/:id/retry')
  @UseGuards(GatewayAuthGuard)
  async retryWorkflow(@Req() req: any, @Param('id') id: string) {
    const start = Date.now();
    try {
      const res = await fetch(`${this.workflowUrl}/workflows/${id}/retry`, {
        method: 'POST',
      });
      return await res.json();
    } catch (err: any) {
      return handleGatewayError(err, 'Workflow Service', `POST /workflows/${id}/retry`, start);
    }
  }

  @Get('workflows/history')
  async getHistory() {
    const start = Date.now();
    try {
      const res = await fetch(`${this.workflowUrl}/workflows`);
      return await res.json();
    } catch (err: any) {
      return handleGatewayError(err, 'Workflow Service', 'GET /workflows', start);
    }
  }

  @Get('workflows/:id')
  async getWorkflow(@Req() req: any, @Param('id') id: string) {
    const start = Date.now();
    const mode = this.getMode(req);
    try {
      const res = await fetch(`${this.workflowUrl}/workflows/${id}`);
      const data = await res.json();
      if (data.success && data.data) {
        if (mode === 'DEMO' && data.data.status === 'completed') {
          data.data.status = 'Demo Completed';
        }
      }
      return data;
    } catch (err: any) {
      return handleGatewayError(err, 'Workflow Service', `GET /workflows/${id}`, start);
    }
  }

  @Get('workflows/:id/status')
  async getWorkflowStatus(@Req() req: any, @Param('id') id: string) {
    const start = Date.now();
    const mode = this.getMode(req);
    try {
      const res = await fetch(`${this.workflowUrl}/workflows/${id}`);
      const data = await res.json();
      if (data && data.success && data.data) {
        let status = data.data.status;
        if (mode === 'DEMO' && status === 'completed') {
          status = 'Demo Completed';
        }
        return { success: true, status, data: { status } };
      }
      return data;
    } catch (err: any) {
      return handleGatewayError(err, 'Workflow Service', `GET /workflows/${id}/status`, start);
    }
  }

  @Get('workflows/:id/logs')
  async getWorkflowLogs(@Param('id') id: string) {
    const start = Date.now();
    try {
      const res = await fetch(`${this.workflowUrl}/workflows/${id}/logs`);
      return await res.json();
    } catch (err: any) {
      return handleGatewayError(err, 'Workflow Service', `GET /workflows/${id}/logs`, start);
    }
  }

  @Get('workflows/:id/graph')
  async getWorkflowGraph(@Param('id') id: string) {
    const start = Date.now();
    try {
      const res = await fetch(`${this.workflowUrl}/workflows/${id}/graph`);
      return await res.json();
    } catch (err: any) {
      return handleGatewayError(err, 'Workflow Service', `GET /workflows/${id}/graph`, start);
    }
  }

  // --- AI ORCHESTRATION ---
  @Post('ai/plan')
  @UseGuards(GatewayAuthGuard)
  async planWorkflow(@Req() req: any, @Body() body: any) {
    const userId = req.user.id;
    const start = Date.now();
    const mode = this.getMode(req, body);

    // Fetch user wallet balance first
    let balance = 0;
    try {
      const balanceRes = await fetch(`${this.walletUrl}/wallet/balance?userId=${userId}`);
      if (balanceRes.ok) {
        const balanceData = await balanceRes.json();
        const rawAvail = balanceData.available !== undefined ? balanceData.available : (balanceData.data?.available || 0);
        balance = Number(rawAvail);
      }
    } catch (e) {
      console.error('[WALLET_CHECK_ERROR] Failed to fetch balance for planning:', e);
    }

    // Add requested execution telemetry logging
    console.log(`Current mode: ${mode}`);
    console.log(`Wallet mode: ${mode}`);
    console.log(`Wallet balance: ${balance}`);
    console.log(`Payment validation enabled? ${mode === 'LIVE'}`);

    if (mode === 'LIVE') {
      // Reject immediately if balance <= 0
      if (balance <= 0) {
        throw new HttpException({
          success: false,
          message: 'Insufficient wallet balance. Please deposit funds before running a workflow.'
        }, HttpStatus.PAYMENT_REQUIRED);
      }

      let rawResponse: Response | undefined;
      let responseBody = '';
      try {
        rawResponse = await fetch(`${this.aiUrl}/plan`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: body.query, routing_mode: body.routingMode, budget: body.budget }),
        });
        
        responseBody = await rawResponse.text();
        const data = JSON.parse(responseBody);
        if (!rawResponse.ok || !data || !data.workflow) {
          return {
            success: false,
            message: data?.message || data?.detail || `AI planner service failed to return valid DAG workflow (status ${rawResponse.status})`
          };
        }

        const estimatedCost = Number(data.estimated_cost || 0);

        // 3. Verify balance is sufficient to run this specific plan
        if (balance < estimatedCost) {
          throw new HttpException({
            success: false,
            message: `Insufficient wallet balance. Workflow requires ${estimatedCost.toFixed(2)} USDC, but you only have ${balance.toFixed(2)} USDC. Please deposit funds before running a workflow.`
          }, HttpStatus.PAYMENT_REQUIRED);
        }
        
        return {
          success: true,
          message: 'Intention plan generated successfully',
          data: {
            nodes: data.workflow.map((node: any) => ({
              id: node.id,
              capability: node.capability,
              label: node.task || node.id.toUpperCase(),
              task: node.task || node.id.toUpperCase(),
            })),
            edges: (() => {
              const list: any[] = [];
              let edgeIdx = 0;
              data.workflow.forEach((node: any) => {
                if (node.dependencies && Array.isArray(node.dependencies)) {
                  node.dependencies.forEach((dep: string) => {
                    list.push({
                      id: `edge-${edgeIdx++}`,
                      source: dep,
                      target: node.id,
                    });
                  });
                }
              });
              return list;
            })(),
            prompt_tokens: data.prompt_tokens || 0,
            completion_tokens: data.completion_tokens || 0,
            estimated_cost: data.estimated_cost || 0,
          },
        };
      } catch (err: any) {
        if (err instanceof HttpException) throw err;
        return handleGatewayError(err, 'AI Service', 'POST /plan', start, rawResponse, responseBody);
      }
    } else {
      // DEMO mode planning - invoke AI planner dynamically but override cost to 0
      let rawResponse: Response | undefined;
      let responseBody = '';
      try {
        rawResponse = await fetch(`${this.aiUrl}/plan`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: body.query, routing_mode: body.routingMode, budget: body.budget }),
        });
        
        responseBody = await rawResponse.text();
        const data = JSON.parse(responseBody);
        if (!rawResponse.ok || !data || !data.workflow) {
          return {
            success: false,
            message: data?.message || data?.detail || `AI planner service failed to return valid DAG workflow (status ${rawResponse.status})`
          };
        }

        return {
          success: true,
          message: 'Intention plan generated successfully (Demo Mode)',
          data: {
            nodes: data.workflow.map((node: any) => ({
              id: node.id,
              capability: node.capability,
              label: node.task || node.id.toUpperCase(),
              task: node.task || node.id.toUpperCase(),
              agentId: node.agentId,
            })),
            edges: (() => {
              const list: any[] = [];
              let edgeIdx = 0;
              data.workflow.forEach((node: any) => {
                if (node.dependencies && Array.isArray(node.dependencies)) {
                  node.dependencies.forEach((dep: string) => {
                    list.push({
                      id: `edge-${edgeIdx++}`,
                      source: dep,
                      target: node.id,
                    });
                  });
                }
              });
              return list;
            })(),
            prompt_tokens: data.prompt_tokens || 0,
            completion_tokens: data.completion_tokens || 0,
            estimated_cost: 0.0, // Demo mode is free
          },
        };
      } catch (err: any) {
        return handleGatewayError(err, 'AI Service', 'POST /plan (Demo)', start, rawResponse, responseBody);
      }
    }
  }

  @Post('ai/cost')
  async estimateCost(@Body() body: any) {
    const start = Date.now();
    try {
      const res = await fetch(`${this.aiUrl}/estimate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      return await res.json();
    } catch (err: any) {
      return handleGatewayError(err, 'AI Service', 'POST /estimate', start);
    }
  }

  @Post('ai/verify')
  async verifyOutput(@Body() body: any) {
    const start = Date.now();
    try {
      const res = await fetch(`${this.aiUrl}/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      return await res.json();
    } catch (err: any) {
      return handleGatewayError(err, 'AI Service', 'POST /verify', start);
    }
  }

  @Post('ai/route')
  async routeModel(@Body() body: any) {
    const start = Date.now();
    try {
      const res = await fetch(`${this.aiUrl}/route`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: body.prompt,
          task_type: body.taskType,
          model_override: body.modelOverride,
          system_prompt: body.systemPrompt,
        }),
      });
      return await res.json();
    } catch (err: any) {
      return handleGatewayError(err, 'AI Service', 'POST /route', start);
    }
  }

  @Post('workflows/events/publish')
  async publishEvent(@Body() body: any) {
    this.nexusGateway.broadcastEvent(body.event, body.payload);
    return { success: true };
  }

  @Post('memory/store')
  async storeMemory(@Body() body: any) {
    const start = Date.now();
    try {
      const res = await fetch(`${this.aiUrl}/memory/store`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      return await res.json();
    } catch (err: any) {
      return handleGatewayError(err, 'AI Service', 'POST /memory/store', start);
    }
  }

  @Post('memory/query')
  async queryMemory(@Body() body: any) {
    const start = Date.now();
    try {
      const res = await fetch(`${this.aiUrl}/memory/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      return await res.json();
    } catch (err: any) {
      return handleGatewayError(err, 'AI Service', 'POST /memory/query', start);
    }
  }

  @Post('memory/preferences')
  async setPreference(@Body() body: any) {
    const start = Date.now();
    try {
      const res = await fetch(`${this.aiUrl}/memory/preferences`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      return await res.json();
    } catch (err: any) {
      return handleGatewayError(err, 'AI Service', 'POST /memory/preferences', start);
    }
  }

  @Get('memory/preferences')
  async getPreferences(@Req() req: any) {
    const start = Date.now();
    const userId = req.query.userId || 'user-1';
    try {
      const res = await fetch(`${this.aiUrl}/memory/preferences/get`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId }),
      });
      return await res.json();
    } catch (err: any) {
      return handleGatewayError(err, 'AI Service', 'POST /memory/preferences/get', start);
    }
  }

  @Post('memory/compress')
  async compressMemory(@Body() body: any) {
    const start = Date.now();
    try {
      const res = await fetch(`${this.aiUrl}/memory/compress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      return await res.json();
    } catch (err: any) {
      return handleGatewayError(err, 'AI Service', 'POST /memory/compress', start);
    }
  }
}

