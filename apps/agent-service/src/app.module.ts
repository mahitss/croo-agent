import { Module } from '@nestjs/common';
import { AgentController } from './controllers/agent.controller';

@Module({
  imports: [],
  controllers: [AgentController],
  providers: [],
})
export class AppModule {}
