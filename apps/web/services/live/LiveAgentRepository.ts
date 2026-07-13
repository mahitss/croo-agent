import { Agent } from '@nexus-ai/types';
import { AgentRepository } from '../repositories';
import { apiClient } from '../../lib/api-client';

export class LiveAgentRepository implements AgentRepository {
  async getAgents(): Promise<Agent[]> {
    const res = await apiClient.get<any>('/api/v1/agents');
    return res?.success && Array.isArray(res.data) ? res.data : [];
  }

  async searchAgents(query: string): Promise<Agent[]> {
    const res = await apiClient.get<any>(`/api/v1/agents/search?q=${encodeURIComponent(query)}`);
    return res?.success && Array.isArray(res.data) ? res.data : [];
  }

  async getAgentById(id: string): Promise<Agent | null> {
    const res = await apiClient.get<any>(`/api/v1/agents/${id}`);
    return res?.success && res.data ? res.data : null;
  }

  async getAgentReviews(id: string): Promise<any[]> {
    const res = await apiClient.get<any>(`/api/v1/agents/${id}/reviews`);
    return res?.success && Array.isArray(res.data) ? res.data : [];
  }

  async submitAgentReview(id: string, rating: number, comment: string): Promise<any> {
    const res = await apiClient.post<any>(`/api/v1/agents/${id}/reviews`, { rating, comment });
    return res?.success && res.data ? res.data : null;
  }

  async registerAgentCap(id: string, config: any): Promise<any> {
    const res = await apiClient.post<any>(`/api/v1/agents/${id}/cap`, config);
    return res?.success && res.data ? res.data : null;
  }

  async discoverCapAgents(): Promise<Agent[]> {
    const res = await apiClient.get<any>('/api/v1/agents/cap/discover');
    return res?.success && Array.isArray(res.data) ? res.data : [];
  }

  async invokeAgentCap(id: string, payload: any): Promise<any> {
    const res = await apiClient.post<any>(`/api/v1/agents/${id}/cap/invoke`, payload);
    return res?.success && res.data ? res.data : null;
  }

  async syncAgentCap(id: string): Promise<any> {
    const res = await apiClient.post<any>(`/api/v1/agents/${id}/cap/sync`, {});
    return res?.success && res.data ? res.data : null;
  }

  async getAgentCapStatus(id: string): Promise<any> {
    const res = await apiClient.get<any>(`/api/v1/agents/${id}/cap/status`);
    return res?.success && res.data ? res.data : null;
  }
}
