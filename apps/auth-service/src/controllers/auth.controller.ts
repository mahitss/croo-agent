import { Controller, Get, Post, Patch, Delete, Body, Param, HttpCode, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { RegisterDto, LoginDto, WalletLoginDto, UpdateProfileDto, CreateApiKeyDto } from '../dtos/auth.dto';
import { AuthGuard } from '../guards/auth.guard';

@Controller('api/v1')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth/register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('auth/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('auth/logout')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req: any) {
    return this.authService.logout(req.user.sub);
  }

  @Post('auth/refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Body('refreshToken') refreshToken: string) {
    return this.authService.refresh(refreshToken);
  }

  @Post('auth/wallet/login')
  @HttpCode(HttpStatus.OK)
  async walletLogin(@Body() dto: WalletLoginDto) {
    return this.authService.walletLogin(dto);
  }

  @Post('auth/apikeys')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async createApiKey(@Req() req: any, @Body() dto: CreateApiKeyDto) {
    return this.authService.createApiKey(req.user.sub, dto);
  }

  @Get('auth/apikeys')
  @UseGuards(AuthGuard)
  async getApiKeys(@Req() req: any) {
    return this.authService.getApiKeys(req.user.sub);
  }

  @Delete('auth/apikeys/:id')
  @UseGuards(AuthGuard)
  async deleteApiKey(@Req() req: any, @Param('id') id: string) {
    return this.authService.deleteApiKey(req.user.sub, id);
  }

  @Get('auth/me')
  @UseGuards(AuthGuard)
  async getMe(@Req() req: any) {
    return this.authService.getProfile(req.user.sub);
  }

  @Patch('auth/profile')
  @UseGuards(AuthGuard)
  async updateProfile(@Req() req: any, @Body() dto: UpdateProfileDto) {
    return this.authService.updateProfile(req.user.sub, dto);
  }
}
