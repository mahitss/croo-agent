import { Module } from '@nestjs/common';
import { NotificationController } from './controllers/notification.controller';

@Module({
  imports: [],
  controllers: [NotificationController],
  providers: [],
})
export class AppModule {}
