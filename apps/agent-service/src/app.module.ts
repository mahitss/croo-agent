import { Module } from '@nestjs/common';
import { AgentController } from './controllers/agent.controller';
import { PrismaService } from './services/prisma.service';
import { CAPAgentService } from './services/cap-agent.service';
import { RedisService } from './services/redis.service';

@Module({
  imports: [],
  controllers: [AgentController],
  providers: [PrismaService, CAPAgentService, RedisService],
  exports: [PrismaService, CAPAgentService, RedisService],
})
export class AppModule {}
