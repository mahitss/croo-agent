import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthController {
  private startTime = Date.now();

  @Get('health')
  @Get('api/health')
  @Get('api/v1/health')
  getHealth() {
    return {
      status: 'healthy',
      service: 'workflow-service',
      version: '1.0.0',
      uptime: Math.floor((Date.now() - this.startTime) / 1000),
    };
  }
}
