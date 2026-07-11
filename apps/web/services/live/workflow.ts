import { IWorkflowService } from '../types';
import { Workflow, ExecutionLog } from '@nexus-ai/types';
import { apiClient } from '../../lib/api-client';

export const liveWorkflowService: IWorkflowService = {
  async getWorkflow(id: string): Promise<Workflow | null> {
    try {
      const res = await apiClient.get<any>(`/api/v1/workflows/${id}`);
      if (res?.success && res.data) {
        const dbWorkflow = res.data;
        return {
          id: dbWorkflow.id,
          name: dbWorkflow.title,
          query: dbWorkflow.title,
          nodes: dbWorkflow.nodes ? dbWorkflow.nodes.map((n: any, idx: number) => ({
            id: n.id,
            name: n.id.toUpperCase(),
            task: n.id.toUpperCase(),
            description: `Execute capability: ${n.capability}`,
            capability: n.capability,
            costEstimate: 0.15,
            timeEstimate: 1000,
            status: n.status,
            assignedAgentId: n.agentId,
            assignedAgent: n.agentId
          })) : [],
          edges: dbWorkflow.edges ? dbWorkflow.edges.map((e: any) => ({
            id: e.id,
            source: e.sourceNode,
            target: e.targetNode
          })) : [],
          budget: Number(dbWorkflow.estimatedCost || 2.0),
          routingMode: 'balanced',
          retryCount: 0,
          status: dbWorkflow.status,
          createdAt: dbWorkflow.createdAt
        };
      }
    } catch (e) {}
    return null;
  },

  async getWorkflowLogs(id: string): Promise<ExecutionLog[]> {
    try {
      const res = await apiClient.get<any>(`/api/v1/workflows/${id}/logs`);
      if (res.success && Array.isArray(res.data)) {
        return res.data;
      }
    } catch (e) {}
    return [];
  },

  async generateWorkflow(query: string, routingMode: string, budget: number): Promise<Workflow> {
    try {
      const res = await apiClient.post<any>('/api/v1/ai/plan', { query, routingMode, budget });
      if (!res.success || !res.data) {
        throw new Error(res.message || 'AI Planner failed to generate DAG');
      }
      
      const dbWorkflow = res.data;
      return {
        id: dbWorkflow.id || `live-${Date.now()}`,
        name: dbWorkflow.title || query.slice(0, 30),
        query,
        nodes: dbWorkflow.nodes ? dbWorkflow.nodes.map((n: any) => ({
          id: n.id,
          name: n.label || n.id,
          task: n.label || n.id,
          description: `Execute capability: ${n.capability}`,
          capability: n.capability,
          costEstimate: 0.25,
          timeEstimate: 1000,
          status: 'pending' as const,
          assignedAgentId: n.agentId,
          assignedAgent: n.agentId
        })) : [],
        edges: dbWorkflow.edges ? dbWorkflow.edges.map((e: any) => ({
          id: e.id,
          source: e.source || e.sourceNode,
          target: e.target || e.targetNode
        })) : [],
        budget,
        routingMode: routingMode as any,
        retryCount: 0,
        status: 'pending' as const,
        createdAt: new Date().toISOString()
      };
    } catch (err: any) {
      throw new Error(err.message || 'Failed to generate live workflow');
    }
  },

  async runWorkflow(id: string): Promise<{ success: boolean; message?: string }> {
    try {
      const res = await apiClient.post<any>(`/api/v1/workflows/${id}/run`, {});
      return { success: res.success, message: res.message };
    } catch (err: any) {
      return { success: false, message: err.message || 'Workflow launch failed' };
    }
  }
};
