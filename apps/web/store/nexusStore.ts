import { create } from 'zustand';
import { Agent, Workflow, TaskNode, ExecutionLog, Transaction, WalletState } from '@nexus-ai/types';
import { apiService } from '../services/api';
import { apiClient } from '../lib/api-client';
import { useAuthStore } from './authStore';

// Import repositories
import {
  AgentRepository,
  WorkflowRepository,
  WalletRepository,
  AnalyticsRepository
} from '../services/repositories';
import { DemoAgentRepository, seedAgents } from '../services/demo/DemoAgentRepository';
import { LiveAgentRepository } from '../services/live/LiveAgentRepository';
import { DemoWorkflowRepository } from '../services/demo/DemoWorkflowRepository';
import { LiveWorkflowRepository } from '../services/live/LiveWorkflowRepository';
import { DemoWalletRepository } from '../services/demo/DemoWalletRepository';
import { LiveWalletRepository } from '../services/live/LiveWalletRepository';
import { DemoAnalyticsRepository } from '../services/demo/DemoAnalyticsRepository';
import { LiveAnalyticsRepository } from '../services/live/LiveAnalyticsRepository';
import { logger } from '../utils/logger';
import { errorHandler } from '../utils/errorHandler';

// Re-export seed agents for component backwards compatibility
export { seedAgents };

// Instantiate concrete singletons
const demoAgentRepo = new DemoAgentRepository();
const liveAgentRepo = new LiveAgentRepository();
const demoWorkflowRepo = new DemoWorkflowRepository();
const liveWorkflowRepo = new LiveWorkflowRepository();
const demoWalletRepo = new DemoWalletRepository();
const liveWalletRepo = new LiveWalletRepository();
const demoAnalyticsRepo = new DemoAnalyticsRepository();
const liveAnalyticsRepo = new LiveAnalyticsRepository();

const getRepos = (isDemoMode: boolean) => ({
  agents: isDemoMode ? demoAgentRepo : liveAgentRepo,
  workflow: isDemoMode ? demoWorkflowRepo : liveWorkflowRepo,
  wallet: isDemoMode ? demoWalletRepo : liveWalletRepo,
  analytics: isDemoMode ? demoAnalyticsRepo : liveAnalyticsRepo
});

interface NexusState {
  agents: Agent[];
  activeWorkflow: Workflow | null;
  executionLogs: ExecutionLog[];
  userWallet: WalletState;
  agentWallets: Record<string, WalletState>;
  isRunning: boolean;
  currentPhaseIndex: number;
  userQuery: string;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  estimatedCost: number;
  appState: 'planning' | 'draft' | 'running' | 'completed' | 'history';
  isLoading: boolean;

  // Mode-isolated wallet states
  demoBalance: number;
  demoTransactions: Transaction[];
  demoWalletAddress: string;
  demoEscrow: number;
  demoHistory: Transaction[];
  demoWallet: WalletState;

  liveBalance: number;
  liveTransactions: Transaction[];
  liveWalletAddress: string;
  liveEscrow: number;
  liveHistory: Transaction[];
  liveWallet: WalletState;
  
  // Auth & Mode States
  user: any | null;
  token: string | null;
  isDemoMode: boolean;
  isAuthModalOpen: boolean;
  authModalTab: 'login' | 'register' | 'forgot' | 'verify';
  isWorkflowSaved: boolean;
  unsavedWorkflowTemplate: any | null;
  isSidebarCollapsed: boolean;
  isMobileSidebarOpen: boolean;
  
  // Marketplace Persistent States
  marketplaceTab: 'all' | 'trending' | 'featured' | 'verified';
  marketplaceSearchTerm: string;
  marketplaceCategory: string;
  marketplaceSelectedAgent: Agent | null;
  marketplaceOnlyVerified: boolean;
  marketplaceMinTrustScore: number;
  marketplaceMaxPrice: number;
  marketplaceSortBy: string;
  marketplaceMatchmakerPrompt: string;
  marketplaceMatchedStack: any | null;

