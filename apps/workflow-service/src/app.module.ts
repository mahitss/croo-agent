import { Module } from '@nestjs/common';
import { WorkflowController } from './controllers/workflow.controller';
import { PrismaService } from './services/prisma.service';

@Module({
  imports: [],
  controllers: [WorkflowController],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
