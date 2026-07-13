import { Workflow, ExecutionLog, TaskNode } from '@nexus-ai/types';
import { WorkflowRepository } from '../repositories';
import { useNexusStore } from '../../store/nexusStore';

export class DemoWorkflowRepository implements WorkflowRepository {
  private getStored<T>(key: string, defaultValue: T): T {
    if (typeof window === 'undefined') return defaultValue;
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : defaultValue;
  }

  private setStored(key: string, val: any) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(val));
    }
  }

  async getWorkflow(id: string): Promise<Workflow | null> {
    const active = useNexusStore.getState().activeWorkflow;
    if (active && active.id === id) return active;
    const stored = this.getStored<Workflow | null>('orbit-demo-workflow', null);
    if (stored && stored.id === id) return stored;
    return null;
  }

  async getWorkflowLogs(id: string): Promise<ExecutionLog[]> {
    return useNexusStore.getState().executionLogs;
  }

  async generateWorkflow(query: string, routingMode: string, budget: number): Promise<Workflow> {
    const demoTemplates = [
      {
        name: 'Pattern A - Smart Contract Audit Swarm',
        nodes: [
          { id: 'n1', label: 'Vuln Analysis', capability: 'Security', posX: 100, posY: 200 },
          { id: 'n2', label: 'Safety Proof verification', capability: 'QA', posX: 300, posY: 200 }
        ],
        edges: [{ source: 'n1', target: 'n2' }]
      },
      {
        name: 'Pattern B - Market Risk Swarm',
        nodes: [
          { id: 'n1', label: 'Asset Volatility Tracker', capability: 'Analytics', posX: 80, posY: 200 },
          { id: 'n2', label: 'Risk Model Compiler', capability: 'Finance', posX: 260, posY: 100 },
          { id: 'n3', label: 'SLA Limit Reviewer', capability: 'Legal', posX: 260, posY: 300 },
          { id: 'n4', label: 'Consensus Dispatcher', capability: 'Compliance', posX: 440, posY: 200 }
        ],
        edges: [
          { source: 'n1', target: 'n2' },
          { source: 'n1', target: 'n3' },
          { source: 'n2', target: 'n4' },
          { source: 'n3', target: 'n4' }
        ]
      }
    ];

    const template = demoTemplates[Math.floor(Math.random() * demoTemplates.length)] || demoTemplates[0];
    const scaleX = 0.95 + Math.random() * 0.25;
    const scaleY = 0.95 + Math.random() * 0.25;

    const nodes: TaskNode[] = template.nodes.map((n, idx) => {
      const costEstimate = Math.round((0.02 + Math.random() * 0.48) * 100) / 100;
      const timeEstimate = Math.floor(200 + Math.random() * 1200);
      const trustScore = Math.floor(85 + Math.random() * 14);
      const jitterX = Math.floor(Math.random() * 40 - 20);
      const jitterY = Math.floor(Math.random() * 40 - 20);

      return {
        id: n.id,
        name: n.label,
        task: n.label,
        description: `Simulated capability run: ${n.capability.toLowerCase()}. Selected because: ${trustScore}% trust success.`,
        capability: n.capability.toLowerCase(),
        costEstimate,
        timeEstimate,
        trustScore,
        status: 'pending' as const,
        assignedAgentId: `agent-${n.capability.toLowerCase()}-1`,
        assignedAgent: `InsightFinder ${n.capability}`,
        positionX: Math.round(n.posX * scaleX) + jitterX,
        positionY: Math.round(n.posY * scaleY) + jitterY
      };
    });

    const edges = template.edges.map((e, idx) => ({
      id: `e-${idx}-${Date.now()}`,
      source: e.source,
      target: e.target
    }));

    const workflow: Workflow = {
      id: `demo-${Date.now()}`,
      name: query.slice(0, 30) + ' Pipeline',
      query,
      nodes,
      edges,
      budget,
      routingMode: routingMode as any,
      retryCount: 0,
      status: 'pending' as const,
      createdAt: new Date().toISOString()
    };

    this.setStored('orbit-demo-workflow', workflow);
    return workflow;
  }

  async runWorkflow(id: string): Promise<{ success: boolean; message?: string }> {
    const activeWorkflow = useNexusStore.getState().activeWorkflow;
    if (!activeWorkflow || activeWorkflow.id !== id) {
      return { success: false, message: 'Workflow not found or loaded' };
    }

    // Trigger simulation in the background asynchronously
    this.simulateLocalRun(activeWorkflow);
    return { success: true };
  }

  private async simulateLocalRun(workflow: Workflow) {
    const runNode = async (nodeId: string) => {
      useNexusStore.setState(state => {
        if (!state.activeWorkflow) return {};
        const updatedNodes = state.activeWorkflow.nodes.map(n => 
          n.id === nodeId ? { ...n, status: 'running' as const } : n
        );
        const updatedWf = { ...state.activeWorkflow, nodes: updatedNodes };
        return { activeWorkflow: updatedWf };
      });

      const currentWf = useNexusStore.getState().activeWorkflow;
      const node = currentWf?.nodes.find(n => n.id === nodeId);
      this.logExecution('execution', `Agent started executing node: "${node?.name || nodeId}"...`);

      const delay = Math.floor(300 + Math.random() * 900);
      await new Promise(r => setTimeout(r, delay));

      useNexusStore.setState(state => {
        if (!state.activeWorkflow) return {};
        const updatedNodes = state.activeWorkflow.nodes.map(n => 
          n.id === nodeId ? { ...n, status: 'completed' as const } : n
        );
        const updatedWf = { ...state.activeWorkflow, nodes: updatedNodes };
        return { activeWorkflow: updatedWf };
      });

      this.logExecution('execution', `Agent completed node: "${node?.name || nodeId}"`, 'success');
    };

    useNexusStore.setState({ isRunning: true, appState: 'running', executionLogs: [] });

    useNexusStore.setState(state => {
      if (!state.activeWorkflow) return {};
      return { activeWorkflow: { ...state.activeWorkflow, status: 'running' as const } };
    });

    while (useNexusStore.getState().isRunning && useNexusStore.getState().activeWorkflow?.status === 'running') {
      const wf = useNexusStore.getState().activeWorkflow!;
      const pendingNodes = wf.nodes.filter(n => n.status === 'pending');
      if (pendingNodes.length === 0) {
        const runningNodes = wf.nodes.filter(n => n.status === 'running');
        if (runningNodes.length === 0) break;
        await new Promise(r => setTimeout(r, 100));
        continue;
      }

      const readyNodeIds: string[] = [];
      for (const node of pendingNodes) {
        const incomingEdges = wf.edges.filter(e => e.target === node.id);
        const allPredecessorsCompleted = incomingEdges.every(edge => {
          const predNode = wf.nodes.find(n => n.id === edge.source);
          return predNode && predNode.status === 'completed';
        });
        if (allPredecessorsCompleted) {
          readyNodeIds.push(node.id);
        }
      }

      if (readyNodeIds.length > 0) {
        await Promise.all(readyNodeIds.map(nodeId => runNode(nodeId)));
      } else {
        await new Promise(r => setTimeout(r, 100));
      }
    }

    const finalWf = useNexusStore.getState().activeWorkflow;
    if (finalWf && finalWf.nodes.every(n => n.status === 'completed')) {
      const totalCost = finalWf.nodes.reduce((acc, curr) => acc + curr.costEstimate, 0);

      useNexusStore.setState(state => {
        const currentWallet = state.userWallet;
        const newDemoHistory = [{
          id: `tx-settle-${Date.now()}`,
          senderAddress: 'ESCROW_VAULT',
          receiverAddress: currentWallet.address,
          amount: totalCost,
          type: 'escrow_release',
          timestamp: new Date().toISOString(),
          status: 'completed',
          txHash: '0x' + Math.random().toString(16).substring(2, 42)
        } as any, ...currentWallet.history];

        const updatedWallet = {
          ...currentWallet,
          balance: currentWallet.balance,
          escrowBalance: 0.0,
          history: newDemoHistory
        };

        const completedWf: Workflow = { ...finalWf, status: 'completed' as const };
        this.setStored('orbit-demo-wallet', updatedWallet);
        this.setStored('orbit-demo-history', newDemoHistory);
        this.setStored('orbit-demo-workflow', completedWf);

        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('nexus_demo_workflow_completed', { detail: { workflowId: completedWf.id } }));
        }

        return {
          userWallet: updatedWallet,
          activeWorkflow: completedWf,
          isRunning: false,
          appState: 'completed'
        };
      });
    }
  }

  private logExecution(phase: ExecutionLog['phase'], message: string, type: ExecutionLog['type'] = 'info') {
    useNexusStore.setState(prev => ({
      executionLogs: [
        ...prev.executionLogs,
        {
          id: `log-${Date.now()}-${Math.random()}`,
          timestamp: new Date().toISOString(),
          phase,
          message,
          type
        }
      ]
    }));
  }

  async renameNode(workflowId: string, nodeId: string, newName: string): Promise<Workflow> {
    const wf = useNexusStore.getState().activeWorkflow;
    if (!wf) throw new Error('Workflow not loaded');
    const updatedNodes = wf.nodes.map(n => n.id === nodeId ? { ...n, name: newName } : n);
    const updatedWf = { ...wf, nodes: updatedNodes };
    this.setStored('orbit-demo-workflow', updatedWf);
    return updatedWf;
  }

  async deleteNode(workflowId: string, nodeId: string): Promise<Workflow> {
    const wf = useNexusStore.getState().activeWorkflow;
    if (!wf) throw new Error('Workflow not loaded');
    const updatedNodes = wf.nodes.filter(n => n.id !== nodeId);
    const updatedEdges = wf.edges.filter(e => e.source !== nodeId && e.target !== nodeId);
    const updatedWf = { ...wf, nodes: updatedNodes, edges: updatedEdges };
    this.setStored('orbit-demo-workflow', updatedWf);
    return updatedWf;
  }

  async retryNode(workflowId: string, nodeId: string): Promise<Workflow> {
    const wf = useNexusStore.getState().activeWorkflow;
    if (!wf) throw new Error('Workflow not loaded');
    const updatedNodes = wf.nodes.map(n => n.id === nodeId ? { ...n, status: 'pending' as const, retryCount: (n.retryCount || 0) + 1 } : n);
    const updatedWf = { ...wf, nodes: updatedNodes };
    this.setStored('orbit-demo-workflow', updatedWf);
    return updatedWf;
  }

  async pauseWorkflow(id: string): Promise<{ success: boolean }> {
    return { success: true };
  }

  async resumeWorkflow(id: string): Promise<{ success: boolean }> {
    return { success: true };
  }

  async cancelWorkflow(id: string): Promise<{ success: boolean }> {
    useNexusStore.setState(state => {
      if (!state.activeWorkflow) return {};
      const updated = { ...state.activeWorkflow, status: 'failed' as const };
      this.setStored('orbit-demo-workflow', updated);
      return { activeWorkflow: updated, isRunning: false };
    });
    return { success: true };
  }

  async saveWorkflowTemplate(workflow: Workflow): Promise<void> {
    this.setStored('orbit-demo-workflow', workflow);
  }
}
