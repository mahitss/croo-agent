import { Module } from '@nestjs/common';
import { AgentController } from './controllers/agent.controller';
import { PrismaService } from './services/prisma.service';
import { CAPAgentService } from './services/cap-agent.service';

@Module({
  imports: [],
  controllers: [AgentController],
  providers: [PrismaService, CAPAgentService],
  exports: [PrismaService, CAPAgentService],
})
export class AppModule {}
