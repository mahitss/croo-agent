export interface Agent {
  id: string;
  name: string;
  version: string;
  description: string;
  category: string;
  skills: string[];
  endpoint: string;
  price: number; // in USDC per call/task
  rating: number;
  reviewsCount: number;
  walletAddress: string;
  trustScore: number; // 0 to 100
  latency: number; // in milliseconds
  accuracy: number; // percentage 0 to 100
  verificationCount: number;
  failureRate: number; // percentage
  status: 'active' | 'inactive' | 'busy';
  tags: string[];
}

export interface TaskNode {
  id: string;
  name: string;
  description: string;
  capability: string;
  costEstimate: number;
  timeEstimate: number;
  status: 'pending' | 'running' | 'completed' | 'failed';
  assignedAgentId?: string;
  output?: string;
  error?: string;
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
}

export interface Workflow {
  id: string;
  name: string;
  query: string;
  nodes: TaskNode[];
  edges: WorkflowEdge[];
  budget: number;
  routingMode: 'cheapest' | 'fastest' | 'accuracy' | 'balanced';
  retryCount: number;
  status: 'pending' | 'running' | 'completed' | 'failed';
  createdAt: string;
}

export interface ExecutionLog {
  id: string;
  timestamp: string;
  phase: 'intent' | 'dag' | 'discovery' | 'evaluation' | 'negotiation' | 'payment' | 'execution' | 'verification' | 'settlement';
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  metadata?: any;
}

export interface Transaction {
  id: string;
  senderAddress: string;
  receiverAddress: string;
  amount: number;
  type: 'escrow_hold' | 'escrow_release' | 'escrow_refund' | 'deposit' | 'withdrawal';
  timestamp: string;
  status: 'pending' | 'completed' | 'failed';
  txHash: string;
  taskId?: string;
}

export interface WalletState {
  address: string;
  balance: number;
  escrowBalance: number;
  history: Transaction[];
}
