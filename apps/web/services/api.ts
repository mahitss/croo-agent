import { apiClient } from '../lib/api-client';

export const apiService = {
  getDashboardData() {
    return apiClient.get('/api/v1/analytics/dashboard');
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
