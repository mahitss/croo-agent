import { create } from 'zustand';
import { Agent, Workflow, TaskNode, ExecutionLog, Transaction, WalletState } from '@nexus-ai/types';
import { apiService } from '../services/api';

interface NexusState {
  agents: Agent[];
  activeWorkflow: Workflow | null;
  executionLogs: ExecutionLog[];
  userWallet: WalletState;
  agentWallets: Record<string, WalletState>;
  isRunning: boolean;
  currentPhaseIndex: number;
  userQuery: string;
  
  // Actions
  setUserQuery: (query: string) => void;
  startExecution: (query: string, routingMode: 'cheapest' | 'fastest' | 'accuracy' | 'balanced', budget: number) => Promise<void>;
  resetExecution: () => void;
  setRoutingMode: (mode: 'cheapest' | 'fastest' | 'accuracy' | 'balanced') => void;
  setBudget: (budget: number) => void;
  registerAgent: (agent: Omit<Agent, 'id' | 'rating' | 'reviewsCount' | 'trustScore' | 'verificationCount' | 'failureRate' | 'walletAddress' | 'status'>) => void;
  depositUserWallet: (amount: number) => void;
  withdrawUserWallet: (amount: number) => void;
  initialize: () => Promise<void>;
  resetDemoMode: () => void;
}

