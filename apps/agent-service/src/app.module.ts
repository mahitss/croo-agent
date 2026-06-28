import { Module } from '@nestjs/common';
import { AgentController } from './controllers/agent.controller';
import { PrismaService } from './services/prisma.service';

@Module({
  imports: [],
  controllers: [AgentController],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