  // Actions
  toggleSidebar: () => void;
  setMobileSidebarOpen: (val: boolean) => void;
  setMarketplaceTab: (tab: 'all' | 'trending' | 'featured' | 'verified') => void;
  setMarketplaceSearchTerm: (term: string) => void;
  setMarketplaceCategory: (cat: string) => void;
  setMarketplaceSelectedAgent: (agent: Agent | null) => void;
  setMarketplaceOnlyVerified: (val: boolean) => void;
  setMarketplaceMinTrustScore: (val: number) => void;
  setMarketplaceMaxPrice: (val: number) => void;
  setMarketplaceSortBy: (val: string) => void;
  setMarketplaceMatchmakerPrompt: (val: string) => void;
  setMarketplaceMatchedStack: (stack: any) => void;
  
  setUserQuery: (query: string) => void;
  generateWorkflow: (query: string, routingMode: 'cheapest' | 'fastest' | 'accuracy' | 'balanced', budget: number) => Promise<void>;
  startExecution: (query: string, routingMode: 'cheapest' | 'fastest' | 'accuracy' | 'balanced', budget: number) => Promise<void>;
  resetExecution: () => void;
  setRoutingMode: (mode: 'cheapest' | 'fastest' | 'accuracy' | 'balanced') => void;
  setBudget: (budget: number) => void;
  renameNode: (nodeId: string, newName: string) => void;
  deleteNode: (nodeId: string) => void;
  retryNode: (nodeId: string) => void;
  cancelWorkflow: () => void;
  registerAgent: (agent: Omit<Agent, 'id' | 'rating' | 'reviewsCount' | 'trustScore' | 'verificationCount' | 'failureRate' | 'walletAddress' | 'status'>) => Promise<void>;
  depositUserWallet: (amount: number) => Promise<{ success: boolean; message?: string }>;
  withdrawUserWallet: (amount: number) => Promise<void>;
  settleUserWallet: () => Promise<{ success: boolean; message?: string }>;
  initialize: () => Promise<void>;
  resetDemoMode: () => void;
  logExecution: (phase: ExecutionLog['phase'], message: string, type?: ExecutionLog['type'], metadata?: any) => void;
  pollActiveWorkflowStatus: (workflow: Workflow) => Promise<void>;
  
  // Auth Actions
  setAuthModal: (open: boolean, tab?: 'login' | 'register' | 'forgot') => void;
  loginUser: (usernameOrEmail: string, password: string) => Promise<boolean>;
  registerUser: (email: string, username: string, password: string, displayName?: string, role?: string) => Promise<boolean>;
  logoutUser: () => Promise<void>;
  logoutEverywhere: () => Promise<void>;
}

