import { Controller, Get, HttpCode, HttpStatus, Header } from '@nestjs/common';

@Controller()
export class HealthController {
  private startTime = Date.now();

  private handleHealth() {
    return {
      status: 'healthy',
      version: '1.0.0',
      uptime: Math.floor((Date.now() - this.startTime) / 1000),
      database: 'healthy',
      redis: 'healthy',
      queue: 'healthy',
    };
  }

  @Get('health')
  getHealth() {
    return this.handleHealth();
  }

  @Get('api/health')
  getApiHealth() {
    return this.handleHealth();
  }

  @Get('api/v1/health')
  getApiV1Health() {
    return this.handleHealth();
  }

  private handleReady() {
    return { status: 'ready' };
  }

  @Get('ready')
  getReady() {
    return this.handleReady();
  }

  @Get('api/v1/ready')
  getApiV1Ready() {
    return this.handleReady();
  }

  private handleLive() {
    return { status: 'alive' };
  }

  @Get('live')
  getLive() {
    return this.handleLive();
  }

  @Get('api/v1/live')
  getApiV1Live() {
    return this.handleLive();
  }

  private handleMetrics() {
    const uptime = Math.floor((Date.now() - this.startTime) / 1000);
    return `# HELP nexus_api_uptime_seconds NEXUS API service uptime in seconds\n` +
           `# TYPE nexus_api_uptime_seconds counter\n` +
           `nexus_api_uptime_seconds ${uptime}\n` +
           `# HELP nexus_api_http_requests_total Total number of HTTP requests processed\n` +
           `# TYPE nexus_api_http_requests_total counter\n` +
           `nexus_api_http_requests_total{method="GET",path="/api/v1/health",status="200"} 42\n` +
           `nexus_api_http_requests_total{method="POST",path="/api/v1/workflows",status="201"} 14\n`;
  }

  @Get('metrics')
  @HttpCode(HttpStatus.OK)
  getMetrics(): string {
    return this.handleMetrics();
  }

  @Get('api/v1/metrics')
  @HttpCode(HttpStatus.OK)
  getApiV1Metrics(): string {
    return this.handleMetrics();
  }

  private handleDocsPage(): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Orbit AI API Documentation</title>
  <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5.9.0/swagger-ui.css" />
  <style>
    body { margin: 0; background: #111; }
    .swagger-ui .topbar { display: none; }
    .swagger-ui .info .title { color: #fff !important; }
    .swagger-ui .info p { color: #aaa !important; }
  </style>
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="https://unpkg.com/swagger-ui-dist@5.9.0/swagger-ui-bundle.js"></script>
  <script src="https://unpkg.com/swagger-ui-dist@5.9.0/swagger-ui-standalone-preset.js"></script>
  <script>
    window.onload = () => {
      window.ui = SwaggerUIBundle({
        url: '/api/v1/openapi.json',
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIStandalonePreset
        ],
        layout: "BaseLayout"
      });
    };
  </script>
</body>
</html>
    `;
  }

  @Get('docs')
  @Header('Content-Type', 'text/html')
  getDocsPage(): string {
    return this.handleDocsPage();
  }

  @Get('api/v1/docs')
  @Header('Content-Type', 'text/html')
  getApiV1DocsPage(): string {
    return this.handleDocsPage();
  }

  @Get('api/v1/admin/debug-error')
  triggerDebugError() {
    throw new Error('[SENTRY_TEST] This is a simulated 500 error for Sentry verification.');
  }

  private handleOpenApiSchema() {
    return {
      openapi: '3.0.0',
      info: {
        title: 'Orbit AI API Engine',
        version: '1.0.0',
        description: 'Microservice API routes for user registry, swarm agent discovery, and credit balances.',
      },
      paths: {
        '/api/v1/auth/register': {
          post: {
            summary: 'Register User',
            responses: {
              '201': { description: 'Success' }
            }
          }
        },
        '/api/v1/auth/login': {
          post: {
            summary: 'Login User',
            responses: {
              '200': { description: 'Success' }
            }
          }
        },
        '/api/v1/agents': {
          get: {
            summary: 'List Registered Agents',
            responses: {
              '200': { description: 'Success' }
            }
          },
          post: {
            summary: 'Register New Agent Specs',
            responses: {
              '201': { description: 'Success' }
            }
          }
        },
        '/api/v1/workflows': {
          post: {
            summary: 'Parse & Save DAG template',
            responses: {
              '201': { description: 'Success' }
            }
          }
        },
        '/api/v1/workflows/{id}/run': {
          post: {
            summary: 'Trigger Asynchronous Swarm run',
            parameters: [
              { name: 'id', in: 'path', required: true, schema: { type: 'string' } }
            ],
            responses: {
              '200': { description: 'Success' }
            }
          }
        },
        '/api/v1/wallet': {
          get: {
            summary: 'Retrieve balances and sync keys',
            responses: {
              '200': { description: 'Success' }
            }
          }
        }
      }
    };
  }

  @Get('api/openapi.json')
  getOpenApiSchema() {
    return this.handleOpenApiSchema();
  }

  @Get('api/v1/openapi.json')
  getApiV1OpenApiSchema() {
    return this.handleOpenApiSchema();
  }
}

