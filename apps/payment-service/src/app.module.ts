import { Module } from '@nestjs/common';
import { PaymentController } from './controllers/payment.controller';
import { PrismaService } from './services/prisma.service';

@Module({
  imports: [],
  controllers: [PaymentController],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
