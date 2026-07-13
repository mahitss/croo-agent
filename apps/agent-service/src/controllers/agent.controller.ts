import { Controller, Get, Post, Patch, Delete, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { CAPAgentService } from '../services/cap-agent.service';
import { RedisService } from '../services/redis.service';


@Controller('api/v1')
export class AgentController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly capAgent: CAPAgentService,
    private readonly redis: RedisService,
  ) {}


  @Post('agents')
  @HttpCode(HttpStatus.CREATED)
  async createAgent(@Body() body: any) {
    try {
      const slug = body.slug || `agent-${body.name?.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Date.now()}`;
      const agent = await this.prisma.agent.create({
        data: {
          ownerId: body.ownerId || 'user-1',
          slug,
          name: body.name || 'Unnamed Agent',
          description: body.description || '',
          logoUrl: body.logoUrl,
          category: body.category || 'Research',
          skills: body.skills || [],
          tags: body.tags || [],
          price: body.price !== undefined ? Number(body.price) : 0.10,
          latency: body.latency !== undefined ? Number(body.latency) : 1000,
          accuracy: body.accuracy !== undefined ? Number(body.accuracy) : 95.0,
          status: body.status || 'active',
          walletAddress: body.walletAddress || `0x${Math.random().toString(16).substring(2, 10).toUpperCase()}...${Math.random().toString(16).substring(2, 6)}`,
        },
      });
  
      if (body.version || body.endpoint) {
        await this.prisma.agentVersion.create({
          data: {
            agentId: agent.id,
            version: body.version || '1.0.0',
            endpoint: body.endpoint || '',
            inputSchema: {},
            outputSchema: {},
          }
        });
      }
  
      await this.redis.del('marketplace:agents');
  
      const returnData = {
        ...agent,
        rating: Number(agent.averageRating),
        reviewsCount: agent.verificationCount * 3 + 12,
        trustScore: Number(agent.trustScore),
        version: body.version || '1.0.0',
        endpoint: body.endpoint || '',
      };
  
      return {
        success: true,
        message: 'Agent profile metadata saved successfully',
        data: returnData,
      };
    } catch (error: any) {
      return {
        success: false,
        message: `Database error creating agent: ${error.message}`,
      };
    }
  }

  @Get('agents')
  async getAgents(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
    @Query('category') category?: string,
    @Query('verifiedOnly') verifiedOnly?: string,
    @Query('sortBy') sortBy?: string,
    @Query('userId') userId?: string,
  ) {
    const p = Math.max(1, Number(page || 1));
    const l = Math.max(1, Number(limit || 20));
    const skip = (p - 1) * l;

    const where: any = { deletedAt: null };

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { skills: { has: search } },
      ];
    }

    if (category && category !== 'All') {
      where.category = category;
    }

    if (verifiedOnly === 'true') {
      where.verificationStatus = 'verified';
    }

    let orderBy: any = { createdAt: 'desc' };
    if (sortBy === 'price_asc') {
      orderBy = { price: 'asc' };
    } else if (sortBy === 'price_desc') {
      orderBy = { price: 'desc' };
    } else if (sortBy === 'rating') {
      orderBy = { averageRating: 'desc' };
    } else if (sortBy === 'latency') {
      orderBy = { latency: 'asc' };
    } else if (sortBy === 'trust') {
      orderBy = { trustScore: 'desc' };
    }

    const agents = await this.prisma.agent.findMany({
      where,
      include: {
        versions: { orderBy: { publishedAt: 'desc' } },
        reviews: true,
        installs: true,
        favorites: true,
      },
      skip,
      take: l,
      orderBy,
    });

    const total = await this.prisma.agent.count({ where });

    const mapped = agents.map(a => {
      const latestVersion = a.versions[0];
      const isFavorite = userId ? a.favorites.some(f => f.userId === userId) : false;
      const isInstalled = userId ? a.installs.some(i => i.userId === userId) : false;

      return {
        id: a.id,
        name: a.name,
        slug: a.slug,
        description: a.description,
        logoUrl: a.logoUrl || `https://api.dicebear.com/7.x/bottts/svg?seed=${a.slug}`,
        category: a.category,
        skills: a.skills,
        tags: a.tags,
        price: a.price,
        rating: Number(a.averageRating),
        reviewsCount: a.reviews.length,
        reviews: a.reviews,
        trustScore: Number(a.trustScore),
        latency: a.latency,
        accuracy: a.accuracy,
        downloads: a.installs.length,
        verificationStatus: a.verificationStatus,
        verificationCount: a.verificationCount,
        failureRate: a.failureRate,
        status: a.status,
        walletAddress: a.walletAddress,
        version: latestVersion ? latestVersion.version : '1.0.0',
        endpoint: latestVersion ? latestVersion.endpoint : '',
        isFavorite,
        isInstalled,
        ownerId: a.ownerId,
        createdAt: a.createdAt,
      };
    });

    return {
      success: true,
      data: mapped,
      pagination: {
        total,
        page: p,
        limit: l,
        pages: Math.ceil(total / l),
      }
    };
  }

  @Post('agents/:id/favorite')
  @HttpCode(HttpStatus.OK)
  async toggleFavorite(@Param('id') id: string, @Body() body: { userId: string }) {
    const { userId } = body;
    if (!userId) {
      return { success: false, message: 'User ID is required' };
    }
    const existing = await this.prisma.favorite.findFirst({
      where: {
        userId,
        agentId: id
      }
    });

    if (existing) {
      await this.prisma.favorite.delete({
        where: {
          id: existing.id
        }
      });
      await this.redis.del('marketplace:agents');
      return { success: true, isFavorite: false, message: 'Removed from favorites' };
    } else {
      await this.prisma.favorite.create({
        data: {
          userId,
          agentId: id
        }
      });
      await this.redis.del('marketplace:agents');
      return { success: true, isFavorite: true, message: 'Added to favorites' };
    }
  }

  @Post('agents/:id/install')
  @HttpCode(HttpStatus.OK)
  async toggleInstall(@Param('id') id: string, @Body() body: { userId: string }) {
    const { userId } = body;
    if (!userId) {
      return { success: false, message: 'User ID is required' };
    }
    const existing = await this.prisma.install.findFirst({
      where: {
        userId,
        agentId: id
      }
    });

    if (existing) {
      await this.prisma.install.delete({
        where: {
          id: existing.id
        }
      });
      await this.redis.del('marketplace:agents');
      return { success: true, isInstalled: false, message: 'Agent uninstalled successfully' };
    } else {
      await this.prisma.install.create({
        data: {
          userId,
          agentId: id
        }
      });
      await this.redis.del('marketplace:agents');
      return { success: true, isInstalled: true, message: 'Agent installed successfully' };
    }
  }

  @Post('agents/:id/versions')
  @HttpCode(HttpStatus.CREATED)
  async publishVersion(@Param('id') id: string, @Body() body: { version: string; endpoint: string }) {
    try {
      const newVersion = await this.prisma.agentVersion.create({
        data: {
          agentId: id,
          version: body.version,
          endpoint: body.endpoint,
          inputSchema: {},
          outputSchema: {}
        }
      });
      await this.redis.del('marketplace:agents');
      return { success: true, message: 'New agent version published successfully', data: newVersion };
    } catch (e: any) {
      return { success: false, message: `Database error publishing version: ${e.message}` };
    }
  }

  @Get('agents/search')
  async searchAgents(@Query('q') query: string) {
    const agents = await this.prisma.agent.findMany({
      where: {
        deletedAt: null,
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
        ],
      },
      include: {
        versions: true,
      },
    });

    const mapped = agents.map(a => {
      const latestVersion = a.versions[0];
      return {
        id: a.id,
        name: a.name,
        slug: a.slug,
        description: a.description,
        logoUrl: a.logoUrl,
        category: a.category,
        skills: a.skills,
        tags: a.tags,
        price: a.price,
        rating: Number(a.averageRating),
        reviewsCount: a.verificationCount * 3 + 12,
        trustScore: Number(a.trustScore),
        latency: a.latency,
        accuracy: a.accuracy,
        verificationCount: a.verificationCount,
        failureRate: a.failureRate,
        status: a.status,
        walletAddress: a.walletAddress,
        version: latestVersion ? latestVersion.version : '1.0.0',
        endpoint: latestVersion ? latestVersion.endpoint : '',
      };
    });

    return {
      success: true,
      data: mapped,
    };
  }

  @Get('agents/:id')
  async getAgent(@Param('id') id: string) {
    const a = await this.prisma.agent.findFirst({
      where: { id, deletedAt: null },
      include: {
        versions: true,
        pricingModels: true,
      },
    });

    if (!a) {
      return { success: false, message: 'Agent not found' };
    }

    const latestVersion = a.versions[0];
    const mapped = {
      id: a.id,
      name: a.name,
      slug: a.slug,
      description: a.description,
      logoUrl: a.logoUrl,
      category: a.category,
      skills: a.skills,
      tags: a.tags,
      price: a.price,
      rating: Number(a.averageRating),
      reviewsCount: a.verificationCount * 3 + 12,
      trustScore: Number(a.trustScore),
      latency: a.latency,
      accuracy: a.accuracy,
      verificationCount: a.verificationCount,
      failureRate: a.failureRate,
      status: a.status,
      walletAddress: a.walletAddress,
      version: latestVersion ? latestVersion.version : '1.0.0',
      endpoint: latestVersion ? latestVersion.endpoint : '',
    };

    return {
      success: true,
      data: mapped,
    };
  }

  @Patch('agents/:id')
  async updateAgent(@Param('id') id: string, @Body() body: any) {
    const updated = await this.prisma.agent.update({
      where: { id },
      data: {
        name: body.name,
        description: body.description,
        logoUrl: body.logoUrl,
      },
    });

    await this.redis.del('marketplace:agents');

    return {
      success: true,
      message: 'Agent updated successfully',
      data: updated,
    };
  }

  @Delete('agents/:id')
  async deleteAgent(@Param('id') id: string) {
    await this.prisma.agent.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    await this.redis.del('marketplace:agents');

    return {
      success: true,
      message: `Agent ${id} status set to archived`,
    };
  }

  @Post('agents/:id/publish')
  @HttpCode(HttpStatus.OK)
  async publishAgent(@Param('id') id: string) {
    // Publish includes CAP registration
    const registration = await this.capAgent.registerAgent(id);

    await this.redis.del('marketplace:agents');

    return {
      success: true,
      message: 'Agent successfully indexed on CROO CAP registry and published',
      data: {
        capDid: registration.did,
        capStoreId: registration.storeId,
        capEndpoint: registration.endpoint,
        registeredAt: registration.registeredAt,
      },
    };
  }

  @Post('agents/:id/archive')
  @HttpCode(HttpStatus.OK)
  async archiveAgent(@Param('id') id: string) {
    await this.prisma.agent.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    await this.redis.del('marketplace:agents');

    return {
      success: true,
      message: `Agent ${id} archived and hidden from discovery`,
    };
  }

  @Get('agents/:id/reviews')
  async getReviews(@Param('id') id: string) {
    const reviews = await this.prisma.review.findMany({
      where: { agentId: id },
    });

    return {
      success: true,
      data: reviews,
    };
  }

  @Post('agents/:id/reviews')
  @HttpCode(HttpStatus.CREATED)
  async createReview(@Param('id') id: string, @Body() body: any) {
    const review = await this.prisma.review.create({
      data: {
        agentId: id,
        userId: body.userId || 'user-1',
        rating: body.rating || 5,
        comment: body.comment || '',
      },
    });

    await this.redis.del('marketplace:agents');

    return {
      success: true,
      message: 'Review published successfully',
      data: review,
    };
  }

  @Get('agents/:id/analytics')
  async getAnalytics(@Param('id') id: string) {
    const agent = await this.prisma.agent.findFirst({
      where: { id },
    });

    return {
      success: true,
      data: {
        totalRuns: agent ? Math.floor(Number(agent.trustScore) * 1.5) : 100,
        totalRevenueUsdc: agent ? Number(agent.averageRating) * 50 : 250.0,
        averageLatencyMs: 780,
      },
    };
  }

  // ─── CROO Agent Protocol (CAP) Endpoints ─────────────────────────────────

  @Post('agents/:id/cap/register')
  @HttpCode(HttpStatus.OK)
  async capRegisterAgent(@Param('id') id: string) {
    const registration = await this.capAgent.registerAgent(id);

    return {
      success: true,
      message: 'Agent registered on CROO Agent Protocol',
      data: registration,
    };
  }

  @Get('agents/cap/discover')
  async capDiscoverAgents(
    @Query('capability') capability: string,
    @Query('minReputation') minReputation?: string,
    @Query('maxPrice') maxPrice?: string,
    @Query('limit') limit?: string,
  ) {
    const results = await this.capAgent.discoverAgents(capability || 'general', {
      minReputation: minReputation ? Number(minReputation) : undefined,
      maxPriceUsdc: maxPrice ? Number(maxPrice) : undefined,
      limit: limit ? Number(limit) : undefined,
    });

    return {
      success: true,
      data: results,
      meta: { source: 'croo-agent-store', count: results.length },
    };
  }

  @Post('agents/:id/cap/invoke')
  @HttpCode(HttpStatus.OK)
  async capInvokeAgent(
    @Param('id') id: string,
    @Body() body: { targetDid: string; payload: any; maxCostUsdc?: number },
  ) {
    const result = await this.capAgent.invokeAgent(
      id,
      body.targetDid,
      body.payload,
      body.maxCostUsdc,
    );

    return {
      success: true,
      message: 'A2A invocation completed',
      data: result,
    };
  }

  @Post('agents/:id/cap/sync')
  @HttpCode(HttpStatus.OK)
  async capSyncMetadata(@Param('id') id: string) {
    const result = await this.capAgent.syncMetadata(id);

    return {
      success: true,
      message: result.synced
        ? 'Agent metadata synchronized with CROO Agent Store'
        : 'Metadata sync queued (offline mode)',
      data: result,
    };
  }

  @Get('agents/:id/cap/status')
  async capGetStatus(@Param('id') id: string) {
    const status = await this.capAgent.getCapStatus(id);

    return {
      success: true,
      data: status,
    };
  }
}
