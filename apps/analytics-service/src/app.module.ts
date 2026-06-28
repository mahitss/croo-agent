import { Module } from '@nestjs/common';
import { AnalyticsController } from './controllers/analytics.controller';
import { PrismaService } from './services/prisma.service';

@Module({
  imports: [],
  controllers: [AnalyticsController],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
