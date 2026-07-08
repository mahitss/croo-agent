import { Controller, Get, Post, Patch, Param, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { handleGatewayError } from '../utils/gateway-error';

@Controller('api/v1')
export class WorkflowsController {
  private readonly workflowUrl = process.env.WORKFLOW_SERVICE_URL || 'http://127.0.0.1:5003/api/v1';
  private readonly aiUrl = process.env.AI_SERVICE_URL || 'http://127.0.0.1:8000';

  @Post('workflows')
  @HttpCode(HttpStatus.CREATED)
  async createWorkflow(@Body() body: any) {
    const start = Date.now();
    try {
      const res = await fetch(`${this.workflowUrl}/workflows`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
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
  async runWorkflow(@Param('id') id: string) {
    const start = Date.now();
    try {
      const res = await fetch(`${this.workflowUrl}/workflows/${id}/run`, {
        method: 'POST',
      });
      return await res.json();
    } catch (err: any) {
      return handleGatewayError(err, 'Workflow Service', `POST /workflows/${id}/run`, start);
    }
  }

  @Post('workflows/:id/pause')
  async pauseWorkflow(@Param('id') id: string) {
    const start = Date.now();
    try {
      const res = await fetch(`${this.workflowUrl}/workflows/${id}/pause`, { method: 'POST' });
      return await res.json();
    } catch (err: any) {
      return handleGatewayError(err, 'Workflow Service', `POST /workflows/${id}/pause`, start);
    }
  }

  @Post('workflows/:id/resume')
  async resumeWorkflow(@Param('id') id: string) {
    const start = Date.now();
    try {
      const res = await fetch(`${this.workflowUrl}/workflows/${id}/resume`, { method: 'POST' });
      return await res.json();
    } catch (err: any) {
      return handleGatewayError(err, 'Workflow Service', `POST /workflows/${id}/resume`, start);
    }
  }

  @Post('workflows/:id/cancel')
  async cancelWorkflow(@Param('id') id: string) {
    const start = Date.now();
    try {
      const res = await fetch(`${this.workflowUrl}/workflows/${id}/cancel`, { method: 'POST' });
      return await res.json();
    } catch (err: any) {
      return handleGatewayError(err, 'Workflow Service', `POST /workflows/${id}/cancel`, start);
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
  async getWorkflow(@Param('id') id: string) {
    const start = Date.now();
    try {
      const res = await fetch(`${this.workflowUrl}/workflows/${id}`);
      return await res.json();
    } catch (err: any) {
      return handleGatewayError(err, 'Workflow Service', `GET /workflows/${id}`, start);
    }
  }

  @Get('workflows/:id/status')
  async getWorkflowStatus(@Param('id') id: string) {
    const start = Date.now();
    try {
      const res = await fetch(`${this.workflowUrl}/workflows/${id}`);
      const data = await res.json();
      if (data && data.success && data.data) {
        return { success: true, status: data.data.status, data: { status: data.data.status } };
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
  async planWorkflow(@Body() body: any) {
    const start = Date.now();
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
      return handleGatewayError(err, 'AI Service', 'POST /plan', start, rawResponse, responseBody);
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
}
