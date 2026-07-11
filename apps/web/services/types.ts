import { Agent, Workflow, TaskNode, ExecutionLog, Transaction, WalletState } from '@nexus-ai/types';

export interface IWalletService {
  getBalance(): Promise<WalletState>;
  getTransactions(): Promise<Transaction[]>;
  deposit(amount: number): Promise<{ success: boolean; message?: string }>;
  withdraw(amount: number): Promise<{ success: boolean; message?: string }>;
  transfer(amount: number, recipientAddress: string): Promise<{ success: boolean; message?: string }>;
}

export interface IWorkflowService {
  getWorkflow(id: string): Promise<Workflow | null>;
  getWorkflowLogs(id: string): Promise<ExecutionLog[]>;
  generateWorkflow(query: string, routingMode: string, budget: number): Promise<Workflow>;
  runWorkflow(id: string): Promise<{ success: boolean; message?: string }>;
}

export interface IDashboardData {
  activeWorkflows: number;
  completedWorkflows: number;
  failedWorkflows: number;
  publishedAgents: number;
  walletBalance: number;
  todayTokens: number;
  todayInferenceCost: number;
  averageLatency: number;
  platformRevenue: number;
  recentWorkflows: any[];
  activeUsers: number;
  systemHealth: string;
}

export interface IDashboardService {
  getDashboardData(): Promise<IDashboardData>;
  getActivityFeed(): Promise<any[]>;
}

export interface IAnalyticsService {
  getRevenueData(): Promise<any[]>;
  getPlatformMetrics(): Promise<any>;
  getMarketplaceMetrics(): Promise<any>;
  getAgentMetrics(): Promise<any[]>;
  getAiMetrics(): Promise<any>;
  getSystemMetrics(): Promise<any>;
  getWorkflowMetrics(): Promise<any>;
}
