import { AnalyticsRepository } from '../repositories';
import { IDashboardData } from '../types';
import { apiClient } from '../../lib/api-client';

export class LiveAnalyticsRepository implements AnalyticsRepository {
  async getDashboardData(): Promise<IDashboardData> {
    const res = await apiClient.get<any>('/api/v1/analytics/dashboard');
    if (res && res.success && res.data) {
      const d = res.data;
      return {
        activeWorkflows: Number(d.activeWorkflows || 0),
        completedWorkflows: Number(d.completedWorkflows || 0),
        failedWorkflows: Number(d.failedWorkflows || 0),
        publishedAgents: Number(d.publishedAgents || 0),
        walletBalance: Number(d.walletBalance || 0),
        todayTokens: Number(d.todayTokens || 0),
        todayInferenceCost: Number(d.todayInferenceCost || 0),
        averageLatency: Number(d.averageLatency || 0),
        platformRevenue: Number(d.platformRevenue || 0),
        recentWorkflows: Array.isArray(d.recentWorkflows) ? d.recentWorkflows : [],
        activeUsers: Number(d.activeUsers || 0),
        systemHealth: d.systemHealth || '100.00%'
      };
    }
    return {
      activeWorkflows: 0,
      completedWorkflows: 0,
      failedWorkflows: 0,
      publishedAgents: 0,
      walletBalance: 0,
      todayTokens: 0,
      todayInferenceCost: 0,
      averageLatency: 0,
      platformRevenue: 0,
      recentWorkflows: [],
      activeUsers: 0,
      systemHealth: 'N/A'
    };
  }

  async getActivityFeed(): Promise<any[]> {
    const res = await apiClient.get<any>('/api/v1/analytics/activity-feed');
    return res && res.success && Array.isArray(res.data) ? res.data : [];
  }

  async getRevenueData(): Promise<any[]> {
    const res = await apiClient.get<any>('/api/v1/analytics/revenue');
    return res && res.success && Array.isArray(res.data) ? res.data : [];
  }

  async getPlatformMetrics(): Promise<any> {
    const res = await apiClient.get<any>('/api/v1/analytics/platform');
    return res && res.success && res.data ? res.data : { apiRequestsCount: 0, successRate: 100.0, errorRate: 0.0, queueDepth: 0 };
  }

  async getMarketplaceMetrics(): Promise<any> {
    const res = await apiClient.get<any>('/api/v1/analytics/marketplace');
    return res && res.success && res.data ? res.data : { publishedAgents: 0, verifiedAgents: 0, topCategory: 'N/A' };
  }

  async getAgentMetrics(): Promise<any[]> {
    const res = await apiClient.get<any>('/api/v1/analytics/agents');
    return res && res.success && Array.isArray(res.data) ? res.data : [];
  }

  async getAiMetrics(): Promise<any> {
    const res = await apiClient.get<any>('/api/v1/analytics/ai');
    return res && res.success && res.data ? res.data : { avgPlanningLatencyMs: 0, tokensConsumed: 0 };
  }

  async getSystemMetrics(): Promise<any> {
    const res = await apiClient.get<any>('/api/v1/analytics/system');
    return res && res.success && res.data ? res.data : { cpuUsage: 0, memoryUsage: 0 };
  }

  async getWorkflowMetrics(): Promise<any> {
    const res = await apiClient.get<any>('/api/v1/analytics/workflows');
    return res && res.success && res.data ? res.data : { created: 0, completed: 0, failed: 0, avgDurationMs: 0 };
  }
}
