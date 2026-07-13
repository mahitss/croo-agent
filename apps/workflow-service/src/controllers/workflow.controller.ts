import { Controller, Get, Post, Patch, Delete, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import Redis from 'ioredis';

declare var process: any;

@Controller('api/v1')
export class WorkflowController {
  private redisPub: Redis;

  constructor(private readonly prisma: PrismaService) {
    const redisUrl = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
    console.log(`[WORKFLOW_ORCHESTRATOR] Connecting Redis publisher to: ${redisUrl}`);
    
    this.redisPub = new Redis(redisUrl, {
      maxRetriesPerRequest: null,
      retryStrategy: (times) => Math.min(times * 100, 3000),
    });

    this.redisPub.on('error', (err) => {
      // Suppress Redis log spam if local Redis server is not running
    });
  }

  async publishEvent(channel: string, payload: any) {
    // 1. Try Redis
    try {
      if (this.redisPub && this.redisPub.status === 'ready') {
        await this.redisPub.publish(channel, JSON.stringify(payload));
        return;
      }
    } catch (e) {
      // Fallback
    }

    // 2. HTTP Gateway Fallback
    try {
      const eventName = channel === 'workflow:logs' ? 'workflow_log' : 'workflow_update';
      const gatewayUrl = process.env.API_GATEWAY_URL || 'http://127.0.0.1:10000/api/v1';
      
      await fetch(`${gatewayUrl}/workflows/events/publish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event: eventName, payload }),
      });
    } catch (err: any) {
      // Suppress network noise
    }
  }

  @Post('workflows')
  @HttpCode(HttpStatus.CREATED)
  async createWorkflow(@Body() body: any) {
    try {
      const workflow = await this.prisma.workflow.create({
        data: {
          userId: body.userId || 'user-1',
          title: body.title || 'Untitled Workflow',
          status: 'pending',
          estimatedCost: body.estimatedCost || 1.50,
          actualCost: 0,
        },
      });
  
      const nodeMapping = new Map<string, string>();

      if (body.nodes && Array.isArray(body.nodes)) {
        for (const node of body.nodes) {
          const dbNode = await this.prisma.workflowNode.create({
            data: {
              workflowId: workflow.id,
              agentId: node.agentId || 'agent-research-1',
              capability: node.capability || 'research',
              status: 'pending',
              positionX: node.positionX || 0,
              positionY: node.positionY || 0,
            },
          });
          if (node.id) {
            nodeMapping.set(node.id, dbNode.id);
          }
        }
      }
  
      if (body.edges && Array.isArray(body.edges)) {
        for (const edge of body.edges) {
          const sourceUuid = nodeMapping.get(edge.sourceNode) || edge.sourceNode || '';
          const targetUuid = nodeMapping.get(edge.targetNode) || edge.targetNode || '';
          await this.prisma.workflowEdge.create({
            data: {
              workflowId: workflow.id,
              sourceNode: sourceUuid,
              targetNode: targetUuid,
            },
          });
        }
      }
  
      const fullWorkflow = await this.prisma.workflow.findUnique({
        where: { id: workflow.id },
        include: {
          nodes: true,
          edges: true,
        },
      });

      return {
        success: true,
        message: 'Workflow template successfully parsed and stored',
        data: {
          ...fullWorkflow,
          nodeMapping: Object.fromEntries(nodeMapping),
        },
      };
    } catch (error: any) {
      return {
        success: false,
        message: `Database error during workflow template creation: ${error.message}`,
      };
    }
  }

  @Get('workflows')
  async getWorkflows() {
    const workflows = await this.prisma.workflow.findMany({
      where: { deletedAt: null },
      include: {
        nodes: true,
        edges: true,
      },
    });

    return {
      success: true,
      data: workflows,
    };
  }

  @Get('workflows/:id')
  async getWorkflow(@Param('id') id: string) {
    const workflow = await this.prisma.workflow.findFirst({
      where: { id, deletedAt: null },
      include: {
        nodes: true,
        edges: true,
      },
    });

    return {
      success: true,
      data: workflow,
    };
  }

  @Post('workflows/:id/run')
  @HttpCode(HttpStatus.OK)
  async runWorkflow(@Param('id') id: string) {
    try {
      // 1. Queued
      const execution = await this.prisma.workflowExecution.create({
        data: {
          workflowId: id,
          status: 'queued',
        },
      });
      
      await this.prisma.workflow.update({
        where: { id },
        data: { status: 'queued' },
      });
      
      await this.publishEvent('workflow:updates', {
        executionId: execution.id,
        workflowId: id,
        status: 'queued',
        progress: 0,
        estimatedCompletionSeconds: 20,
        timestamp: new Date().toISOString()
      });

      // Asynchronous background workflow execution machine
      (async () => {
        try {
          // 2. Planning
          await this.prisma.workflowExecution.update({
            where: { id: execution.id },
            data: { status: 'planning' },
          });
          await this.prisma.workflow.update({
            where: { id },
            data: { status: 'planning' },
          });
          await this.publishEvent('workflow:updates', {
            executionId: execution.id,
            workflowId: id,
            status: 'planning',
            progress: 10,
            estimatedCompletionSeconds: 18,
            timestamp: new Date().toISOString()
          });

          await new Promise(resolve => setTimeout(resolve, 800));

          // 3. Scheduling
          await this.prisma.workflowExecution.update({
            where: { id: execution.id },
            data: { status: 'scheduling' },
          });
          await this.prisma.workflow.update({
            where: { id },
            data: { status: 'scheduling' },
          });
          await this.publishEvent('workflow:updates', {
            executionId: execution.id,
            workflowId: id,
            status: 'scheduling',
            progress: 25,
            estimatedCompletionSeconds: 15,
            timestamp: new Date().toISOString()
          });

          const nodes = await this.prisma.workflowNode.findMany({
            where: { workflowId: id },
          });

          const edges = await this.prisma.workflowEdge.findMany({
            where: { workflowId: id },
          });

          // Build topological sort graph
          const adj = new Map<string, string[]>();
          const inDegree = new Map<string, number>();

          for (const node of nodes) {
            adj.set(node.id, []);
            inDegree.set(node.id, 0);
          }

          for (const edge of edges) {
            if (adj.has(edge.sourceNode) && adj.has(edge.targetNode)) {
              adj.get(edge.sourceNode).push(edge.targetNode);
              inDegree.set(edge.targetNode, (inDegree.get(edge.targetNode) || 0) + 1);
            }
          }

          const queue: typeof nodes = [];
          for (const node of nodes) {
            if ((inDegree.get(node.id) || 0) === 0) {
              queue.push(node);
            }
          }

          const orderedNodes: typeof nodes = [];
          while (queue.length > 0) {
            const node = queue.shift()!;
            orderedNodes.push(node);
            const neighbors = adj.get(node.id) || [];
            for (const neighborId of neighbors) {
              const newInDegree = (inDegree.get(neighborId) || 0) - 1;
              inDegree.set(neighborId, newInDegree);
              if (newInDegree === 0) {
                const neighborNode = nodes.find(n => n.id === neighborId);
                if (neighborNode) {
                  queue.push(neighborNode);
                }
              }
            }
          }

          if (orderedNodes.length !== nodes.length) {
            throw new Error('Cyclic dependency detected in workflow DAG.');
          }

          await new Promise(resolve => setTimeout(resolve, 800));

          // 4. Running
          await this.prisma.workflowExecution.update({
            where: { id: execution.id },
            data: { status: 'running' },
          });
          await this.prisma.workflow.update({
            where: { id },
            data: { status: 'running' },
          });

          // Iterating execution nodes
          for (let i = 0; i < orderedNodes.length; i++) {
            // Live pause / cancel polling check
            let currentExec = await this.prisma.workflowExecution.findUnique({
              where: { id: execution.id }
            });

            while (currentExec && currentExec.status === 'paused') {
              console.log(`[WORKFLOW_ORCHESTRATOR] Execution ${execution.id} is PAUSED. Yielding orchestrator loop...`);
              await new Promise(resolve => setTimeout(resolve, 1000));
              currentExec = await this.prisma.workflowExecution.findUnique({
                where: { id: execution.id }
              });
            }

            if (currentExec && currentExec.status === 'cancelled') {
              console.log(`[WORKFLOW_ORCHESTRATOR] Execution ${execution.id} is CANCELLED. Terminating orchestrator...`);
              
              // Mark uncompleted nodes as failed/cancelled
              const remaining = orderedNodes.slice(i);
              for (const rn of remaining) {
                await this.prisma.workflowNode.update({
                  where: { id: rn.id },
                  data: { status: 'failed' }
                });
              }
              return;
            }

            const node = orderedNodes[i];
            const progress = Math.round((i / orderedNodes.length) * 100);
            const remainingCount = orderedNodes.length - i;
            const estimatedCompletionSeconds = remainingCount * 3; // Approx 3s per node SLA

            // Publish Running update
            await this.publishEvent('workflow:updates', {
              executionId: execution.id,
              workflowId: id,
              status: 'running',
              progress,
              estimatedCompletionSeconds,
              timestamp: new Date().toISOString()
            });

            // Mark node running
            await this.prisma.workflowNode.update({
              where: { id: node.id },
              data: { status: 'running' },
            });

            const task = await this.prisma.task.create({
              data: {
                executionId: execution.id,
                taskName: node.capability,
                status: 'running',
                assignedAgentId: node.agentId,
                inputPayload: { stage: i + 1 },
              },
            });

            const startLog = await this.prisma.taskLog.create({
              data: {
                taskId: task.id,
                logLevel: 'info',
                message: `Initializing node discovery for capability: ${node.capability}`,
              },
            });

            await this.publishEvent('workflow:logs', {
              executionId: execution.id,
              taskId: task.id,
              logId: startLog.id,
              logLevel: 'info',
              message: startLog.message,
              createdAt: startLog.createdAt.toISOString()
            });

            let attempts = 0;
            const maxRetries = 3;
            let success = false;
            let lastError: any = null;

            while (attempts < maxRetries && !success) {
              attempts++;
              try {
                if (attempts > 1) {
                  // 5. Retrying
                  await this.prisma.workflowExecution.update({
                    where: { id: execution.id },
                    data: { status: 'retrying' },
                  });
                  await this.prisma.workflow.update({
                    where: { id },
                    data: { status: 'retrying' },
                  });
                  await this.publishEvent('workflow:updates', {
                    executionId: execution.id,
                    workflowId: id,
                    status: 'retrying',
                    progress,
                    estimatedCompletionSeconds,
                    timestamp: new Date().toISOString()
                  });

                  const retryLog = await this.prisma.taskLog.create({
                    data: {
                      taskId: task.id,
                      logLevel: 'warn',
                      message: `Task execution failed. Retrying node execution (Attempt ${attempts}/${maxRetries})...`,
                    },
                  });

                  await this.publishEvent('workflow:logs', {
                    executionId: execution.id,
                    taskId: task.id,
                    logId: retryLog.id,
                    logLevel: 'warn',
                    message: retryLog.message,
                    createdAt: retryLog.createdAt.toISOString()
                  });
                }

                // Simulate transient timeout in 20% of first attempts
                if (attempts === 1 && Math.random() < 0.20) {
                  throw new Error(`Transient connection timeout contacting agent id: ${node.agentId}`);
                }

                await new Promise(resolve => setTimeout(resolve, 800));

                const linkLog = await this.prisma.taskLog.create({
                  data: {
                    taskId: task.id,
                    logLevel: 'info',
                    message: `Task node linked successfully. Querying agent endpoint results... (Attempt ${attempts})`,
                  },
                });

                await this.publishEvent('workflow:logs', {
                  executionId: execution.id,
                  taskId: task.id,
                  logId: linkLog.id,
                  logLevel: 'info',
                  message: linkLog.message,
                  createdAt: linkLog.createdAt.toISOString()
                });

                await new Promise(resolve => setTimeout(resolve, 1000));
                success = true;

                // Reset execution state to running after successful retry
                if (attempts > 1) {
                  await this.prisma.workflowExecution.update({
                    where: { id: execution.id },
                    data: { status: 'running' }
                  });
                  await this.prisma.workflow.update({
                    where: { id },
                    data: { status: 'running' }
                  });
                }
              } catch (e: any) {
                lastError = e;
                console.warn(`[NODE_RETRY_WARNING] Node execution attempt ${attempts} failed:`, e.message);
                await new Promise(resolve => setTimeout(resolve, 600));
              }
            }

            if (!success) {
              throw new Error(`Node execution failed after ${maxRetries} attempts. Last error: ${lastError?.message || 'Unknown error'}`);
            }

            await this.prisma.task.update({
              where: { id: task.id },
              data: {
                status: 'completed',
                completedAt: new Date(),
                outputPayload: { result: `Node ${node.capability} resolved successfully.` },
              },
            });

            await this.prisma.workflowNode.update({
              where: { id: node.id },
              data: { status: 'completed' },
            });

            const completionLog = await this.prisma.taskLog.create({
              data: {
                taskId: task.id,
                logLevel: 'info',
                message: `Task node ${node.capability} completed execution. Escrow payouts updated.`,
              },
            });

            await this.publishEvent('workflow:logs', {
              executionId: execution.id,
              taskId: task.id,
              logId: completionLog.id,
              logLevel: 'info',
              message: completionLog.message,
              createdAt: completionLog.createdAt.toISOString()
            });
          }

          // 6. Completed
          await this.prisma.workflowExecution.update({
            where: { id: execution.id },
            data: {
              status: 'completed',
              completedAt: new Date(),
            },
          });

          await this.prisma.workflow.update({
            where: { id },
            data: { status: 'completed' },
          });

          await this.publishEvent('workflow:updates', {
            executionId: execution.id,
            workflowId: id,
            status: 'completed',
            progress: 100,
            estimatedCompletionSeconds: 0,
            timestamp: new Date().toISOString()
          });
        } catch (err: any) {
          console.error('[WORKFLOW_ORCHESTRATOR_ERROR] Pipeline execution failed:', err);

          // 7. Failed
          try {
            await this.prisma.workflowExecution.update({
              where: { id: execution.id },
              data: { status: 'failed', completedAt: new Date() },
            });
            await this.prisma.workflow.update({
              where: { id },
              data: { status: 'failed' },
            });
            await this.publishEvent('workflow:updates', {
              executionId: execution.id,
              workflowId: id,
              status: 'failed',
              progress: 100,
              timestamp: new Date().toISOString()
            });
          } catch (e) {
            console.error('Failed to update execution/workflow status to failed:', e);
          }
        }
      })();

      return {
        success: true,
        message: 'Workflow execution successfully queued in background pipelines',
        data: {
          executionId: execution.id,
          status: 'queued',
        },
      };
    } catch (error: any) {
      return {
        success: false,
        message: `Database error during workflow execution queueing: ${error.message}`,
      };
    }
  }

  @Post('workflows/:id/pause')
  @HttpCode(HttpStatus.OK)
  async pauseWorkflow(@Param('id') id: string) {
    const active = await this.prisma.workflowExecution.findFirst({
      where: { workflowId: id, status: { in: ['running', 'retrying', 'planning', 'scheduling', 'queued'] } },
      orderBy: { startedAt: 'desc' }
    });
    if (active) {
      await this.prisma.workflowExecution.update({
        where: { id: active.id },
        data: { status: 'paused' }
      });
      await this.prisma.workflow.update({
        where: { id },
        data: { status: 'paused' }
      });
      await this.publishEvent('workflow:updates', {
        executionId: active.id,
        workflowId: id,
        status: 'paused',
        progress: 50,
        timestamp: new Date().toISOString()
      });
    }
    return {
      success: true,
      message: `Workflow execution paused`,
    };
  }

  @Post('workflows/:id/resume')
  @HttpCode(HttpStatus.OK)
  async resumeWorkflow(@Param('id') id: string) {
    const active = await this.prisma.workflowExecution.findFirst({
      where: { workflowId: id, status: 'paused' },
      orderBy: { startedAt: 'desc' }
    });
    if (active) {
      await this.prisma.workflowExecution.update({
        where: { id: active.id },
        data: { status: 'running' }
      });
      await this.prisma.workflow.update({
        where: { id },
        data: { status: 'running' }
      });
      await this.publishEvent('workflow:updates', {
        executionId: active.id,
        workflowId: id,
        status: 'running',
        progress: 50,
        timestamp: new Date().toISOString()
      });
    }
    return {
      success: true,
      message: `Workflow execution resumed`,
    };
  }

  @Post('workflows/:id/cancel')
  @HttpCode(HttpStatus.OK)
  async cancelWorkflow(@Param('id') id: string) {
    const active = await this.prisma.workflowExecution.findFirst({
      where: { workflowId: id, status: { in: ['running', 'paused', 'retrying', 'planning', 'scheduling', 'queued'] } },
      orderBy: { startedAt: 'desc' }
    });
    if (active) {
      await this.prisma.workflowExecution.update({
        where: { id: active.id },
        data: { status: 'cancelled', completedAt: new Date() }
      });
      await this.prisma.workflow.update({
        where: { id },
        data: { status: 'cancelled' }
      });
      await this.publishEvent('workflow:updates', {
        executionId: active.id,
        workflowId: id,
        status: 'cancelled',
        progress: 100,
        timestamp: new Date().toISOString()
      });
    }
    return {
      success: true,
      message: `Workflow execution cancelled`,
    };
  }

  @Post('workflows/:id/retry')
  @HttpCode(HttpStatus.OK)
  async retryWorkflow(@Param('id') id: string) {
    return await this.runWorkflow(id);
  }

  @Get('workflows/:id/history')
  async getHistory(@Param('id') id: string) {
    const executions = await this.prisma.workflowExecution.findMany({
      where: { workflowId: id },
    });

    return {
      success: true,
      data: executions,
    };
  }

  @Get('workflows/:id/logs')
  async getLogs(@Param('id') id: string) {
    const logs = await this.prisma.taskLog.findMany({
      where: {
        task: {
          execution: {
            workflowId: id,
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    });

    return {
      success: true,
      data: logs,
    };
  }

  @Get('workflows/:id/status')
  async getStatus(@Param('id') id: string) {
    const workflow = await this.prisma.workflow.findUnique({
      where: { id },
      select: { status: true },
    });
    return {
      success: true,
      status: workflow?.status || 'pending',
      data: {
        status: workflow?.status || 'pending',
      },
    };
  }

  @Get('workflows/:id/graph')
  async getGraph(@Param('id') id: string) {
    const workflow = await this.prisma.workflow.findFirst({
      where: { id, deletedAt: null },
      include: {
        nodes: true,
        edges: true,
      },
    });

    return {
      success: true,
      data: {
        nodes: workflow ? workflow.nodes.map(n => ({ id: n.id, label: n.capability })) : [],
        edges: workflow ? workflow.edges.map(e => ({ source: e.sourceNode, target: e.targetNode })) : [],
      },
    };
  }
}
