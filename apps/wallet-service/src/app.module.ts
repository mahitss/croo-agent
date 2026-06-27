import { Module } from '@nestjs/common';
import { WalletController } from './controllers/wallet.controller';

@Module({
  imports: [],
  controllers: [WalletController],
  providers: [],
})
export class AppModule {}
