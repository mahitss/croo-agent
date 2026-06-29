/**
 * CROO Agent Protocol (CAP) SDK
 * 
 * Provides a unified client for interacting with the CROO decentralized agent network.
 * Supports agent registration (DID), discovery via Agent Store, A2A invocation,
 * wallet verification, escrow-based payments, and settlement.
 * 
 * When CAP_ENABLED=false (default), all operations run in offline mode —
 * generating deterministic local responses and logging intended actions.
 */

import * as crypto from 'crypto';

// ─── Configuration ───────────────────────────────────────────────────────────

export interface CAPConfig {
  enabled: boolean;
  networkUrl: string;
  apiKey: string;
  chainRpcUrl: string;
  usdcContract: string;
  escrowContract: string;
  agentStoreUrl: string;
}

export function loadCAPConfig(): CAPConfig {
  return {
    enabled: (process.env.CAP_ENABLED || 'false').toLowerCase() === 'true',
    networkUrl: process.env.CAP_NETWORK_URL || 'https://api.croo.network/v1',
    apiKey: process.env.CAP_API_KEY || '',
    chainRpcUrl: process.env.CAP_CHAIN_RPC_URL || 'https://mainnet.base.org',
    usdcContract: process.env.CAP_USDC_CONTRACT || '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
    escrowContract: process.env.CAP_ESCROW_CONTRACT || '',
    agentStoreUrl: process.env.CAP_AGENT_STORE_URL || 'https://store.croo.network/v1',
  };
}

// ─── Types ───────────────────────────────────────────────────────────────────

export interface CAPAgentRegistration {
  did: string;
  storeId: string;
  registeredAt: string;
  endpoint: string;
  reputationScore: number;
}

export interface CAPAgentDiscoveryResult {
  did: string;
  name: string;
  description: string;
  capabilities: string[];
  reputationScore: number;
  pricingUsdc: number;
  endpoint: string;
  storeId: string;
}

export interface CAPInvocationResult {
  invocationId: string;
  agentDid: string;
  status: 'completed' | 'failed' | 'timeout';
  output: any;
  latencyMs: number;
  costUsdc: number;
  transactionRef: string;
}

export interface CAPWalletVerification {
  address: string;
  verified: boolean;
  challenge: string;
  linkedDid: string | null;
  network: string;
  balanceUsdc: number;
}

export interface CAPEscrowResult {
  escrowId: string;
  paymentId: string;
  amount: number;
  status: 'locked' | 'released' | 'refunded';
  contractAddress: string;
  transactionHash: string;
  createdAt: string;
}

export interface CAPSettlementResult {
  settlementId: string;
  escrowId: string;
  amount: number;
  recipientAddress: string;
  transactionHash: string;
  settledAt: string;
}

export interface CAPTransactionRecord {
  id: string;
  type: 'escrow_lock' | 'escrow_release' | 'transfer' | 'invocation_payment';
  amount: number;
  currency: string;
  fromAddress: string;
  toAddress: string;
  transactionHash: string;
  blockNumber: number;
  timestamp: string;
  status: 'confirmed' | 'pending' | 'failed';
}

export interface CAPAgentMetadata {
  name: string;
  description: string;
  capabilities: string[];
  pricingUsdc: number;
  pricingType: string;
  endpoint: string;
  logoUrl?: string;
  version?: string;
  inputSchema?: Record<string, any>;
  outputSchema?: Record<string, any>;
}

// ─── CAP Client ──────────────────────────────────────────────────────────────

export class CAPClient {
  private config: CAPConfig;
  private logger: (level: string, message: string, data?: any) => void;

  constructor(config?: Partial<CAPConfig>) {
    const defaultConfig = loadCAPConfig();
    this.config = { ...defaultConfig, ...config };
    this.logger = (level, message, data) => {
      const prefix = `[CAP-SDK] [${level.toUpperCase()}]`;
      if (data) {
        console.log(`${prefix} ${message}`, JSON.stringify(data, null, 2));
      } else {
        console.log(`${prefix} ${message}`);
      }
    };
  }

  get isEnabled(): boolean {
    return this.config.enabled && !!this.config.apiKey;
  }

  // ─── Agent Registration ──────────────────────────────────────────────────

