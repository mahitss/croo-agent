const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (typeof window !== "undefined"
    ? (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
      ? "http://localhost:10000"
      : window.location.origin)
    : "http://localhost:10000");

// Consistent Mock dataset for Demo Mode
const demoSeedAgents = [
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
    skills: ['contract audit', 'risk detection', 'privacy policy', 'clause analysis'],
    endpoint: 'https://api.orbitai.dev/api/v1/agents/legal-1/invoke',
    price: 0.35,
    rating: 4.7,
    reviewsCount: 98,
    walletAddress: '0x77F1d...89c5',
    trustScore: 92,
    latency: 1400,
    accuracy: 93,
    verificationCount: 56,
    failureRate: 3,
    status: 'active',
    tags: ['contract', 'privacy']
  }
];

class DemoModeManager {
  private static getStored<T>(key: string, defaultValue: T): T {
    if (typeof window === 'undefined') return defaultValue;
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : defaultValue;
  }

  private static setStored(key: string, val: any) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(val));
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new Event('nexus_store_update'));
    }
  }

  static isDemoMode(): boolean {
    if (typeof window === 'undefined') return true;
    const mode = localStorage.getItem('orbit_demomode');
    return mode === null ? true : mode === 'true';
  }

  static getWallet(): any {
    return this.getStored<any>('orbit_demo_wallet', {
      address: '0xUserWalletAddress789c',
      available: 100.0,
      reserved: 0.0,
      pending: 0.0
    });
  }

  static saveWallet(wallet: any) {
    this.setStored('orbit_demo_wallet', wallet);
  }

  static getTransactions(): any[] {
    return this.getStored<any[]>('orbit_demo_transactions', [
      { id: 'tx-1', senderAddress: 'EXTERNAL_BANK', receiverAddress: '0xUserWalletAddress789c', amount: 100.0, type: 'deposit', timestamp: new Date(Date.now() - 3600000).toISOString(), status: 'completed', txHash: '0x9d3f5c1aefb20c90c7ef1a2b34de569a7c832e01' }
    ]);
  }

  static saveTransactions(txs: any[]) {
    this.setStored('orbit_demo_transactions', txs);
  }

  static getNotifications(): any[] {
    return this.getStored<any[]>('orbit_demo_notifications', [
      { id: 'notif-1', title: 'SLA Warning', message: 'QuickScan latency exceeded 800ms limit threshold', type: 'warning', read: false, createdAt: new Date(Date.now() - 600000).toISOString() },
      { id: 'notif-2', title: 'Escrow Deposited', message: 'Reserved 1.25 USDC for Tesla Q1 intention', type: 'success', read: false, createdAt: new Date(Date.now() - 1200000).toISOString() }
    ]);
  }

  static saveNotifications(notifs: any[]) {
    this.setStored('orbit_demo_notifications', notifs);
  }

  static getActivityFeed(): any[] {
    return this.getStored<any[]>('orbit_demo_activity', [
      { time: '10m ago', type: 'Agent Published', desc: 'InsightFinder Pro listed in registry' },
      { time: '1h ago', type: 'Wallet Deposit', desc: 'Received 100.00 USDC from External Bank' }
    ]);
  }

  static saveActivityFeed(feed: any[]) {
    this.setStored('orbit_demo_activity', feed);
  }

  static getWorkflows(): any[] {
    return this.getStored<any[]>('orbit_demo_workflows', []);
  }

  static saveWorkflows(wfs: any[]) {
    this.setStored('orbit_demo_workflows', wfs);
  }

  static getAgents(): any[] {
    return this.getStored<any[]>('orbit_demo_agents', demoSeedAgents);
  }

  static simulateWorkflowRun(id: string) {
    const wfs = this.getWorkflows();
    const wf = wfs.find((w: any) => w.id === id);
    if (!wf) return;

    wf.status = 'running';
    wf.nodes.forEach((n: any) => n.status = 'pending');
    this.saveWorkflows(wfs);

    const totalCost = wf.nodes.reduce((sum: number, n: any) => sum + (n.costEstimate || 0.15), 0);
    const wallet = this.getWallet();
    wallet.available = Math.max(0, wallet.available - totalCost);
    wallet.reserved = wallet.reserved + totalCost;
    this.saveWallet(wallet);

    const holdTx = {
      id: `tx-hold-${Date.now()}`,
      senderAddress: wallet.address,
      receiverAddress: 'ESCROW_VAULT',
      amount: totalCost,
      type: 'escrow_hold',
      timestamp: new Date().toISOString(),
      status: 'completed',
      txHash: '0x' + Math.random().toString(16).substring(2, 42)
    };
    this.saveTransactions([holdTx, ...this.getTransactions()]);

    const logsKey = `orbit_demo_logs_${id}`;
    localStorage.setItem(logsKey, JSON.stringify([
      { id: `log-1-${Date.now()}`, createdAt: new Date().toISOString(), message: 'Workflow execution started', logLevel: 'info' }
    ]));

    let step = 0;
    const runStep = () => {
      const currentWfs = this.getWorkflows();
      const currentWf = currentWfs.find((w: any) => w.id === id);
      if (!currentWf || currentWf.status !== 'running') return;

      if (step < currentWf.nodes.length) {
        const node = currentWf.nodes[step];
        node.status = 'running';
        this.saveWorkflows(currentWfs);

        const logs = JSON.parse(localStorage.getItem(logsKey) || '[]');
        logs.push({
          id: `log-node-run-${Date.now()}-${step}`,
          createdAt: new Date().toISOString(),
          message: `Current node executing: ${node.capability.toUpperCase()} using agent ${node.agentId || 'InsightFinder'}`,
          logLevel: 'info'
        });
        localStorage.setItem(logsKey, JSON.stringify(logs));

        setTimeout(() => {
          const innerWfs = this.getWorkflows();
          const innerWf = innerWfs.find((w: any) => w.id === id);
          if (!innerWf || innerWf.status !== 'running') return;

          const innerNode = innerWf.nodes[step];
          innerNode.status = 'completed';
          this.saveWorkflows(innerWfs);

          const innerLogs = JSON.parse(localStorage.getItem(logsKey) || '[]');
          innerLogs.push({
            id: `log-node-comp-${Date.now()}-${step}`,
            createdAt: new Date().toISOString(),
            message: `Node completed successfully: ${innerNode.capability.toUpperCase()}`,
            logLevel: 'info'
          });
          localStorage.setItem(logsKey, JSON.stringify(innerLogs));

          step++;
          runStep();
        }, 1500);
      } else {
        currentWf.status = 'completed';
        this.saveWorkflows(currentWfs);

        const logs = JSON.parse(localStorage.getItem(logsKey) || '[]');
        logs.push({ id: `log-comp-${Date.now()}`, createdAt: new Date().toISOString(), message: 'Workflow completed successfully. Distributing escrow.', logLevel: 'info' });
        localStorage.setItem(logsKey, JSON.stringify(logs));

        const currentWallet = this.getWallet();
        currentWallet.reserved = Math.max(0, currentWallet.reserved - totalCost);
        this.saveWallet(currentWallet);

        const releaseTxs: any[] = [];
        currentWf.nodes.forEach((n: any) => {
          const releaseTx = {
            id: `tx-release-${Date.now()}-${n.id}`,
            senderAddress: 'ESCROW_VAULT',
            receiverAddress: '0xAgentWallet',
            amount: n.costEstimate || 0.15,
            type: 'escrow_release',
            timestamp: new Date().toISOString(),
            status: 'completed',
            txHash: '0x' + Math.random().toString(16).substring(2, 42)
          };
          releaseTxs.push(releaseTx);
        });
        this.saveTransactions([...releaseTxs, ...this.getTransactions()]);

        const notifs = this.getNotifications();
        notifs.unshift({
          id: `notif-${Date.now()}`,
          title: 'Workflow Succeeded',
          message: 'SLA verification passed successfully for ' + currentWf.title,
          type: 'success',
          read: false,
          createdAt: new Date().toISOString()
        });
        this.saveNotifications(notifs);

        const feed = this.getActivityFeed();
        feed.unshift({
          time: 'Just now',
          type: 'Workflow Completed',
          desc: 'Successfully finished ' + currentWf.title
        });
        this.saveActivityFeed(feed);
      }
    };

    setTimeout(runStep, 1000);
  }

  static handleGet(url: string): any {
    if (url === '/api/v1/agents') {
      return { success: true, data: this.getAgents() };
    }
    if (url === '/api/v1/wallet') {
      return { success: true, data: { address: this.getWallet().address } };
    }
    if (url === '/api/v1/wallet/balance') {
      const w = this.getWallet();
      return { success: true, data: { available: w.available, reserved: w.reserved, pending: w.pending } };
    }
    if (url === '/api/v1/wallet/transactions') {
      return { success: true, data: this.getTransactions() };
    }
    if (url === '/api/v1/notifications') {
      return { success: true, data: this.getNotifications() };
    }
    if (url === '/api/v1/analytics/dashboard') {
      const wfs = this.getWorkflows();
      const wallet = this.getWallet();
      const running = wfs.filter((w: any) => w.status === 'running').length;
      const completed = wfs.filter((w: any) => w.status === 'completed').length;
      const failed = wfs.filter((w: any) => w.status === 'failed').length;
      const txs = this.getTransactions();
      const platformRevenue = txs.filter((t: any) => t.type === 'escrow_release').reduce((sum: number, t: any) => sum + t.amount, 0);
      
      const recentWorkflows = wfs.slice(-5).map((w: any) => ({
        id: w.id,
        title: w.name,
        status: w.status,
        cost: w.nodes.reduce((sum: number, n: any) => sum + (n.costEstimate || 0), 0),
        createdAt: w.createdAt
      }));

      return {
        success: true,
        data: {
          activeWorkflows: running,
          completedWorkflows: completed,
          failedWorkflows: failed,
          publishedAgents: this.getAgents().length,
          walletBalance: wallet.available,
          todayTokens: 1489200,
          todayInferenceCost: 0.89,
          averageLatency: 820,
          platformRevenue,
          recentWorkflows,
          activeUsers: 840,
          systemHealth: '99.98%'
        }
      };
    }
    if (url === '/api/v1/analytics/revenue') {
      return {
        success: true,
        data: [
          { date: '08:00', revenue: 4.2 },
          { date: '09:00', revenue: 8.5 },
          { date: '10:00', revenue: 14.8 },
          { date: '11:00', revenue: 22.1 },
          { date: '12:00', revenue: 32.5 },
          { date: '13:00', revenue: 45.3 },
          { date: '14:00', revenue: 55.7 }
        ]
      };
    }
    if (url === '/api/v1/analytics/platform') {
      const wfs = this.getWorkflows();
      const total = wfs.length;
      const completed = wfs.filter((w: any) => w.status === 'completed').length;
      const successRate = total > 0 ? (completed / total) * 100 : 99.92;
      return {
        success: true,
        data: {
          apiRequestsCount: total * 12 + 45,
          successRate: Number(successRate.toFixed(2)),
          errorRate: Number((100 - successRate).toFixed(2)),
          queueDepth: 0
        }
      };
    }
    if (url === '/api/v1/analytics/marketplace') {
      return {
        success: true,
        data: {
          publishedAgents: this.getAgents().length,
          verifiedAgents: this.getAgents().length,
          topCategory: 'Research'
        }
      };
    }
    if (url === '/api/v1/analytics/workflows') {
      const wfs = this.getWorkflows();
      return {
        success: true,
        data: {
          created: wfs.length,
          completed: wfs.filter((w: any) => w.status === 'completed').length,
          failed: wfs.filter((w: any) => w.status === 'failed').length,
          avgDurationMs: 6200
        }
      };
    }
    if (url === '/api/v1/analytics/agents') {
      const txs = this.getTransactions();
      const agents = this.getAgents();
      return {
        success: true,
        data: agents.map(a => {
          const revenue = txs.filter((t: any) => t.type === 'escrow_release' && t.txHash.includes(a.id)).reduce((sum: number, t: any) => sum + t.amount, 0);
          return {
            agentId: a.id,
            revenueUsdc: revenue || 0,
            invocations: txs.filter((t: any) => t.type === 'escrow_release' && t.txHash.includes(a.id)).length || 0,
            avgLatencyMs: a.latency
          };
        })
      };
    }
    if (url === '/api/v1/analytics/ai') {
      return {
        success: true,
        data: {
          avgPlanningLatencyMs: 1450,
          tokensConsumed: 4890200
        }
      };
    }
    if (url === '/api/v1/analytics/system') {
      return {
        success: true,
        data: {
          cpuUsage: 14.5,
          memoryUsage: 38.2
        }
      };
    }
    if (url === '/api/v1/analytics/activity-feed') {
      return { success: true, data: this.getActivityFeed() };
    }
    if (url === '/api/v1/health/extended') {
      return { success: true, data: { status: 'healthy', database: 'connected', redis: 'connected' } };
    }
    if (url === '/api/v1/users/me') {
      return {
        success: true,
        data: {
          id: 'user-mock-1',
          email: 'demo@orbitai.dev',
          username: 'orbit_demo',
          role: 'developer',
          displayName: 'Orbit Demo Developer',
          avatarUrl: 'https://lh3.googleusercontent.com/a/default-user'
        }
      };
    }
    if (url.startsWith('/api/v1/workflows/')) {
      const parts = url.split('/');
      const id = parts[4];
      if (url.endsWith('/logs')) {
        const logsKey = `orbit_demo_logs_${id}`;
        const logs = JSON.parse(localStorage.getItem(logsKey) || '[]');
        return { success: true, data: logs };
      } else {
        const wfs = this.getWorkflows();
        const wf = wfs.find((w: any) => w.id === id);
        return { success: true, data: wf };
      }
    }
    return { success: false, message: 'Endpoint mock not found' };
  }

  static handlePost(url: string, body: any): any {
    if (url === '/api/v1/ai/plan') {
      return {
        success: true,
        data: {
          prompt_tokens: 1040,
          completion_tokens: 320,
          estimated_cost: 0.75,
          nodes: [
            { id: 'research', capability: 'research', label: 'InsightFinder Pro analysis' },
            { id: 'finance', capability: 'finance', label: 'FinAnalytica asset valuation' },
            { id: 'legal', capability: 'legal', label: 'LexGuard contract audit' }
          ],
          edges: [
            { id: 'e1', source: 'research', target: 'finance' },
            { id: 'e2', source: 'finance', target: 'legal' }
          ]
        }
      };
    }
    if (url === '/api/v1/wallet/deposit' || url === '/api/v1/wallet/deposit-credits' || url === '/api/v1/wallet/connect') {
      const amount = Number(body.amount || 10);
      const w = this.getWallet();
      w.available += amount;
      this.saveWallet(w);
      
      const tx = {
        id: `tx-deposit-${Date.now()}`,
        senderAddress: 'EXTERNAL_BANK',
        receiverAddress: w.address,
        amount,
        type: 'deposit',
        timestamp: new Date().toISOString(),
        status: 'completed',
        txHash: '0x' + Math.random().toString(16).substring(2, 42)
      };
      this.saveTransactions([tx, ...this.getTransactions()]);

      const feed = this.getActivityFeed();
      feed.unshift({
        time: 'Just now',
        type: 'Wallet Deposit',
        desc: `Received ${amount.toFixed(2)} USDC from External Bank`
      });
      this.saveActivityFeed(feed);

      const notifs = this.getNotifications();
      notifs.unshift({
        id: `notif-${Date.now()}`,
        title: 'Deposit Successful',
        message: `Successfully deposited ${amount.toFixed(2)} USDC`,
        type: 'success',
        read: false,
        createdAt: new Date().toISOString()
      });
      this.saveNotifications(notifs);

      return { success: true, message: 'Deposit successful', data: { available: w.available } };
    }
    if (url === '/api/v1/wallet/withdraw') {
      const amount = Number(body.amount || 10);
      const w = this.getWallet();
      w.available = Math.max(0, w.available - amount);
      this.saveWallet(w);

      const tx = {
        id: `tx-withdraw-${Date.now()}`,
        senderAddress: w.address,
        receiverAddress: 'EXTERNAL_BANK',
        amount,
        type: 'withdrawal',
        timestamp: new Date().toISOString(),
        status: 'completed',
        txHash: '0x' + Math.random().toString(16).substring(2, 42)
      };
      this.saveTransactions([tx, ...this.getTransactions()]);

      const feed = this.getActivityFeed();
      feed.unshift({
        time: 'Just now',
        type: 'Wallet Withdrawal',
        desc: `Withdrew ${amount.toFixed(2)} USDC to External Bank`
      });
      this.saveActivityFeed(feed);

      return { success: true, message: 'Withdrawal successful', data: { available: w.available } };
    }
    if (url === '/api/v1/wallet/transfer') {
      const amount = Number(body.amount || 10);
      const recipient = body.recipientAddress || '0xRecipient';
      const w = this.getWallet();
      w.available = Math.max(0, w.available - amount);
      this.saveWallet(w);

      const tx = {
        id: `tx-transfer-${Date.now()}`,
        senderAddress: w.address,
        receiverAddress: recipient,
        amount,
        type: 'withdrawal',
        timestamp: new Date().toISOString(),
        status: 'completed',
        txHash: '0x' + Math.random().toString(16).substring(2, 42)
      };
      this.saveTransactions([tx, ...this.getTransactions()]);

      const feed = this.getActivityFeed();
      feed.unshift({
        time: 'Just now',
        type: 'Wallet Transfer',
        desc: `Transferred ${amount.toFixed(2)} USDC to ${recipient}`
      });
      this.saveActivityFeed(feed);

      return { success: true, message: 'Transfer successful' };
    }
    if (url === '/api/v1/wallet/sync') {
      return { success: true, message: 'Synced', data: { balances: { available: this.getWallet().available, reserved: this.getWallet().reserved } } };
    }
    if (url === '/api/v1/agents') {
      const agents = this.getAgents();
      const newAgent = {
        id: `agent-${Date.now()}`,
        name: body.name || 'Custom Agent',
        version: body.version || '1.0.0',
        description: body.description || '',
        category: body.category || 'Research',
        skills: body.skills || [],
        endpoint: body.endpoint || 'https://api.custom.dev/invoke',
        price: body.price ? Number(body.price) : 0.15,
        rating: 5.0,
        reviewsCount: 0,
        walletAddress: body.walletAddress || '0x' + Math.random().toString(16).substring(2, 10),
        trustScore: 100,
        latency: body.latency ? Number(body.latency) : 1000,
        accuracy: body.accuracy ? Number(body.accuracy) : 95.0,
        verificationCount: 0,
        failureRate: 0,
        status: 'active',
        tags: body.tags || []
      };
      agents.push(newAgent);
      this.setStored('orbit_demo_agents', agents);
      
      const feed = this.getActivityFeed();
      feed.unshift({
        time: 'Just now',
        type: 'Agent Published',
        desc: `${newAgent.name} published to the registry`
      });
      this.saveActivityFeed(feed);

      return { success: true, message: 'Agent published', data: newAgent };
    }
    if (url === '/api/v1/workflows') {
      const wfs = this.getWorkflows();
      const newWf = {
        id: `wf-${Date.now()}`,
        title: body.title || 'Swarm Workflow Task',
        nodes: body.nodes.map((n: any, idx: number) => ({
          id: n.id || `node-${idx}`,
          agentId: n.agentId,
          capability: n.capability,
          status: 'pending',
          costEstimate: n.costEstimate || 0.15,
          timeEstimate: n.timeEstimate || 1000
        })),
        edges: body.edges || [],
        status: 'pending',
        estimatedCost: body.estimatedCost || 1.25,
        createdAt: new Date().toISOString(),
        nodeMapping: body.nodes.reduce((acc: any, n: any, idx: number) => {
          acc[n.id || `node-${idx}`] = n.id || `node-${idx}`;
          return acc;
        }, {})
      };
      wfs.push(newWf);
      this.saveWorkflows(wfs);

      const feed = this.getActivityFeed();
      feed.unshift({
        time: 'Just now',
        type: 'Workflow Created',
        desc: `Drafted swarm workflow: ${newWf.title}`
      });
      this.saveActivityFeed(feed);

      return { success: true, data: newWf };
    }
    if (url.startsWith('/api/v1/workflows/') && url.endsWith('/run')) {
      const parts = url.split('/');
      const id = parts[4];
      this.simulateWorkflowRun(id);
      return { success: true, message: 'Workflow run started' };
    }
    if (url === '/api/v1/auth/login' || url === '/api/v1/auth/register') {
      return {
        success: true,
        data: {
          profile: {
            id: 'user-mock-1',
            email: body.email || 'demo@orbitai.dev',
            username: body.username || 'orbit_demo',
            role: 'developer',
            displayName: body.displayName || 'Orbit Demo Developer',
            avatarUrl: 'https://lh3.googleusercontent.com/a/default-user'
          },
          token: 'demo-token-123'
        }
      };
    }
    if (url === '/api/v1/payments/razorpay/order') {
      return {
        success: true,
        orderId: `order-${Date.now()}`,
        amount: body.amount,
        currency: 'INR'
      };
    }
    if (url === '/api/v1/payments/razorpay/verify') {
      return { success: true };
    }
    if (url === '/api/v1/notifications/read-all') {
      const notifs = this.getNotifications();
      notifs.forEach(x => x.read = true);
      this.saveNotifications(notifs);
      return { success: true };
    }
    return { success: false, message: 'Endpoint mock not found' };
  }

  static handlePatch(url: string, body: any): any {
    if (url.startsWith('/api/v1/notifications/') && url.endsWith('/read')) {
      const parts = url.split('/');
      const id = parts[4];
      const notifs = this.getNotifications();
      const n = notifs.find(x => x.id === id);
      if (n) {
        n.read = true;
        this.saveNotifications(notifs);
      }
      return { success: true };
    }
    return { success: false };
  }

  static handleDelete(url: string): any {
    if (url.startsWith('/api/v1/notifications/')) {
      const parts = url.split('/');
      const id = parts[4];
      const notifs = this.getNotifications().filter(x => x.id !== id);
      this.saveNotifications(notifs);
      return { success: true };
    }
    return { success: false };
  }
}

