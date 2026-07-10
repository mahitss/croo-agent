import { Controller, Get, Post, Patch, Delete, Param, Body, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { handleGatewayError } from '../utils/gateway-error';

@Controller('api/v1')
export class AgentsController {
  private readonly agentUrl = 
    process.env.AGENT_SERVICE_URL || 
    (process.env.NODE_ENV === 'production' || process.env.RENDER === 'true'
      ? 'http://agent-service:5002/api/v1'
      : 'http://127.0.0.1:5002/api/v1');

  @Post('agents')
  @HttpCode(HttpStatus.CREATED)
  async publishAgent(@Body() body: any) {
    const start = Date.now();
    try {
      const res = await fetch(`${this.agentUrl}/agents`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      return await res.json();
    } catch (err: any) {
      return handleGatewayError(err, 'Agent Service', 'POST /agents', start);
    }
  }

  @Get('agents')
  async getAgents() {
    const start = Date.now();
    try {
      const res = await fetch(`${this.agentUrl}/agents`);
      return await res.json();
    } catch (err: any) {
      return handleGatewayError(err, 'Agent Service', 'GET /agents', start);
    }
  }

  @Get('marketplace')
  async getMarketplaceAgents() {
    const start = Date.now();
    try {
      const res = await fetch(`${this.agentUrl}/agents`);
      return await res.json();
    } catch (err: any) {
      return handleGatewayError(err, 'Agent Service', 'GET /marketplace', start);
    }
  }

  @Patch('agents/:id')
  async updateAgent(@Param('id') id: string, @Body() body: any) {
    const start = Date.now();
    try {
      const res = await fetch(`${this.agentUrl}/agents/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      return await res.json();
    } catch (err: any) {
      return handleGatewayError(err, 'Agent Service', `PATCH /agents/${id}`, start);
    }
  }

  @Delete('agents/:id')
  async deleteAgent(@Param('id') id: string) {
    const start = Date.now();
    try {
      const res = await fetch(`${this.agentUrl}/agents/${id}`, {
        method: 'DELETE',
      });
      return await res.json();
    } catch (err: any) {
      return handleGatewayError(err, 'Agent Service', `DELETE /agents/${id}`, start);
    }
  }

  @Get('agents/search')
  async searchAgents(@Query('q') query: string) {
    const start = Date.now();
    try {
      const res = await fetch(`${this.agentUrl}/agents/search?q=${query}`);
      return await res.json();
    } catch (err: any) {
      return handleGatewayError(err, 'Agent Service', `GET /agents/search?q=${query}`, start);
    }
  }

  @Get('agents/:id')
  async getAgent(@Param('id') id: string) {
    const start = Date.now();
    try {
      const res = await fetch(`${this.agentUrl}/agents/${id}`);
      return await res.json();
    } catch (err: any) {
      return handleGatewayError(err, 'Agent Service', `GET /agents/${id}`, start);
    }
  }

  @Get('agents/:id/analytics')
  async getAgentAnalytics(@Param('id') id: string) {
    const start = Date.now();
    try {
      const res = await fetch(`${this.agentUrl}/agents/${id}/analytics`);
      return await res.json();
    } catch (err: any) {
      return handleGatewayError(err, 'Agent Service', `GET /agents/${id}/analytics`, start);
    }
  }

  @Get('agents/:id/reviews')
  async getAgentReviews(@Param('id') id: string) {
    const start = Date.now();
    try {
      const res = await fetch(`${this.agentUrl}/agents/${id}/reviews`);
      return await res.json();
    } catch (err: any) {
      return handleGatewayError(err, 'Agent Service', `GET /agents/${id}/reviews`, start);
    }
  }

  @Post('agents/:id/reviews')
  async createReview(@Param('id') id: string, @Body() body: any) {
    const start = Date.now();
    try {
      const res = await fetch(`${this.agentUrl}/agents/${id}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      return await res.json();
    } catch (err: any) {
      return handleGatewayError(err, 'Agent Service', `POST /agents/${id}/reviews`, start);
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
}
