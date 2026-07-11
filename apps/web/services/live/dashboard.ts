import { IDashboardService, IDashboardData } from '../types';
import { apiClient } from '../../lib/api-client';

export const liveDashboardService: IDashboardService = {
  async getDashboardData(): Promise<IDashboardData> {
    try {
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
      throw new Error('Failed to load dashboard data');
    } catch (err) {
      console.error('[LIVE_DASHBOARD_SERVICE] Error fetching dashboard data:', err);
      // Fail gracefully: show 0 for metrics instead of hardcoded demo values
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
  },

  async getActivityFeed(): Promise<any[]> {
    try {
      const res = await apiClient.get<any>('/api/v1/analytics/activity-feed');
      if (res && res.success && Array.isArray(res.data)) {
        return res.data;
      }
    } catch (e) {}
    return [];
  }
};
