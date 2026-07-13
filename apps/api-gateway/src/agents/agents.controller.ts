import { Controller, Get, Post, Patch, Delete, Param, Body, Query, HttpCode, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { GatewayAuthGuard } from '../guards/auth.guard';

@Controller('api/v1')
export class AgentsController {
  private readonly agentUrl = process.env.AGENT_SERVICE_URL || 'http://127.0.0.1:5002/api/v1';

  @Post('agents')
  @HttpCode(HttpStatus.CREATED)
  async publishAgent(@Body() body: any) {
    if (!this.agentUrl) {
      return {
        success: false,
        statusCode: HttpStatus.SERVICE_UNAVAILABLE,
        message: 'Agent Service is currently unavailable. AGENT_SERVICE_URL environment variable is not defined.',
        error: 'Service Unavailable'
      };
    }
    try {
      const res = await fetch(`${this.agentUrl}/agents`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      return await res.json();
    } catch (err: any) {
      return {
        success: false,
        statusCode: HttpStatus.SERVICE_UNAVAILABLE,
        message: `Agent Service is unreachable: ${err.message}`,
        error: 'Service Unavailable'
      };
    }
  }

  @Get('agents')
  async getAgents(@Req() req: any, @Query() query: any) {
    if (!this.agentUrl) {
      return {
        success: false,
        statusCode: HttpStatus.SERVICE_UNAVAILABLE,
        message: 'Agent Service is currently unavailable.',
        error: 'Service Unavailable'
      };
    }
    try {
      const authHeader = req.headers.authorization;
      let userId = undefined;
      if (authHeader) {
        try {
          const token = authHeader.split(' ')[1];
          const payload = token.split('.')[1];
          const decodedPayload = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
          userId = decodedPayload.sub || decodedPayload.id;
        } catch (e) {}
      }

      const q = { ...query };
      if (userId) {
        q.userId = userId;
      }
      const qParams = new URLSearchParams(q).toString();
      const res = await fetch(`${this.agentUrl}/agents?${qParams}`);
      return await res.json();
    } catch (err: any) {
      return {
        success: false,
        statusCode: HttpStatus.SERVICE_UNAVAILABLE,
        message: `Agent Service is unreachable: ${err.message}`,
        error: 'Service Unavailable'
      };
    }
  }

  @Get('marketplace')
  async getMarketplaceAgents(@Req() req: any, @Query() query: any) {
    return this.getAgents(req, query);
  }

  @Patch('agents/:id')
  async updateAgent(@Param('id') id: string, @Body() body: any) {
    if (!this.agentUrl) {
      return {
        success: false,
        statusCode: HttpStatus.SERVICE_UNAVAILABLE,
        message: 'Agent Service is currently unavailable. AGENT_SERVICE_URL environment variable is not defined.',
        error: 'Service Unavailable'
      };
    }
    try {
      const res = await fetch(`${this.agentUrl}/agents/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      return await res.json();
    } catch (err: any) {
      return {
        success: false,
        statusCode: HttpStatus.SERVICE_UNAVAILABLE,
        message: `Agent Service is unreachable: ${err.message}`,
        error: 'Service Unavailable'
      };
    }
  }

  @Delete('agents/:id')
  async deleteAgent(@Param('id') id: string) {
    if (!this.agentUrl) {
      return {
        success: false,
        statusCode: HttpStatus.SERVICE_UNAVAILABLE,
        message: 'Agent Service is currently unavailable. AGENT_SERVICE_URL environment variable is not defined.',
        error: 'Service Unavailable'
      };
    }
    try {
      const res = await fetch(`${this.agentUrl}/agents/${id}`, {
        method: 'DELETE',
      });
      return await res.json();
    } catch (err: any) {
      return {
        success: false,
        statusCode: HttpStatus.SERVICE_UNAVAILABLE,
        message: `Agent Service is unreachable: ${err.message}`,
        error: 'Service Unavailable'
      };
    }
  }

  @Get('agents/search')
  async searchAgents(@Query('q') query: string) {
    if (!this.agentUrl) {
      return {
        success: false,
        statusCode: HttpStatus.SERVICE_UNAVAILABLE,
        message: 'Agent Service is currently unavailable. AGENT_SERVICE_URL environment variable is not defined.',
        error: 'Service Unavailable'
      };
    }
    try {
      const res = await fetch(`${this.agentUrl}/agents/search?q=${query}`);
      return await res.json();
    } catch (err: any) {
      return {
        success: false,
        statusCode: HttpStatus.SERVICE_UNAVAILABLE,
        message: `Agent Service is unreachable: ${err.message}`,
        error: 'Service Unavailable'
      };
    }
  }

  @Get('agents/:id')
  async getAgent(@Param('id') id: string) {
    if (!this.agentUrl) {
      return {
        success: false,
        statusCode: HttpStatus.SERVICE_UNAVAILABLE,
        message: 'Agent Service is currently unavailable. AGENT_SERVICE_URL environment variable is not defined.',
        error: 'Service Unavailable'
      };
    }
    try {
      const res = await fetch(`${this.agentUrl}/agents/${id}`);
      return await res.json();
    } catch (err: any) {
      return {
        success: false,
        statusCode: HttpStatus.SERVICE_UNAVAILABLE,
        message: `Agent Service is unreachable: ${err.message}`,
        error: 'Service Unavailable'
      };
    }
  }

  @Get('agents/:id/analytics')
  async getAgentAnalytics(@Param('id') id: string) {
    if (!this.agentUrl) {
      return {
        success: false,
        statusCode: HttpStatus.SERVICE_UNAVAILABLE,
        message: 'Agent Service is currently unavailable. AGENT_SERVICE_URL environment variable is not defined.',
        error: 'Service Unavailable'
      };
    }
    try {
      const res = await fetch(`${this.agentUrl}/agents/${id}/analytics`);
      return await res.json();
    } catch (err: any) {
      return {
        success: false,
        statusCode: HttpStatus.SERVICE_UNAVAILABLE,
        message: `Agent Service is unreachable: ${err.message}`,
        error: 'Service Unavailable'
      };
    }
  }

  @Get('agents/:id/reviews')
  async getAgentReviews(@Param('id') id: string) {
    if (!this.agentUrl) {
      return {
        success: false,
        statusCode: HttpStatus.SERVICE_UNAVAILABLE,
        message: 'Agent Service is currently unavailable. AGENT_SERVICE_URL environment variable is not defined.',
        error: 'Service Unavailable'
      };
    }
    try {
      const res = await fetch(`${this.agentUrl}/agents/${id}/reviews`);
      return await res.json();
    } catch (err: any) {
      return {
        success: false,
        statusCode: HttpStatus.SERVICE_UNAVAILABLE,
        message: `Agent Service is unreachable: ${err.message}`,
        error: 'Service Unavailable'
      };
    }
  }

  @Post('agents/:id/reviews')
  async createReview(@Param('id') id: string, @Body() body: any) {
    if (!this.agentUrl) {
      return {
        success: false,
        statusCode: HttpStatus.SERVICE_UNAVAILABLE,
        message: 'Agent Service is currently unavailable. AGENT_SERVICE_URL environment variable is not defined.',
        error: 'Service Unavailable'
      };
    }
    try {
      const res = await fetch(`${this.agentUrl}/agents/${id}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      return await res.json();
    } catch (err: any) {
      return {
        success: false,
        statusCode: HttpStatus.SERVICE_UNAVAILABLE,
        message: `Agent Service is unreachable: ${err.message}`,
        error: 'Service Unavailable'
      };
    }
  }

  @Get('marketplace/featured')
  getFeatured() {
    return { success: true, data: [] };
  }

  @Get('marketplace/trending')
  getTrending() {
    return { success: true, data: [] };
  }

  @Get('marketplace/categories')
  getCategories() {
    return {
      success: true,
      data: ['Research', 'Finance', 'Legal', 'Coding', 'Security', 'Translation'],
    };
  }

  @Post('agents/:id/favorite')
  @UseGuards(GatewayAuthGuard)
  async toggleFavorite(@Req() req: any, @Param('id') id: string) {
    if (!this.agentUrl) {
      return { success: false, message: 'Agent Service is unavailable.' };
    }
    try {
      const res = await fetch(`${this.agentUrl}/agents/${id}/favorite`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: req.user.id }),
      });
      return await res.json();
    } catch (err: any) {
      return { success: false, message: `Gateway error favoriting: ${err.message}` };
    }
  }

  @Post('agents/:id/install')
  @UseGuards(GatewayAuthGuard)
  async toggleInstall(@Req() req: any, @Param('id') id: string) {
    if (!this.agentUrl) {
      return { success: false, message: 'Agent Service is unavailable.' };
    }
    try {
      const res = await fetch(`${this.agentUrl}/agents/${id}/install`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: req.user.id }),
      });
      return await res.json();
    } catch (err: any) {
      return { success: false, message: `Gateway error installing: ${err.message}` };
    }
  }

  @Post('agents/:id/versions')
  @UseGuards(GatewayAuthGuard)
  async publishVersion(@Req() req: any, @Param('id') id: string, @Body() body: any) {
    if (!this.agentUrl) {
      return { success: false, message: 'Agent Service is unavailable.' };
    }
    try {
      const res = await fetch(`${this.agentUrl}/agents/${id}/versions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      return await res.json();
    } catch (err: any) {
      return { success: false, message: `Gateway error publishing version: ${err.message}` };
    }
  }
}