  async registerAgent(
    agentId: string,
    metadata: CAPAgentMetadata,
  ): Promise<CAPAgentRegistration> {
    this.logger('info', `Registering agent ${agentId} on CROO CAP registry`);

    if (this.isEnabled) {
      return this.httpPost<CAPAgentRegistration>(
        `${this.config.networkUrl}/agents/register`,
        {
          agentId,
          ...metadata,
        },
      );
    }

    // Offline mode: generate deterministic DID
    const did = `did:cap:${crypto.createHash('sha256').update(agentId).digest('hex').substring(0, 40)}`;
    const storeId = `store-${crypto.createHash('md5').update(agentId).digest('hex').substring(0, 12)}`;

    this.logger('info', `[OFFLINE] Generated DID: ${did}, Store ID: ${storeId}`);

    return {
      did,
      storeId,
      registeredAt: new Date().toISOString(),
      endpoint: metadata.endpoint || `https://agents.croo.network/${did}/a2a`,
      reputationScore: 100.0,
    };
  }

  // ─── Agent Discovery ─────────────────────────────────────────────────────

  async discoverAgents(
    capability: string,
    filters?: { minReputation?: number; maxPriceUsdc?: number; limit?: number },
  ): Promise<CAPAgentDiscoveryResult[]> {
    this.logger('info', `Discovering agents with capability: ${capability}`, filters);

    if (this.isEnabled) {
      const params = new URLSearchParams({ capability });
      if (filters?.minReputation) params.set('min_reputation', String(filters.minReputation));
      if (filters?.maxPriceUsdc) params.set('max_price', String(filters.maxPriceUsdc));
      if (filters?.limit) params.set('limit', String(filters.limit));

      return this.httpGet<CAPAgentDiscoveryResult[]>(
        `${this.config.agentStoreUrl}/agents/discover?${params.toString()}`,
      );
    }

    // Offline mode: return empty results (no fake data)
    this.logger('info', `[OFFLINE] Agent Store discovery not available — no network connection`);
    return [];
  }

  // ─── Agent-to-Agent Invocation ────────────────────────────────────────────

  async invokeAgent(
    callerDid: string,
    targetDid: string,
    payload: any,
    maxCostUsdc?: number,
  ): Promise<CAPInvocationResult> {
    this.logger('info', `A2A Invocation: ${callerDid} → ${targetDid}`);

    if (this.isEnabled) {
      return this.httpPost<CAPInvocationResult>(
        `${this.config.networkUrl}/agents/invoke`,
        {
          callerDid,
          targetDid,
          payload,
          maxCostUsdc: maxCostUsdc || 5.0,
        },
      );
    }

    // Offline mode
    const invocationId = `inv-${crypto.randomUUID().substring(0, 8)}`;
    this.logger('info', `[OFFLINE] Invocation ${invocationId} — target agent not reachable in offline mode`);

    return {
      invocationId,
      agentDid: targetDid,
      status: 'completed',
      output: { message: 'Offline mode — invocation simulated locally', payload },
      latencyMs: 0,
      costUsdc: 0,
      transactionRef: `0xoffline_${invocationId}`,
    };
  }

  // ─── Wallet Verification ──────────────────────────────────────────────────

  async verifyWallet(
    address: string,
    signature?: string,
    challenge?: string,
  ): Promise<CAPWalletVerification> {
    this.logger('info', `Verifying wallet: ${address}`);

    if (this.isEnabled && signature && challenge) {
      return this.httpPost<CAPWalletVerification>(
        `${this.config.networkUrl}/wallets/verify`,
        { address, signature, challenge },
      );
    }

    // Offline mode: generate challenge or verify locally
    const walletChallenge = challenge || `cap-challenge-${crypto.randomUUID()}`;

    return {
      address,
      verified: !!signature, // verified if signature was provided
      challenge: walletChallenge,
      linkedDid: null,
      network: 'base',
      balanceUsdc: 0, // unknown in offline mode
    };
  }

  async generateWalletChallenge(address: string): Promise<string> {
    if (this.isEnabled) {
      const result = await this.httpPost<{ challenge: string }>(
        `${this.config.networkUrl}/wallets/challenge`,
        { address },
      );
      return result.challenge;
    }

    return `Sign this message to verify wallet ownership on CROO CAP:\n\nAddress: ${address}\nTimestamp: ${new Date().toISOString()}\nNonce: ${crypto.randomUUID()}`;
  }

  // ─── Escrow ───────────────────────────────────────────────────────────────

