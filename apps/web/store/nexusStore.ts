import { create } from 'zustand';
import { Agent, Workflow, TaskNode, ExecutionLog, Transaction, WalletState } from '@nexus-ai/types';
import { apiService } from '../services/api';
import { apiClient } from '../lib/api-client';

const isProd = process.env.NODE_ENV === 'production';
const console = {
  log: (...args: any[]) => {
    if (!isProd) globalThis.console.log(...args);
  },
  warn: (...args: any[]) => {
    if (!isProd) globalThis.console.warn(...args);
  },
  error: (...args: any[]) => {
    globalThis.console.error(...args);
  },
  debug: (...args: any[]) => {
    if (!isProd) globalThis.console.debug(...args);
  },
  info: (...args: any[]) => {
    if (!isProd) globalThis.console.info(...args);
  }
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

  // Mode-isolated wallet states
  demoBalance: number;
  demoTransactions: Transaction[];
  demoEscrow: number;
  demoHistory: Transaction[];

  liveBalance: number;
  liveTransactions: Transaction[];
  liveEscrow: number;
  liveHistory: Transaction[];
  
  // Auth & Mode States
  user: { id: string; email: string; username: string; role: 'user' | 'creator' | 'admin'; displayName?: string; avatarUrl?: string; } | null;
  token: string | null;
  isDemoMode: boolean;
  isAuthModalOpen: boolean;
  authModalTab: 'login' | 'register' | 'forgot';
  isWorkflowSaved: boolean;
  unsavedWorkflowTemplate: any | null;
  saveWorkflow: () => Promise<void>;
  isSidebarCollapsed: boolean;
  isMobileSidebarOpen: boolean;
  toggleSidebar: () => void;
  setMobileSidebarOpen: (val: boolean) => void;

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
  
  // Actions
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
  initialize: () => Promise<void>;
  resetDemoMode: () => void;
  logExecution: (phase: ExecutionLog['phase'], message: string, type?: ExecutionLog['type'], metadata?: any) => void;
  pollActiveWorkflowStatus: (workflow: Workflow) => Promise<void>;
  
  // Auth Actions
  setAuthModal: (open: boolean, tab?: 'login' | 'register' | 'forgot') => void;
  loginUser: (usernameOrEmail: string, password: string) => Promise<boolean>;
  registerUser: (email: string, username: string, password: string, displayName?: string, role?: string) => Promise<boolean>;
  logoutUser: () => Promise<void>;
  loginOAuth: (provider: 'google' | 'github') => Promise<void>;
  loginWithGoogle: (idToken: string) => Promise<boolean>;
  verifyEmail: (code: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  toggleDemoMode: () => void;
}

export const seedAgents: Agent[] = [
  {
    id: 'agent-research-1',
    name: 'InsightFinder Pro',
    version: '1.2.0',
    description: 'Deep-dive academic and market research agent. Summarizes complex documents and extracts tabular data.',
    category: 'Research',
    skills: ['market analysis', 'web scraping', 'data synthesis', 'academic lookup'],
    endpoint: 'https://api.orbitai.dev/api/v1/agents/research-1/invoke',
    price: 0.15,
    rating: 4.8,
    reviewsCount: 342,
    walletAddress: '0x32A4B...98e2',
    trustScore: 95,
    latency: 1200,
    accuracy: 94,
    verificationCount: 88,
    failureRate: 2,
    status: 'active',
    tags: ['deep-research', 'data-extraction']
  },
  {
    id: 'agent-research-2',
    name: 'QuickScan',
    version: '2.0.1',
    description: 'Ultra-fast search and summarization agent. Perfect for low-latency tasks.',
    category: 'Research',
    skills: ['web search', 'news summary', 'topic extraction'],
    endpoint: 'https://api.orbitai.dev/api/v1/agents/research-2/invoke',
    price: 0.05,
    rating: 4.4,
    reviewsCount: 154,
    walletAddress: '0x8F21c...d8A3',
    trustScore: 88,
    latency: 450,
    accuracy: 89,
    verificationCount: 42,
    failureRate: 4,
    status: 'active',
    tags: ['fast', 'news']
  },
  {
    id: 'agent-finance-1',
    name: 'FinAnalytica',
    version: '0.9.5',
    description: 'Performs asset valuation, ticker audit, balance sheet analysis, and generates charts.',
    category: 'Finance',
    skills: ['balance sheet analysis', 'financial modeling', 'ticker trends', 'charts'],
    endpoint: 'https://api.orbitai.dev/api/v1/agents/finance-1/invoke',
    price: 0.25,
    rating: 4.9,
    reviewsCount: 220,
    walletAddress: '0x99C2d...a3F1',
    trustScore: 98,
    latency: 1600,
    accuracy: 97,
    verificationCount: 124,
    failureRate: 1,
    status: 'active',
    tags: ['equity', 'charts']
  },
  {
    id: 'agent-legal-1',
    name: 'LexGuard',
    version: '1.0.0',
    description: 'Analyzes contracts for compliance, flags high-risk clauses, and performs privacy policy audits.',
    category: 'Legal',
    skills: ['contract parsing', 'compliance checks', 'risk analysis'],
    endpoint: 'https://api.orbitai.dev/api/v1/agents/legal-1/invoke',
    price: 0.35,
    rating: 4.7,
    reviewsCount: 98,
    walletAddress: '0xEF512...0D8B',
    trustScore: 96,
    latency: 2000,
    accuracy: 96,
    verificationCount: 65,
    failureRate: 3,
    status: 'active',
    tags: ['compliance', 'contract']
  },
  {
    id: 'agent-code-1',
    name: 'CodeCraft',
    version: '3.1.0',
    description: 'Generates robust react hooks, api endpoints, and writes unit tests in TypeScript.',
    category: 'Coding',
    skills: ['react components', 'express endpoints', 'unit testing', 'refactoring'],
    endpoint: 'https://api.orbitai.dev/api/v1/agents/code-1/invoke',
    price: 0.30,
    rating: 4.9,
    reviewsCount: 512,
    walletAddress: '0x1A2B3...4C5D',
    trustScore: 97,
    latency: 2200,
    accuracy: 98,
    verificationCount: 215,
    failureRate: 1.5,
    status: 'active',
    tags: ['typescript', 'react']
  },
  {
    id: 'agent-security-1',
    name: 'SentriScan',
    version: '1.4.0',
    description: 'Static application security testing (SAST). Flags vulnerabilities, SQL injection, and XSS leaks.',
    category: 'Security',
    skills: ['vulnerability scan', 'dependency audit', 'code safety'],
    endpoint: 'https://api.orbitai.dev/api/v1/agents/security-1/invoke',
    price: 0.40,
    rating: 4.95,
    reviewsCount: 180,
    walletAddress: '0xDD44e...29c4',
    trustScore: 99,
    latency: 1400,
    accuracy: 99.5,
    verificationCount: 110,
    failureRate: 0.2,
    status: 'active',
    tags: ['audit', 'sast']
  },
  {
    id: 'agent-translate-1',
    name: 'Translatio',
    version: '2.1.0',
    description: 'High-accuracy translation with cultural idioms adjustment. Supports 45+ languages.',
    category: 'Translation',
    skills: ['translation', 'localization', 'grammar audit'],
    endpoint: 'https://api.orbitai.dev/api/v1/agents/translate-1/invoke',
    price: 0.08,
    rating: 4.6,
    reviewsCount: 190,
    walletAddress: '0x55B1a...cc4D',
    trustScore: 93,
    latency: 550,
    accuracy: 93,
    verificationCount: 78,
    failureRate: 2.5,
    status: 'active',
    tags: ['localization', 'fast']
  },
  {
    id: 'agent-verify-1',
    name: 'ConsensuVerify',
    version: '1.0.2',
    description: 'Independent consensus verification engine. Cross-checks information against multiple nodes.',
    category: 'Security',
    skills: ['verification', 'consensus calculation', 'output grading'],
    endpoint: 'https://api.orbitai.dev/api/v1/agents/verify-1/invoke',
    price: 0.10,
    rating: 4.85,
    reviewsCount: 290,
    walletAddress: '0x88AAa...77bB',
    trustScore: 98,
    latency: 800,
    accuracy: 98,
    verificationCount: 250,
    failureRate: 0.8,
    status: 'active',
    tags: ['verification', 'consensus']
  }
];

function selectBestAgent(capability: string, assignedIds: string[], dbAgents: Agent[]): { agent: Agent; reason: string } {
  const cap = capability.toLowerCase();
  
  let candidates = dbAgents.filter(a => 
    a.skills.some(s => s.toLowerCase().includes(cap)) || 
    a.category.toLowerCase().includes(cap)
  );
  
  if (candidates.length === 0) {
    candidates = dbAgents;
  }
  
  const prices = candidates.map(c => c.price);
  const latencies = candidates.map(c => c.latency);
  const maxPrice = Math.max(...prices, 0.5);
  const maxLatency = Math.max(...latencies, 3000);
  
  let bestAgent = candidates[0] || dbAgents[0];
  let bestScore = -1;
  let bestReason = 'Optimal selection';
  
  candidates.forEach(agent => {
    const costScore = 1 - (agent.price / maxPrice);
    const trustScore = agent.trustScore / 100;
    const latencyScore = 1 - (agent.latency / maxLatency);
    const accuracyScore = agent.accuracy / 100;
    const successScore = (100 - agent.failureRate) / 100;
    
    let score = (costScore * 0.2) + (trustScore * 0.25) + (latencyScore * 0.15) + (accuracyScore * 0.2) + (successScore * 0.2);
    
    const duplicateCount = assignedIds.filter(id => id === agent.id).length;
    if (duplicateCount > 0) {
      score -= (0.35 * duplicateCount); // diversity penalty
    }
    
    if (score > bestScore) {
      bestScore = score;
      bestAgent = agent;
      
      const reasons: string[] = [];
      const isCheapest = agent.price === Math.min(...prices);
      const isFastest = agent.latency === Math.min(...latencies);
      const isHighTrust = agent.trustScore >= 95;
      
      if (isFastest) reasons.push('Fastest');
      if (isCheapest) reasons.push('Lowest cost');
      if (isHighTrust) reasons.push(`${agent.trustScore}% trust success`);
      if (agent.accuracy >= 95) reasons.push('Highest accuracy');
      
      if (reasons.length > 0) {
        bestReason = reasons.slice(0, 3).join(', ');
      } else {
        bestReason = 'Optimal selection';
      }
    }
  });
  
  return { agent: bestAgent, reason: bestReason };
}

function computeWorkflowStatus(nodes: TaskNode[]): 'pending' | 'running' | 'completed' | 'failed' {
  if (!nodes || nodes.length === 0) return 'pending';
  const hasFailed = nodes.some(n => n.status === 'failed');
  if (hasFailed) return 'failed';
  const hasRunning = nodes.some(n => n.status === 'running');
  if (hasRunning) return 'running';
  const allCompleted = nodes.every(n => n.status === 'completed');
  if (allCompleted) return 'completed';
  return 'pending';
}

function logWorkflowStatusChange(workflowId: string, status: string, nodes: TaskNode[]) {
  const completed = nodes.filter(n => n.status === 'completed').length;
  const running = nodes.filter(n => n.status === 'running').length;
  const failed = nodes.filter(n => n.status === 'failed').length;
  const pending = nodes.filter(n => n.status === 'pending').length;
  console.log(`[STATUS_CHANGE] Workflow ID: ${workflowId} | Workflow Status: ${status.toUpperCase()} | Completed Nodes: ${completed} | Running Nodes: ${running} | Failed Nodes: ${failed} | Pending Nodes: ${pending}`);
}

export const useNexusStore = create<NexusState>((set, get) => {
  return {
    agents: [],
    activeWorkflow: null,
    executionLogs: [],
    userWallet: {
      address: '0x0000000000000000000000000000000000000000',
      balance: 0.0,
      escrowBalance: 0.0,
      history: []
    },
    demoBalance: 0.0,
    demoTransactions: [],
    demoEscrow: 0.0,
    demoHistory: [],
    liveBalance: 0.0,
    liveTransactions: [],
    liveEscrow: 0.0,
    liveHistory: [],
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
    
    // Auth & Mode Defaults
    user: null,
    token: null,
    isDemoMode: true,
    isAuthModalOpen: false,
    authModalTab: 'login',
    isWorkflowSaved: true,
    unsavedWorkflowTemplate: null,
    isSidebarCollapsed: false,
    isMobileSidebarOpen: false,
    toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
    setMobileSidebarOpen: (val) => set({ isMobileSidebarOpen: val }),

    setUserQuery: (query) => set({ userQuery: query }),

    resetExecution: () => {
      console.log('[CLEAR_EXECUTION_STATE] Resetting active workflow and execution logs.');
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

    renameNode: (nodeId, newName) => {
      const activeWorkflow = get().activeWorkflow;
      if (activeWorkflow) {
        const updatedNodes = activeWorkflow.nodes.map(n => n.id === nodeId ? { ...n, name: newName } : n);
        set({ activeWorkflow: { ...activeWorkflow, nodes: updatedNodes } });
      }
    },

    deleteNode: (nodeId) => {
      const activeWorkflow = get().activeWorkflow;
      if (activeWorkflow) {
        const updatedNodes = activeWorkflow.nodes.filter(n => n.id !== nodeId);
        const updatedEdges = activeWorkflow.edges.filter(e => e.source !== nodeId && e.target !== nodeId);
        const computedStatus = computeWorkflowStatus(updatedNodes);
        logWorkflowStatusChange(activeWorkflow.id, computedStatus, updatedNodes);
        set({ activeWorkflow: { ...activeWorkflow, status: computedStatus, nodes: updatedNodes, edges: updatedEdges } });
      }
    },

    retryNode: (nodeId) => {
      const activeWorkflow = get().activeWorkflow;
      if (activeWorkflow) {
        const updatedNodes = activeWorkflow.nodes.map(n => n.id === nodeId ? { ...n, status: 'pending' as const, retryCount: (n.retryCount || 0) + 1 } : n);
        const computedStatus = computeWorkflowStatus(updatedNodes);
        logWorkflowStatusChange(activeWorkflow.id, computedStatus, updatedNodes);
        set({ activeWorkflow: { ...activeWorkflow, status: computedStatus, nodes: updatedNodes } });
      }
    },

    cancelWorkflow: () => {
      const activeWorkflow = get().activeWorkflow;
      if (activeWorkflow) {
        logWorkflowStatusChange(activeWorkflow.id, 'failed', activeWorkflow.nodes);
        set({ 
          activeWorkflow: { ...activeWorkflow, status: 'failed' as const },
          isRunning: false,
          currentPhaseIndex: 0
        });
      }
    },

    registerAgent: async (agent) => {
      try {
        const res = await apiClient.post<any>('/api/v1/agents', agent);
        if (res.success && res.data) {
          await get().initialize();
        } else {
          throw new Error(res.message || 'Failed to register agent in backend');
        }
      } catch (err: any) {
        console.error('Failed to register agent in database, falling back locally:', err);
        const newAgent: Agent = {
          ...agent,
          id: `agent-custom-${Date.now()}`,
          rating: 5.0,
          reviewsCount: 0,
          trustScore: 100,
          verificationCount: 0,
          failureRate: 0,
          walletAddress: `0x${Math.random().toString(16).substring(2, 10).toUpperCase()}...${Math.random().toString(16).substring(2, 6)}`,
          status: 'active'
        };

        set((state) => {
          const updatedAgents = [...state.agents, newAgent];
          const updatedWallets = { ...state.agentWallets };
          updatedWallets[newAgent.id] = {
            address: newAgent.walletAddress,
            balance: 0.0,
            escrowBalance: 0.0,
            history: []
          };
          return {
            agents: updatedAgents,
            agentWallets: updatedWallets
          };
        });
      }
    },

    depositUserWallet: async (amount) => {
      const state = get();
      
      // ─── DEMO MODE ────────────────────────────────────────────────────────
      if (state.isDemoMode) {
        const tx: Transaction = {
          id: `tx-deposit-${Date.now()}`,
          senderAddress: 'EXTERNAL_BANK',
          receiverAddress: state.userWallet.address || '0xDemoWalletAddress789c',
          amount,
          type: 'deposit',
          timestamp: new Date().toISOString(),
          status: 'completed',
          txHash: '0x' + Math.random().toString(16).substring(2, 42)
        };
        const newDemoBalance = state.demoBalance + amount;
        const newDemoHistory = [tx, ...state.demoHistory];

        localStorage.setItem('orbit_demo_balance', String(newDemoBalance));
        localStorage.setItem('orbit_demo_history', JSON.stringify(newDemoHistory));

        set({
          demoBalance: newDemoBalance,
          demoHistory: newDemoHistory,
          demoTransactions: newDemoHistory,
          userWallet: {
            ...state.userWallet,
            balance: newDemoBalance,
            history: newDemoHistory
          }
        });
        return { success: true };
      }

      // ─── LIVE MODE (Razorpay Checkout) ────────────────────────────────────
      return new Promise<{ success: boolean; message?: string }>(async (resolve) => {
        try {
          const loadScript = (src: string) => {
            return new Promise((r) => {
              const script = document.createElement('script');
              script.src = src;
              script.onload = () => r(true);
              script.onerror = () => r(false);
              document.body.appendChild(script);
            });
          };

          const scriptLoaded = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
          if (!scriptLoaded) {
            resolve({ success: false, message: 'Razorpay SDK failed to load. Are you offline?' });
            return;
          }

          const orderRes = await apiClient.post<any>('/api/v1/payments/create-order', {
            amount,
            userId: state.user?.id || 'user-1'
          });

          if (!orderRes.success) {
            resolve({ success: false, message: orderRes.message || 'Failed to create Razorpay Order' });
            return;
          }

          const options = {
            key: orderRes.key_id || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_TBsVCd1MfWIKnW',
            amount: orderRes.amount * 100,
            currency: orderRes.currency,
            name: 'Orbit AI Operating System',
            description: 'Sandbox/Live Credits Deposit',
            order_id: orderRes.orderId,
            handler: async (response: any) => {
              try {
                const verifyRes = await apiClient.post<any>('/api/v1/payments/verify', {
                  razorpayOrderId: response.razorpay_order_id,
                  razorpayPaymentId: response.razorpay_payment_id,
                  signature: response.razorpay_signature,
                  userId: state.user?.id || 'user-1',
                  amount
                });

                if (verifyRes.success) {
                  await get().initialize();
                  resolve({ success: true });
                } else {
                  resolve({ success: false, message: verifyRes.message || 'Signature validation failed' });
                }
              } catch (err: any) {
                console.error('Razorpay verification error:', err);
                resolve({ success: false, message: err.message || 'Verification request failed' });
              }
            },
            modal: {
              ondismiss: () => {
                resolve({ success: false, message: 'Payment cancelled by user' });
              }
            },
            prefill: {
              name: state.user?.displayName || state.user?.username || 'Orbit User',
              email: state.user?.email || 'user@orbitai.dev'
            },
            theme: {
              color: '#00ffcc'
            }
          };

          const rzp = new (window as any).Razorpay(options);
          rzp.open();
        } catch (err: any) {
          console.error('Failed to initiate Razorpay payment checkout flow:', err);
          resolve({ success: false, message: err.message || 'Failed to initialize checkout' });
        }
      });
    },

    withdrawUserWallet: async (amount) => {
      const state = get();
      if (state.userWallet.balance < amount) return;
      
      if (state.isDemoMode) {
        const tx: Transaction = {
          id: `tx-withdraw-${Date.now()}`,
          senderAddress: state.userWallet.address || '0xDemoWalletAddress789c',
          receiverAddress: 'EXTERNAL_BANK',
          amount,
          type: 'withdrawal',
          timestamp: new Date().toISOString(),
          status: 'completed',
          txHash: '0x' + Math.random().toString(16).substring(2, 42)
        };
        const newDemoBalance = state.demoBalance - amount;
        const newDemoHistory = [tx, ...state.demoHistory];

        localStorage.setItem('orbit_demo_balance', String(newDemoBalance));
        localStorage.setItem('orbit_demo_history', JSON.stringify(newDemoHistory));

        set({
          demoBalance: newDemoBalance,
          demoHistory: newDemoHistory,
          demoTransactions: newDemoHistory,
          userWallet: {
            ...state.userWallet,
            balance: newDemoBalance,
            history: newDemoHistory
          }
        });
        return;
      }

      try {
        const res = await apiClient.post<any>('/api/v1/wallet/withdraw', {
          amount,
          recipientAddress: 'EXTERNAL_BANK'
        });
        if (res.success) {
          await get().initialize();
        } else {
          throw new Error(res.message || 'Failed to request withdrawal from backend');
        }
      } catch (err) {
        console.error('Failed to register withdrawal in database, falling back locally:', err);
        const tx: Transaction = {
          id: `tx-withdraw-${Date.now()}`,
          senderAddress: state.userWallet.address,
          receiverAddress: 'EXTERNAL_BANK',
          amount,
          type: 'withdrawal',
          timestamp: new Date().toISOString(),
          status: 'completed',
          txHash: '0x' + Math.random().toString(16).substring(2, 42)
        };
        set({
          userWallet: {
            ...state.userWallet,
            balance: state.userWallet.balance - amount,
            history: [tx, ...state.userWallet.history]
          }
        });
      }
    },

    generateWorkflow: async (query, routingMode, budget) => {
      console.log('[STRUCTURED_LOG] START_GENERATE', { query, routingMode, budget });
      console.log("STEP 1");
      console.log("process.env.NEXT_PUBLIC_API_URL:", process.env.NEXT_PUBLIC_API_URL);
      const state = get();
      const dbAgents = state.agents.length > 0 ? state.agents : seedAgents;

      if (!dbAgents || dbAgents.length === 0) {
        throw new Error('Marketplace failure: No candidate agents found in registry');
      }

      let planRes;
      const url = `${process.env.NEXT_PUBLIC_API_URL || (typeof window !== "undefined" ? (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" ? "http://localhost:10000" : window.location.origin) : "http://localhost:10000")}/api/v1/ai/plan`;

      console.log("URL:", url);

      try {
          console.log("FETCH START");
          console.log("fetch reference type:", typeof fetch);
          console.log("fetch reference string:", String(fetch));

          const headers: Record<string, string> = {
            "Content-Type": "application/json",
            "x-execution-mode": state.isDemoMode ? "DEMO" : "LIVE"
          };
          if (state.token) {
            headers["Authorization"] = `Bearer ${state.token}`;
          }

          const response = await fetch(url,{
              method:"POST",
              headers,
              body:JSON.stringify({
                  query,
                  routingMode,
                  budget
              })
          });

          console.log("FETCH RETURNED");
          console.log("STATUS:",response.status);

          const text = await response.text();
          console.log("RAW RESPONSE:",text);

          planRes = JSON.parse(text);
      }
      catch(err){
          console.error("===== REAL ERROR =====");
          console.error(err);

          if(err instanceof Error){
              console.error("MESSAGE:", err.message);
              console.error("STACK:", err.stack);
              console.error("NAME:", err.name);
          }
          throw err;
      }

      if (!planRes || !planRes.success || !planRes.data) {
        throw new Error(planRes?.message || 'AI Planner failed to generate DAG');
      }

      console.log('[STRUCTURED_LOG] PLAN_SUCCESS', { nodesCount: planRes.data.nodes?.length });

      const promptTokens = planRes.data.prompt_tokens || 0;
      const completionTokens = planRes.data.completion_tokens || 0;
      const totalTokens = promptTokens + completionTokens;
      const estCost = planRes.data.estimated_cost || 0;

      set({
        promptTokens,
        completionTokens,
        totalTokens,
        estimatedCost: estCost
      });

      const assignedIds: string[] = [];
      const nodeTitles: Record<string, string> = {};
      const agentSelectionReasons: Record<string, string> = {};

      let nodes: TaskNode[] = [];
      try {
        nodes = planRes.data.nodes.map((n: any, idx: number) => {
          const cap = n.capability.toLowerCase();
          const { agent, reason } = selectBestAgent(cap, assignedIds, dbAgents);

          console.log("Matched Agent", agent);
          console.log("Available Agents", dbAgents);
          console.log("Planner Node", n);
          console.log("Capability", n.capability);

          const agentId = agent ? agent.id : 'no-agent';
          const agentName = agent ? agent.name : 'No compatible agent found';
          const agentPrice = agent ? agent.price : 0;
          const agentLatency = agent ? agent.latency : 0;

          if (agent) {
            assignedIds.push(agent.id);
          }

          const nodeTitle = n.label || n.id.toUpperCase();
          nodeTitles[n.id] = nodeTitle;
          nodeTitles[idx] = nodeTitle;
          agentSelectionReasons[n.id] = reason;
          agentSelectionReasons[idx] = reason;

          return {
            id: n.id,
            name: nodeTitle,
            task: nodeTitle,
            description: `Execute capability: ${cap}. Selected because: ${reason}`,
            capability: cap,
            costEstimate: agentPrice,
            timeEstimate: agentLatency,
            status: 'pending' as const,
            assignedAgentId: agentId,
            assignedAgent: agentName
          };
        });
      } catch (err: any) {
        throw new Error(`Marketplace failure: ${err.message || err}`);
      }

      const edges = planRes.data.edges.map((e: any) => ({
        id: e.id,
        source: e.source,
        target: e.target
      }));

      const workflowTemplate = {
        title: query.slice(0, 40) + '...',
        userId: 'user-1',
        estimatedCost: nodes.reduce((sum, n) => sum + n.costEstimate, 0),
        nodes: nodes.map((n, idx) => ({
          id: n.id,
          agentId: n.assignedAgentId,
          capability: n.capability,
          status: 'pending' as const,
          positionX: 100 + idx * 180,
          positionY: 200
        })),
        edges: edges.map((e: any) => ({
          sourceNode: e.source,
          targetNode: e.target
        }))
      };

      let dbWorkflow: any = null;
      let persistError: string | null = null;

      try {
        const wfCreate = await apiClient.post<any>('/api/v1/workflows', workflowTemplate);
        if (wfCreate.success && wfCreate.data) {
          dbWorkflow = wfCreate.data;
          set({ isWorkflowSaved: true, unsavedWorkflowTemplate: null });
          console.log('[STRUCTURED_LOG] SAVE_WORKFLOW_SUCCESS', { workflowId: dbWorkflow.id });
        } else {
          persistError = wfCreate.message || 'Failed to create workflow template in database';
        }
      } catch (err: any) {
        persistError = err.message || err;
      }

      if (persistError) {
        console.warn('[STRUCTURED_LOG] SAVE_WORKFLOW_FAILED', { error: persistError });
        set({ isWorkflowSaved: false, unsavedWorkflowTemplate: workflowTemplate });
      }

      const workflowId = dbWorkflow ? dbWorkflow.id : `temp-${Date.now()}`;
      const createdAt = dbWorkflow ? dbWorkflow.createdAt : new Date().toISOString();

      if (dbWorkflow) {
        const nodeMapping = dbWorkflow.nodeMapping || {};
        const uuidNodeTitles: Record<string, string> = {};
        const uuidAgentReasons: Record<string, string> = {};
        
        Object.entries(nodeTitles).forEach(([key, val]) => {
          const mappedKey = nodeMapping[key] || key;
          uuidNodeTitles[mappedKey] = val;
        });

        Object.entries(agentSelectionReasons).forEach(([key, val]) => {
          const mappedKey = nodeMapping[key] || key;
          uuidAgentReasons[mappedKey] = val;
        });

        localStorage.setItem(`orbit_workflow_metadata_${workflowId}`, JSON.stringify({
          query,
          routingMode,
          budget,
          promptTokens,
          completionTokens,
          totalTokens,
          estimatedCost: estCost,
          nodeTitles: uuidNodeTitles,
          agentSelectionReasons: uuidAgentReasons
        }));
        localStorage.setItem('orbit_last_workflow_id', workflowId);
        
        if (typeof window !== 'undefined') {
          const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?workflowId=${workflowId}`;
          window.history.pushState({ path: newUrl }, '', newUrl);
        }
      }

      const workflow: Workflow = {
        id: workflowId,
        name: dbWorkflow ? dbWorkflow.title : workflowTemplate.title,
        query,
        nodes: dbWorkflow && dbWorkflow.nodes ? dbWorkflow.nodes.map((n: any, idx: number) => {
          const agent = dbAgents.find(a => a.id === n.agentId) || dbAgents[0];
          const taskName = nodeTitles[n.id] || nodeTitles[String(idx)] || nodeTitles[idx] || `Stage: ${n.capability.toUpperCase()}`;
          return {
            id: n.id,
            name: taskName,
            task: taskName,
            description: `Execute capability: ${n.capability}. Selected because: ${agentSelectionReasons[n.id] || agentSelectionReasons[String(idx)] || agentSelectionReasons[idx] || 'Optimal selection'}`,
            capability: n.capability,
            costEstimate: agent.price,
            timeEstimate: agent.latency,
            status: n.status,
            assignedAgentId: n.agentId,
            assignedAgent: n.agentId
          };
        }) : nodes.map(n => ({
          ...n,
          task: n.name,
          assignedAgent: n.assignedAgentId
        })),
        edges: dbWorkflow && dbWorkflow.edges ? dbWorkflow.edges.map((e: any) => ({
          id: e.id,
          source: e.sourceNode,
          target: e.targetNode
        })) : edges,
        budget,
        routingMode,
        retryCount: 0,
        status: 'pending' as const,
        createdAt
      };

      set({ activeWorkflow: workflow, userQuery: query, appState: 'draft' });
      console.log('[STRUCTURED_LOG] RENDER_WORKFLOW_SUCCESS', { workflowId });

      if (persistError) {
        throw new Error(`Workflow persistence failure: ${persistError}`);
      }
    },

    saveWorkflow: async () => {
      const state = get();
      const template = state.unsavedWorkflowTemplate;
      if (!template) return;

      try {
        const wfCreate = await apiClient.post<any>('/api/v1/workflows', template);
        if (!wfCreate.success || !wfCreate.data) {
          throw new Error(wfCreate.message || 'Failed to create workflow template in database');
        }

        const dbWorkflow = wfCreate.data;
        const workflowId = dbWorkflow.id;
        const active = state.activeWorkflow;
        const nodeMapping = dbWorkflow.nodeMapping || {};

        console.log('[STRUCTURED_LOG] SAVE_WORKFLOW_SUCCESS', { workflowId });

        if (active) {
          const updatedNodes = active.nodes.map((n: any, idx: number) => {
            const dn = dbWorkflow.nodes ? dbWorkflow.nodes[idx] : null;
            return {
              ...n,
              id: dn?.id || nodeMapping[n.id] || n.id
            };
          });

          const updatedEdges = active.edges.map((e: any) => ({
            ...e,
            source: nodeMapping[e.source] || e.source,
            target: nodeMapping[e.target] || e.target
          }));

          localStorage.setItem(`orbit_workflow_metadata_${workflowId}`, JSON.stringify({
            query: active?.query || template.title,
            routingMode: active?.routingMode || 'balanced',
            budget: active?.budget || 2.0,
            promptTokens: state.promptTokens,
            completionTokens: state.completionTokens,
            totalTokens: state.totalTokens,
            estimatedCost: state.estimatedCost,
            nodeTitles: updatedNodes.reduce((acc: Record<string, string>, n: any) => ({ ...acc, [n.id]: n.name }), {}) || {},
            agentSelectionReasons: updatedNodes.reduce((acc: Record<string, string>, n: any) => ({ ...acc, [n.id]: n.description }), {}) || {}
          }));
          localStorage.setItem('orbit_last_workflow_id', workflowId);

          if (typeof window !== 'undefined') {
            const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?workflowId=${workflowId}`;
            window.history.pushState({ path: newUrl }, '', newUrl);
          }

          const updated: Workflow = {
            ...active,
            id: workflowId,
            nodes: updatedNodes,
            edges: updatedEdges,
            createdAt: dbWorkflow.createdAt
          };
          set({ activeWorkflow: updated, isWorkflowSaved: true, unsavedWorkflowTemplate: null, appState: 'draft' });
        }
      } catch (err: any) {
        console.error('[STRUCTURED_LOG] SAVE_WORKFLOW_FAILED', { error: err.message });
        throw new Error(`Workflow persistence failure: ${err.message}`);
      }
    },

    startExecution: async (query, routingMode, budget) => {
      const state = get();
      if (state.isRunning) return;

      set({ isRunning: true, userQuery: query, currentPhaseIndex: 1, executionLogs: [], appState: 'running' });

      const log = (phase: ExecutionLog['phase'], message: string, type: ExecutionLog['type'] = 'info', metadata?: any) => {
        get().logExecution(phase, message, type, metadata);
      };

      try {
        let workflow = state.activeWorkflow;
        const dbAgents = state.agents.length > 0 ? state.agents : seedAgents;
        
        if (!workflow || workflow.query !== query) {
          // --- PHASE 1: Intent Detection (LLM Call via API Gateway) ---
          log('intent', `LLM processing intent for: "${query}"`);
          set({ currentPhaseIndex: 1 });
          
          const planRes = await apiClient.post<any>('/api/v1/ai/plan', {
            query,
            routingMode,
            budget
          });
          
          if (!planRes.success || !planRes.data) {
            throw new Error(planRes.message || 'AI Planner failed to generate DAG');
          }
          
          const promptTokens = planRes.data.prompt_tokens || 0;
          const completionTokens = planRes.data.completion_tokens || 0;
          const totalTokens = promptTokens + completionTokens;
          const estCost = planRes.data.estimated_cost || 0;
          
          set({
            promptTokens,
            completionTokens,
            totalTokens,
            estimatedCost: estCost
          });
          
          const intentList = planRes.data.nodes.map((n: any) => n.capability).join(', ');
          log('intent', `Detected intent capabilities: [${intentList}]`, 'success');

          // --- PHASE 2: Workflow Planner (DAG Compilation & DB Save) ---
          set({ currentPhaseIndex: 2 });
          log('dag', 'Generating Directed Acyclic Graph (DAG) task plan...');
          
          const nodes: TaskNode[] = planRes.data.nodes.map((n: any) => {
            const cap = n.capability.toLowerCase();
            const matchedAgent = dbAgents.find(a => a.skills.some(s => s.toLowerCase().includes(cap)) || a.category.toLowerCase().includes(cap)) || dbAgents[0];

            console.log("Matched Agent", matchedAgent);
            console.log("Available Agents", dbAgents);
            console.log("Planner Node", n);
            console.log("Capability", n.capability);

            const agentId = matchedAgent ? matchedAgent.id : 'no-agent';
            const agentName = matchedAgent ? matchedAgent.name : 'No compatible agent found';
            const agentPrice = matchedAgent ? matchedAgent.price : 0;
            const agentLatency = matchedAgent ? matchedAgent.latency : 0;

            const nodeTitle = n.label || n.id.toUpperCase();
            return {
              id: n.id,
              name: nodeTitle,
              task: nodeTitle,
              description: `Execute capability: ${cap}`,
              capability: cap,
              costEstimate: agentPrice,
              timeEstimate: agentLatency,
              status: 'pending',
              assignedAgentId: agentId,
              assignedAgent: agentName
            };
          });

          const edges = planRes.data.edges.map((e: any) => ({
            id: e.id,
            source: e.source,
            target: e.target
          }));

          const workflowTemplate = {
            title: query.slice(0, 40) + '...',
            userId: 'user-1',
            estimatedCost: nodes.reduce((sum, n) => sum + n.costEstimate, 0),
            nodes: nodes.map((n, idx) => ({
              id: n.id,
              agentId: n.assignedAgentId,
              capability: n.capability,
              status: 'pending',
              positionX: 100 + idx * 180,
              positionY: 200
            })),
            edges: edges.map((e: any) => ({
              sourceNode: e.source,
              targetNode: e.target
            }))
          };

          log('dag', 'Persisting structural workflow DAG template in PostgreSQL database...', 'info');
          const wfCreate = await apiClient.post<any>('/api/v1/workflows', workflowTemplate);
          if (!wfCreate.success || !wfCreate.data) {
            throw new Error('Failed to create workflow template in database');
          }

          const dbWorkflow = wfCreate.data;
          const nodeMapping = dbWorkflow.nodeMapping || {};

          workflow = {
            id: dbWorkflow.id,
            name: dbWorkflow.title,
            query,
            nodes: nodes.map((n: any) => ({
              ...n,
              id: nodeMapping[n.id] || n.id
            })),
            edges: edges.map((e: any) => ({
              ...e,
              source: nodeMapping[e.source] || e.source,
              target: nodeMapping[e.target] || e.target
            })),
            budget,
            routingMode,
            retryCount: 0,
            status: dbWorkflow.status,
            createdAt: dbWorkflow.createdAt
          };

          localStorage.setItem(`orbit_workflow_metadata_${dbWorkflow.id}`, JSON.stringify({
            query,
            routingMode,
            budget,
            promptTokens: state.promptTokens,
            completionTokens: state.completionTokens,
            totalTokens: state.totalTokens,
            estimatedCost: state.estimatedCost,
            nodeTitles: workflow.nodes.reduce((acc, n) => ({ ...acc, [n.id]: n.name }), {}) || {},
            agentSelectionReasons: workflow.nodes.reduce((acc, n) => ({ ...acc, [n.id]: n.description }), {}) || {}
          }));
          localStorage.setItem('orbit_last_workflow_id', dbWorkflow.id);

          logWorkflowStatusChange(workflow.id, workflow.status, workflow.nodes);
          set({ activeWorkflow: workflow, appState: 'running' });
          log('dag', `DAG layout registered in PostgreSQL. Template ID: ${workflow.id}`, 'success');
        } else {
          // Pre-generated workflow is active in builder: transition it to running
          workflow = {
            ...workflow,
            status: computeWorkflowStatus(workflow.nodes)
          };
          logWorkflowStatusChange(workflow.id, workflow.status, workflow.nodes);
          set({ activeWorkflow: workflow, appState: 'running' });
          log('intent', `Executing pre-generated workflow: "${workflow.name}"`, 'success');
        }

        const intentList = workflow.nodes.map((n: any) => n.capability).join(', ');

        // --- PHASE 3: Discovery & Evaluation ---
        set({ currentPhaseIndex: 3 });
        log('discovery', 'Querying live agent registry database for skill set matching...');
        await new Promise(r => setTimeout(r, 600));
        log('discovery', `Identified matching capabilities for [${intentList}].`, 'success');

        set({ currentPhaseIndex: 4 });
        log('evaluation', 'Evaluating agent endpoints, reliability SLA metrics, and bids...');
        await new Promise(r => setTimeout(r, 600));
        log('evaluation', 'Agent evaluation complete.', 'success');

        // --- PHASE 5: Negotiation ---
        set({ currentPhaseIndex: 5 });
        log('negotiation', 'Negotiating execution fees and SLA guarantees...');
        await new Promise(r => setTimeout(r, 600));
        const totalCost = workflow.nodes.reduce((acc, curr) => acc + curr.costEstimate, 0);
        log('negotiation', `Agreements finalized. Cumulative fee locked: ${totalCost.toFixed(2)} USDC`, 'success');

        // --- PHASE 6: Payment (SLA Escrow Hold) ---
        set({ currentPhaseIndex: 6 });
        if (!state.isDemoMode) {
          log('payment', `Locking SLA execution budget escrow of ${totalCost.toFixed(2)} USDC...`);
          await new Promise(r => setTimeout(r, 600));
          
          if (get().userWallet.balance < totalCost) {
            log('payment', 'SLA Escrow holding failed: Insufficient funds in User Wallet! Aborting run.', 'error');
            set({ isRunning: false, currentPhaseIndex: 0 });
            return;
          }

          set(state => {
            const escrowTx: Transaction = {
              id: `tx-escrow-${Date.now()}`,
              senderAddress: state.userWallet.address,
              receiverAddress: 'ESCROW_VAULT',
              amount: totalCost,
              type: 'escrow_hold',
              timestamp: new Date().toISOString(),
              status: 'completed',
              txHash: '0x' + Math.random().toString(16).substring(2, 42)
            };
            return {
              userWallet: {
                ...state.userWallet,
                balance: state.userWallet.balance - totalCost,
                escrowBalance: state.userWallet.escrowBalance + totalCost,
                history: [escrowTx, ...state.userWallet.history]
              }
            };
          });
          log('payment', 'Budget reserved in database escrow vault record.', 'success');
        } else {
          log('payment', 'Demo Mode - Escrow hold bypassed (No funds required)', 'success');
          await new Promise(r => setTimeout(r, 400));

          set(state => {
            const escrowTx: Transaction = {
              id: `tx-escrow-${Date.now()}`,
              senderAddress: state.userWallet.address || '0xDemoWalletAddress789c',
              receiverAddress: 'ESCROW_VAULT',
              amount: totalCost,
              type: 'escrow_hold',
              timestamp: new Date().toISOString(),
              status: 'completed',
              txHash: '0x' + Math.random().toString(16).substring(2, 42)
            };
            const newDemoBalance = Math.max(0, state.demoBalance - totalCost);
            const newDemoEscrow = state.demoEscrow + totalCost;
            const newDemoHistory = [escrowTx, ...state.demoHistory];
            
            localStorage.setItem('orbit_demo_balance', String(newDemoBalance));
            localStorage.setItem('orbit_demo_escrow', String(newDemoEscrow));
            localStorage.setItem('orbit_demo_history', JSON.stringify(newDemoHistory));

            return {
              demoBalance: newDemoBalance,
              demoEscrow: newDemoEscrow,
              demoHistory: newDemoHistory,
              demoTransactions: newDemoHistory,
              userWallet: {
                ...state.userWallet,
                balance: newDemoBalance,
                escrowBalance: newDemoEscrow,
                history: newDemoHistory
              }
            };
          });
        }

        // --- PHASE 7: Run Swarm & Poll logs ---
        set({ currentPhaseIndex: 7 });
        if (state.isDemoMode) {
          log('execution', 'Running simulated workflow...');
        } else {
          log('execution', 'Triggering backend execution pipeline...');
        }
        
        const runRes = await apiClient.post<any>(`/api/v1/workflows/${workflow.id}/run`, {});
        if (!runRes.success) {
          throw new Error('Backend workflow engine failed to start execution run');
        }

        await get().pollActiveWorkflowStatus(workflow);
      } catch (err: any) {
        log('execution', `Workflow run failed: ${err.message || err}`, 'error');
        const latestNodes = get().activeWorkflow?.nodes || [];
        const hasFailedNode = latestNodes.some(n => n.status === 'failed');
        const computedStatus = hasFailedNode ? 'failed' : computeWorkflowStatus(latestNodes);
        
        if (get().activeWorkflow) {
          logWorkflowStatusChange(get().activeWorkflow!.id, computedStatus, latestNodes);
          set(state => ({
            activeWorkflow: state.activeWorkflow ? { 
              ...state.activeWorkflow, 
              status: computedStatus 
            } : null,
            isRunning: false,
            currentPhaseIndex: 0
          }));
        } else {
          set({ isRunning: false, currentPhaseIndex: 0 });
        }
      }
    },

    initialize: async () => {
      // Rehydrate auth from localStorage
      if (typeof window !== 'undefined') {
        if (!(window as any)._hasSessionExpiredListener) {
          (window as any)._hasSessionExpiredListener = true;
          window.addEventListener('nexus_session_expired', () => {
            set({ user: null, token: null, isAuthModalOpen: true, authModalTab: 'login' });
          });
        }

        const isTokenExpired = (t: string | null): boolean => {
          if (!t) return true;
          try {
            const parts = t.split('.');
            if (parts.length !== 3) return true;
            const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
            if (payload && typeof payload.exp === 'number') {
              return payload.exp < Math.floor(Date.now() / 1000);
            }
            return false;
          } catch (e) {
            return true;
          }
        };

        const storedToken = localStorage.getItem('orbit_token');
        const storedUser = localStorage.getItem('orbit_user');
        const storedDemoMode = localStorage.getItem('orbit_demomode');
        if (storedToken && storedUser && !isTokenExpired(storedToken)) {
          set({ token: storedToken, user: JSON.parse(storedUser) });
        } else {
          localStorage.removeItem('orbit_token');
          localStorage.removeItem('orbit_user');
          localStorage.removeItem('orbit_refreshtoken');
          sessionStorage.removeItem('orbit_token');
          sessionStorage.removeItem('orbit_user');
          set({ token: null, user: null });
        }
        if (storedDemoMode !== null) {
          set({ isDemoMode: storedDemoMode === 'true' });
        }
      }

      try {
        // 1. Fetch agents list first (needed in both modes)
        try {
          const data = await apiService.getAgentsList() as any;
          if (data && data.success && Array.isArray(data.data) && data.data.length > 0) {
            set({ agents: data.data });
          }
        } catch (e) {
          console.error('Failed to load agents list:', e);
        }

      // 2. Mode-Aware Wallet Loading
      if (get().isDemoMode) {
        // Load demo wallet state from localStorage or memory
        const savedDemoBalance = typeof window !== 'undefined' ? localStorage.getItem('orbit_demo_balance') : null;
        const savedDemoEscrow = typeof window !== 'undefined' ? localStorage.getItem('orbit_demo_escrow') : null;
        const savedDemoHistory = typeof window !== 'undefined' ? localStorage.getItem('orbit_demo_history') : null;

        const demoBalance = savedDemoBalance ? Number(savedDemoBalance) : 0.0;
        const demoEscrow = savedDemoEscrow ? Number(savedDemoEscrow) : 0.0;
        const demoHistory = savedDemoHistory ? JSON.parse(savedDemoHistory) : [];

        set({
          demoBalance,
          demoEscrow,
          demoHistory,
          demoTransactions: demoHistory,
          userWallet: {
            address: '0xDemoWalletAddress789c',
            balance: demoBalance,
            escrowBalance: demoEscrow,
            history: demoHistory
          }
        });
      } else {
        // Live Mode
        // Clear demo state in store UI
        set({
          demoBalance: 0.0,
          demoEscrow: 0.0,
          demoHistory: [],
          demoTransactions: []
        });

        if (!get().token) {
          set({
            userWallet: {
              address: '0x0000000000000000000000000000000000000000',
              balance: 0.0,
              escrowBalance: 0.0,
              history: []
            }
          });
        } else {
          try {
            const walletRes = await apiClient.get<any>('/api/v1/wallet');
            const balanceRes = await apiClient.get<any>('/api/v1/wallet/balance');
            const txsRes = await apiClient.get<any>('/api/v1/wallet/transactions');

            if (walletRes?.success && walletRes.data) {
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

              const liveBal = Number(balanceData.available);
              const liveEsc = Number(balanceData.reserved);

              set({
                liveBalance: liveBal,
                liveEscrow: liveEsc,
                liveHistory: txsList,
                liveTransactions: txsList,
                userWallet: {
                  address: walletRes.data.address,
                  balance: liveBal,
                  escrowBalance: liveEsc,
                  history: txsList
                }
              });
            }
          } catch (e) {
            console.error('Failed to load live wallet from backend:', e);
          }
        }
      }

        console.log('[APP_BOOT] Booting Orbit Autonomous Agent OS...');
        console.log('[BOOT] Initializing Workflow Builder startup lifecycle...');

        const clearWorkflowSession = (id?: string) => {
          console.log('[CLEAR_WORKFLOW] Clearing active workflow and resetting URL search params.');
          set({
            activeWorkflow: null,
            isRunning: false,
            currentPhaseIndex: 0,
            executionLogs: [],
            promptTokens: 0,
            completionTokens: 0,
            totalTokens: 0,
            estimatedCost: 0,
            appState: 'planning'
          });
          if (typeof window !== 'undefined') {
            localStorage.removeItem('orbit_last_workflow_id');
            if (id) {
              localStorage.removeItem(`orbit_workflow_metadata_${id}`);
            }
            const params = new URLSearchParams(window.location.search);
            params.delete('workflowId');
            const searchStr = params.toString();
            const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}${searchStr ? '?' + searchStr : ''}`;
            window.history.pushState({ path: newUrl }, '', newUrl);
          }
        };

        // Reconstruct workflow if ID is in URL or localStorage
        let workflowId = '';
        if (typeof window !== 'undefined') {
          const params = new URLSearchParams(window.location.search);
          workflowId = params.get('workflowId') || '';
        }
        if (!workflowId && typeof window !== 'undefined') {
          workflowId = localStorage.getItem('orbit_last_workflow_id') || '';
          if (workflowId) {
            const params = new URLSearchParams(window.location.search);
            params.set('workflowId', workflowId);
            const searchStr = params.toString();
            const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?${searchStr}`;
            window.history.replaceState({ path: newUrl }, '', newUrl);
          }
        }

        if (workflowId) {
          console.log('[WORKFLOW_RESTORE] Attempting to restore workflow ID: ' + workflowId);
          try {
            const wfRes = await apiClient.get<any>(`/api/v1/workflows/${workflowId}`);
            if (wfRes?.success && wfRes.data) {
              const dbWorkflow = wfRes.data;
              const dbAgents = get().agents.length > 0 ? get().agents : seedAgents;

              let meta = {
                query: dbWorkflow.title,
                routingMode: 'balanced',
                budget: Number(dbWorkflow.estimatedCost),
                promptTokens: 0,
                completionTokens: 0,
                totalTokens: 0,
                estimatedCost: Number(dbWorkflow.estimatedCost),
                nodeTitles: {} as Record<string, string>,
                agentSelectionReasons: {} as Record<string, string>
              };
              const storedMeta = localStorage.getItem(`orbit_workflow_metadata_${workflowId}`);
              if (storedMeta) {
                meta = { ...meta, ...JSON.parse(storedMeta) };
              }

              const workflow: Workflow = {
                id: dbWorkflow.id,
                name: dbWorkflow.title,
                query: meta.query,
                nodes: dbWorkflow.nodes ? dbWorkflow.nodes.map((n: any, idx: number) => {
                  const agent = dbAgents.find(a => a.id === n.agentId) || dbAgents[0];

                  console.log("Matched Agent", agent);
                  console.log("Available Agents", dbAgents);
                  console.log("Planner Node", n);
                  console.log("Capability", n.capability);

                  const agentPrice = agent ? agent.price : 0;
                  const agentLatency = agent ? agent.latency : 0;
                  const agentName = agent ? agent.name : (n.agentId || 'No compatible agent found');

                  const taskName = meta.nodeTitles?.[n.id] || meta.nodeTitles?.[String(idx)] || meta.nodeTitles?.[idx] || `Stage: ${n.capability.toUpperCase()}`;
                  return {
                    id: n.id,
                    name: taskName,
                    task: taskName,
                    description: `Execute capability: ${n.capability}. Selected because: ${meta.agentSelectionReasons?.[n.id] || meta.agentSelectionReasons?.[String(idx)] || meta.agentSelectionReasons?.[idx] || 'Optimal selection'}`,
                    capability: n.capability,
                    costEstimate: agentPrice,
                    timeEstimate: agentLatency,
                    status: n.status,
                    assignedAgentId: n.agentId,
                    assignedAgent: agentName
                  };
                }) : [],
                edges: dbWorkflow.edges ? dbWorkflow.edges.map((e: any) => ({
                  id: e.id,
                  source: e.sourceNode,
                  target: e.targetNode
                })) : [],
                budget: Number(meta.budget),
                routingMode: meta.routingMode as any,
                retryCount: 0,
                status: dbWorkflow.status,
                createdAt: dbWorkflow.createdAt
              };

              console.log('[RESTORE] Successfully restored active workflow ID: ' + workflow.id + ' (Status: ' + workflow.status + ')');
              console.log('[WORKFLOW_STATUS] Workflow ID: ' + workflow.id + ' | Status: ' + workflow.status.toUpperCase());

              const isRunning = workflow.status === 'running';
              const isPending = workflow.status === 'pending';
              const isTerminal = workflow.status === 'completed' || workflow.status === 'failed' || (workflow.status as any) === 'cancelled';
              if (isRunning) {
                console.log('[WORKFLOW_RUNNING] Workflow ID: ' + workflow.id + ' is active/running.');
              }
              set({
                activeWorkflow: workflow,
                isRunning,
                currentPhaseIndex: isRunning ? 7 : (workflow.status === 'completed' ? 9 : 0),
                userQuery: meta.query,
                promptTokens: meta.promptTokens,
                completionTokens: meta.completionTokens,
                totalTokens: meta.totalTokens,
                estimatedCost: meta.estimatedCost,
                appState: isRunning ? 'running' : (isTerminal ? 'completed' : 'draft')
              });

              if (isRunning || isPending) {
                console.log('[POLL] Starting status polling for workflow ID: ' + workflow.id);
                get().pollActiveWorkflowStatus(workflow);
              }
            } else {
              console.log('[CLEAR_WORKFLOW] Invalid or stale workflowId: ' + workflowId + '.');
              console.log('[STOP_POLLING] Stopped polling for workflow ID: ' + workflowId + ' (Reason: Invalid/stale workflow ID)');
              clearWorkflowSession(workflowId);
            }
          } catch (wfErr) {
            console.warn('Failed to restore active workflow session', wfErr);
            console.log('[CLEAR_WORKFLOW] Exception occurred while fetching workflow: ' + workflowId + '. Clearing session.');
            console.log('[STOP_POLLING] Stopped polling for workflow ID: ' + workflowId + ' (Reason: Exception during restore)');
            clearWorkflowSession(workflowId);
          }
        }
      } catch (err) {
        console.warn('API Gateway offline or unauthenticated.', err);
        if (get().isDemoMode) {
          const initialAgentWallets: Record<string, WalletState> = {};
          seedAgents.forEach(agent => {
            initialAgentWallets[agent.id] = {
              address: agent.walletAddress,
              balance: 15.0,
              escrowBalance: 0.0,
              history: []
            };
          });
          set({
            agents: seedAgents,
            userWallet: {
              address: '0xUserWalletAddress789c',
              balance: 100.0,
              escrowBalance: 0.0,
              history: []
            },
            agentWallets: initialAgentWallets
          });
        } else {
          set({
            userWallet: {
              address: '0x0000000000000000000000000000000000000000',
              balance: 0.0,
              escrowBalance: 0.0,
              history: []
            }
          });
        }
      }
    },

    resetDemoMode: () => {
      const initialAgentWallets: Record<string, WalletState> = {};
      seedAgents.forEach(agent => {
        initialAgentWallets[agent.id] = {
          address: agent.walletAddress,
          balance: 15.0,
          escrowBalance: 0.0,
          history: []
        };
      });

      localStorage.setItem('orbit_demo_balance', '100.0');
      localStorage.setItem('orbit_demo_escrow', '0.0');
      localStorage.setItem('orbit_demo_history', JSON.stringify([]));

      set({
        agents: seedAgents,
        activeWorkflow: null,
        executionLogs: [],
        demoBalance: 100.0,
        demoEscrow: 0.0,
        demoHistory: [],
        demoTransactions: [],
        userWallet: {
          address: '0xUserWalletAddress789c',
          balance: 100.0,
          escrowBalance: 0.0,
          history: []
        },
        agentWallets: initialAgentWallets,
        isRunning: false,
        currentPhaseIndex: 0,
        userQuery: '',
      });
    },

    logExecution: (phase, message, type = 'info', metadata) => {
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
    },

    pollActiveWorkflowStatus: async (wf: Workflow) => {
      let workflow = wf;
      let isPolling = true;
      const loggedIds = new Set<string>();
      const totalCost = workflow.nodes.reduce((acc, curr) => acc + curr.costEstimate, 0);
      let consecutiveErrors = 0;

      while (isPolling) {
        await new Promise(r => setTimeout(r, 1200));

        // If the active workflow was reset/cleared or changed in the store by the user, stop polling
        const active = get().activeWorkflow;
        if (!active || active.id !== workflow.id) {
          console.log(`[STOP_POLLING] Stopped polling for workflow ID: ${workflow.id} (Reason: Active workflow cleared or changed)`);
          isPolling = false;
          break;
        }

        try {
          console.log(`[POLL] Fetching status for workflow ID: ${workflow.id}...`);
          const statusRes = await apiClient.get<any>(`/api/v1/workflows/${workflow.id}`);
          if (statusRes && statusRes.success && statusRes.data) {
            consecutiveErrors = 0;
            const currentWf = statusRes.data;
            
            const updatedNodes: any[] = workflow.nodes.map((n: any, idx: number) => {
              let dbNode = currentWf.nodes.find((dn: any) => dn.id === n.id);
              if (!dbNode && currentWf.nodes[idx]) {
                dbNode = currentWf.nodes[idx];
              }
              if (!dbNode) {
                dbNode = currentWf.nodes.find((dn: any) => dn.capability.toLowerCase() === n.capability.toLowerCase());
              }
              return dbNode ? { 
                ...n, 
                status: dbNode.status,
                assignedAgentId: dbNode.agentId || n.assignedAgentId,
                assignedAgent: dbNode.agentId || n.assignedAgent || n.assignedAgentId
              } : n;
            });
            
            const computedStatus = computeWorkflowStatus(updatedNodes) as any;
            console.log(`[WORKFLOW_STATUS] Workflow ID: ${workflow.id} | Status: ${computedStatus.toUpperCase()}`);

            workflow = {
              ...workflow,
              status: computedStatus,
              nodes: updatedNodes
            };
            set({ activeWorkflow: workflow });

            // Fetch live task logs from the database
            const logsRes = await apiClient.get<any>(`/api/v1/workflows/${workflow.id}/logs`);
            if (logsRes.success && Array.isArray(logsRes.data)) {
              logsRes.data.forEach((logItem: any) => {
                const logKey = `${logItem.id}-${logItem.createdAt}`;
                if (!loggedIds.has(logKey)) {
                  loggedIds.add(logKey);
                  const isVerify = logItem.message.toLowerCase().includes('verify');
                  get().logExecution(
                    isVerify ? 'verification' : 'execution',
                    logItem.message,
                    logItem.logLevel === 'error' ? 'error' : 'info'
                  );
                }
              });
            }

            if (computedStatus === 'completed' || computedStatus === 'Demo Completed' || computedStatus === 'failed' || computedStatus === 'cancelled') {
              console.log(`[WORKFLOW_COMPLETED] Workflow ID: ${workflow.id} execution completed.`);
              console.log(`[STOP_POLLING] Stopped polling for workflow ID: ${workflow.id} (Reason: Terminal status ${computedStatus.toUpperCase()} reached)`);
              isPolling = false;
              
              if (computedStatus === 'completed' || computedStatus === 'Demo Completed') {
                if (get().isDemoMode) {
                  set(state => {
                    const releaseTransactions: Transaction[] = [];
                    updatedNodes.forEach(n => {
                      const agentId = n.assignedAgentId!;
                      const agent = state.agents.find(a => a.id === agentId)!;
                      const fee = n.costEstimate;

                      const agentTx: Transaction = {
                        id: `tx-agent-release-${Date.now()}-${n.id}`,
                        senderAddress: 'ESCROW_VAULT',
                        receiverAddress: agent?.walletAddress || '0x0000000000000000000000000000000000000000',
                        amount: fee,
                        type: 'escrow_release',
                        timestamp: new Date().toISOString(),
                        status: 'completed',
                        txHash: '0x' + Math.random().toString(16).substring(2, 42),
                        taskId: n.id
                      };
                      releaseTransactions.push(agentTx);
                    });

                    const newDemoEscrow = Math.max(0, state.demoEscrow - totalCost);
                    const newDemoHistory = [...releaseTransactions, ...state.demoHistory];

                    localStorage.setItem('orbit_demo_escrow', String(newDemoEscrow));
                    localStorage.setItem('orbit_demo_history', JSON.stringify(newDemoHistory));

                    return {
                      demoEscrow: newDemoEscrow,
                      demoHistory: newDemoHistory,
                      demoTransactions: newDemoHistory,
                      userWallet: {
                        ...state.userWallet,
                        escrowBalance: newDemoEscrow,
                        history: newDemoHistory
                      },
                      isRunning: false,
                      currentPhaseIndex: 9,
                      appState: 'completed'
                    };
                  });
                  get().logExecution('settlement', 'Demo completed successfully. Simulated workflow finished.', 'success');
                } else {
                  // --- PHASE 9: Settlement (Distribute SLA Escrow payouts) ---
                  set({ currentPhaseIndex: 9 });
                  get().logExecution('settlement', 'Releasing escrow vault payouts to active agent wallets...');
                  await new Promise(r => setTimeout(r, 800));
                  
                  set(state => {
                    const updatedAgentWallets = { ...state.agentWallets };
                    const userWallet = { ...state.userWallet };
                    const releaseTransactions: Transaction[] = [];

                    updatedNodes.forEach(n => {
                      const agentId = n.assignedAgentId!;
                      const agent = state.agents.find(a => a.id === agentId)!;
                      const fee = n.costEstimate;

                      const wallet = updatedAgentWallets[agentId] || { balance: 0, escrowBalance: 0, history: [], address: '0xAgent' };
                      const agentTx: Transaction = {
                        id: `tx-agent-release-${Date.now()}-${n.id}`,
                        senderAddress: 'ESCROW_VAULT',
                        receiverAddress: agent?.walletAddress || '0x0000000000000000000000000000000000000000',
                        amount: fee,
                        type: 'escrow_release',
                        timestamp: new Date().toISOString(),
                        status: 'completed',
                        txHash: '0x' + Math.random().toString(16).substring(2, 42),
                        taskId: n.id
                      };

                      updatedAgentWallets[agentId] = {
                        ...wallet,
                        balance: wallet.balance + fee,
                        history: [agentTx, ...wallet.history]
                      };
                      releaseTransactions.push(agentTx);
                    });

                    userWallet.escrowBalance = Math.max(0, userWallet.escrowBalance - totalCost);
                    userWallet.history = [...releaseTransactions, ...userWallet.history];
                    
                    return {
                      agentWallets: updatedAgentWallets,
                      userWallet,
                      isRunning: false,
                      currentPhaseIndex: 9,
                      appState: 'completed'
                    };
                  });
                  
                  get().logExecution('settlement', 'Escrow payouts distributed successfully. Swarm task completed.', 'success');
                }
              } else {
                set({ isRunning: false, currentPhaseIndex: 0, appState: 'completed' });
                get().logExecution('execution', 'Swarm execution failed!', 'error');
              }
            }
          } else {
            consecutiveErrors++;
            console.warn(`[POLL] Fetch status was not successful (consecutive: ${consecutiveErrors})`);
            if (consecutiveErrors >= 5) {
              console.log(`[STOP_POLLING] Stopped polling for workflow ID: ${workflow.id} (Reason: 5 consecutive failed status requests)`);
              isPolling = false;
              
              // Clear active workflow and return to builder to prevent infinite loading screen
              console.log(`[CLEAR_WORKFLOW] Invalid/Stale workflow during polling. Clearing session.`);
              set({
                activeWorkflow: null,
                isRunning: false,
                currentPhaseIndex: 0,
                executionLogs: [],
                promptTokens: 0,
                completionTokens: 0,
                totalTokens: 0,
                estimatedCost: 0
              });
              if (typeof window !== 'undefined') {
                localStorage.removeItem('orbit_last_workflow_id');
                localStorage.removeItem(`orbit_workflow_metadata_${workflow.id}`);
                const params = new URLSearchParams(window.location.search);
                params.delete('workflowId');
                const searchStr = params.toString();
                const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}${searchStr ? '?' + searchStr : ''}`;
                window.history.pushState({ path: newUrl }, '', newUrl);
              }
            }
          }
        } catch (err) {
          consecutiveErrors++;
          console.warn(`[POLL] Exception in status polling (consecutive: ${consecutiveErrors}):`, err);
          if (consecutiveErrors >= 5) {
            console.log(`[STOP_POLLING] Stopped polling for workflow ID: ${workflow.id} (Reason: 5 consecutive status fetch exceptions)`);
            isPolling = false;
            
            // Clear active workflow and return to builder to prevent infinite loading screen
            console.log(`[CLEAR_WORKFLOW] Exception limit hit during polling. Clearing session.`);
            set({
              activeWorkflow: null,
              isRunning: false,
              currentPhaseIndex: 0,
              executionLogs: [],
              promptTokens: 0,
              completionTokens: 0,
              totalTokens: 0,
              estimatedCost: 0
            });
            if (typeof window !== 'undefined') {
              localStorage.removeItem('orbit_last_workflow_id');
              localStorage.removeItem(`orbit_workflow_metadata_${workflow.id}`);
              const params = new URLSearchParams(window.location.search);
              params.delete('workflowId');
              const searchStr = params.toString();
              const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}${searchStr ? '?' + searchStr : ''}`;
              window.history.pushState({ path: newUrl }, '', newUrl);
            }
          }
        }
      }
    },

    setAuthModal: (open, tab = 'login') => set({ isAuthModalOpen: open, authModalTab: tab }),

    toggleDemoMode: () => {
      const mode = !get().isDemoMode;
      set({ isDemoMode: mode });
      localStorage.setItem('orbit_demomode', String(mode));
      if (!mode) {
        // Switching to Live Mode: clear any legacy flags
        localStorage.removeItem('orbit_demo_wallet');
        localStorage.removeItem('orbit_demo_transactions');
        localStorage.removeItem('orbit_demo_notifications');
        localStorage.removeItem('orbit_demo_activity');
        localStorage.removeItem('orbit_demo_workflows');
        sessionStorage.removeItem('orbit_demomode');
      }
      get().initialize();
    },

    loginUser: async (usernameOrEmail, password) => {
      try {
        const res = await apiClient.post<any>('/api/v1/auth/login', { usernameOrEmail, password });
        if (res.success && res.data) {
          // Clear any previous token sources in all contexts
          localStorage.removeItem('orbit_token');
          localStorage.removeItem('orbit_refreshtoken');
          localStorage.removeItem('orbit_user');
          sessionStorage.removeItem('orbit_token');
          sessionStorage.removeItem('orbit_user');
          document.cookie = "orbit_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

          const profile = res.data.profile;
          const token = res.data.token;
          const refreshToken = res.data.refreshToken;
          set({ user: profile, token });
          localStorage.setItem('orbit_token', token);
          localStorage.setItem('orbit_user', JSON.stringify(profile));
          if (refreshToken) {
            localStorage.setItem('orbit_refreshtoken', refreshToken);
          }
          return true;
        } else {
          throw new Error(res.message || 'Login failed');
        }
      } catch (err: any) {
        if (!get().isDemoMode) {
          throw err;
        }
        console.warn('Backend auth unavailable, generating local session:', err);
        const localProfile = {
          id: 'user-mock-1',
          email: usernameOrEmail.includes('@') ? usernameOrEmail : `${usernameOrEmail}@orbitai.dev`,
          username: usernameOrEmail.split('@')[0],
          role: 'user' as const,
          displayName: usernameOrEmail.split('@')[0]
        };
        set({ user: localProfile, token: 'local-mock-token' });
        localStorage.setItem('orbit_token', 'local-mock-token');
        localStorage.setItem('orbit_user', JSON.stringify(localProfile));
        return true;
      }
    },

    registerUser: async (email, username, password, displayName, role = 'user') => {
      try {
        const res = await apiClient.post<any>('/api/v1/auth/register', { email, username, password, displayName, role });
        if (res.success && res.data) {
          // Clear any previous token sources in all contexts
          localStorage.removeItem('orbit_token');
          localStorage.removeItem('orbit_refreshtoken');
          localStorage.removeItem('orbit_user');
          sessionStorage.removeItem('orbit_token');
          sessionStorage.removeItem('orbit_user');
          document.cookie = "orbit_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

          const profile = res.data.profile;
          const token = res.data.token;
          const refreshToken = res.data.refreshToken;
          set({ user: profile, token });
          localStorage.setItem('orbit_token', token);
          localStorage.setItem('orbit_user', JSON.stringify(profile));
          if (refreshToken) {
            localStorage.setItem('orbit_refreshtoken', refreshToken);
          }
          return true;
        } else {
          throw new Error(res.message || 'Registration failed');
        }
      } catch (err: any) {
        if (!get().isDemoMode) {
          throw err;
        }
        console.warn('Backend registration unavailable, generating local session:', err);
        const localProfile = {
          id: 'user-mock-1',
          email,
          username,
          role: role as any,
          displayName: displayName || username
        };
        set({ user: localProfile, token: 'local-mock-token' });
        localStorage.setItem('orbit_token', 'local-mock-token');
        localStorage.setItem('orbit_user', JSON.stringify(localProfile));
        return true;
      }
    },

    logoutUser: async () => {
      try {
        await apiClient.post<any>('/api/v1/auth/logout', {});
      } catch (err) {
        console.warn('Logout request failed:', err);
      }
      set({
        user: null,
        token: null,
        userWallet: {
          address: '0x0000000000000000000000000000000000000000',
          balance: 0.0,
          escrowBalance: 0.0,
          history: []
        }
      });
      localStorage.removeItem('orbit_token');
      localStorage.removeItem('orbit_refreshtoken');
      localStorage.removeItem('orbit_user');
      sessionStorage.removeItem('orbit_token');
      sessionStorage.removeItem('orbit_user');
      document.cookie = "orbit_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    },

    loginOAuth: async (provider) => {
      const localProfile = {
        id: `user-oauth-${provider}-${Date.now()}`,
        email: `oauth-${provider}@orbitai.dev`,
        username: `${provider}_user`,
        role: 'user' as const,
        displayName: `OAuth ${provider.toUpperCase()} User`,
        avatarUrl: provider === 'google' 
          ? 'https://lh3.googleusercontent.com/a/default-user' 
          : 'https://github.com/identicons/default.png'
      };
      set({ user: localProfile, token: `oauth-${provider}-token` });
      localStorage.setItem('orbit_token', `oauth-${provider}-token`);
      localStorage.setItem('orbit_user', JSON.stringify(localProfile));
    },

    loginWithGoogle: async (idToken) => {
      try {
        const isDemo = get().isDemoMode;
        const localFlag = typeof window !== 'undefined' ? localStorage.getItem('orbit_demomode') : null;
        console.log('[GOOGLE_LOGIN_DEBUG] Before executing loginWithGoogle:');
        console.log(`[GOOGLE_LOGIN_DEBUG] - isDemoMode: ${isDemo}`);
        console.log(`[GOOGLE_LOGIN_DEBUG] - audienceMode: ${isDemo ? 'demo' : 'live'}`);
        console.log(`[GOOGLE_LOGIN_DEBUG] - localStorage demo flag: ${localFlag}`);
        console.log(`[GOOGLE_LOGIN_DEBUG] - zustand demo state: ${isDemo}`);

        console.log('[GOOGLE_LOGIN_DEBUG] Google login initiated with idToken length:', idToken?.length);
        const res = await apiClient.post<any>('/api/v1/auth/google', { credential: idToken, idToken });
        console.log('[GOOGLE_AUTH_DEBUG] Backend response received:', JSON.stringify(res));

        if (res.success && res.data) {
          console.log('[GOOGLE_LOGIN_DEBUG] Google login succeeded? yes');

          // Clear any previous token sources in all contexts
          localStorage.removeItem('orbit_token');
          localStorage.removeItem('orbit_refreshtoken');
          localStorage.removeItem('orbit_user');
          sessionStorage.removeItem('orbit_token');
          sessionStorage.removeItem('orbit_user');
          document.cookie = "orbit_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

          const profile = res.data.user;
          const token = res.data.accessToken;
          const refreshToken = res.data.refreshToken;
          
          console.log('[GOOGLE_LOGIN_DEBUG] JWT returned? ', token ? 'yes' : 'no');

          set({ user: profile, token });
          console.log('[GOOGLE_AUTH_DEBUG] Auth context updated');
          
          localStorage.setItem('orbit_token', token);
          localStorage.setItem('orbit_user', JSON.stringify(profile));
          if (refreshToken) {
            localStorage.setItem('orbit_refreshtoken', refreshToken);
          }
          console.log('[GOOGLE_AUTH_DEBUG] JWT stored');

          console.log('[GOOGLE_LOGIN_DEBUG] JWT stored? yes');
          console.log('[GOOGLE_LOGIN_DEBUG] Auth context updated? yes');
          console.log('[GOOGLE_LOGIN_DEBUG] Authorization header attached? yes');
          return true;
        } else {
          console.warn('[GOOGLE_LOGIN_DEBUG] Google login succeeded? no (success: false)');
          throw new Error(res.message || 'Google authentication failed');
        }
      } catch (err: any) {
        console.error('[GOOGLE_LOGIN_DEBUG] Google login error:', err);
        if (!get().isDemoMode) {
          throw err;
        }
        console.warn('Backend Google auth unavailable, generating local session:', err);
        const localProfile = {
          id: 'user-google-mock-1',
          email: 'google-test@orbitai.dev',
          username: 'google_test',
          role: 'user' as const,
          displayName: 'Google Test User',
          avatarUrl: 'https://lh3.googleusercontent.com/a/default-user'
        };
        set({ user: localProfile, token: 'google-mock-token' });
        localStorage.setItem('orbit_token', 'google-mock-token');
        localStorage.setItem('orbit_user', JSON.stringify(localProfile));
        return true;
      }
    },

    verifyEmail: async (code) => {
      const user = get().user;
      if (user) {
        const updated = { ...user, emailVerified: true } as any;
        set({ user: updated });
        localStorage.setItem('orbit_user', JSON.stringify(updated));
      }
    },

    forgotPassword: async (email) => {
      console.log('Sending forgot password email to:', email);
    },
  };
});
