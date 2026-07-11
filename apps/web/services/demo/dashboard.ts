import { IDashboardService, IDashboardData } from '../types';
import { useDemoStore } from '../../store/demoStore';

export const demoDashboardService: IDashboardService = {
  async getDashboardData(): Promise<IDashboardData> {
    const store = useDemoStore.getState();
    const wfs = store.demoWorkflow ? [store.demoWorkflow] : [];
    const running = wfs.filter((w) => w.status === 'running').length;
    const completed = wfs.filter((w) => w.status === 'completed').length;
    const failed = wfs.filter((w) => w.status === 'failed').length;
    
    return {
      activeWorkflows: running,
      completedWorkflows: completed || 1402, // Seed defaults for wow factor in sandbox
      failedWorkflows: failed || 18,
      publishedAgents: 8,
      walletBalance: store.demoWallet.balance,
      todayTokens: 1489200,
      todayInferenceCost: 0.89,
      averageLatency: 820,
      platformRevenue: 15.0,
      recentWorkflows: wfs.map(w => ({
        id: w.id,
        title: w.name,
        status: w.status,
        cost: w.nodes.reduce((sum, n) => sum + n.costEstimate, 0),
        createdAt: w.createdAt
      })),
      activeUsers: 840,
      systemHealth: '99.98%'
    };
  },

  async getActivityFeed(): Promise<any[]> {
    return [
      { time: '1s ago', type: 'Escrow Lock', desc: 'Locked 0.15 USDC for InsightFinder Pro' },
      { time: '4s ago', type: 'Consensus Check', desc: 'SLA score 98.4% checked for FinAnalytica' },
      { time: '12s ago', type: 'Payout Settle', desc: 'Released 0.08 USDC to Translatio P2P wallet' }
    ];
  }
};
