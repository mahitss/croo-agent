import { Module } from '@nestjs/common';
import { PaymentController } from './controllers/payment.controller';
import { PrismaService } from './services/prisma.service';
import { CAPPaymentService } from './services/cap-payment.service';

@Module({
  imports: [],
  controllers: [PaymentController],
  providers: [PrismaService, CAPPaymentService],
  exports: [PrismaService, CAPPaymentService],
})
export class AppModule {}
