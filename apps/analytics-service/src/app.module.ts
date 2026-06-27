import { Module } from '@nestjs/common';
import { AnalyticsController } from './controllers/analytics.controller';

@Module({
  imports: [],
  controllers: [AnalyticsController],
  providers: [],
})
export class AppModule {}
