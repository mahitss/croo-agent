import { Module } from '@nestjs/common';
import { WorkflowController } from './controllers/workflow.controller';

@Module({
  imports: [],
  controllers: [WorkflowController],
  providers: [],
})
export class AppModule {}
