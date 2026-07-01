import { Module } from '@nestjs/common';
import { WorkflowController } from './controllers/workflow.controller';
import { HealthController } from './controllers/health.controller';
import { PrismaService } from './services/prisma.service';

@Module({
  imports: [],
  controllers: [WorkflowController, HealthController],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
