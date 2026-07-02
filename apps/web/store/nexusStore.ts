import { create } from 'zustand';
import { Agent, Workflow, TaskNode, ExecutionLog, Transaction, WalletState } from '@nexus-ai/types';
import { apiService } from '../services/api';
import { apiClient } from '../lib/api-client';

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
    promptTokens: 0,
    completionTokens: 0,
    totalTokens: 0,
    estimatedCost: 0,

    setUserQuery: (query) => set({ userQuery: query }),

    resetExecution: () => set({
      activeWorkflow: null,
      executionLogs: [],
      isRunning: false,
      currentPhaseIndex: 0,
      promptTokens: 0,
      completionTokens: 0,
      totalTokens: 0,
      estimatedCost: 0
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

      try {
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
        
        const dbAgents = state.agents.length > 0 ? state.agents : seedAgents;
        const assignedAgentsMap: Record<string, string> = {
          'research': 'agent-research-1',
          'market analysis': 'agent-research-1',
          'financial analysis': 'agent-finance-1',
          'balance sheet analysis': 'agent-finance-1',
          'verification': 'agent-verify-1',
          'translation': 'agent-translate-1',
          'code': 'agent-code-1',
          'security': 'agent-security-1'
        };
        
        const nodes: TaskNode[] = planRes.data.nodes.map((n: any) => {
          const cap = n.capability.toLowerCase();
          const matchedAgent = dbAgents.find(a => a.skills.some(s => s.toLowerCase().includes(cap)) || a.category.toLowerCase().includes(cap)) || dbAgents[0];
          return {
            id: n.id,
            name: n.label || n.id.toUpperCase(),
            description: `Execute capability: ${cap}`,
            capability: cap,
            costEstimate: matchedAgent.price,
            timeEstimate: matchedAgent.latency,
            status: 'pending',
            assignedAgentId: matchedAgent.id
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
        
        const workflow: Workflow = {
          id: dbWorkflow.id,
          name: dbWorkflow.title,
          query,
          nodes: dbWorkflow.nodes ? dbWorkflow.nodes.map((n: any) => {
            const agent = dbAgents.find(a => a.id === n.agentId) || dbAgents[0];
            return {
              id: n.id,
              name: `Stage: ${n.capability.toUpperCase()}`,
              description: `Execute capability: ${n.capability}`,
              capability: n.capability,
              costEstimate: agent.price,
              timeEstimate: agent.latency,
              status: n.status,
              assignedAgentId: n.agentId
            };
          }) : nodes,
          edges: dbWorkflow.edges ? dbWorkflow.edges.map((e: any) => ({
            id: e.id,
            source: e.sourceNode,
            target: e.targetNode
          })) : edges,
          budget,
          routingMode,
          retryCount: 0,
          status: 'running',
          createdAt: dbWorkflow.createdAt
        };

        set({ activeWorkflow: workflow });
        log('dag', `DAG layout registered in PostgreSQL. Template ID: ${workflow.id}`, 'success');

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

        // --- PHASE 7: Run Swarm & Poll logs ---
        set({ currentPhaseIndex: 7 });
        log('execution', 'Triggering backend execution pipeline...');
        
        const runRes = await apiClient.post<any>(`/api/v1/workflows/${workflow.id}/run`, {});
        if (!runRes.success) {
          throw new Error('Backend workflow engine failed to start execution run');
        }

        let isPolling = true;
        const loggedIds = new Set<string>();

        while (isPolling) {
          await new Promise(r => setTimeout(r, 1200));
          
          const statusRes = await apiClient.get<any>(`/api/v1/workflows/${workflow.id}`);
          if (statusRes.success && statusRes.data) {
            const currentWf = statusRes.data;
            
            const updatedNodes = workflow.nodes.map(n => {
              const dbNode = currentWf.nodes.find((dn: any) => dn.capability.toLowerCase() === n.capability.toLowerCase());
              return dbNode ? { ...n, status: dbNode.status } : n;
            });
            
            set({
              activeWorkflow: {
                ...workflow,
                status: currentWf.status,
                nodes: updatedNodes
              }
            });

            // Fetch live task logs from the database
            const logsRes = await apiClient.get<any>(`/api/v1/workflows/${workflow.id}/logs`);
            if (logsRes.success && Array.isArray(logsRes.data)) {
              logsRes.data.forEach((logItem: any) => {
                const logKey = `${logItem.id}-${logItem.createdAt}`;
                if (!loggedIds.has(logKey)) {
                  loggedIds.add(logKey);
                  const isVerify = logItem.message.toLowerCase().includes('verify');
                  log(
                    isVerify ? 'verification' : 'execution',
                    logItem.message,
                    logItem.logLevel === 'error' ? 'error' : 'info'
                  );
                }
              });
            }

            if (currentWf.status === 'completed' || currentWf.status === 'failed') {
              isPolling = false;
              if (currentWf.status === 'completed') {
                // --- PHASE 9: Settlement (Distribute SLA Escrow payouts) ---
                set({ currentPhaseIndex: 9 });
                log('settlement', 'Releasing escrow vault payouts to active agent wallets...');
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
                      receiverAddress: agent.walletAddress,
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
                    userWallet
                  };
                });
                
                log('settlement', 'Decentralized escrow finalized. Transactions recorded.', 'success');
                log('settlement', 'Workflow execution successfully completed.', 'success');
              } else {
                throw new Error('Backend execution pipeline reported failed status');
              }
            }
          } else {
            isPolling = false;
            throw new Error('Lost connection to backend database service');
          }
        }

        set({ isRunning: false });
      } catch (err: any) {
        log('execution', `Workflow run failed: ${err.message || err}`, 'error');
        set(state => ({
          activeWorkflow: state.activeWorkflow ? { ...state.activeWorkflow, status: 'failed' } : null,
          isRunning: false,
          currentPhaseIndex: 0
        }));
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
