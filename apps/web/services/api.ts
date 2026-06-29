import { apiClient } from '../lib/api-client';

export const apiService = {
  getDashboardData() {
    return apiClient.get('/api/v1/analytics/dashboard');
  },
  getRevenueData() {
    return apiClient.get('/api/v1/analytics/revenue');
  },
  getPlatformMetrics() {
    return apiClient.get('/api/v1/analytics/platform');
  },
  getMarketplaceMetrics() {
    return apiClient.get('/api/v1/analytics/marketplace');
  },
  getWorkflowMetrics() {
    return apiClient.get('/api/v1/analytics/workflows');
  },
  getAgentMetrics() {
    return apiClient.get('/api/v1/analytics/agents');
  },
  getAiMetrics() {
    return apiClient.get('/api/v1/analytics/ai');
  },
  getSystemMetrics() {
    return apiClient.get('/api/v1/analytics/system');
  },
  getAgentsList() {
    return apiClient.get('/api/v1/agents');
  },
  runWorkflow(id: string) {
    return apiClient.post(`/api/v1/workflows/${id}/run`, {});
  },
  syncWallet(address: string) {
    return apiClient.post('/api/v1/wallet/sync', { address });
  },
};
