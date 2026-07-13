import { Agent } from '@nexus-ai/types';
import { AgentRepository } from '../repositories';

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

export class DemoAgentRepository implements AgentRepository {
  private static localReviews: Record<string, any[]> = {};

  async getAgents(): Promise<Agent[]> {
    return seedAgents;
  }

  async searchAgents(query: string): Promise<Agent[]> {
    const q = query.toLowerCase();
    return seedAgents.filter(
      a =>
        a.name.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.skills.some(s => s.toLowerCase().includes(q))
    );
  }

  async getAgentById(id: string): Promise<Agent | null> {
    return seedAgents.find(a => a.id === id) || null;
  }

  async getAgentReviews(id: string): Promise<any[]> {
    if (!DemoAgentRepository.localReviews[id]) {
      DemoAgentRepository.localReviews[id] = [
        { id: `rev-1-${id}`, rating: 5, comment: 'Excellent compliance report.', reviewer: 'SwarmMaster', timestamp: new Date().toISOString() },
        { id: `rev-2-${id}`, rating: 4, comment: 'Good latency but higher gas fees.', reviewer: 'EthersUser', timestamp: new Date().toISOString() }
      ];
    }
    return DemoAgentRepository.localReviews[id];
  }

  async submitAgentReview(id: string, rating: number, comment: string): Promise<any> {
    const newReview = {
      id: `rev-${Date.now()}`,
      rating,
      comment,
      reviewer: 'SandboxUser',
      timestamp: new Date().toISOString()
    };
    if (!DemoAgentRepository.localReviews[id]) {
      DemoAgentRepository.localReviews[id] = [];
    }
    DemoAgentRepository.localReviews[id].unshift(newReview);
    return newReview;
  }

  async registerAgentCap(id: string, config: any): Promise<any> {
    return { success: true, message: 'Capability registered successfully in sandbox', config };
  }

  async discoverCapAgents(): Promise<Agent[]> {
    return seedAgents;
  }

  async invokeAgentCap(id: string, payload: any): Promise<any> {
    return { success: true, agentId: id, response: 'Mock sandbox response.', payload };
  }

  async syncAgentCap(id: string): Promise<any> {
    return { success: true, agentId: id, status: 'synced' };
  }

  async getAgentCapStatus(id: string): Promise<any> {
    return { status: 'active', capabilities: ['sast', 'market analysis'] };
  }
}
