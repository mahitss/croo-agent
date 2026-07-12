import { create } from 'zustand';
import { Workflow, TaskNode, ExecutionLog, Transaction, WalletState, Agent } from '@nexus-ai/types';

export interface DemoState {
  demoWallet: WalletState;
  demoTransactions: Transaction[];
  demoWorkflow: Workflow | null;
  demoHistory: Transaction[];
  executionLogs: ExecutionLog[];
  isRunning: boolean;
  currentPhaseIndex: number;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  estimatedCost: number;
  appState: 'planning' | 'draft' | 'running' | 'completed' | 'history';
  
  initializeDemo: () => void;
  resetDemoWallet: () => void;
  depositDemo: (amount: number) => void;
  withdrawDemo: (amount: number) => void;
  transferDemo: (amount: number, recipient: string) => void;
  generateDemoWorkflow: (query: string, routingMode: string, budget: number) => Workflow;
  runDemoSimulation: (workflow: Workflow) => Promise<void>;
  resetDemoWorkflow: () => void;
  renameDemoNode: (nodeId: string, newName: string) => void;
  deleteDemoNode: (nodeId: string) => void;
  retryDemoNode: (nodeId: string) => void;
  cancelDemoWorkflow: () => void;
  logDemoExecution: (phase: ExecutionLog['phase'], message: string, type?: ExecutionLog['type'], metadata?: any) => void;
}

const seedAgents = [
  { id: 'agent-research-1', name: 'InsightFinder Pro', category: 'Research', skills: ['market analysis'], walletAddress: '0x32A4B...98e2', price: 0.15, trustScore: 95, latency: 1200 },
  { id: 'agent-research-2', name: 'QuickScan', category: 'Research', skills: ['web search'], walletAddress: '0x8F21c...d8A3', price: 0.05, trustScore: 88, latency: 450 },
  { id: 'agent-finance-1', name: 'FinAnalytica', category: 'Finance', skills: ['balance sheet analysis'], walletAddress: '0x99C2d...a3F1', price: 0.25, trustScore: 98, latency: 1600 },
  { id: 'agent-legal-1', name: 'LexGuard Compliance', category: 'Legal', skills: ['contract audit'], walletAddress: '0x77F1d...89c5', price: 0.35, trustScore: 92, latency: 1400 },
  { id: 'agent-marketing-1', name: 'PromoPulse AI', category: 'Marketing', skills: ['copywriting'], walletAddress: '0x22B1c...c2B5', price: 0.12, trustScore: 90, latency: 900 },
  { id: 'agent-security-1', name: 'SentriScan Security', category: 'Security', skills: ['pentesting'], walletAddress: '0x88D4c...d9F5', price: 0.38, trustScore: 96, latency: 1100 },
  { id: 'agent-qa-1', name: 'CodeVerify QA', category: 'QA', skills: ['unit testing'], walletAddress: '0x44A1e...a3E4', price: 0.18, trustScore: 94, latency: 850 },
  { id: 'agent-sales-1', name: 'LeadSphere Conversions', category: 'Sales', skills: ['lead generation'], walletAddress: '0x55E2d...b1F3', price: 0.22, trustScore: 91, latency: 1050 },
  { id: 'agent-data-1', name: 'SchemaSync Data Engine', category: 'Data', skills: ['data mapping'], walletAddress: '0x66C2c...c3A4', price: 0.14, trustScore: 93, latency: 750 },
  { id: 'agent-operations-1', name: 'OptimaSwarm Ops', category: 'Operations', skills: ['process sync'], walletAddress: '0x11A3d...e2B1', price: 0.20, trustScore: 95, latency: 1300 },
  { id: 'agent-compliance-1', name: 'ReguRadar Audit', category: 'Compliance', skills: ['compliance audit'], walletAddress: '0x99A4d...d2F1', price: 0.30, trustScore: 96, latency: 1250 },
  { id: 'agent-analytics-1', name: 'MetricsMind Engine', category: 'Analytics', skills: ['log analysis'], walletAddress: '0x22F4c...b9E3', price: 0.16, trustScore: 92, latency: 800 },
  { id: 'agent-engineering-1', name: 'CodeCraft Engineer', category: 'Engineering', skills: ['coding'], walletAddress: '0x33A4c...d4A2', price: 0.28, trustScore: 97, latency: 1400 }
];

