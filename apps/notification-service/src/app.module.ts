import { Module } from '@nestjs/common';
import { NotificationController } from './controllers/notification.controller';
import { PrismaService } from './services/prisma.service';

@Module({
  imports: [],
  controllers: [NotificationController],
  providers: [PrismaService],
})
export class AppModule {}
