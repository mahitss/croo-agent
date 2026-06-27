import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AgentsController } from './agents/agents.controller';
import { WorkflowsController } from './workflows/workflows.controller';
import { WalletController } from './wallet/wallet.controller';
import { AnalyticsController } from './analytics/analytics.controller';
import { HealthController } from './health/health.controller';
import { NexusGateway } from './gateway/nexus.gateway';

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
  providers: [NexusGateway],
})
export class AppModule {}
