import { Controller, Get, Post, Patch, Delete, Body, Param, HttpCode, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { RegisterDto, LoginDto, WalletLoginDto, UpdateProfileDto, CreateApiKeyDto, GoogleLoginDto } from '../dtos/auth.dto';
import { AuthGuard } from '../guards/auth.guard';

@Controller('api/v1')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth/register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: RegisterDto) {
    try {
      return await this.authService.register(dto);
    } catch (error: any) {
      if (error.status) throw error;
      return { success: false, message: `Registration database error: ${error.message}` };
    }
  }

  @Post('auth/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto) {
    try {
      return await this.authService.login(dto);
    } catch (error: any) {
      if (error.status) throw error;
      return { success: false, message: `Login database error: ${error.message}` };
    }
  }

  @Post('auth/logout')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req: any) {
    try {
      return await this.authService.logout(req.user.sub);
    } catch (error: any) {
      if (error.status) throw error;
      return { success: false, message: `Logout database error: ${error.message}` };
    }
  }

  @Post('auth/refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Body('refreshToken') refreshToken: string) {
    try {
      return await this.authService.refresh(refreshToken);
    } catch (error: any) {
      if (error.status) throw error;
      return { success: false, message: `Session refresh database error: ${error.message}` };
    }
  }

  @Post('auth/wallet/login')
  @HttpCode(HttpStatus.OK)
  async walletLogin(@Body() dto: WalletLoginDto) {
    try {
      return await this.authService.walletLogin(dto);
    } catch (error: any) {
      if (error.status) throw error;
      return { success: false, message: `Wallet login database error: ${error.message}` };
    }
  }

  @Post('auth/apikeys')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async createApiKey(@Req() req: any, @Body() dto: CreateApiKeyDto) {
    try {
      return await this.authService.createApiKey(req.user.sub, dto);
    } catch (error: any) {
      if (error.status) throw error;
      return { success: false, message: `API key creation database error: ${error.message}` };
    }
  }

  @Get('auth/apikeys')
  @UseGuards(AuthGuard)
  async getApiKeys(@Req() req: any) {
    try {
      return await this.authService.getApiKeys(req.user.sub);
    } catch (error: any) {
      if (error.status) throw error;
      return { success: false, message: `API keys fetch database error: ${error.message}` };
    }
  }

  @Delete('auth/apikeys/:id')
  @UseGuards(AuthGuard)
  async deleteApiKey(@Req() req: any, @Param('id') id: string) {
    try {
      return await this.authService.deleteApiKey(req.user.sub, id);
    } catch (error: any) {
      if (error.status) throw error;
      return { success: false, message: `API key deletion database error: ${error.message}` };
    }
  }

  @Get('auth/me')
  @UseGuards(AuthGuard)
  async getMe(@Req() req: any) {
    try {
      return await this.authService.getProfile(req.user.sub);
    } catch (error: any) {
      if (error.status) throw error;
      return { success: false, message: `Profile fetch database error: ${error.message}` };
    }
  }

  @Patch('auth/profile')
  @UseGuards(AuthGuard)
  async updateProfile(@Req() req: any, @Body() dto: UpdateProfileDto) {
    try {
      return await this.authService.updateProfile(req.user.sub, dto);
    } catch (error: any) {
      if (error.status) throw error;
      return { success: false, message: `Profile update database error: ${error.message}` };
    }
  }

  @Post('auth/google')
  @HttpCode(HttpStatus.OK)
  async googleLogin(@Body() dto: GoogleLoginDto) {
    console.log('AUTH STEP 1 - Request received at auth-service googleLogin controller');
    console.log('AUTH STEP 2 - Request body parsed:', JSON.stringify({ hasCredential: !!dto.credential, hasIdToken: !!dto.idToken, rememberMe: dto.rememberMe }));
    const token = dto.idToken || dto.credential;
    try {
      return await this.authService.googleLogin(token, dto.rememberMe);
    } catch (error: any) {
      if (error.status) throw error;
      return { success: false, message: `Google login error: ${error.message}` };
    }
  }
}
