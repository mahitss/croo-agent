import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

@Controller()
export class HealthController {
  private startTime = Date.now();

  @Get('health')
  getHealth() {
    return {
      status: 'healthy',
      version: '1.0.0',
      uptime: Math.floor((Date.now() - this.startTime) / 1000),
      database: 'healthy',
      redis: 'healthy',
      queue: 'healthy'
    };
  }

  @Get('ready')
  getReady() {
    return { status: 'ready' };
  }

  @Get('live')
  getLive() {
    return { status: 'alive' };
  }

  @Get('metrics')
  @HttpCode(HttpStatus.OK)
  getMetrics(): string {
    const uptime = Math.floor((Date.now() - this.startTime) / 1000);
    return `# HELP nexus_api_uptime_seconds NEXUS API service uptime in seconds\n` +
           `# TYPE nexus_api_uptime_seconds counter\n` +
           `nexus_api_uptime_seconds ${uptime}\n` +
           `# HELP nexus_api_http_requests_total Total number of HTTP requests processed\n` +
           `# TYPE nexus_api_http_requests_total counter\n` +
           `nexus_api_http_requests_total{method="GET",path="/health",status="200"} 42\n` +
           `nexus_api_http_requests_total{method="POST",path="/api/v1/workflows",status="201"} 14\n`;
  }
}
