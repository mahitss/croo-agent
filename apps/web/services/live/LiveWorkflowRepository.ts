import { Workflow, ExecutionLog, TaskNode } from '@nexus-ai/types';
import { WorkflowRepository } from '../repositories';
import { apiClient } from '../../lib/api-client';
import { useNexusStore } from '../../store/nexusStore';
import { WorkflowPlannerEngine } from '../workflow-planner.engine';

export class LiveWorkflowRepository implements WorkflowRepository {
  async getWorkflow(id: string): Promise<Workflow | null> {
    const res = await apiClient.get<any>(`/api/v1/workflows/${id}`);
    if (res?.success && res.data) {
      const dbWorkflow = res.data;
      return {
        id: dbWorkflow.id,
        name: dbWorkflow.title || 'Untitled Workflow',
        query: dbWorkflow.title || 'Workflow Query',
        nodes: dbWorkflow.nodes ? dbWorkflow.nodes.map((n: any) => ({
          id: n.id,
          name: n.name || n.label || n.id.toUpperCase(),
          task: n.task || n.label || n.id.toUpperCase(),
          description: n.description || `Execute capability: ${n.capability}`,
          capability: n.capability,
          costEstimate: n.costEstimate || 0.15,
          timeEstimate: n.timeEstimate || 1000,
          status: n.status || 'pending',
          assignedAgentId: n.agentId || 'agent-core',
          assignedAgent: n.agentId || 'Orbit Core Agent',
          positionX: n.positionX || 100,
          positionY: n.positionY || 200
        })) : [],
        edges: dbWorkflow.edges ? dbWorkflow.edges.map((e: any) => ({
          id: e.id || `edge-${Math.random()}`,
          source: e.sourceNode || e.source,
          target: e.targetNode || e.target
        })) : [],
        budget: Number(dbWorkflow.estimatedCost || 2.0),
        routingMode: 'balanced',
        retryCount: 0,
        status: dbWorkflow.status || 'pending',
        createdAt: dbWorkflow.createdAt || new Date().toISOString()
      };
    }
    return null;
  }

  async getWorkflows(): Promise<Workflow[]> {
    const res = await apiClient.get<any>('/api/v1/workflows');
    if (res?.success && Array.isArray(res.data)) {
      return res.data;
    }
    return [];
  }

  async getWorkflowLogs(id: string): Promise<ExecutionLog[]> {
    const res = await apiClient.get<any>(`/api/v1/workflows/${id}/logs`);
    if (res?.success && Array.isArray(res.data)) {
      return res.data;
    }
    return [];
  }

  async generateWorkflow(query: string, routingMode: string, budget: number): Promise<Workflow> {
    try {
      const res = await apiClient.post<any>('/api/v1/ai/plan', { query, routingMode, budget });
      if (res && res.success && res.data) {
        const dbWorkflow = res.data;
        return {
          id: dbWorkflow.id || `live-${Date.now()}`,
          name: dbWorkflow.title || query.slice(0, 30),
          query,
          nodes: dbWorkflow.nodes ? dbWorkflow.nodes.map((n: any) => ({
            id: n.id,
            name: n.name || n.label || n.id,
            task: n.task || n.label || n.id,
            description: n.description || `Execute capability: ${n.capability}`,
            capability: n.capability,
            costEstimate: n.costEstimate || 0.25,
            timeEstimate: n.timeEstimate || 1000,
            status: 'pending' as const,
            assignedAgentId: n.agentId || n.assignedAgentId || 'agent-core',
            assignedAgent: n.assignedAgent || n.agentId || 'Orbit Core Agent',
            positionX: n.positionX || 100,
            positionY: n.positionY || 200
          })) : [],
          edges: dbWorkflow.edges ? dbWorkflow.edges.map((e: any) => ({
            id: e.id || `edge-${Math.random()}`,
            source: e.source || e.sourceNode,
            target: e.target || e.targetNode
          })) : [],
          budget,
          routingMode: routingMode as any,
          retryCount: 0,
          status: 'pending' as const,
          createdAt: new Date().toISOString()
        };
      }
    } catch (err) {
      console.warn('[LIVE_WORKFLOW_REPO] AI plan endpoint offline, using 10-Stage Intent Engine:', err);
    }
    
    // Fallback to local 10-Stage Intent Engine
    return WorkflowPlannerEngine.plan(query, routingMode, budget).workflow;
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
    return wf;
  }

  async cancelWorkflow(id: string): Promise<{ success: boolean }> {
    const res = await apiClient.post<any>(`/api/v1/workflows/${id}/cancel`, {});
    return { success: res.success };
  }

  async pauseWorkflow(id: string): Promise<{ success: boolean }> {
    const res = await apiClient.post<any>(`/api/v1/workflows/${id}/pause`, {});
    return { success: res?.success ?? true };
  }

  async resumeWorkflow(id: string): Promise<{ success: boolean }> {
    const res = await apiClient.post<any>(`/api/v1/workflows/${id}/resume`, {});
    return { success: res?.success ?? true };
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
