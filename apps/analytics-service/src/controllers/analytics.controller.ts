import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';

@Controller('api/v1')
export class AnalyticsController {
  constructor(private readonly prisma: PrismaService) {}

  private async seedIfEmpty() {
    const count = await this.prisma.dailyWorkflow.count();
    if (count === 0) {
      try {
        await this.prisma.dailyWorkflow.createMany({
          data: [
            { date: new Date('2026-06-25'), completed: 140, failed: 2, totalCost: 12.5 },
            { date: new Date('2026-06-26'), completed: 180, failed: 4, totalCost: 15.2 },
            { date: new Date('2026-06-27'), completed: 210, failed: 1, totalCost: 22.8 },
            { date: new Date('2026-06-28'), completed: 195, failed: 3, totalCost: 18.9 },
            { date: new Date('2026-06-29'), completed: 242, failed: 5, totalCost: 24.3 },
            { date: new Date('2026-06-30'), completed: 310, failed: 2, totalCost: 31.0 },
            { date: new Date('2026-07-01'), completed: 290, failed: 4, totalCost: 29.0 },
          ],
        });

        await this.prisma.dailyRevenue.createMany({
          data: [
            { date: new Date('2026-06-25'), revenue: 240.0, expenses: 80.0, platformFee: 24.0 },
            { date: new Date('2026-06-26'), revenue: 380.0, expenses: 110.0, platformFee: 38.0 },
            { date: new Date('2026-06-27'), revenue: 512.0, expenses: 140.0, platformFee: 51.2 },
            { date: new Date('2026-06-28'), revenue: 450.0, expenses: 130.0, platformFee: 45.0 },
            { date: new Date('2026-06-29'), revenue: 620.0, expenses: 180.0, platformFee: 62.0 },
            { date: new Date('2026-06-30'), revenue: 780.0, expenses: 220.0, platformFee: 78.0 },
            { date: new Date('2026-07-01'), revenue: 710.0, expenses: 200.0, platformFee: 71.0 },
          ],
        });

        await this.prisma.dailyAgentUsage.createMany({
          data: [
            { date: new Date('2026-06-30'), agentId: 'agent-research-1', invocations: 142, totalRevenue: 21.3 },
            { date: new Date('2026-06-30'), agentId: 'agent-finance-1', invocations: 88, totalRevenue: 22.0 },
            { date: new Date('2026-07-01'), agentId: 'agent-research-1', invocations: 120, totalRevenue: 18.0 },
            { date: new Date('2026-07-01'), agentId: 'agent-verify-1', invocations: 95, totalRevenue: 9.5 },
          ],
        });
      } catch (err) {
        console.error('Failed to seed analytical db data:', err);
      }
    }
  }

  @Get('analytics/dashboard')
  async getDashboard() {
    await this.seedIfEmpty();
    const dailyCount = await this.prisma.dailyWorkflow.aggregate({
      _sum: {
        completed: true,
      },
    });
    
    return {
      success: true,
      data: {
        activeUsers: 840,
        totalWorkflowsRun: dailyCount._sum?.completed || 1420,
        systemHealth: '99.98%',
      },
    };
  }

  @Get('analytics/platform')
  getPlatformMetrics() {
    return {
      success: true,
      data: {
        apiRequestsCount: 92837,
        successRate: 99.92,
        errorRate: 0.08,
        queueDepth: 2,
      },
    };
  }

  @Get('analytics/marketplace')
  async getMarketplaceMetrics() {
    return {
      success: true,
      data: {
        publishedAgents: 14,
        verifiedAgents: 8,
        topCategory: 'Research',
        trendingAgents: ['agent-research-1'],
      },
    };
  }

  @Get('analytics/workflows')
  async getWorkflowMetrics() {
    await this.seedIfEmpty();
    const totalCount = await this.prisma.dailyWorkflow.aggregate({
      _sum: {
        completed: true,
        failed: true,
      },
    });

    const completed = totalCount._sum?.completed || 1402;
    const failed = totalCount._sum?.failed || 18;

    return {
      success: true,
      data: {
        created: completed + failed,
        completed,
        failed,
        retryRate: 1.25,
        avgDurationMs: 45231,
      },
    };
  }

  @Get('analytics/agents')
  async getAgentMetrics() {
    await this.seedIfEmpty();
    const usage = await this.prisma.dailyAgentUsage.findMany({
      take: 20,
    });

    if (usage.length === 0) {
      return {
        success: true,
        data: [
          { agentId: 'agent-research-1', revenueUsdc: 210.50, invocations: 1402, avgLatencyMs: 820 },
        ],
      };
    }

    return {
      success: true,
      data: usage.map(u => ({
        agentId: u.agentId,
        revenueUsdc: Number(u.totalRevenue),
        invocations: u.invocations,
        avgLatencyMs: 820,
      })),
    };
  }

  @Get('analytics/payments')
  getPaymentMetrics() {
    return {
      success: true,
      data: {
        successful: 1420,
        failed: 3,
        refundRate: 0.21,
        settlementLatencyMs: 142,
      },
    };
  }

  @Get('analytics/ai')
  getAiMetrics() {
    return {
      success: true,
      data: {
        avgPlanningLatencyMs: 1240,
        tokensConsumed: 4892300,
        validationFailures: 4,
      },
    };
  }

  @Get('analytics/users')
  getUserMetrics() {
    return {
      success: true,
      data: {
        dau: 120,
        wau: 450,
        mau: 840,
        retentionRate: 94.5,
      },
    };
  }

  @Get('analytics/system')
  getSystemMetrics() {
    return {
      success: true,
      data: {
        cpuUsage: 12,
        memoryUsage: 45,
        networkInBytes: 94823904,
        networkOutBytes: 104239824,
      },
    };
  }

  @Get('analytics/revenue')
  async getRevenue() {
    await this.seedIfEmpty();
    const revs = await this.prisma.dailyRevenue.findMany({
      orderBy: { date: 'asc' },
      take: 30,
    });

    if (revs.length === 0) {
      return {
        success: true,
        data: [
          { date: '2026-06-25', revenue: 240.0, expenses: 80.0, platformFee: 24.0 },
          { date: '2026-06-26', revenue: 380.0, expenses: 110.0, platformFee: 38.0 },
          { date: '2026-06-27', revenue: 512.0, expenses: 140.0, platformFee: 51.2 },
          { date: '2026-06-28', revenue: 450.0, expenses: 130.0, platformFee: 45.0 },
        ],
      };
    }

    return {
      success: true,
      data: revs.map(r => ({
        date: r.date.toISOString().split('T')[0],
        revenue: Number(r.revenue),
        expenses: Number(r.expenses),
        platformFee: Number(r.platformFee),
      })),
    };
  }
}
