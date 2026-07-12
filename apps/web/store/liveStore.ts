import { create } from 'zustand';
import { Workflow, TaskNode, ExecutionLog, Transaction, WalletState, Agent } from '@nexus-ai/types';
import { apiClient } from '../lib/api-client';

export interface LiveState {
  liveWallet: WalletState;
  liveTransactions: Transaction[];
  liveWorkflow: Workflow | null;
  liveEscrow: number;
  liveHistory: Transaction[];
  executionLogs: ExecutionLog[];
  isRunning: boolean;
  currentPhaseIndex: number;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  estimatedCost: number;
  appState: 'planning' | 'draft' | 'running' | 'completed' | 'history';
  isWorkflowSaved: boolean;
  agents: Agent[];

  fetchLiveWallet: () => Promise<void>;
  fetchLiveWorkflow: (id: string) => Promise<void>;
  fetchAgents: () => Promise<void>;
  runLiveWorkflow: (id: string) => Promise<{ success: boolean; message?: string }>;
  resetLiveWorkflowState: () => void;
  clearLiveWallet: () => void;
  setLiveWorkflow: (wf: Workflow | null) => void;
  renameLiveNode: (nodeId: string, newName: string) => void;
  deleteLiveNode: (nodeId: string) => void;
  retryLiveNode: (nodeId: string) => void;
  cancelLiveWorkflow: () => void;
  logLiveExecution: (phase: ExecutionLog['phase'], message: string, type?: ExecutionLog['type'], metadata?: any) => void;
}

export const useLiveStore = create<LiveState>((set, get) => {
  return {
    liveWallet: {
      address: '0x0000000000000000000000000000000000000000',
      balance: 0.0,
      escrowBalance: 0.0,
      history: []
    },
    liveTransactions: [],
    liveWorkflow: null,
    liveEscrow: 0.0,
    liveHistory: [],
    executionLogs: [],
    isRunning: false,
    currentPhaseIndex: 0,
    promptTokens: 0,
    completionTokens: 0,
    totalTokens: 0,
    estimatedCost: 0,
    appState: 'planning',
    isWorkflowSaved: true,
    agents: [],

    clearLiveWallet: () => {
      set({
        liveWallet: {
          address: '0x0000000000000000000000000000000000000000',
          balance: 0.0,
          escrowBalance: 0.0,
          history: []
        },
        liveTransactions: [],
        liveHistory: [],
        liveEscrow: 0.0
      });
    },

    fetchLiveWallet: async () => {
      const fallbackWallet = {
        address: '0x0000000000000000000000000000000000000000',
        balance: 0.0,
        escrowBalance: 0.0,
        history: []
      };

      try {
        const walletRes = await apiClient.get<any>('/api/v1/wallet');
        if (walletRes?.success && walletRes.data) {
          const balanceRes = await apiClient.get<any>('/api/v1/wallet/balance');
          const txsRes = await apiClient.get<any>('/api/v1/wallet/transactions');

          const balanceData = balanceRes?.success && balanceRes.data ? balanceRes.data : { available: 0.0, reserved: 0.0 };
          const txsList = txsRes?.success && Array.isArray(txsRes.data) ? txsRes.data.map((tx: any) => ({
            id: tx.id,
            senderAddress: tx.senderAddress || walletRes.data.address,
            receiverAddress: tx.receiverAddress || tx.reference || 'EXTERNAL',
            amount: Number(tx.amount),
            type: tx.type === 'deposit' ? 'deposit' : tx.type === 'withdraw' ? 'withdrawal' : tx.type === 'escrow_hold' ? 'escrow_hold' : 'escrow_release',
            timestamp: tx.createdAt,
            status: tx.status === 'completed' ? 'completed' : 'pending',
            txHash: tx.txHash || '0x' + Math.random().toString(16).substring(2, 42)
          })) : [];

          const liveBal = Number(balanceData.available || 0);
          const liveEsc = Number(balanceData.reserved || 0);
          const liveAddr = walletRes.data.address;

          const liveWalletObj = {
            address: liveAddr,
            balance: liveBal,
            escrowBalance: liveEsc,
            history: txsList
          };

          set({
            liveWallet: liveWalletObj,
            liveTransactions: txsList,
            liveHistory: txsList,
            liveEscrow: liveEsc
          });
        } else {
          set({
            liveWallet: fallbackWallet,
            liveTransactions: [],
            liveHistory: [],
            liveEscrow: 0.0
          });
        }
      } catch (err) {
        console.error('[LIVE_STORE] Failed to fetch live wallet details, falling back to 0.0:', err);
        set({
          liveWallet: fallbackWallet,
          liveTransactions: [],
          liveHistory: [],
          liveEscrow: 0.0
        });
      }
    },

    fetchLiveWorkflow: async (id) => {
      try {
        const res = await apiClient.get<any>(`/api/v1/workflows/${id}`);
        if (res?.success && res.data) {
          // Reconstruct real workspace workflow node states
          const dbWorkflow = res.data;
          const liveWorkflowObj: Workflow = {
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

          set({ liveWorkflow: liveWorkflowObj, appState: dbWorkflow.status === 'running' ? 'running' : 'draft' });
        }
      } catch (err) {
        console.error('[LIVE_STORE] Failed to fetch workflow details:', err);
      }
    },

    fetchAgents: async () => {
      try {
        const data = await apiClient.get<any>('/api/v1/agents');
        if (data && data.success && Array.isArray(data.data)) {
          set({ agents: data.data });
        }
      } catch (e) {
        console.error('[LIVE_STORE] Failed to load agents list:', e);
      }
    },

    runLiveWorkflow: async (id) => {
      try {
        const res = await apiClient.post<any>(`/api/v1/workflows/${id}/run`, {});
        if (res.success) {
          set({ isRunning: true, appState: 'running' });
          return { success: true };
        }
        return { success: false, message: res.message };
      } catch (err: any) {
        console.error('[LIVE_STORE] Failed to launch backend workflow:', err);
        return { success: false, message: err.message };
      }
    },

    resetLiveWorkflowState: () => {
      set({
        liveWorkflow: null,
        executionLogs: [],
        isRunning: false,
        currentPhaseIndex: 0,
        appState: 'planning'
      });
    },

    setLiveWorkflow: (wf) => set({ liveWorkflow: wf }),

    renameLiveNode: (nodeId, newName) => {
      const wf = get().liveWorkflow;
      if (wf) {
        const updatedNodes = wf.nodes.map(n => n.id === nodeId ? { ...n, name: newName } : n);
        set({ liveWorkflow: { ...wf, nodes: updatedNodes } });
      }
    },

    deleteLiveNode: (nodeId) => {
      const wf = get().liveWorkflow;
      if (wf) {
        const updatedNodes = wf.nodes.filter(n => n.id !== nodeId);
        const updatedEdges = wf.edges.filter(e => e.source !== nodeId && e.target !== nodeId);
        set({ liveWorkflow: { ...wf, nodes: updatedNodes, edges: updatedEdges } });
      }
    },

    retryLiveNode: (nodeId) => {
      const wf = get().liveWorkflow;
      if (wf) {
        const updatedNodes = wf.nodes.map(n => n.id === nodeId ? { ...n, status: 'pending' as const, retryCount: (n.retryCount || 0) + 1 } : n);
        set({ liveWorkflow: { ...wf, nodes: updatedNodes } });
      }
    },

    cancelLiveWorkflow: () => {
      const wf = get().liveWorkflow;
      if (wf) {
        set({ liveWorkflow: { ...wf, status: 'failed' as const }, isRunning: false });
      }
    },

    logLiveExecution: (phase, message, type = 'info', metadata) => {
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
