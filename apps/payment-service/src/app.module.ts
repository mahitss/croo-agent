import { Module } from '@nestjs/common';
import { PaymentController } from './controllers/payment.controller';
import { HealthController } from './controllers/health.controller';
import { PrismaService } from './services/prisma.service';
import { CAPPaymentService } from './services/cap-payment.service';

@Module({
  imports: [],
  controllers: [PaymentController, HealthController],
  providers: [PrismaService, CAPPaymentService],
  exports: [PrismaService, CAPPaymentService],
})
export class AppModule {}
