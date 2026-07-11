import { IWorkflowService } from '../types';
import { Workflow, ExecutionLog } from '@nexus-ai/types';
import { useDemoStore } from '../../store/demoStore';

export const demoWorkflowService: IWorkflowService = {
  async getWorkflow(id: string): Promise<Workflow | null> {
    const store = useDemoStore.getState();
    if (store.demoWorkflow && store.demoWorkflow.id === id) {
      return store.demoWorkflow;
    }
    return null;
  },

  async getWorkflowLogs(id: string): Promise<ExecutionLog[]> {
    const store = useDemoStore.getState();
    return store.executionLogs;
  },

  async generateWorkflow(query: string, routingMode: string, budget: number): Promise<Workflow> {
    const store = useDemoStore.getState();
    return store.generateDemoWorkflow(query, routingMode, budget);
  },

  async runWorkflow(id: string): Promise<{ success: boolean; message?: string }> {
    const store = useDemoStore.getState();
    if (!store.demoWorkflow || store.demoWorkflow.id !== id) {
      return { success: false, message: 'Workflow not found in sandbox' };
    }
    // Launch simulation asynchronously
    store.runDemoSimulation(store.demoWorkflow);
    return { success: true };
  }
};
