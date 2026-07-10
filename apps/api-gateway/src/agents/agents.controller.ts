import { Controller, Get, Post, Patch, Delete, Param, Body, Query, HttpCode, HttpStatus } from '@nestjs/common';

@Controller('api/v1')
export class AgentsController {
  private readonly agentUrl = process.env.AGENT_SERVICE_URL;

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
  async getAgents() {
    if (!this.agentUrl) {
      return {
        success: false,
        statusCode: HttpStatus.SERVICE_UNAVAILABLE,
        message: 'Agent Service is currently unavailable. AGENT_SERVICE_URL environment variable is not defined.',
        error: 'Service Unavailable'
      };
    }
    try {
      const res = await fetch(`${this.agentUrl}/agents`);
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
  async getMarketplaceAgents() {
    if (!this.agentUrl) {
      return {
        success: false,
        statusCode: HttpStatus.SERVICE_UNAVAILABLE,
        message: 'Agent Service is currently unavailable. AGENT_SERVICE_URL environment variable is not defined.',
        error: 'Service Unavailable'
      };
    }
    try {
      const res = await fetch(`${this.agentUrl}/agents`);
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
}
