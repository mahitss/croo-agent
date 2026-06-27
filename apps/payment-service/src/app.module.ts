import { Module } from '@nestjs/common';
import { PaymentController } from './controllers/payment.controller';

@Module({
  imports: [],
  controllers: [PaymentController],
  providers: [],
})
export class AppModule {}
