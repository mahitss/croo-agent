import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import {
  CAPClient,
  CAPAgentRegistration,
  CAPAgentDiscoveryResult,
  CAPInvocationResult,
  CAPAgentMetadata,
  loadCAPConfig,
} from '@nexus-ai/cap-sdk';

@Injectable()
export class CAPAgentService {
  private readonly logger = new Logger(CAPAgentService.name);
  private readonly capClient: CAPClient;

  constructor(private readonly prisma: PrismaService) {
    this.capClient = new CAPClient();
    const config = loadCAPConfig();
    this.logger.log(
      `CAP Agent Service initialized — mode: ${config.enabled ? 'LIVE' : 'OFFLINE'}`,
    );
  }

  /**
   * Register an agent on the CROO Agent Protocol registry.
   * Generates a DID and indexes the agent on the CROO Agent Store.
   */
  async registerAgent(agentId: string): Promise<CAPAgentRegistration> {
    const agent = await this.prisma.agent.findUnique({
      where: { id: agentId },
      include: {
        capabilities: { include: { capability: true } },
        pricingModels: true,
        versions: { orderBy: { publishedAt: 'desc' }, take: 1 },
      },
    });

    if (!agent) {
      throw new Error(`Agent ${agentId} not found`);
    }

    const latestVersion = agent.versions[0];
    const pricing = agent.pricingModels[0];

    const metadata: CAPAgentMetadata = {
      name: agent.name,
      description: agent.description,
      capabilities: agent.capabilities.map((ac) => ac.capability.name),
      pricingUsdc: pricing ? Number(pricing.price) : 0,
      pricingType: pricing?.pricingType || 'per_request',
      endpoint: latestVersion?.endpoint || `http://localhost:5002/api/v1/agents/${agentId}/a2a`,
      logoUrl: agent.logoUrl || undefined,
      version: latestVersion?.version || '1.0.0',
      inputSchema: latestVersion?.inputSchema as Record<string, any> || {},
      outputSchema: latestVersion?.outputSchema as Record<string, any> || {},
    };

    const registration = await this.capClient.registerAgent(agentId, metadata);

    // Persist CAP fields to database
    await this.prisma.agent.update({
      where: { id: agentId },
      data: {
        capDid: registration.did,
        capStoreId: registration.storeId,
        capRegisteredAt: new Date(registration.registeredAt),
        capReputationScore: registration.reputationScore,
        capEndpoint: registration.endpoint,
        verificationStatus: 'verified',
      },
    });

    this.logger.log(`Agent ${agent.name} registered on CAP with DID: ${registration.did}`);
    return registration;
  }

  /**
   * Discover agents on the CROO Agent Store by capability.
   */
  async discoverAgents(
    capability: string,
    filters?: { minReputation?: number; maxPriceUsdc?: number; limit?: number },
  ): Promise<CAPAgentDiscoveryResult[]> {
    this.logger.log(`Discovering CAP agents with capability: ${capability}`);

    // First check local agents
    const localAgents = await this.prisma.agent.findMany({
      where: {
        deletedAt: null,
        capDid: { not: null },
        capabilities: {
          some: {
            capability: {
              name: { contains: capability, mode: 'insensitive' },
            },
          },
        },
      },
      include: {
        capabilities: { include: { capability: true } },
        pricingModels: true,
      },
    });

    const localResults: CAPAgentDiscoveryResult[] = localAgents.map((agent) => ({
      did: agent.capDid!,
      name: agent.name,
      description: agent.description,
      capabilities: agent.capabilities.map((ac) => ac.capability.name),
      reputationScore: Number(agent.capReputationScore) || 100,
      pricingUsdc: agent.pricingModels[0] ? Number(agent.pricingModels[0].price) : 0,
      endpoint: agent.capEndpoint || '',
      storeId: agent.capStoreId || '',
    }));

    // Also query CROO network for remote agents
    const remoteResults = await this.capClient.discoverAgents(capability, filters);

    // Merge and deduplicate by DID
    const seen = new Set(localResults.map((r) => r.did));
    const merged = [...localResults];
    for (const remote of remoteResults) {
      if (!seen.has(remote.did)) {
        merged.push(remote);
        seen.add(remote.did);
      }
    }

    return merged;
  }

  /**
   * Invoke a remote agent via A2A protocol.
   */
  async invokeAgent(
    callerAgentId: string,
    targetDid: string,
    payload: any,
    maxCostUsdc?: number,
  ): Promise<CAPInvocationResult> {
    const caller = await this.prisma.agent.findUnique({
      where: { id: callerAgentId },
    });

    if (!caller?.capDid) {
      throw new Error(`Caller agent ${callerAgentId} is not registered on CAP. Register first.`);
    }

    this.logger.log(`A2A Invocation: ${caller.capDid} → ${targetDid}`);
    return this.capClient.invokeAgent(caller.capDid, targetDid, payload, maxCostUsdc);
  }

  /**
   * Sync local agent metadata to the CROO Agent Store.
   */
  async syncMetadata(agentId: string): Promise<{ synced: boolean; lastSyncedAt: string }> {
    const agent = await this.prisma.agent.findUnique({
      where: { id: agentId },
      include: {
        capabilities: { include: { capability: true } },
        pricingModels: true,
        versions: { orderBy: { publishedAt: 'desc' }, take: 1 },
      },
    });

    if (!agent?.capDid) {
      throw new Error(`Agent ${agentId} is not registered on CAP`);
    }

    const latestVersion = agent.versions[0];
    const pricing = agent.pricingModels[0];

    const metadata: CAPAgentMetadata = {
      name: agent.name,
      description: agent.description,
      capabilities: agent.capabilities.map((ac) => ac.capability.name),
      pricingUsdc: pricing ? Number(pricing.price) : 0,
      pricingType: pricing?.pricingType || 'per_request',
      endpoint: agent.capEndpoint || latestVersion?.endpoint || '',
      logoUrl: agent.logoUrl || undefined,
      version: latestVersion?.version || '1.0.0',
    };

    return this.capClient.syncAgentMetadata(agent.capDid, metadata);
  }

  /**
   * Get CAP registration status for an agent.
   */
  async getCapStatus(agentId: string): Promise<{
    registered: boolean;
    did: string | null;
    storeId: string | null;
    reputationScore: number | null;
    endpoint: string | null;
    registeredAt: string | null;
  }> {
    const agent = await this.prisma.agent.findUnique({
      where: { id: agentId },
    });

    if (!agent) {
      throw new Error(`Agent ${agentId} not found`);
    }

    return {
      registered: !!agent.capDid,
      did: agent.capDid,
      storeId: agent.capStoreId,
      reputationScore: agent.capReputationScore ? Number(agent.capReputationScore) : null,
      endpoint: agent.capEndpoint,
      registeredAt: agent.capRegisteredAt?.toISOString() || null,
    };
  }
}
