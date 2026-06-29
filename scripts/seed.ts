import { PrismaClient as AgentPrismaClient } from '../apps/agent-service/src/generated/client';
import { PrismaClient as AuthPrismaClient } from '../apps/auth-service/src/generated/client';
import { PrismaClient as WalletPrismaClient } from '../apps/wallet-service/src/generated/client';

const seedAgents = [
  {
    id: 'agent-research-1',
    slug: 'insightfinder-pro',
    name: 'InsightFinder Pro',
    version: '1.2.0',
    description: 'Deep-dive academic and market research agent. Summarizes complex documents and extracts tabular data.',
    category: 'Research',
    skills: ['market analysis', 'web scraping', 'data synthesis', 'academic lookup'],
    price: 0.15,
    averageRating: 4.8,
    reviewsCount: 342,
    walletAddress: '0x32A4B3e265432198e2',
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
    slug: 'quickscan',
    name: 'QuickScan',
    version: '2.0.1',
    description: 'Ultra-fast search and summarization agent. Perfect for low-latency tasks.',
    category: 'Research',
    skills: ['web search', 'news summary', 'topic extraction'],
    price: 0.05,
    averageRating: 4.4,
    reviewsCount: 154,
    walletAddress: '0x8F21cd8A365432198e2',
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
    slug: 'finanalytica',
    name: 'FinAnalytica',
    version: '0.9.5',
    description: 'Performs asset valuation, ticker audit, balance sheet analysis, and generates charts.',
    category: 'Finance',
    skills: ['balance sheet analysis', 'financial modeling', 'ticker trends', 'charts'],
    price: 0.25,
    averageRating: 4.9,
    reviewsCount: 220,
    walletAddress: '0x99C2da3F165432198e2',
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
    slug: 'lexguard',
    name: 'LexGuard',
    version: '1.0.0',
    description: 'Analyzes contracts for compliance, flags high-risk clauses, and performs privacy policy audits.',
    category: 'Legal',
    skills: ['contract parsing', 'compliance checks', 'risk analysis'],
    price: 0.35,
    averageRating: 4.7,
    reviewsCount: 98,
    walletAddress: '0xEF5120D8B65432198e2',
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
    slug: 'codecraft',
    name: 'CodeCraft',
    version: '3.1.0',
    description: 'Generates robust react hooks, api endpoints, and writes unit tests in TypeScript.',
    category: 'Coding',
    skills: ['react components', 'express endpoints', 'unit testing', 'refactoring'],
    price: 0.30,
    averageRating: 4.9,
    reviewsCount: 512,
    walletAddress: '0x1A2B34C5D65432198e2',
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
    slug: 'sentriscan',
    name: 'SentriScan',
    version: '1.4.0',
    description: 'Static application security testing (SAST). Flags vulnerabilities, SQL injection, and XSS leaks.',
    category: 'Security',
    skills: ['vulnerability scan', 'dependency audit', 'code safety'],
    price: 0.40,
    averageRating: 4.95,
    reviewsCount: 180,
    walletAddress: '0xDD44e29c465432198e2',
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
    slug: 'translatio',
    name: 'Translatio',
    version: '2.1.0',
    description: 'High-accuracy translation with cultural idioms adjustment. Supports 45+ languages.',
    category: 'Translation',
    skills: ['translation', 'localization', 'grammar audit'],
    price: 0.08,
    averageRating: 4.6,
    reviewsCount: 190,
    walletAddress: '0x55B1acc4D65432198e2',
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
    slug: 'consensuverify',
    name: 'ConsensuVerify',
    version: '1.0.2',
    description: 'Independent consensus verification engine. Cross-checks information against multiple nodes.',
    category: 'Security',
    skills: ['verification', 'consensus calculation', 'output grading'],
    price: 0.10,
    averageRating: 4.85,
    reviewsCount: 290,
    walletAddress: '0x88AAa77bB65432198e2',
    trustScore: 98,
    latency: 800,
    accuracy: 98,
    verificationCount: 250,
    failureRate: 0.8,
    status: 'active',
    tags: ['verification', 'consensus']
  }
];

