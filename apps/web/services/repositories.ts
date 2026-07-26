import { Agent, Workflow, ExecutionLog, Transaction, WalletState } from '@nexus-ai/types';
import { IDashboardData } from './types';

export interface AgentRepository {
  getAgents(): Promise<Agent[]>;
  searchAgents(query: string): Promise<Agent[]>;
  getAgentById(id: string): Promise<Agent | null>;
  getAgentReviews(id: string): Promise<any[]>;
  submitAgentReview(id: string, rating: number, comment: string): Promise<any>;
  registerAgentCap(id: string, config: any): Promise<any>;
  discoverCapAgents(): Promise<Agent[]>;
  invokeAgentCap(id: string, payload: any): Promise<any>;
  syncAgentCap(id: string): Promise<any>;
  getAgentCapStatus(id: string): Promise<any>;
}

export interface WorkflowRepository {
  getWorkflow(id: string): Promise<Workflow | null>;
  getWorkflowLogs(id: string): Promise<ExecutionLog[]>;
  generateWorkflow(query: string, routingMode: string, budget: number): Promise<Workflow>;
  runWorkflow(id: string): Promise<{ success: boolean; message?: string }>;
  renameNode(workflowId: string, nodeId: string, newName: string): Promise<Workflow>;
  deleteNode(workflowId: string, nodeId: string): Promise<Workflow>;
  retryNode(workflowId: string, nodeId: string): Promise<Workflow>;
  pauseWorkflow(id: string): Promise<{ success: boolean }>;
  resumeWorkflow(id: string): Promise<{ success: boolean }>;
  cancelWorkflow(id: string): Promise<{ success: boolean }>;
  saveWorkflowTemplate(workflow: Workflow): Promise<void>;
}

export interface WalletRepository {
  getBalance(): Promise<WalletState>;
  getTransactions(): Promise<Transaction[]>;
  deposit(amount: number): Promise<{ success: boolean; message?: string }>;
  withdraw(amount: number): Promise<{ success: boolean; message?: string }>;
  transfer(amount: number, recipientAddress: string): Promise<{ success: boolean; message?: string }>;
  getCapTransactions(): Promise<any[]>;
  linkCapWallet(): Promise<{ success: boolean }>;
  settle(): Promise<{ success: boolean; message?: string }>;
}

export interface AnalyticsRepository {
  getDashboardData(): Promise<IDashboardData>;
  getActivityFeed(): Promise<any[]>;
  getRevenueData(): Promise<any[]>;
  getPlatformMetrics(): Promise<any>;
  getMarketplaceMetrics(): Promise<any>;
  getAgentMetrics(): Promise<any[]>;
  getAiMetrics(): Promise<any>;
  getSystemMetrics(): Promise<any>;
  getWorkflowMetrics(): Promise<any>;
}
