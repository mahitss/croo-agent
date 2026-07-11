import { IAnalyticsService } from '../types';

export const demoAnalyticsService: IAnalyticsService = {
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
  },

  async getPlatformMetrics(): Promise<any> {
    return {
      apiRequestsCount: 840,
      successRate: 99.92,
      errorRate: 0.08,
      queueDepth: 0
    };
  },

  async getMarketplaceMetrics(): Promise<any> {
    return {
      publishedAgents: 8,
      verifiedAgents: 8,
      topCategory: 'Research'
    };
  },

  async getAgentMetrics(): Promise<any[]> {
    return [
      { agentId: 'agent-research-1', revenueUsdc: 210.50, invocations: 1402, avgLatencyMs: 820 }
    ];
  },

  async getAiMetrics(): Promise<any> {
    return {
      avgPlanningLatencyMs: 1450,
      tokensConsumed: 4890200
    };
  },

  async getSystemMetrics(): Promise<any> {
    return {
      cpuUsage: 14.5,
      memoryUsage: 38.2
    };
  },

  async getWorkflowMetrics(): Promise<any> {
    return {
      created: 1420,
      completed: 1402,
      failed: 18,
      avgDurationMs: 45231
    };
  }
};