export const useDemoStore = create<DemoState>((set, get) => {
  const getStored = <T>(key: string, defaultValue: T): T => {
    if (typeof window === 'undefined') return defaultValue;
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : defaultValue;
  };

  const setStored = (key: string, val: any) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(val));
    }
  };

  return {
    demoWallet: {
      address: '0xDemoWalletAddress789c',
      balance: 100.0,
      escrowBalance: 0.0,
      history: []
    },
    demoTransactions: [],
    demoWorkflow: null,
    demoHistory: [],
    executionLogs: [],
    isRunning: false,
    currentPhaseIndex: 0,
    promptTokens: 0,
    completionTokens: 0,
    totalTokens: 0,
    estimatedCost: 0,
    appState: 'planning',

    initializeDemo: () => {
      const wallet = getStored<WalletState>('orbit-demo-wallet', {
        address: '0xDemoWalletAddress789c',
        balance: 100.0,
        escrowBalance: 0.0,
        history: []
      });
      const history = getStored<Transaction[]>('orbit-demo-history', []);
      const workflow = null as Workflow | null;

      set({
        demoWallet: wallet,
        demoHistory: history,
        demoTransactions: history,
        demoWorkflow: workflow,
        isRunning: workflow?.status === 'running',
        appState: workflow ? (workflow.status === 'completed' ? 'completed' : workflow.status === 'running' ? 'running' : 'draft') : 'planning'
      });
    },

    resetDemoWallet: () => {
      const initialWallet = {
        address: '0xDemoWalletAddress789c',
        balance: 100.0,
        escrowBalance: 0.0,
        history: []
      };
      setStored('orbit-demo-wallet', initialWallet);
      setStored('orbit-demo-history', []);
      set({
        demoWallet: initialWallet,
        demoHistory: [],
        demoTransactions: []
      });
    },

    depositDemo: (amount) => {
      const wallet = { ...get().demoWallet };
      wallet.balance += amount;
      
      const tx: Transaction = {
        id: `tx-deposit-${Date.now()}`,
        senderAddress: 'EXTERNAL_BANK',
        receiverAddress: wallet.address,
        amount,
        type: 'deposit',
        timestamp: new Date().toISOString(),
        status: 'completed',
        txHash: '0x' + Math.random().toString(16).substring(2, 42)
      };

      const history = [tx, ...get().demoHistory];
      wallet.history = history;

      setStored('orbit-demo-wallet', wallet);
      setStored('orbit-demo-history', history);
      set({
        demoWallet: wallet,
        demoHistory: history,
        demoTransactions: history
      });
    },

    withdrawDemo: (amount) => {
      const wallet = { ...get().demoWallet };
      if (wallet.balance < amount) return;
      wallet.balance -= amount;

      const tx: Transaction = {
        id: `tx-withdraw-${Date.now()}`,
        senderAddress: wallet.address,
        receiverAddress: 'EXTERNAL_BANK',
        amount,
        type: 'withdrawal',
        timestamp: new Date().toISOString(),
        status: 'completed',
        txHash: '0x' + Math.random().toString(16).substring(2, 42)
      };

      const history = [tx, ...get().demoHistory];
      wallet.history = history;

      setStored('orbit-demo-wallet', wallet);
      setStored('orbit-demo-history', history);
      set({
        demoWallet: wallet,
        demoHistory: history,
        demoTransactions: history
      });
    },

    transferDemo: (amount, recipient) => {
      const wallet = { ...get().demoWallet };
      if (wallet.balance < amount) return;
      wallet.balance -= amount;

      const tx: Transaction = {
        id: `tx-transfer-${Date.now()}`,
        senderAddress: wallet.address,
        receiverAddress: recipient,
        amount,
        type: 'withdrawal',
        timestamp: new Date().toISOString(),
        status: 'completed',
        txHash: '0x' + Math.random().toString(16).substring(2, 42)
      };

      const history = [tx, ...get().demoHistory];
      wallet.history = history;

      setStored('orbit-demo-wallet', wallet);
      setStored('orbit-demo-history', history);
      set({
        demoWallet: wallet,
        demoHistory: history,
        demoTransactions: history
      });
    },

    generateDemoWorkflow: (query, routingMode, budget) => {
      // 12 pattern lists
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
        } as any;
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
        nodes: nodes.map(n => ({ ...n, task: n.name, assignedAgent: n.assignedAgentId })),
        edges,
        budget,
        routingMode: routingMode as any,
        retryCount: 0,
        status: 'pending' as const,
        createdAt: new Date().toISOString()
      };

      setStored('orbit-demo-workflow', workflow);
      set({ demoWorkflow: workflow, appState: 'draft', executionLogs: [] });
      return workflow;
    },

    runDemoSimulation: async (workflow) => {
      const runNode = async (nodeId: string) => {
        set(state => {
          if (!state.demoWorkflow) return {};
          const updatedNodes = state.demoWorkflow.nodes.map(n => 
            n.id === nodeId ? { ...n, status: 'running' as const } : n
          );
          const updatedWf = { ...state.demoWorkflow, nodes: updatedNodes };
          setStored('orbit-demo-workflow', updatedWf);
          return { demoWorkflow: updatedWf };
        });

        const currentWf = get().demoWorkflow;
        const node = currentWf?.nodes.find(n => n.id === nodeId);
        get().logDemoExecution('execution', `Agent started executing node: "${node?.name || nodeId}"...`);

        const delay = Math.floor(300 + Math.random() * 900);
        await new Promise(r => setTimeout(r, delay));

        set(state => {
          if (!state.demoWorkflow) return {};
          const updatedNodes = state.demoWorkflow.nodes.map(n => 
            n.id === nodeId ? { ...n, status: 'completed' as const } : n
          );
          const updatedWf = { ...state.demoWorkflow, nodes: updatedNodes };
          setStored('orbit-demo-workflow', updatedWf);
          return { demoWorkflow: updatedWf };
        });

        get().logDemoExecution('execution', `Agent completed node: "${node?.name || nodeId}"`, 'success');
      };

      set({ isRunning: true, appState: 'running' });
      
      set(state => {
        if (!state.demoWorkflow) return {};
        const updatedWf = { ...state.demoWorkflow, status: 'running' as const };
        setStored('orbit-demo-workflow', updatedWf);
        return { demoWorkflow: updatedWf };
      });

      while (get().isRunning && get().demoWorkflow && get().demoWorkflow?.status === 'running') {
        const wf = get().demoWorkflow!;
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

      const finalWf = get().demoWorkflow;
      if (finalWf && finalWf.nodes.every(n => n.status === 'completed')) {
        const totalCost = finalWf.nodes.reduce((acc, curr) => acc + curr.costEstimate, 0);

        set(state => {
          const newDemoHistory = [{
            id: `tx-settle-${Date.now()}`,
            senderAddress: 'ESCROW_VAULT',
            receiverAddress: state.demoWallet.address,
            amount: totalCost,
            type: 'escrow_release',
            timestamp: new Date().toISOString(),
            status: 'completed',
            txHash: '0x' + Math.random().toString(16).substring(2, 42)
          } as Transaction, ...state.demoHistory];

          const updatedWallet = {
            ...state.demoWallet,
            balance: state.demoWallet.balance,
            escrowBalance: 0.0,
            history: newDemoHistory
          };

          const completedWf: Workflow = { ...finalWf, status: 'completed' as const };
          setStored('orbit-demo-wallet', updatedWallet);
          setStored('orbit-demo-history', newDemoHistory);
          setStored('orbit-demo-workflow', completedWf);

          // Dispatch event to show success
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('nexus_demo_workflow_completed', { detail: { workflowId: completedWf.id } }));
          }

          return {
            demoWallet: updatedWallet,
            demoHistory: newDemoHistory,
            demoTransactions: newDemoHistory,
            demoWorkflow: completedWf,
            isRunning: false,
            appState: 'completed'
          };
        });
      }
    },

    resetDemoWorkflow: () => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('orbit-demo-workflow');
      }
      set({
        demoWorkflow: null,
        executionLogs: [],
        isRunning: false,
        currentPhaseIndex: 0,
        appState: 'planning'
      });
    },

    renameDemoNode: (nodeId, newName) => {
      const wf = get().demoWorkflow;
      if (wf) {
        const updatedNodes = wf.nodes.map(n => n.id === nodeId ? { ...n, name: newName } : n);
        const updatedWf = { ...wf, nodes: updatedNodes };
        setStored('orbit-demo-workflow', updatedWf);
        set({ demoWorkflow: updatedWf });
      }
    },

    deleteDemoNode: (nodeId) => {
      const wf = get().demoWorkflow;
      if (wf) {
        const updatedNodes = wf.nodes.filter(n => n.id !== nodeId);
        const updatedEdges = wf.edges.filter(e => e.source !== nodeId && e.target !== nodeId);
        const updatedWf = { ...wf, nodes: updatedNodes, edges: updatedEdges };
        setStored('orbit-demo-workflow', updatedWf);
        set({ demoWorkflow: updatedWf });
      }
    },

    retryDemoNode: (nodeId) => {
      const wf = get().demoWorkflow;
      if (wf) {
        const updatedNodes = wf.nodes.map(n => n.id === nodeId ? { ...n, status: 'pending' as const, retryCount: (n.retryCount || 0) + 1 } : n);
        const updatedWf = { ...wf, nodes: updatedNodes };
        setStored('orbit-demo-workflow', updatedWf);
        set({ demoWorkflow: updatedWf });
      }
    },

    cancelDemoWorkflow: () => {
      const wf = get().demoWorkflow;
      if (wf) {
        const updatedWf = { ...wf, status: 'failed' as const };
        setStored('orbit-demo-workflow', updatedWf);
        set({ demoWorkflow: updatedWf, isRunning: false });
      }
    },

    logDemoExecution: (phase, message, type = 'info', metadata) => {
      set((prev) => ({
        executionLogs: [
          ...prev.executionLogs,
          {
            id: `log-${Date.now()}-${Math.random()}`,
            timestamp: new Date().toISOString(),
            phase,
            message,
            type,
            metadata
          }
        ]
      }));
    }
  };
});
