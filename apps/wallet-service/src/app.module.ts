import { Module } from '@nestjs/common';
import { WalletController } from './controllers/wallet.controller';
import { PrismaService } from './services/prisma.service';

@Module({
  imports: [],
  controllers: [WalletController],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
