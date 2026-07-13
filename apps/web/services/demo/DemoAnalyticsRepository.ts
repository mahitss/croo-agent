import { AnalyticsRepository } from '../repositories';
import { IDashboardData } from '../types';

export class DemoAnalyticsRepository implements AnalyticsRepository {
  private getStored<T>(key: string, defaultValue: T): T {
    if (typeof window === 'undefined') return defaultValue;
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : defaultValue;
  }

  async getDashboardData(): Promise<IDashboardData> {
    const demoBalance = Number(this.getStored('orbit_demo_balance', '100.0'));
    
    return {
      activeWorkflows: 0,
      completedWorkflows: 1402,
      failedWorkflows: 18,
      publishedAgents: 8,
      walletBalance: demoBalance,
      todayTokens: 1489200,
      todayInferenceCost: 0.89,
      averageLatency: 820,
      platformRevenue: 15.0,
      recentWorkflows: [],
      activeUsers: 840,
      systemHealth: '99.98%'
    };
  }

  async getActivityFeed(): Promise<any[]> {
    return [
      { time: '1s ago', type: 'Escrow Lock', desc: 'Locked 0.15 USDC for InsightFinder Pro' },
      { time: '4s ago', type: 'Consensus Check', desc: 'SLA score 98.4% checked for FinAnalytica' },
      { time: '12s ago', type: 'Payout Settle', desc: 'Released 0.08 USDC to Translatio P2P wallet' }
    ];
  }

  async getRevenueData(): Promise<any[]> {
    return [
      { date: '08:00', revenue: 4.2 },
      { date: '09:00', revenue: 8.5 },
      { date: '10:00', revenue: 14.8 },
      { date: '11:00', revenue: 22.1 },
      { date: '12:00', revenue: 32.5 },
      { date: '13:00', revenue: 45.3 },
      { date: '14:00', revenue: 55.7 }
    ];
  }

  async getPlatformMetrics(): Promise<any> {
    return {
      apiRequestsCount: 840,
      successRate: 99.92,
      errorRate: 0.08,
      queueDepth: 0
    };
  }

  async getMarketplaceMetrics(): Promise<any> {
    return {
      publishedAgents: 8,
      publishedServices: 14,
      verifiedAgents: 8,
      topCategory: 'Research'
    };
  }

  async getAgentMetrics(): Promise<any[]> {
    return [
      { agentId: 'agent-research-1', name: 'InsightFinder Pro', revenueUsdc: 210.50, invocations: 1402, avgLatencyMs: 820 },
      { agentId: 'agent-finance-1', name: 'FinAnalytica', revenueUsdc: 152.00, invocations: 608, avgLatencyMs: 1450 }
    ];
  }

  async getAiMetrics(): Promise<any> {
    return {
      avgPlanningLatencyMs: 1450,
      tokensConsumed: 4890200
    };
  }

  async getSystemMetrics(): Promise<any> {
    return {
      cpuUsage: 14.5,
      memoryUsage: 38.2
    };
  }

  async getWorkflowMetrics(): Promise<any> {
    return {
      created: 1420,
      completed: 1402,
      failed: 18,
      avgDurationMs: 45231
    };
  }
}
