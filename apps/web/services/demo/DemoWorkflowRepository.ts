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

    const presets: Record<string, Workflow> = {
      'research-agent': {
        id: 'research-agent',
        name: 'Research Consensus Agent Swarm',
        query: 'Conduct web research consensus audit & compile PDF executive brief',
        budget: 1.50,
        routingMode: 'balanced',
        retryCount: 0,
        status: 'completed',
        createdAt: new Date().toISOString(),
        nodes: [
          { id: 'n1', name: 'Web Search Engine', task: 'Web Search', description: 'Aggregates search queries across Google and Perplexity.', capability: 'search', costEstimate: 0.20, timeEstimate: 400, trustScore: 98, status: 'completed', assignedAgentId: 'agent-search-1', positionX: 100, positionY: 200 },
          { id: 'n2', name: 'Claim Verifier', task: 'Fact Verification', description: 'Cross-checks claim citations against primary sources.', capability: 'analysis', costEstimate: 0.35, timeEstimate: 600, trustScore: 96, status: 'completed', assignedAgentId: 'agent-qa-1', positionX: 320, positionY: 200 },
          { id: 'n3', name: 'PDF Brief Compiler', task: 'Document Synthesis', description: 'Generates formatted PDF executive summary brief.', capability: 'document', costEstimate: 0.40, timeEstimate: 500, trustScore: 99, status: 'completed', assignedAgentId: 'agent-writer-1', positionX: 540, positionY: 200 }
        ],
        edges: [
          { id: 'e1', source: 'n1', target: 'n2' },
          { id: 'e2', source: 'n2', target: 'n3' }
        ]
      },
      'sales-outreach': {
        id: 'sales-outreach',
        name: 'Sales Lead Outreach Swarm',
        query: 'Scrape lead contacts, calculate lead fit score, and generate cold email sequences',
        budget: 2.00,
        routingMode: 'fastest',
        retryCount: 0,
        status: 'completed',
        createdAt: new Date().toISOString(),
        nodes: [
          { id: 'n1', name: 'Company Profile Scraper', task: 'Lead Extraction', description: 'Extracts decision maker LinkedIn & domain contacts.', capability: 'scraping', costEstimate: 0.30, timeEstimate: 300, trustScore: 94, status: 'completed', assignedAgentId: 'agent-lead-1', positionX: 100, positionY: 200 },
          { id: 'n2', name: 'Lead Score Classifier', task: 'Scoring', description: 'Computes ICP fit score based on firmographic data.', capability: 'analytics', costEstimate: 0.25, timeEstimate: 400, trustScore: 97, status: 'completed', assignedAgentId: 'agent-score-1', positionX: 320, positionY: 200 },
          { id: 'n3', name: 'Cold Sequence Writer', task: 'Copy Generation', description: 'Generates 3-step personalized outreach email sequence.', capability: 'writing', costEstimate: 0.45, timeEstimate: 500, trustScore: 98, status: 'completed', assignedAgentId: 'agent-writer-2', positionX: 540, positionY: 200 }
        ],
        edges: [
          { id: 'e1', source: 'n1', target: 'n2' },
          { id: 'e2', source: 'n2', target: 'n3' }
        ]
      },
      'compliance-audit': {
        id: 'compliance-audit',
        name: 'Legal Terms & GDPR Compliance Audit',
        query: 'Parse MSA contract PDF, flag liability caps, and verify GDPR compliance',
        budget: 0.80,
        routingMode: 'cheapest',
        retryCount: 0,
        status: 'completed',
        createdAt: new Date().toISOString(),
        nodes: [
          { id: 'n1', name: 'Contract PDF Parser', task: 'PDF Extraction', description: 'Extracts clauses, indemnity, and data protection terms.', capability: 'legal', costEstimate: 0.25, timeEstimate: 350, trustScore: 99, status: 'completed', assignedAgentId: 'agent-legal-1', positionX: 100, positionY: 200 },
          { id: 'n2', name: 'Liability Risk Classifier', task: 'Risk Assessment', description: 'Flags uncapped liability terms and breach damages.', capability: 'security', costEstimate: 0.30, timeEstimate: 450, trustScore: 95, status: 'completed', assignedAgentId: 'agent-audit-1', positionX: 320, positionY: 200 }
        ],
        edges: [
          { id: 'e1', source: 'n1', target: 'n2' }
        ]
      },
      'finance': {
        id: 'finance',
        name: 'Finance Portfolio & Risk Audit Swarm',
        query: 'Audit asset volatility metrics and generate SLA compliance summary',
        budget: 1.80,
        routingMode: 'balanced',
        retryCount: 0,
        status: 'completed',
        createdAt: new Date().toISOString(),
        nodes: [
          { id: 'n1', name: 'Asset Volatility Tracker', task: 'Volatility Analysis', description: 'Monitors asset variance & market indicators.', capability: 'analytics', costEstimate: 0.30, timeEstimate: 300, trustScore: 98, status: 'completed', assignedAgentId: 'agent-fin-1', positionX: 100, positionY: 200 },
          { id: 'n2', name: 'Risk Model Compiler', task: 'Risk Assessment', description: 'Calculates Sharpe ratio & VAR risk bounds.', capability: 'finance', costEstimate: 0.40, timeEstimate: 500, trustScore: 97, status: 'completed', assignedAgentId: 'agent-fin-2', positionX: 320, positionY: 200 }
        ],
        edges: [{ id: 'e1', source: 'n1', target: 'n2' }]
      },
      'marketing': {
        id: 'marketing',
        name: 'Marketing Multi-Channel Copy Swarm',
        query: 'Generate 5 social media posts and blog summary with brand voice alignment',
        budget: 1.20,
        routingMode: 'fastest',
        retryCount: 0,
        status: 'completed',
        createdAt: new Date().toISOString(),
        nodes: [
          { id: 'n1', name: 'SEO Keyword Analyzer', task: 'Keyword Analysis', description: 'Extracts high-intent search keywords.', capability: 'marketing', costEstimate: 0.20, timeEstimate: 250, trustScore: 95, status: 'completed', assignedAgentId: 'agent-[#7BC9FF]-1', positionX: 100, positionY: 200 },
          { id: 'n2', name: 'Brand Voice Copywriter', task: 'Copy Generation', description: 'Generates ad variants aligned with brand style guide.', capability: 'writing', costEstimate: 0.35, timeEstimate: 400, trustScore: 99, status: 'completed', assignedAgentId: 'agent-[#7BC9FF]-2', positionX: 320, positionY: 200 }
        ],
        edges: [{ id: 'e1', source: 'n1', target: 'n2' }]
      },
      'healthcare': {
        id: 'healthcare',
        name: 'Healthcare Clinical EHR Mapper Swarm',
        query: 'Parse clinical EHR progress note and map ICD-10 diagnostic codes',
        budget: 2.20,
        routingMode: 'balanced',
        retryCount: 0,
        status: 'completed',
        createdAt: new Date().toISOString(),
        nodes: [
          { id: 'n1', name: 'EHR Progress Note Extractor', task: 'Note Extractor', description: 'Parses unstructured physician clinical notes safely.', capability: 'healthcare', costEstimate: 0.40, timeEstimate: 450, trustScore: 99, status: 'completed', assignedAgentId: 'agent-med-1', positionX: 100, positionY: 200 },
          { id: 'n2', name: 'ICD-10 Diagnostic Coder', task: 'Diagnostic Coding', description: 'Maps extracted diagnoses to standard billing codes.', capability: 'coding', costEstimate: 0.50, timeEstimate: 600, trustScore: 96, status: 'completed', assignedAgentId: 'agent-med-2', positionX: 320, positionY: 200 }
        ],
        edges: [{ id: 'e1', source: 'n1', target: 'n2' }]
      }
    };

    return presets[id] || null;
  }

  async deployTemplate(templateId: string): Promise<Workflow> {
    const wfId = `wf-template-${templateId}-${Date.now()}`;
    const baseWf = await this.getWorkflow(templateId);
    
    const clonedWf: Workflow = baseWf ? {
      ...baseWf,
      id: wfId,
      name: `${baseWf.name} (Deployed)`,
      createdAt: new Date().toISOString()
    } : {
      id: wfId,
      name: `${templateId.toUpperCase()} Swarm Workflow`,
      query: `Deployed from ${templateId} template`,
      budget: 2.00,
      routingMode: 'balanced' as const,
      retryCount: 0,
      status: 'pending' as const,
      createdAt: new Date().toISOString(),
      nodes: [
        { id: 'n1', name: 'Task Executor', task: 'Execution', description: 'Template task node', capability: 'general', costEstimate: 0.25, timeEstimate: 400, trustScore: 98, status: 'pending' as const, positionX: 100, positionY: 200 }
      ],
      edges: []
    };

    const existingList = this.getStored<Workflow[]>('orbit-demo-workflows-list', []);
    this.setStored('orbit-demo-workflows-list', [clonedWf, ...existingList]);
    this.setStored('orbit-demo-workflow', clonedWf);
    useNexusStore.setState({ activeWorkflow: clonedWf, appState: 'draft' });
    return clonedWf;
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
