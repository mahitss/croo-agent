import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { PrismaService } from './services/prisma.service';
import { CryptoService } from './services/crypto.service';
import { UserRepository } from './repositories/user.repository';
import { AuthGuard } from './guards/auth.guard';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [
    PrismaService,
    CryptoService,
    UserRepository,
    AuthService,
    AuthGuard,
    RolesGuard,
  ],
  exports: [AuthService, PrismaService],
})
export class AppModule {}
