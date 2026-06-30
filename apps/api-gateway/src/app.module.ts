import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AuthController } from './auth/auth.controller';
import { AgentsController } from './agents/agents.controller';
import { WorkflowsController } from './workflows/workflows.controller';
import { WalletController } from './wallet/wallet.controller';
import { AnalyticsController } from './analytics/analytics.controller';
import { HealthController } from './health/health.controller';
import { NexusGateway } from './gateway/nexus.gateway';
import { SentryExceptionFilter } from './filters/sentry-exception.filter';

@Module({
  imports: [],
  controllers: [
    AuthController,
    AgentsController,
    WorkflowsController,
    WalletController,
    AnalyticsController,
    HealthController
  ],
  providers: [
    NexusGateway,
    {
      provide: APP_FILTER,
      useClass: SentryExceptionFilter,
    },
  ],
})
export class AppModule {}