async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeoutMs = 90000
) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });

    clearTimeout(timeout);
    return response;
  } catch (error: any) {
    clearTimeout(timeout);
    console.error("FETCH FAILED", error);
    throw error;
  }
}

function isJwtExpired(token: string): boolean {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return true;
    
    // Decode base64url payload
    const base64Url = parts[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    const jsonPayload = decodeURIComponent(
      window.atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    
    const payload = JSON.parse(jsonPayload);
    const exp = payload.exp;
    if (!exp) return false;
    
    const current = Math.floor(Date.now() / 1000);
    return current > (exp - 10); // 10-second buffer
  } catch (e) {
    console.error('[API_CLIENT] Failed to decode JWT token:', e);
    return true;
  }
}

async function refreshAccessToken(refreshToken: string): Promise<string | null> {
  try {
    const res = await fetch(`${BASE_URL}/api/v1/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken })
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.token) {
        localStorage.setItem('orbit_token', data.token);
        if (data.refreshToken) {
          localStorage.setItem('orbit_refreshtoken', data.refreshToken);
        }
        return data.token;
      }
    }
  } catch (e) {
    console.error('Failed to refresh access token:', e);
  }
  return null;
}

function handleSessionExpiration() {
  localStorage.removeItem('orbit_token');
  localStorage.removeItem('orbit_refreshtoken');
  localStorage.removeItem('orbit_user');
  sessionStorage.removeItem('orbit_token');
  sessionStorage.removeItem('orbit_user');
  document.cookie = "orbit_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('nexus_session_expired'));
    if (window.location.pathname !== '/') {
      window.location.href = '/?auth=login';
    }
  }
}

async function getValidToken(): Promise<string | null> {
  if (typeof window === 'undefined') return null;
  
  const token = localStorage.getItem('orbit_token');
  console.log(`[API_CLIENT_DEBUG] Current JWT exists in localStorage? ${!!token}`);
  if (!token) return null;
  
  const expired = isJwtExpired(token);
  console.log(`[API_CLIENT_DEBUG] Is token expired? ${expired}`);
  if (expired) {
    console.warn('[API_CLIENT] Access token is expired. Attempting token refresh...');
    const refreshToken = localStorage.getItem('orbit_refreshtoken');
    if (refreshToken) {
      const newToken = await refreshAccessToken(refreshToken);
      if (newToken) {
        console.log('[API_CLIENT] Token refreshed successfully.');
        return newToken;
      }
    }
    console.error('[API_CLIENT] Session expired and cannot be refreshed. Redirecting to login...');
    handleSessionExpiration();
    return null;
  }
  
  return token;
}

const shouldBypassMock = (url: string): boolean => {
  if (typeof window === 'undefined') return true;
  const token = localStorage.getItem('orbit_token');
  if (!token) return false;

  const isDemo = localStorage.getItem('orbit_demomode') === 'true';
  if (isDemo && url.startsWith('/api/v1/wallet')) {
    return false;
  }

  return url === '/api/v1/ai/plan' || 
         url.startsWith('/api/v1/workflows') || 
         url.startsWith('/api/v1/analytics') || 
         url.startsWith('/api/v1/wallet');
};

export const apiClient = {
  async get<T>(
    url: string,
    retries = 3,
    delay = 1000
  ): Promise<T> {
    if (DemoModeManager.isDemoMode() && !url.includes('/auth/') && !shouldBypassMock(url)) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(DemoModeManager.handleGet(url) as T);
        }, 100);
      });
    }

    try {
      const token = await getValidToken();
      console.log(`[API_CLIENT_DEBUG] GET request path: ${url}`);
      console.log(`[API_CLIENT_DEBUG] Is user authenticated? ${!!token}`);
      console.log(`[API_CLIENT_DEBUG] Authorization header being attached? ${token ? 'yes' : 'no'}`);

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        "x-execution-mode": DemoModeManager.isDemoMode() ? "DEMO" : "LIVE"
      };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetchWithTimeout(`${BASE_URL}${url}`, {
        method: "GET",
        headers,
      });

      if (!response.ok) {
        if (
          retries > 0 &&
          [429, 502, 503, 504].includes(response.status)
        ) {
          console.warn(
            `[API_RETRY] HTTP ${response.status} → ${url}. Retrying in ${delay}ms...`
          );

          await new Promise((resolve) =>
            setTimeout(resolve, delay)
          );

          return this.get<T>(url, retries - 1, delay * 2);
        }

        throw { name: "HttpError", status: response.status, message: `HTTP Error: ${response.status}` };
      }

      return response.json() as Promise<T>;
    } catch (error: any) {
      if (retries > 0 && error.name !== "AbortError" && error.name !== "HttpError") {
        console.warn(
          `[API_RETRY] Network error → ${url}: ${error.message}. Retrying in ${delay}ms...`
        );

        await new Promise((resolve) =>
          setTimeout(resolve, delay)
        );

        return this.get<T>(url, retries - 1, delay * 2);
      }

      throw error;
    }
  },

  async post<T>(url: string, body: any): Promise<T> {
    if (DemoModeManager.isDemoMode() && !url.includes('/auth/') && !shouldBypassMock(url)) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(DemoModeManager.handlePost(url, body) as T);
        }, 100);
      });
    }

    const token = await getValidToken();
    console.log(`[API_CLIENT_DEBUG] POST request path: ${url}`);
    console.log(`[API_CLIENT_DEBUG] Is user authenticated? ${!!token}`);
    console.log(`[API_CLIENT_DEBUG] Authorization header being attached? ${token ? 'yes' : 'no'}`);

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "x-execution-mode": DemoModeManager.isDemoMode() ? "DEMO" : "LIVE"
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetchWithTimeout(`${BASE_URL}${url}`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      let msg = `HTTP Error: ${response.status}`;
      try {
        const errBody = await response.json();
        if (errBody && errBody.message) {
          msg = errBody.message;
        }
      } catch (e) {}
      throw new Error(msg);
    }

    return response.json() as Promise<T>;
  },

  async put<T>(url: string, body: any): Promise<T> {
    if (DemoModeManager.isDemoMode() && !url.includes('/auth/') && !shouldBypassMock(url)) {
      return new Promise((resolve) => {
        resolve({ success: true } as any as T);
      });
    }

    const token = await getValidToken();
    console.log(`[API_CLIENT_DEBUG] PUT request path: ${url}`);
    console.log(`[API_CLIENT_DEBUG] Is user authenticated? ${!!token}`);
    console.log(`[API_CLIENT_DEBUG] Authorization header being attached? ${token ? 'yes' : 'no'}`);

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "x-execution-mode": DemoModeManager.isDemoMode() ? "DEMO" : "LIVE"
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetchWithTimeout(`${BASE_URL}${url}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    return response.json() as Promise<T>;
  },

  async delete<T>(url: string): Promise<T> {
    if (DemoModeManager.isDemoMode() && !url.includes('/auth/') && !shouldBypassMock(url)) {
      return new Promise((resolve) => {
        resolve(DemoModeManager.handleDelete(url) as T);
      });
    }

    const token = await getValidToken();
    console.log(`[API_CLIENT_DEBUG] DELETE request path: ${url}`);
    console.log(`[API_CLIENT_DEBUG] Is user authenticated? ${!!token}`);
    console.log(`[API_CLIENT_DEBUG] Authorization header being attached? ${token ? 'yes' : 'no'}`);

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "x-execution-mode": DemoModeManager.isDemoMode() ? "DEMO" : "LIVE"
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetchWithTimeout(`${BASE_URL}${url}`, {
      method: "DELETE",
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    return response.json() as Promise<T>;
  },

  async patch<T>(url: string, body: any): Promise<T> {
    if (DemoModeManager.isDemoMode() && !url.includes('/auth/') && !shouldBypassMock(url)) {
      return new Promise((resolve) => {
        resolve(DemoModeManager.handlePatch(url, body) as T);
      });
    }

    const token = await getValidToken();
    console.log(`[API_CLIENT_DEBUG] PATCH request path: ${url}`);
    console.log(`[API_CLIENT_DEBUG] Is user authenticated? ${!!token}`);
    console.log(`[API_CLIENT_DEBUG] Authorization header being attached? ${token ? 'yes' : 'no'}`);

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "x-execution-mode": DemoModeManager.isDemoMode() ? "DEMO" : "LIVE"
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetchWithTimeout(`${BASE_URL}${url}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    return response.json() as Promise<T>;
  }
};