  async createEscrow(
    paymentId: string,
    amount: number,
    payerAddress: string,
    recipientDid: string,
  ): Promise<CAPEscrowResult> {
    this.logger('info', `Creating escrow for payment ${paymentId}: ${amount} USDC`);

    if (this.isEnabled) {
      return this.httpPost<CAPEscrowResult>(
        `${this.config.networkUrl}/escrow/create`,
        { paymentId, amount, payerAddress, recipientDid },
      );
    }

    const escrowId = `escrow-${crypto.randomUUID().substring(0, 12)}`;
    const txHash = `0x${crypto.createHash('sha256').update(escrowId).digest('hex')}`;

    return {
      escrowId,
      paymentId,
      amount,
      status: 'locked',
      contractAddress: this.config.escrowContract || '0xCAP_ESCROW_NOT_CONFIGURED',
      transactionHash: txHash,
      createdAt: new Date().toISOString(),
    };
  }

  // ─── Settlement ───────────────────────────────────────────────────────────

  async settleEscrow(
    escrowId: string,
    recipientAddress: string,
  ): Promise<CAPSettlementResult> {
    this.logger('info', `Settling escrow ${escrowId} to ${recipientAddress}`);

    if (this.isEnabled) {
      return this.httpPost<CAPSettlementResult>(
        `${this.config.networkUrl}/escrow/settle`,
        { escrowId, recipientAddress },
      );
    }

    const settlementId = `settle-${crypto.randomUUID().substring(0, 12)}`;
    const txHash = `0x${crypto.createHash('sha256').update(settlementId).digest('hex')}`;

    return {
      settlementId,
      escrowId,
      amount: 0, // unknown in offline mode
      recipientAddress,
      transactionHash: txHash,
      settledAt: new Date().toISOString(),
    };
  }

  // ─── Transaction History ──────────────────────────────────────────────────

  async getTransactionHistory(
    walletAddress: string,
    limit?: number,
  ): Promise<CAPTransactionRecord[]> {
    this.logger('info', `Fetching CAP transaction history for ${walletAddress}`);

    if (this.isEnabled) {
      const params = new URLSearchParams({ address: walletAddress });
      if (limit) params.set('limit', String(limit));

      return this.httpGet<CAPTransactionRecord[]>(
        `${this.config.networkUrl}/transactions?${params.toString()}`,
      );
    }

    // Offline mode: no history available
    this.logger('info', `[OFFLINE] No on-chain transaction history available`);
    return [];
  }

  // ─── Agent Metadata Sync ──────────────────────────────────────────────────

  async syncAgentMetadata(
    agentDid: string,
    metadata: CAPAgentMetadata,
  ): Promise<{ synced: boolean; lastSyncedAt: string }> {
    this.logger('info', `Syncing metadata for ${agentDid} to CROO Agent Store`);

    if (this.isEnabled) {
      return this.httpPost<{ synced: boolean; lastSyncedAt: string }>(
        `${this.config.agentStoreUrl}/agents/${agentDid}/metadata`,
        metadata,
      );
    }

    return {
      synced: false,
      lastSyncedAt: new Date().toISOString(),
    };
  }

  // ─── Pricing ──────────────────────────────────────────────────────────────

  async getAgentPricing(agentDid: string): Promise<{
    pricingUsdc: number;
    pricingType: string;
    billingUnit: string;
    currency: string;
  }> {
    this.logger('info', `Fetching pricing for agent ${agentDid}`);

    if (this.isEnabled) {
      return this.httpGet(`${this.config.agentStoreUrl}/agents/${agentDid}/pricing`);
    }

    return {
      pricingUsdc: 0,
      pricingType: 'per_request',
      billingUnit: 'invocation',
      currency: 'USDC',
    };
  }

  // ─── HTTP Helpers ─────────────────────────────────────────────────────────

  private async httpGet<T>(url: string): Promise<T> {
    const response = await fetch(url, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`CAP API GET ${url} failed (${response.status}): ${body}`);
    }

    return response.json() as Promise<T>;
  }

  private async httpPost<T>(url: string, body: any): Promise<T> {
    const response = await fetch(url, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const respBody = await response.text();
      throw new Error(`CAP API POST ${url} failed (${response.status}): ${respBody}`);
    }

    return response.json() as Promise<T>;
  }

  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'User-Agent': 'NexusAI-CAP-SDK/1.0.0',
    };

    if (this.config.apiKey) {
      headers['Authorization'] = `Bearer ${this.config.apiKey}`;
    }

    return headers;
  }
}

// ─── Singleton Export ────────────────────────────────────────────────────────

let _instance: CAPClient | null = null;

export function getCAPClient(config?: Partial<CAPConfig>): CAPClient {
  if (!_instance) {
    _instance = new CAPClient(config);
  }
  return _instance;
}

export default CAPClient;
