export interface AgentMetadata {
  id: string;
  name: string;
  category: string;
  price: number;
  trustScore: number;
  latency: number;
  accuracy: number;
  rating: number;
  reviewsCount: number;
  online: boolean;
}

export interface TaskNode {
  id: string;
  label: string;
  status: 'pending' | 'queued' | 'running' | 'completed' | 'failed';
  estimatedCost: number;
  agent?: AgentMetadata;
}