const seedAgents: Agent[] = [
  {
    id: 'agent-research-1',
    name: 'InsightFinder Pro',
    version: '1.2.0',
    description: 'Deep-dive academic and market research agent. Summarizes complex documents and extracts tabular data.',
    category: 'Research',
    skills: ['market analysis', 'web scraping', 'data synthesis', 'academic lookup'],
    endpoint: 'http://localhost:5001/research',
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
    endpoint: 'http://localhost:5002/search',
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
    endpoint: 'http://localhost:5003/finance',
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
    endpoint: 'http://localhost:5004/legal',
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
    endpoint: 'http://localhost:5005/code',
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
    endpoint: 'http://localhost:5006/security',
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
    endpoint: 'http://localhost:5007/translate',
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
    endpoint: 'http://localhost:5008/verify',
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

export const useNexusStore = create<NexusState>((set, get) => {
  // Initialize wallets
  const initialAgentWallets: Record<string, WalletState> = {};
  seedAgents.forEach(agent => {
    initialAgentWallets[agent.id] = {
      address: agent.walletAddress,
      balance: 15.0,
      escrowBalance: 0.0,
      history: []
    };
  });

  return {
    agents: seedAgents,
    activeWorkflow: null,
    executionLogs: [],
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

    setUserQuery: (query) => set({ userQuery: query }),

    resetExecution: () => set({
      activeWorkflow: null,
      executionLogs: [],
      isRunning: false,
      currentPhaseIndex: 0
    }),

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

    registerAgent: (agent) => {
      const newAgent: Agent = {
        ...agent,
        id: `agent-custom-${Date.now()}`,
        rating: 5.0,
        reviewsCount: 0,
        trustScore: 100,
        verificationCount: 0,
        failureRate: 0,
        walletAddress: `0x${Math.random().toString(16).substr(2, 8).toUpperCase()}...${Math.random().toString(16).substr(2, 4)}`,
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
    },

    depositUserWallet: (amount) => set((state) => {
      const tx: Transaction = {
        id: `tx-deposit-${Date.now()}`,
        senderAddress: 'EXTERNAL_BANK',
        receiverAddress: state.userWallet.address,
        amount,
        type: 'deposit',
        timestamp: new Date().toISOString(),
        status: 'completed',
        txHash: '0x' + Math.random().toString(16).substr(2, 40)
      };

      return {
        userWallet: {
          ...state.userWallet,
          balance: state.userWallet.balance + amount,
          history: [tx, ...state.userWallet.history]
        }
      };
    }),

    withdrawUserWallet: (amount) => set((state) => {
      if (state.userWallet.balance < amount) return {};
      const tx: Transaction = {
        id: `tx-withdraw-${Date.now()}`,
        senderAddress: state.userWallet.address,
        receiverAddress: 'EXTERNAL_BANK',
        amount,
        type: 'withdrawal',
        timestamp: new Date().toISOString(),
        status: 'completed',
        txHash: '0x' + Math.random().toString(16).substr(2, 40)
      };

      return {
        userWallet: {
          ...state.userWallet,
          balance: state.userWallet.balance - amount,
          history: [tx, ...state.userWallet.history]
        }
      };
    }),

    startExecution: async (query, routingMode, budget) => {
      const state = get();
      if (state.isRunning) return;

      set({ isRunning: true, userQuery: query, currentPhaseIndex: 1, executionLogs: [] });

      const log = (phase: ExecutionLog['phase'], message: string, type: ExecutionLog['type'] = 'info', metadata?: any) => {
        set((prev) => ({
          executionLogs: [
            ...prev.executionLogs,
            { id: `log-${Date.now()}-${Math.random()}`, timestamp: new Date().toISOString(), phase, message, type, metadata }
          ]
        }));
      };

      const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

      try {
        // --- PHASE 1: Intent Detection ---
        log('intent', `LLM processing intent for: "${query}"`);
        await delay(1200);
        log('intent', 'Detected actions: Research, Financial Analysis, Verification, Translation', 'success');

        // --- PHASE 2: Workflow Planner (DAG) ---
        set({ currentPhaseIndex: 2 });
        log('dag', 'Generating Directed Acyclic Graph (DAG) for tasks...');
        await delay(1000);

        const nodes: TaskNode[] = [
          { id: 'node-1', name: 'Retrieve Tesla Financials', description: 'Fetch the Q1 2026 earnings reports', capability: 'market analysis', costEstimate: 0.15, timeEstimate: 1200, status: 'pending' },
          { id: 'node-2', name: 'Generate Balance Analysis', description: 'Analyze capital structure, liabilities, and profitability', capability: 'balance sheet analysis', costEstimate: 0.25, timeEstimate: 1600, status: 'pending' },
          { id: 'node-3', name: 'Verify Analytics Report', description: 'Ensure the arithmetic and citations are sound', capability: 'verification', costEstimate: 0.10, timeEstimate: 800, status: 'pending' },
          { id: 'node-4', name: 'Translate Report to Chinese', description: 'Translate output to target locale', capability: 'translation', costEstimate: 0.08, timeEstimate: 550, status: 'pending' }
        ];

        const edges = [
          { id: 'e1-2', source: 'node-1', target: 'node-2' },
          { id: 'e2-3', source: 'node-2', target: 'node-3' },
          { id: 'e3-4', source: 'node-3', target: 'node-4' }
        ];

        const workflow: Workflow = {
          id: `wf-${Date.now()}`,
          name: 'Tesla Financial Investment Workflow',
          query,
          nodes,
          edges,
          budget,
          routingMode,
          retryCount: 0,
          status: 'running',
          createdAt: new Date().toISOString()
        };

        set({ activeWorkflow: workflow });
        log('dag', `DAG created successfully with ${nodes.length} stages linked consecutively.`, 'success');

        // --- PHASE 3: Discovery & Evaluation ---
        set({ currentPhaseIndex: 3 });
        await delay(1200);
        log('discovery', 'Querying vector database for agents matching skills: "market analysis", "financial analysis", "verification", "translation"...');
        await delay(800);
        log('discovery', 'Discovered 4 potential candidate pools.');

        set({ currentPhaseIndex: 4 });
        log('evaluation', 'Evaluating agent bids based on routing mode: ' + routingMode);
        await delay(1200);

        // Selection based on mode
        const assignedAgents: Record<string, string> = {
          'node-1': 'agent-research-1', // InsightFinder Pro
          'node-2': 'agent-finance-1',  // FinAnalytica
          'node-3': 'agent-verify-1',   // ConsensuVerify
          'node-4': 'agent-translate-1' // Translatio
        };

        if (routingMode === 'fastest') {
          assignedAgents['node-1'] = 'agent-research-2'; // QuickScan (450ms) instead of InsightFinder (1200ms)
          workflow.nodes[0].costEstimate = 0.05;
          workflow.nodes[0].timeEstimate = 450;
        }

        nodes.forEach(node => {
          node.assignedAgentId = assignedAgents[node.id];
        });
        set({ activeWorkflow: { ...workflow, nodes } });

        log('evaluation', `Matches: Task 1 -> ${state.agents.find(a=>a.id===assignedAgents['node-1'])?.name}, Task 2 -> FinAnalytica, Task 3 -> ConsensuVerify, Task 4 -> Translatio`, 'success');

        // --- PHASE 5: Negotiation ---
        set({ currentPhaseIndex: 5 });
        log('negotiation', 'Negotiating execution fees and SLA terms with candidate nodes...');
        await delay(1200);
        const totalCost = workflow.nodes.reduce((acc, curr) => acc + curr.costEstimate, 0);
        log('negotiation', `Agreements reached. Cumulative fee locked: ${totalCost.toFixed(2)} USDC`, 'success');

        // --- PHASE 6: Payment (CAP Transaction) ---
        set({ currentPhaseIndex: 6 });
        log('payment', `Initiating escrow transfer of ${totalCost.toFixed(2)} USDC from User Wallet...`);
        await delay(1000);

        if (get().userWallet.balance < totalCost) {
          log('payment', 'Insufficient funds in wallet! Aborting.', 'error');
          set({ isRunning: false, currentPhaseIndex: 0 });
          return;
        }

        // Lock payment into escrow
        const escrowTx: Transaction = {
          id: `tx-escrow-${Date.now()}`,
          senderAddress: get().userWallet.address,
          receiverAddress: 'ESCROW_VAULT',
          amount: totalCost,
          type: 'escrow_hold',
          timestamp: new Date().toISOString(),
          status: 'completed',
          txHash: '0x' + Math.random().toString(16).substr(2, 40)
        };

        set(state => ({
          userWallet: {
            ...state.userWallet,
            balance: state.userWallet.balance - totalCost,
            escrowBalance: state.userWallet.escrowBalance + totalCost,
            history: [escrowTx, ...state.userWallet.history]
          }
        }));

        log('payment', `Escrow payment locked. TxHash: ${escrowTx.txHash.substr(0, 10)}... Completed.`, 'success');

        // --- PHASE 7 & 8: Execution & Verification ---
        set({ currentPhaseIndex: 7 });

        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          const agentId = node.assignedAgentId!;
          const agent = state.agents.find(a => a.id === agentId)!;

          node.status = 'running';
          set({ activeWorkflow: { ...workflow, nodes } });
          
          log('execution', `Task: "${node.name}" dispatched to agent: ${agent.name}...`);
          await delay(node.timeEstimate);

          node.status = 'completed';
          
          if (node.id === 'node-1') {
            node.output = `[NVIDIA/Tesla Chip Comparison] Tesla full self-driving hardware relies on customized HW4 neural engine processors built on 4nm process tech. Production rates target 250,000 computing cards annually...`;
          } else if (node.id === 'node-2') {
            node.output = `[Financial Analysis Matrix] Balance sheet assets increased by 14% YoY. Cash holding stands at $29B. R&D expenditure optimized at 8.2% of total revenue. Net profit margin forecast adjusted to +4.5%...`;
          } else if (node.id === 'node-3') {
            // Verification step
            set({ currentPhaseIndex: 8 });
            log('verification', `Verification agent: ${agent.name} checking outputs of FinAnalytica...`);
            await delay(node.timeEstimate);
            node.output = `[Verification Summary] Consensus score: 98.4%. Calculations verified. Financial metrics match official disclosures. Integrity holds.`;
            log('verification', 'Output integrity checked. Pass.', 'success');
            set({ currentPhaseIndex: 7 }); // Return index back to execution
          } else if (node.id === 'node-4') {
            node.output = `[Translation Report - Tesla Financial Investment Report] Tesla full self-driving hardware adopts custom HW4 neural engine processors built on 4nm process tech. Annual production target stands at 25,000 computing boards. Balance sheet assets increased by 14% YoY. R&D expenditure accounted for 8.2% of total revenue...`;
          }

          set({ activeWorkflow: { ...workflow, nodes } });
          log('execution', `Task: "${node.name}" successfully executed by ${agent.name}.`, 'success');
        }

        // --- PHASE 9: Settlement (Release payment to agents) ---
        set({ currentPhaseIndex: 9 });
        log('settlement', 'Releasing escrowed funds to executing agent nodes...');
        await delay(1200);

        set(state => {
          const updatedAgentWallets = { ...state.agentWallets };
          const userWallet = { ...state.userWallet };
          const releaseTransactions: Transaction[] = [];

          nodes.forEach(node => {
            const agentId = node.assignedAgentId!;
            const agent = state.agents.find(a => a.id === agentId)!;
            const fee = node.costEstimate;

            // Increment agent wallet balance
            const wallet = updatedAgentWallets[agentId];
            const agentTx: Transaction = {
              id: `tx-agent-earn-${Date.now()}-${node.id}`,
              senderAddress: 'ESCROW_VAULT',
              receiverAddress: agent.walletAddress,
              amount: fee,
              type: 'escrow_release',
              timestamp: new Date().toISOString(),
              status: 'completed',
              txHash: '0x' + Math.random().toString(16).substr(2, 40),
              taskId: node.id
            };

            updatedAgentWallets[agentId] = {
              ...wallet,
              balance: wallet.balance + fee,
              history: [agentTx, ...wallet.history]
            };

            releaseTransactions.push(agentTx);
          });

          // Deduct from user escrow
          userWallet.escrowBalance = Math.max(0, userWallet.escrowBalance - totalCost);
          userWallet.history = [...releaseTransactions, ...userWallet.history];

          return {
            agentWallets: updatedAgentWallets,
            userWallet
          };
        });

        log('settlement', 'USDC payouts distributed. Escrow accounts cleared.', 'success');

        workflow.status = 'completed';
        set({ activeWorkflow: { ...workflow }, isRunning: false, currentPhaseIndex: 9 });
        log('settlement', 'Workflow execution finalized. Outputs aggregated and saved.', 'success');

      } catch (err: any) {
        log('execution', `Workflow crashed: ${err.message || err}`, 'error');
        if (get().activeWorkflow) {
          set(state => ({
            activeWorkflow: { ...state.activeWorkflow!, status: 'failed' },
            isRunning: false
          }));
        }
      }
    },

    initialize: async () => {
      try {
        const data = await apiService.getAgentsList() as any;
        if (data && data.success && Array.isArray(data.data) && data.data.length > 0) {
          set({ agents: data.data });
        }
      } catch (err) {
        console.warn('API Gateway offline. Running in sandbox mode.', err);
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
      set({
        agents: seedAgents,
        activeWorkflow: null,
        executionLogs: [],
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
  };
});
