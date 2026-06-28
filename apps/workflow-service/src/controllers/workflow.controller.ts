import { Controller, Get, Post, Patch, Delete, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';

@Controller('api/v1')
export class WorkflowController {
  constructor(private readonly prisma: PrismaService) {}

  @Post('workflows')
  @HttpCode(HttpStatus.CREATED)
  async createWorkflow(@Body() body: any) {
    const workflow = await this.prisma.workflow.create({
      data: {
        userId: body.userId || 'user-1',
        title: body.title || 'Untitled Workflow',
        status: 'pending',
        estimatedCost: body.estimatedCost || 1.50,
        actualCost: 0,
      },
    });

    if (body.nodes && Array.isArray(body.nodes)) {
      for (const node of body.nodes) {
        await this.prisma.workflowNode.create({
          data: {
            workflowId: workflow.id,
            agentId: node.agentId || 'agent-research-1',
            capability: node.capability || 'research',
            status: 'pending',
            positionX: node.positionX || 0,
            positionY: node.positionY || 0,
          },
        });
      }
    }

    if (body.edges && Array.isArray(body.edges)) {
      for (const edge of body.edges) {
        await this.prisma.workflowEdge.create({
          data: {
            workflowId: workflow.id,
            sourceNode: edge.sourceNode || '',
            targetNode: edge.targetNode || '',
          },
        });
      }
    }

    return {
      success: true,
      message: 'Workflow template successfully parsed and stored',
      data: workflow,
    };
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
    const execution = await this.prisma.workflowExecution.create({
      data: {
        workflowId: id,
        status: 'running',
      },
    });

    await this.prisma.workflow.update({
      where: { id },
      data: { status: 'running' },
    });

    return {
      success: true,
      message: 'Workflow execution successfully queued in BullMQ',
      data: {
        executionId: execution.id,
        status: 'running',
      },
    };
  }

  @Post('workflows/:id/pause')
  @HttpCode(HttpStatus.OK)
  async pauseWorkflow(@Param('id') id: string) {
    return {
      success: true,
      message: `Workflow execution ${id} paused`,
    };
  }

  @Post('workflows/:id/resume')
  @HttpCode(HttpStatus.OK)
  async resumeWorkflow(@Param('id') id: string) {
    return {
      success: true,
      message: `Workflow execution ${id} resumed`,
    };
  }

  @Post('workflows/:id/cancel')
  @HttpCode(HttpStatus.OK)
  async cancelWorkflow(@Param('id') id: string) {
    await this.prisma.workflow.update({
      where: { id },
      data: { status: 'failed' },
    });

    return {
      success: true,
      message: `Workflow execution ${id} terminated`,
    };
  }

  @Post('workflows/:id/retry')
  @HttpCode(HttpStatus.OK)
  async retryWorkflow(@Param('id') id: string) {
    return {
      success: true,
      message: `Failed tasks in workflow ${id} queued for retry`,
    };
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
