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
import { dbPersistenceService, executeOptimisticMutation } from '../services/persistence';

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

// Storage Helper Utilities
const getStoredJSON = <T>(key: string, fallback: T): T => {
  if (typeof window === 'undefined') return fallback;
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : fallback;
  } catch (e) {
    return fallback;
  }
};

const setStoredJSON = (key: string, val: any) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {}
};

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

  // Persistence & Preferences
  selectedWorkspaceId: string;
  setSelectedWorkspaceId: (id: string) => void;
  hiredAgentIds: string[];
  hireMarketplaceAgent: (agentId: string) => void;
  recentlyUsedAgentIds: string[];
  recordAgentUsage: (agentId: string) => void;
  routingMode: 'cheapest' | 'fastest' | 'accuracy' | 'balanced';
  budget: number;

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
  loginWithGoogle: (idToken: string) => Promise<boolean>;
  logoutUser: () => Promise<void>;
  logoutEverywhere: () => Promise<void>;
}

export const useNexusStore = create<NexusState>((set, get) => {
  // Sync state changes from useAuthStore & trigger hydration when authenticated or mode changes
  useAuthStore.subscribe((authState, previousState) => {
    const isAuth = authState.isAuthenticated;
    if (!isAuth) {
      set({
        user: null,
        token: null,
        isDemoMode: authState.isDemoMode,
        isAuthModalOpen: authState.isAuthModalOpen,
        authModalTab: authState.authModalTab,
      });
    } else {
      const nextUserWallet = authState.isDemoMode ? get().demoWallet : get().liveWallet;
      set({
        user: authState.user,
        token: authState.token,
        isDemoMode: authState.isDemoMode,
        isAuthModalOpen: authState.isAuthModalOpen,
        authModalTab: authState.authModalTab,
        userWallet: nextUserWallet
      });

      // Hydrate nexus store data whenever auth session resolves or demo/live mode toggles
      if (!previousState || !previousState.isAuthenticated || previousState.isDemoMode !== authState.isDemoMode) {
        get().initialize();
      }
    }
  });

  const cachedDemoWallet = getStoredJSON<WalletState>('orbit_wallet_demo', {
    address: '0xDemoWalletAddress789c',
    balance: 100.0,
    escrowBalance: 0.0,
    pendingBalance: 0.0,
    history: []
  });

  const cachedLiveWallet = getStoredJSON<WalletState>('orbit_wallet_live', {
    address: '0x0000000000000000000000000000000000000000',
    balance: 0.0,
    escrowBalance: 0.0,
    pendingBalance: 0.0,
    history: []
  });

  const initialDemoMode = useAuthStore.getState().isDemoMode;
  const initialUserWallet = initialDemoMode ? cachedDemoWallet : cachedLiveWallet;

  return {
    agents: [],
    activeWorkflow: null,
    executionLogs: getStoredJSON<ExecutionLog[]>('orbit_execution_logs', []),
    isLoading: false,
    
    // User Preferences & State Persistence
    selectedWorkspaceId: getStoredJSON<string>('orbit_selected_workspace_id', 'ws-default'),
    hiredAgentIds: getStoredJSON<string[]>('orbit_hired_agents', []),
    recentlyUsedAgentIds: getStoredJSON<string[]>('orbit_recent_agents', []),
    routingMode: getStoredJSON<'cheapest' | 'fastest' | 'accuracy' | 'balanced'>('orbit_pref_routing_mode', 'balanced'),
    budget: getStoredJSON<number>('orbit_pref_budget', 5.0),

    userWallet: initialUserWallet,
    demoBalance: cachedDemoWallet.balance,
    demoTransactions: cachedDemoWallet.history || [],
    demoWalletAddress: cachedDemoWallet.address,
    demoEscrow: cachedDemoWallet.escrowBalance,
    demoHistory: cachedDemoWallet.history || [],
    demoWallet: cachedDemoWallet,

    liveBalance: cachedLiveWallet.balance,
    liveTransactions: cachedLiveWallet.history || [],
    liveWalletAddress: cachedLiveWallet.address,
    liveEscrow: cachedLiveWallet.escrowBalance,
    liveHistory: cachedLiveWallet.history || [],
    liveWallet: cachedLiveWallet,

    agentWallets: {},
    isRunning: false,
    currentPhaseIndex: 0,
    userQuery: getStoredJSON<string>('orbit_user_query', ''),
    promptTokens: 0,
    completionTokens: 0,
    totalTokens: 0,
    estimatedCost: 0,
    appState: 'planning',
    
    // Marketplace Persistent Defaults
    marketplaceTab: getStoredJSON<any>('orbit_mkt_tab', 'all'),
    marketplaceSearchTerm: '',
    marketplaceCategory: getStoredJSON<string>('orbit_mkt_cat', 'All'),
    marketplaceSelectedAgent: null,
    marketplaceOnlyVerified: getStoredJSON<boolean>('orbit_mkt_verified', false),
    marketplaceMinTrustScore: 0,
    marketplaceMaxPrice: 0.5,
    marketplaceSortBy: getStoredJSON<string>('orbit_mkt_sort', 'trustScore'),
    marketplaceMatchmakerPrompt: '',
    marketplaceMatchedStack: null,

    // Auth state defaults
    user: useAuthStore.getState().user,
    token: useAuthStore.getState().token,
    isDemoMode: initialDemoMode,
    isAuthModalOpen: useAuthStore.getState().isAuthModalOpen,
    authModalTab: useAuthStore.getState().authModalTab,
    isWorkflowSaved: true,
    unsavedWorkflowTemplate: null,
    isSidebarCollapsed: useAuthStore.getState().isSidebarCollapsed,
    isMobileSidebarOpen: false,

    setSelectedWorkspaceId: (id) => {
      setStoredJSON('orbit_selected_workspace_id', id);
      set({ selectedWorkspaceId: id });
      dbPersistenceService.saveWorkspace(id, { selectedWorkspaceId: id });
    },
    hireMarketplaceAgent: (agentId) => {
      const current = get().hiredAgentIds || [];
      if (!current.includes(agentId)) {
        const next = [...current, agentId];
        set({ hiredAgentIds: next });
        setStoredJSON('orbit_hired_agents', next);
        dbPersistenceService.saveMarketplaceInstall(agentId, { hiredAgentIds: next });
      }
    },
    recordAgentUsage: (agentId) => {
      const current = get().recentlyUsedAgentIds || [];
      const filtered = current.filter(id => id !== agentId);
      const next = [agentId, ...filtered].slice(0, 10);
      set({ recentlyUsedAgentIds: next });
      setStoredJSON('orbit_recent_agents', next);
    },

    toggleSidebar: () => useAuthStore.getState().toggleSidebar(),
    setMobileSidebarOpen: (val) => set({ isMobileSidebarOpen: val }),
    
    setMarketplaceTab: (tab) => {
      setStoredJSON('orbit_mkt_tab', tab);
      set({ marketplaceTab: tab });
    },
    setMarketplaceSearchTerm: (term) => set({ marketplaceSearchTerm: term }),
    setMarketplaceCategory: (cat) => {
      setStoredJSON('orbit_mkt_cat', cat);
      set({ marketplaceCategory: cat });
    },
    setMarketplaceSelectedAgent: (agent) => set({ marketplaceSelectedAgent: agent }),
    setMarketplaceOnlyVerified: (val) => {
      setStoredJSON('orbit_mkt_verified', val);
      set({ marketplaceOnlyVerified: val });
    },
    setMarketplaceMinTrustScore: (val) => set({ marketplaceMinTrustScore: val }),
    setMarketplaceMaxPrice: (val) => set({ marketplaceMaxPrice: val }),
    setMarketplaceSortBy: (val) => {
      setStoredJSON('orbit_mkt_sort', val);
      set({ marketplaceSortBy: val });
    },
    setMarketplaceMatchmakerPrompt: (val) => set({ marketplaceMatchmakerPrompt: val }),
    setMarketplaceMatchedStack: (stack) => set({ marketplaceMatchedStack: stack }),

    setUserQuery: (query) => {
      setStoredJSON('orbit_user_query', query);
      set({ userQuery: query });
    },

    resetExecution: () => {
      logger.info('Resetting active workflow and execution logs.');
      if (typeof window !== 'undefined') {
        localStorage.removeItem('orbit_last_workflow_id');
        localStorage.removeItem('orbit_workflow_draft');
        localStorage.removeItem('orbit_user_query');
        const params = new URLSearchParams(window.location.search);
        params.delete('workflowId');
        const searchStr = params.toString();
        const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}${searchStr ? '?' + searchStr : ''}`;
        window.history.pushState({ path: newUrl }, '', newUrl);
      }
      set({
        activeWorkflow: null,
        userQuery: '',
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
      setStoredJSON('orbit_pref_routing_mode', mode);
      set({ routingMode: mode });
      const activeWorkflow = get().activeWorkflow;
      if (activeWorkflow) {
        const updatedWf = { ...activeWorkflow, routingMode: mode };
        set({ activeWorkflow: updatedWf });
        setStoredJSON('orbit_workflow_draft', { query: get().userQuery, activeWorkflow: updatedWf, timestamp: Date.now() });
      }
    },

    setBudget: (budget) => {
      setStoredJSON('orbit_pref_budget', budget);
      set({ budget });
      const activeWorkflow = get().activeWorkflow;
      if (activeWorkflow) {
        const updatedWf = { ...activeWorkflow, budget };
        set({ activeWorkflow: updatedWf });
        setStoredJSON('orbit_workflow_draft', { query: get().userQuery, activeWorkflow: updatedWf, timestamp: Date.now() });
      }
    },

    // Optimistic Updates for Node Rename
    renameNode: async (nodeId, newName) => {
      const wf = get().activeWorkflow;
      if (!wf) return;

      const updatedNodes = wf.nodes.map(n => n.id === nodeId ? { ...n, name: newName } : n);
      const updatedWf = { ...wf, nodes: updatedNodes };
      set({ activeWorkflow: updatedWf });
      setStoredJSON('orbit_workflow_draft', { query: get().userQuery, activeWorkflow: updatedWf, timestamp: Date.now() });

      try {
        const repos = getRepos(get().isDemoMode);
        const resolved = await repos.workflow.renameNode(wf.id, nodeId, newName);
        set({ activeWorkflow: resolved });
        setStoredJSON('orbit_workflow_draft', { query: get().userQuery, activeWorkflow: resolved, timestamp: Date.now() });
      } catch (err) {
        logger.error('Failed to rename node:', err);
        set({ activeWorkflow: wf });
      }
    },

    // Optimistic Updates for Node Delete
    deleteNode: async (nodeId) => {
      const wf = get().activeWorkflow;
      if (!wf) return;

      const updatedNodes = wf.nodes.filter(n => n.id !== nodeId);
      const updatedEdges = wf.edges.filter(e => e.source !== nodeId && e.target !== nodeId);
      const updatedWf = { ...wf, nodes: updatedNodes, edges: updatedEdges };
      set({ activeWorkflow: updatedWf });
      setStoredJSON('orbit_workflow_draft', { query: get().userQuery, activeWorkflow: updatedWf, timestamp: Date.now() });

      try {
        const repos = getRepos(get().isDemoMode);
        const resolved = await repos.workflow.deleteNode(wf.id, nodeId);
        set({ activeWorkflow: resolved });
        setStoredJSON('orbit_workflow_draft', { query: get().userQuery, activeWorkflow: resolved, timestamp: Date.now() });
      } catch (err) {
        logger.error('Failed to delete node:', err);
        set({ activeWorkflow: wf });
      }
    },

    retryNode: async (nodeId) => {
      const wf = get().activeWorkflow;
      if (!wf) return;
      try {
        const repos = getRepos(get().isDemoMode);
        const resolved = await repos.workflow.retryNode(wf.id, nodeId);
        set({ activeWorkflow: resolved });
        setStoredJSON('orbit_workflow_draft', { query: get().userQuery, activeWorkflow: resolved, timestamp: Date.now() });
      } catch (err) {
        logger.error('Failed to retry node:', err);
      }
    },

    generateWorkflow: async (query, routingMode, budget) => {
      logger.info('Generating workflow template for query:', query);
      set({ isLoading: true });
      try {
        const isDemo = get().isDemoMode;
        const repos = getRepos(isDemo);
        const wf = await repos.workflow.generateWorkflow(query, routingMode, budget);
        
        if (typeof window !== 'undefined' && wf && wf.id) {
          localStorage.setItem('orbit_last_workflow_id', wf.id);
          const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?workflowId=${wf.id}`;
          window.history.pushState({ path: newUrl }, '', newUrl);
        }

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

        setStoredJSON('orbit_user_query', query);
        setStoredJSON('orbit_workflow_draft', { query, activeWorkflow: wf, timestamp: Date.now() });
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

        if (typeof window !== 'undefined' && wf && wf.id) {
          localStorage.setItem('orbit_last_workflow_id', wf.id);
          setStoredJSON('orbit_workflow_draft', { query, activeWorkflow: wf, timestamp: Date.now() });
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
        logger.error('Wallet withdraw error:', err);
      }
    },

    settleUserWallet: async () => {
      try {
        const repos = getRepos(get().isDemoMode);
        const res = await repos.wallet.settle();
        await get().initialize();
        return res;
      } catch (err) {
        logger.error('Wallet settlement error:', err);
        return { success: false, message: 'Settlement failed' };
      }
    },

    initialize: async () => {
      logger.info('Initializing application data state and restoring persistence...');
      
      if (typeof window !== 'undefined') {
        if (!(window as any)._hasSessionExpiredListener) {
          (window as any)._hasSessionExpiredListener = true;
          window.addEventListener('nexus_session_expired', () => {
            useAuthStore.getState().setAuthModal(true, 'login');
          });
        }
        useAuthStore.getState().initializeAuth();
      }

      // Guard: wait if auth state is checking or uninitialized
      let authState = useAuthStore.getState();
      if (authState.initializationState === 'UNINITIALIZED' || authState.initializationState === 'CHECKING_SESSION') {
        logger.info('[NEXUS_STORE] Waiting for auth initialization to complete before loading metrics...');
        await new Promise<void>((resolve) => {
          const unsubscribe = useAuthStore.subscribe((state) => {
            if (state.initializationState === 'AUTHENTICATED' || state.initializationState === 'UNAUTHENTICATED') {
              unsubscribe();
              resolve();
            }
          });
        });
        authState = useAuthStore.getState();
      }

      const isDemo = get().isDemoMode;
      const repos = getRepos(isDemo);

      try {
        // Guard: skip protected calls if guest
        if (!authState.isAuthenticated) {
          logger.info('[NEXUS_STORE] User is unauthenticated. Bypassing wallet & active workflow queries.');
          set({ agents: [] });
          return;
        }

        // Load agents registry
        const list = await repos.agents.getAgents();
        set({ agents: list });

        // Load mode-specific wallet metrics & persist
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
          setStoredJSON('orbit_wallet_demo', wallet);
        } else {
          set({
            liveBalance: wallet.balance,
            liveEscrow: wallet.escrowBalance,
            liveHistory: wallet.history || [],
            liveTransactions: wallet.history || [],
            liveWallet: wallet,
            userWallet: wallet
          });
          setStoredJSON('orbit_wallet_live', wallet);
        }

        // Restore active workflow session or last opened workflow
        let workflowId = '';
        if (typeof window !== 'undefined') {
          const params = new URLSearchParams(window.location.search);
          workflowId = params.get('workflowId') || localStorage.getItem('orbit_last_workflow_id') || '';
        }

        if (workflowId) {
          const activeWf = await repos.workflow.getWorkflow(workflowId);
          if (activeWf) {
            const isRunning = activeWf.status === 'running';
            const isTerminal = activeWf.status === 'completed' || activeWf.status === 'failed';
            
            set({
              activeWorkflow: activeWf,
              userQuery: activeWf.name || get().userQuery,
              isRunning,
              appState: isRunning ? 'running' : (isTerminal ? 'completed' : 'draft'),
              currentPhaseIndex: isRunning ? 7 : (activeWf.status === 'completed' ? 9 : 0)
            });

            if (typeof window !== 'undefined') {
              localStorage.setItem('orbit_last_workflow_id', activeWf.id);
            }

            if (isDemo && isRunning) {
              repos.workflow.runWorkflow(activeWf.id);
            } else if (!isDemo && (isRunning || activeWf.status === 'pending')) {
              get().pollActiveWorkflowStatus(activeWf);
            }
          }
        } else {
          // Fall back to restoring unsaved draft workflow if present
          const draft = getStoredJSON<any>('orbit_workflow_draft', null);
          if (draft && draft.activeWorkflow) {
            set({
              activeWorkflow: draft.activeWorkflow,
              userQuery: draft.query || get().userQuery,
              unsavedWorkflowTemplate: draft.unsavedTemplate || null,
              appState: 'draft'
            });
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
        localStorage.removeItem('orbit_last_workflow_id');
        localStorage.removeItem('orbit_workflow_draft');
      }
      get().resetExecution();
      get().initialize();
    },

    logExecution: (phase, message, type = 'info', metadata) => {
      set(prev => {
        const nextLogs = [
          ...prev.executionLogs,
          {
            id: `log-${Date.now()}-${Math.random()}`,
            timestamp: new Date().toISOString(),
            phase,
            message,
            type,
            metadata
          }
        ];
        setStoredJSON('orbit_execution_logs', nextLogs);
        return { executionLogs: nextLogs };
      });
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
            if (typeof window !== 'undefined') {
              localStorage.setItem('orbit_last_workflow_id', fresh.id);
            }
            
            const logs = await repos.workflow.getWorkflowLogs(workflow.id);
            set({ executionLogs: logs });
            setStoredJSON('orbit_execution_logs', logs);

            if (fresh.status === 'completed' || fresh.status === 'failed' || (fresh.status as string) === 'cancelled') {
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
    loginWithGoogle: (idToken) => useAuthStore.getState().loginWithGoogle(idToken),
    logoutUser: () => useAuthStore.getState().logoutUser(),
    logoutEverywhere: () => useAuthStore.getState().logoutEverywhere()
  };
});
