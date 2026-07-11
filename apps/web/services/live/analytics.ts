import { IAnalyticsService } from '../types';
import { apiClient } from '../../lib/api-client';

export const liveAnalyticsService: IAnalyticsService = {
  async getRevenueData(): Promise<any[]> {
    try {
      const res = await apiClient.get<any>('/api/v1/analytics/revenue');
      if (res && res.success && Array.isArray(res.data)) {
        return res.data;
      }
    } catch (e) {}
    return [];
  },

  async getPlatformMetrics(): Promise<any> {
    try {
      const res = await apiClient.get<any>('/api/v1/analytics/platform');
      if (res && res.success && res.data) {
        return res.data;
      }
    } catch (e) {}
    return { apiRequestsCount: 0, successRate: 100.0, errorRate: 0.0, queueDepth: 0 };
  },

  async getMarketplaceMetrics(): Promise<any> {
    try {
      const res = await apiClient.get<any>('/api/v1/analytics/marketplace');
      if (res && res.success && res.data) {
        return res.data;
      }
    } catch (e) {}
    return { publishedAgents: 0, verifiedAgents: 0, topCategory: 'N/A' };
  },

  async getAgentMetrics(): Promise<any[]> {
    try {
      const res = await apiClient.get<any>('/api/v1/analytics/agents');
      if (res && res.success && Array.isArray(res.data)) {
        return res.data;
      }
    } catch (e) {}
    return [];
  },

  async getAiMetrics(): Promise<any> {
    try {
      const res = await apiClient.get<any>('/api/v1/analytics/ai');
      if (res && res.success && res.data) {
        return res.data;
      }
    } catch (e) {}
    return { avgPlanningLatencyMs: 0, tokensConsumed: 0 };
  },

  async getSystemMetrics(): Promise<any> {
    try {
      const res = await apiClient.get<any>('/api/v1/analytics/system');
      if (res && res.success && res.data) {
        return res.data;
      }
    } catch (e) {}
    return { cpuUsage: 0, memoryUsage: 0 };
  },

  async getWorkflowMetrics(): Promise<any> {
    try {
      const res = await apiClient.get<any>('/api/v1/analytics/workflows');
      if (res && res.success && res.data) {
        return res.data;
      }
    } catch (e) {}
    return { created: 0, completed: 0, failed: 0, avgDurationMs: 0 };
  }
};
