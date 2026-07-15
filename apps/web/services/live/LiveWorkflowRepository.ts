import { Workflow, ExecutionLog, TaskNode } from '@nexus-ai/types';
import { WorkflowRepository } from '../repositories';
import { apiClient } from '../../lib/api-client';
import { useNexusStore } from '../../store/nexusStore';

export class LiveWorkflowRepository implements WorkflowRepository {
  async getWorkflow(id: string): Promise<Workflow | null> {
    const res = await apiClient.get<any>(`/api/v1/workflows/${id}`);
    if (res?.success && res.data) {
      const dbWorkflow = res.data;
      return {
        id: dbWorkflow.id,
        name: dbWorkflow.title,
        query: dbWorkflow.title,
        nodes: dbWorkflow.nodes ? dbWorkflow.nodes.map((n: any) => ({
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
    return null;
  }

  async getWorkflowLogs(id: string): Promise<ExecutionLog[]> {
    const res = await apiClient.get<any>(`/api/v1/workflows/${id}/logs`);
    if (res?.success && Array.isArray(res.data)) {
      return res.data;
    }
    return [];
  }

  async generateWorkflow(query: string, routingMode: string, budget: number): Promise<Workflow> {
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
      createdAt: new Date().toISOString(),
      intent: dbWorkflow.intent,
      complexity: dbWorkflow.complexity,
      riskAssessment: dbWorkflow.riskAssessment,
      parallelGroups: dbWorkflow.parallelGroups,
      executionOrder: dbWorkflow.executionOrder,
      thought: dbWorkflow.thought
    };
  }

  async runWorkflow(id: string): Promise<{ success: boolean; message?: string }> {
    const res = await apiClient.post<any>(`/api/v1/workflows/${id}/run`, {});
    return { success: res.success, message: res.message };
  }

  async renameNode(workflowId: string, nodeId: string, newName: string): Promise<Workflow> {
    const wf = useNexusStore.getState().activeWorkflow;
    if (!wf) throw new Error('Workflow not loaded');
    const updatedNodes = wf.nodes.map(n => n.id === nodeId ? { ...n, name: newName } : n);
    const updatedWf = { ...wf, nodes: updatedNodes };
    // Send bulk update to backend
    await apiClient.post<any>(`/api/v1/workflows`, {
      id: workflowId,
      title: updatedWf.name,
      nodes: updatedWf.nodes.map(n => ({ id: n.id, capability: n.capability, agentId: n.assignedAgentId })),
      edges: updatedWf.edges.map(e => ({ sourceNode: e.source, targetNode: e.target }))
    });
    return updatedWf;
  }

  async deleteNode(workflowId: string, nodeId: string): Promise<Workflow> {
    const wf = useNexusStore.getState().activeWorkflow;
    if (!wf) throw new Error('Workflow not loaded');
    const updatedNodes = wf.nodes.filter(n => n.id !== nodeId);
    const updatedEdges = wf.edges.filter(e => e.source !== nodeId && e.target !== nodeId);
    const updatedWf = { ...wf, nodes: updatedNodes, edges: updatedEdges };
    // Send bulk update to backend
    await apiClient.post<any>(`/api/v1/workflows`, {
      id: workflowId,
      title: updatedWf.name,
      nodes: updatedWf.nodes.map(n => ({ id: n.id, capability: n.capability, agentId: n.assignedAgentId })),
      edges: updatedWf.edges.map(e => ({ sourceNode: e.source, targetNode: e.target }))
    });
    return updatedWf;
  }

  async retryNode(workflowId: string, nodeId: string): Promise<Workflow> {
    const wf = useNexusStore.getState().activeWorkflow;
    if (!wf) throw new Error('Workflow not loaded');
    const updatedNodes = wf.nodes.map(n => n.id === nodeId ? { ...n, status: 'pending' as const } : n);
    const updatedWf = { ...wf, nodes: updatedNodes };
    return updatedWf;
  }

  async pauseWorkflow(id: string): Promise<{ success: boolean }> {
    const res = await apiClient.post<any>(`/api/v1/workflows/${id}/pause`, {});
    return { success: res.success };
  }

  async resumeWorkflow(id: string): Promise<{ success: boolean }> {
    const res = await apiClient.post<any>(`/api/v1/workflows/${id}/resume`, {});
    return { success: res.success };
  }

  async cancelWorkflow(id: string): Promise<{ success: boolean }> {
    const res = await apiClient.post<any>(`/api/v1/workflows/${id}/cancel`, {});
    return { success: res.success };
  }

  async saveWorkflowTemplate(workflow: Workflow): Promise<void> {
    await apiClient.post<any>(`/api/v1/workflows`, {
      id: workflow.id,
      title: workflow.name,
      nodes: workflow.nodes.map(n => ({ id: n.id, capability: n.capability, agentId: n.assignedAgentId })),
      edges: workflow.edges.map(e => ({ sourceNode: e.source, targetNode: e.target }))
    });
  }
}
