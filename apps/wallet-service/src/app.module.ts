import { Module } from '@nestjs/common';
import { WalletController } from './controllers/wallet.controller';
import { HealthController } from './controllers/health.controller';
import { PrismaService } from './services/prisma.service';
import { CAPWalletService } from './services/cap-wallet.service';

@Module({
  imports: [],
  controllers: [WalletController, HealthController],
  providers: [PrismaService, CAPWalletService],
  exports: [PrismaService, CAPWalletService],
})
export class AppModule {}