export const useNexusStore = create<NexusState>((set, get) => {
  // Sync state changes from useAuthStore
  useAuthStore.subscribe((authState) => {
    set({
      user: authState.user,
      token: authState.token,
      isDemoMode: authState.isDemoMode,
      isAuthModalOpen: authState.isAuthModalOpen,
      authModalTab: authState.authModalTab
    });
  });

  return {
    agents: [],
    activeWorkflow: null,
    executionLogs: [],
    isLoading: false,
    userWallet: {
      address: '0xDemoWalletAddress789c',
      balance: 100.0,
      escrowBalance: 0.0,
      pendingBalance: 0.0,
      history: []
    },
    demoBalance: 100.0,
    demoTransactions: [],
    demoWalletAddress: '0xDemoWalletAddress789c',
    demoEscrow: 0.0,
    demoHistory: [],
    demoWallet: {
      address: '0xDemoWalletAddress789c',
      balance: 100.0,
      escrowBalance: 0.0,
      pendingBalance: 0.0,
      history: []
    },
    liveBalance: 0.0,
    liveTransactions: [],
    liveWalletAddress: '0x0000000000000000000000000000000000000000',
    liveEscrow: 0.0,
    liveHistory: [],
    liveWallet: {
      address: '0x0000000000000000000000000000000000000000',
      balance: 0.0,
      escrowBalance: 0.0,
      pendingBalance: 0.0,
      history: []
    },
    agentWallets: {},
    isRunning: false,
    currentPhaseIndex: 0,
    userQuery: '',
    promptTokens: 0,
    completionTokens: 0,
    totalTokens: 0,
    estimatedCost: 0,
    appState: 'planning',
    
    // Marketplace Persistent Defaults
    marketplaceTab: 'all',
    marketplaceSearchTerm: '',
    marketplaceCategory: 'All',
    marketplaceSelectedAgent: null,
    marketplaceOnlyVerified: false,
    marketplaceMinTrustScore: 0,
    marketplaceMaxPrice: 0.5,
    marketplaceSortBy: 'trustScore',
    marketplaceMatchmakerPrompt: '',
    marketplaceMatchedStack: null,

    // Auth state defaults
    user: useAuthStore.getState().user,
    token: useAuthStore.getState().token,
    isDemoMode: useAuthStore.getState().isDemoMode,
    isAuthModalOpen: useAuthStore.getState().isAuthModalOpen,
    authModalTab: useAuthStore.getState().authModalTab,
    isWorkflowSaved: true,
    unsavedWorkflowTemplate: null,
    isSidebarCollapsed: false,
    isMobileSidebarOpen: false,

    toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
    setMobileSidebarOpen: (val) => set({ isMobileSidebarOpen: val }),
    
    setMarketplaceTab: (tab) => set({ marketplaceTab: tab }),
    setMarketplaceSearchTerm: (term) => set({ marketplaceSearchTerm: term }),
    setMarketplaceCategory: (cat) => set({ marketplaceCategory: cat }),
    setMarketplaceSelectedAgent: (agent) => set({ marketplaceSelectedAgent: agent }),
    setMarketplaceOnlyVerified: (val) => set({ marketplaceOnlyVerified: val }),
    setMarketplaceMinTrustScore: (val) => set({ marketplaceMinTrustScore: val }),
    setMarketplaceMaxPrice: (val) => set({ marketplaceMaxPrice: val }),
    setMarketplaceSortBy: (val) => set({ marketplaceSortBy: val }),
    setMarketplaceMatchmakerPrompt: (val) => set({ marketplaceMatchmakerPrompt: val }),
    setMarketplaceMatchedStack: (stack) => set({ marketplaceMatchedStack: stack }),

    setUserQuery: (query) => set({ userQuery: query }),

    resetExecution: () => {
      logger.info('Resetting active workflow and execution logs.');
      if (typeof window !== 'undefined') {
        localStorage.removeItem('orbit_last_workflow_id');
        const params = new URLSearchParams(window.location.search);
        params.delete('workflowId');
        const searchStr = params.toString();
        const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}${searchStr ? '?' + searchStr : ''}`;
        window.history.pushState({ path: newUrl }, '', newUrl);
      }
      set({
        activeWorkflow: null,
        executionLogs: [],
        isRunning: false,
        currentPhaseIndex: 0,
        promptTokens: 0,
        completionTokens: 0,
        totalTokens: 0,
        estimatedCost: 0,
        appState: 'planning'
      });
    },

    setRoutingMode: (mode) => {
      const activeWorkflow = get().activeWorkflow;
      if (activeWorkflow) {
        set({ activeWorkflow: { ...activeWorkflow, routingMode: mode } });
      }
    },

    setBudget: (budget) => {
      const activeWorkflow = get().activeWorkflow;
      if (activeWorkflow) {
        set({ activeWorkflow: { ...activeWorkflow, budget } });
      }
    },

    // Optimistic Updates for Node Rename
    renameNode: async (nodeId, newName) => {
      const wf = get().activeWorkflow;
      if (!wf) return;

      // Local optimistic update
      const updatedNodes = wf.nodes.map(n => n.id === nodeId ? { ...n, name: newName } : n);
      const updatedWf = { ...wf, nodes: updatedNodes };
      set({ activeWorkflow: updatedWf });

      try {
        const repos = getRepos(get().isDemoMode);
        const resolved = await repos.workflow.renameNode(wf.id, nodeId, newName);
        set({ activeWorkflow: resolved });
      } catch (err) {
        logger.error('Failed to rename node:', err);
        // Revert on error
        set({ activeWorkflow: wf });
      }
    },

    // Optimistic Updates for Node Delete
    deleteNode: async (nodeId) => {
      const wf = get().activeWorkflow;
      if (!wf) return;

      // Local optimistic update
      const updatedNodes = wf.nodes.filter(n => n.id !== nodeId);
      const updatedEdges = wf.edges.filter(e => e.source !== nodeId && e.target !== nodeId);
      const updatedWf = { ...wf, nodes: updatedNodes, edges: updatedEdges };
      set({ activeWorkflow: updatedWf });

      try {
        const repos = getRepos(get().isDemoMode);
        const resolved = await repos.workflow.deleteNode(wf.id, nodeId);
        set({ activeWorkflow: resolved });
      } catch (err) {
        logger.error('Failed to delete node:', err);
        // Revert on error
        set({ activeWorkflow: wf });
      }
    },

    // Optimistic Updates for Node Retry
    retryNode: async (nodeId) => {
      const wf = get().activeWorkflow;
      if (!wf) return;

      // Local optimistic update
      const updatedNodes = wf.nodes.map(n => n.id === nodeId ? { ...n, status: 'pending' as const } : n);
      const updatedWf = { ...wf, nodes: updatedNodes };
      set({ activeWorkflow: updatedWf });

      try {
        const repos = getRepos(get().isDemoMode);
        const resolved = await repos.workflow.retryNode(wf.id, nodeId);
        set({ activeWorkflow: resolved });
      } catch (err) {
        logger.error('Failed to retry node:', err);
        // Revert on error
        set({ activeWorkflow: wf });
      }
    },

    generateWorkflow: async (query, routingMode, budget) => {
      logger.info('Generating workflow:', { query, routingMode, budget });
      set({ isLoading: true });
      try {
        const repos = getRepos(get().isDemoMode);
        const wf = await repos.workflow.generateWorkflow(query, routingMode, budget);
        
        if (typeof window !== 'undefined') {
          localStorage.setItem('orbit_last_workflow_id', wf.id);
          const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?workflowId=${wf.id}`;
          window.history.pushState({ path: newUrl }, '', newUrl);
        }

        // Mock token statistics update
        const pt = Math.floor(2000 + Math.random() * 4000);
        const ct = Math.floor(1000 + Math.random() * 2000);
        const cost = Math.round((pt * 0.00015 + ct * 0.0006) * 100) / 100;

        set({
          activeWorkflow: wf,
          userQuery: query,
          appState: 'draft',
          isWorkflowSaved: true,
          promptTokens: pt,
          completionTokens: ct,
          totalTokens: pt + ct,
          estimatedCost: cost
        });
      } catch (err) {
        const friendly = errorHandler.getFriendlyMessage(err);
        logger.error('Failed to generate workflow template:', friendly);
        throw new Error(friendly);
      } finally {
        set({ isLoading: false });
      }
    },

    startExecution: async (query, routingMode, budget) => {
      logger.info('Starting workflow execution...');
      set({ isLoading: true });
      try {
        const repos = getRepos(get().isDemoMode);
        
        let wf = get().activeWorkflow;
        if (!wf) {
          wf = await repos.workflow.generateWorkflow(query, routingMode, budget);
          set({ activeWorkflow: wf, userQuery: query });
        }

        const runRes = await repos.workflow.runWorkflow(wf.id);
        if (!runRes.success) {
          throw new Error(runRes.message || 'Execution failed to launch');
        }

        set({ isRunning: true, appState: 'running' });

        if (!get().isDemoMode) {
          get().pollActiveWorkflowStatus(wf);
        }
      } catch (err) {
        const friendly = errorHandler.getFriendlyMessage(err);
        logger.error('Execution failure:', friendly);
        throw new Error(friendly);
      } finally {
        set({ isLoading: false });
      }
    },

    cancelWorkflow: async () => {
      const wf = get().activeWorkflow;
      if (!wf) return;
      try {
        const repos = getRepos(get().isDemoMode);
        await repos.workflow.cancelWorkflow(wf.id);
        set({ isRunning: false });
      } catch (err) {
        logger.error('Cancel workflow failed:', err);
      }
    },

    registerAgent: async (agent) => {
      set({ isLoading: true });
      try {
        const repos = getRepos(get().isDemoMode);
        await repos.agents.registerAgentCap('new-agent', agent);
        await get().initialize();
      } catch (err) {
        logger.error('Register agent failed:', err);
      } finally {
        set({ isLoading: false });
      }
    },

    depositUserWallet: async (amount) => {
      try {
        const repos = getRepos(get().isDemoMode);
        const res = await repos.wallet.deposit(amount);
        await get().initialize();
        return res;
      } catch (err) {
        logger.error('Wallet deposit error:', err);
        return { success: false, message: 'Deposit failed' };
      }
    },

    withdrawUserWallet: async (amount) => {
      try {
        const repos = getRepos(get().isDemoMode);
        await repos.wallet.withdraw(amount);
        await get().initialize();
      } catch (err) {
        logger.error('Wallet withdrawal error:', err);
      }
    },

    settleUserWallet: async () => {
      try {
        const res = await apiClient.post<any>('/api/v1/wallet/settlement', {});
        await get().initialize();
        return res;
      } catch (err) {
        logger.error('Wallet settlement error:', err);
        return { success: false, message: 'Settlement failed' };
      }
    },

    initialize: async () => {
      logger.info('Initializing application data state...');
      
      if (typeof window !== 'undefined') {
        if (!(window as any)._hasSessionExpiredListener) {
          (window as any)._hasSessionExpiredListener = true;
          window.addEventListener('nexus_session_expired', () => {
            useAuthStore.getState().setAuthModal(true, 'login');
          });
        }
        useAuthStore.getState().initializeAuth();
      }

      const isDemo = get().isDemoMode;
      const repos = getRepos(isDemo);

      try {
        // Load agents registry
        const list = await repos.agents.getAgents();
        set({ agents: list });

        // Load mode-specific wallet metrics
        const wallet = await repos.wallet.getBalance();
        if (isDemo) {
          set({
            demoBalance: wallet.balance,
            demoEscrow: wallet.escrowBalance,
            demoHistory: wallet.history || [],
            demoTransactions: wallet.history || [],
            demoWallet: wallet,
            userWallet: wallet
          });
        } else {
          set({
            liveBalance: wallet.balance,
            liveEscrow: wallet.escrowBalance,
            liveHistory: wallet.history || [],
            liveTransactions: wallet.history || [],
            liveWallet: wallet,
            userWallet: wallet
          });
        }

        // Restore active workflow session if URL parameter present
        let workflowId = '';
        if (typeof window !== 'undefined') {
          const params = new URLSearchParams(window.location.search);
          workflowId = params.get('workflowId') || '';
        }

        if (workflowId) {
          const activeWf = await repos.workflow.getWorkflow(workflowId);
          if (activeWf) {
            const isRunning = activeWf.status === 'running';
            const isTerminal = activeWf.status === 'completed' || activeWf.status === 'failed';
            
            set({
              activeWorkflow: activeWf,
              isRunning,
              appState: isRunning ? 'running' : (isTerminal ? 'completed' : 'draft'),
              currentPhaseIndex: isRunning ? 7 : (activeWf.status === 'completed' ? 9 : 0)
            });

            if (isDemo && isRunning) {
              repos.workflow.runWorkflow(activeWf.id);
            } else if (!isDemo && (isRunning || activeWf.status === 'pending')) {
              get().pollActiveWorkflowStatus(activeWf);
            }
          }
        }
      } catch (err) {
        logger.warn('Failed initialization sequence:', err);
      }
    },

    resetDemoMode: () => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('orbit_demo_balance');
        localStorage.removeItem('orbit_demo_escrow');
        localStorage.removeItem('orbit_demo_history');
        localStorage.removeItem('orbit-demo-workflow');
      }
      get().resetExecution();
      get().initialize();
    },

    logExecution: (phase, message, type = 'info', metadata) => {
      set(prev => ({
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
    },

    pollActiveWorkflowStatus: async (workflow) => {
      let isPolledRunning = true;
      const poll = async () => {
        if (!isPolledRunning || !get().isRunning) return;
        try {
          const repos = getRepos(get().isDemoMode);
          const fresh = await repos.workflow.getWorkflow(workflow.id);
          
          if (fresh) {
            set({ activeWorkflow: fresh });
            
            // Query logs
            const logs = await repos.workflow.getWorkflowLogs(workflow.id);
            set({ executionLogs: logs });

            if (fresh.status === 'completed' || fresh.status === 'failed' || fresh.status === 'cancelled') {
              isPolledRunning = false;
              set({ isRunning: false, appState: fresh.status === 'completed' ? 'completed' : 'history' });
              await get().initialize(); // Refresh wallets
              return;
            }
          }
        } catch (e) {
          logger.error('Polling error:', e);
        }
        setTimeout(poll, 3000);
      };
      
      poll();
    },

    // Auth delegation
    setAuthModal: (open, tab) => useAuthStore.getState().setAuthModal(open, tab),
    loginUser: (u, p) => useAuthStore.getState().loginUser(u, p),
    registerUser: (e, u, p, d, r) => useAuthStore.getState().registerUser(e, u, p, d, r),
    logoutUser: () => useAuthStore.getState().logoutUser(),
    logoutEverywhere: () => useAuthStore.getState().logoutEverywhere()
  };
});
