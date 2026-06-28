import { Controller, Get, Post, Patch, Delete, Param, Body, Query, HttpCode, HttpStatus } from '@nestjs/common';

@Controller('api/v1')
export class AgentsController {
  private readonly agentUrl = 'http://localhost:5002/api/v1';

  @Post('agents')
  @HttpCode(HttpStatus.CREATED)
  async publishAgent(@Body() body: any) {
    try {
      const res = await fetch(`${this.agentUrl}/agents`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      return await res.json();
    } catch (err: any) {
      return { success: false, message: `Agent service unreachable: ${err.message}` };
    }
  }

  @Get('agents')
  async getAgents() {
    try {
      const res = await fetch(`${this.agentUrl}/agents`);
      return await res.json();
    } catch (err: any) {
      return { success: false, message: `Agent service unreachable: ${err.message}` };
    }
  }

  @Patch('agents/:id')
  async updateAgent(@Param('id') id: string, @Body() body: any) {
    try {
      const res = await fetch(`${this.agentUrl}/agents/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      return await res.json();
    } catch (err: any) {
      return { success: false, message: `Agent service unreachable: ${err.message}` };
    }
  }

  @Delete('agents/:id')
  async deleteAgent(@Param('id') id: string) {
    try {
      const res = await fetch(`${this.agentUrl}/agents/${id}`, {
        method: 'DELETE',
      });
      return await res.json();
    } catch (err: any) {
      return { success: false, message: `Agent service unreachable: ${err.message}` };
    }
  }

  @Get('agents/search')
  async searchAgents(@Query('q') query: string) {
    try {
      const res = await fetch(`${this.agentUrl}/agents/search?q=${query}`);
      return await res.json();
    } catch (err: any) {
      return { success: false, message: `Agent service unreachable: ${err.message}` };
    }
  }

  @Get('agents/:id')
  async getAgent(@Param('id') id: string) {
    try {
      const res = await fetch(`${this.agentUrl}/agents/${id}`);
      return await res.json();
    } catch (err: any) {
      return { success: false, message: `Agent service unreachable: ${err.message}` };
    }
  }

  @Get('agents/:id/analytics')
  async getAgentAnalytics(@Param('id') id: string) {
    try {
      const res = await fetch(`${this.agentUrl}/agents/${id}/analytics`);
      return await res.json();
    } catch (err: any) {
      return { success: false, message: `Agent service unreachable: ${err.message}` };
    }
  }

  @Get('agents/:id/reviews')
  async getAgentReviews(@Param('id') id: string) {
    try {
      const res = await fetch(`${this.agentUrl}/agents/${id}/reviews`);
      return await res.json();
    } catch (err: any) {
      return { success: false, message: `Agent service unreachable: ${err.message}` };
    }
  }

  @Post('agents/:id/reviews')
  async createReview(@Param('id') id: string, @Body() body: any) {
    try {
      const res = await fetch(`${this.agentUrl}/agents/${id}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      return await res.json();
    } catch (err: any) {
      return { success: false, message: `Agent service unreachable: ${err.message}` };
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