export async function run() {
  console.log('Starting seed script execution...');

  const connectionString = process.env.DATABASE_URL || "postgresql://neondb_owner:npg_xNPUq8RdbgM3@ep-flat-fog-aohnirvo-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require&pgbouncer=true";
  
  // Route connection strings to their exact target schemas
  const authUrl = connectionString.includes('schema=') 
    ? connectionString.replace(/schema=[^&]*/, 'schema=auth') 
    : connectionString + (connectionString.includes('?') ? '&schema=auth' : '?schema=auth');

  const agentUrl = connectionString.includes('schema=') 
    ? connectionString.replace(/schema=[^&]*/, 'schema=agents') 
    : connectionString + (connectionString.includes('?') ? '&schema=agents' : '?schema=agents');

  const walletUrl = connectionString.includes('schema=') 
    ? connectionString.replace(/schema=[^&]*/, 'schema=wallet') 
    : connectionString + (connectionString.includes('?') ? '&schema=wallet' : '?schema=wallet');

  console.log(`Connecting to: auth=${authUrl.split('@')[1]}, agents=${agentUrl.split('@')[1]}, wallets=${walletUrl.split('@')[1]}`);

  const agentDb = new AgentPrismaClient({ datasources: { db: { url: agentUrl } } });
  const authDb = new AuthPrismaClient({ datasources: { db: { url: authUrl } } });
  const walletDb = new WalletPrismaClient({ datasources: { db: { url: walletUrl } } });

  try {
    // 1. Seed Auth Service: Default User
    console.log('Seeding Auth Database...');
    await authDb.user.upsert({
      where: { email: 'user@orbitai.dev' },
      update: {},
      create: {
        id: 'user-1',
        email: 'user@orbitai.dev',
        username: 'orbit_builder',
        passwordHash: '$2b$10$xyzHashedPasswordPlaceholderStringForSecurity',
        role: 'developer'
      }
    });

    // 2. Seed Wallet Service: Balances
    console.log('Seeding Wallet Database...');
    const userWallet = await walletDb.wallet.upsert({
      where: { address: '0xUserWalletAddress789c' },
      update: { network: 'ethereum' },
      create: {
        userId: 'user-1',
        address: '0xUserWalletAddress789c',
        network: 'ethereum'
      }
    });

    await walletDb.balance.upsert({
      where: { walletId: userWallet.id },
      update: { available: 100.0 },
      create: {
        walletId: userWallet.id,
        available: 100.0,
        reserved: 0.0,
        pending: 0.0
      }
    });

    for (const a of seedAgents) {
      const agentWallet = await walletDb.wallet.upsert({
        where: { address: a.walletAddress },
        update: { network: 'ethereum' },
        create: {
          userId: 'agent-owner',
          address: a.walletAddress,
          network: 'ethereum'
        }
      });

      await walletDb.balance.upsert({
        where: { walletId: agentWallet.id },
        update: { available: 25.0 },
        create: {
          walletId: agentWallet.id,
          available: 25.0,
          reserved: 0.0,
          pending: 0.0
        }
      });
    }

    // 3. Seed Agent Service: Agents & Specs
    console.log('Seeding Agent Database...');
    for (const a of seedAgents) {
      await agentDb.agent.upsert({
        where: { id: a.id },
        update: {
          category: a.category,
          skills: a.skills,
          tags: a.tags,
          price: a.price,
          latency: a.latency,
          accuracy: a.accuracy,
          verificationCount: a.verificationCount,
          failureRate: a.failureRate,
          status: a.status,
          walletAddress: a.walletAddress,
          averageRating: a.averageRating,
          trustScore: a.trustScore
        },
        create: {
          id: a.id,
          ownerId: 'user-1',
          slug: a.slug,
          name: a.name,
          description: a.description,
          category: a.category,
          skills: a.skills,
          tags: a.tags,
          price: a.price,
          latency: a.latency,
          accuracy: a.accuracy,
          verificationCount: a.verificationCount,
          failureRate: a.failureRate,
          status: a.status,
          walletAddress: a.walletAddress,
          averageRating: a.averageRating,
          trustScore: a.trustScore
        }
      });

      // Clear matching version specs to avoid primary key collisions on repeated seeds
      await agentDb.agentVersion.deleteMany({
        where: { agentId: a.id }
      });

      await agentDb.agentVersion.create({
        data: {
          agentId: a.id,
          version: a.version,
          endpoint: `http://localhost:5000/api/v1/agents/${a.id}`,
          inputSchema: {},
          outputSchema: {}
        }
      });
    }

    console.log('Seeding process completed successfully!');
  } catch (err) {
    console.error('Error during seeding execution:', err);
  } finally {
    await authDb.$disconnect();
    await walletDb.$disconnect();
    await agentDb.$disconnect();
  }
}
run();
