import { Controller, Get, Post, Body, Patch, Delete, HttpCode, HttpStatus } from '@nestjs/common';

@Controller('api/v1')
export class AuthController {
  @Post('auth/register')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() body: any) {
    return {
      success: true,
      message: 'User registered successfully',
      data: {
        token: 'mock-jwt-token-xyz',
        refreshToken: 'mock-refresh-token-abc',
        profile: { id: 'user-1', email: body.email, username: body.username }
      }
    };
  }

  @Post('auth/login')
  @HttpCode(HttpStatus.OK)
  login(@Body() body: any) {
    return {
      success: true,
      message: 'User authenticated successfully',
      data: {
        token: 'mock-jwt-token-xyz',
        refreshToken: 'mock-refresh-token-abc',
        profile: { id: 'user-1', email: body.email || 'user@nexusai.dev', username: 'nexus_builder' }
      }
    };
  }

  @Get('auth/google')
  googleAuth() {
    return { success: true, message: 'Redirect to Google OAuth' };
  }

  @Get('auth/github')
  githubAuth() {
    return { success: true, message: 'Redirect to GitHub OAuth' };
  }

  @Post('auth/wallet')
  @HttpCode(HttpStatus.OK)
  walletLogin(@Body() body: any) {
    return {
      success: true,
      message: 'Wallet signature verified successfully',
      data: {
        token: 'mock-jwt-token-wallet',
        address: body.address
      }
    };
  }

  @Post('auth/refresh')
  refresh() {
    return {
      success: true,
      message: 'Token refreshed',
      data: { token: 'mock-jwt-token-new' }
    };
  }

  @Post('auth/logout')
  @HttpCode(HttpStatus.OK)
  logout() {
    return { success: true, message: 'User logged out successfully' };
  }

  @Post('auth/forgot-password')
  forgotPassword() {
    return { success: true, message: 'Reset email dispatched' };
  }

  @Post('auth/reset-password')
  resetPassword() {
    return { success: true, message: 'Password updated successfully' };
  }

  @Get('users/me')
  getMe() {
    return {
      success: true,
      data: { id: 'user-1', email: 'user@nexusai.dev', username: 'nexus_builder', role: 'developer' }
    };
  }

  @Patch('users/me')
  updateMe(@Body() body: any) {
    return { success: true, message: 'Profile updated', data: body };
  }

  @Post('users/avatar')
  uploadAvatar() {
    return { success: true, message: 'Avatar updated', data: { url: 'https://nexusai.dev/avatar.jpg' } };
  }

  @Delete('users/me')
  deleteMe() {
    return { success: true, message: 'Account flagged for deletion' };
  }

  @Get('users/stats')
  getUserStats() {
    return {
      success: true,
      data: {
        totalTasks: 120,
        spendUsdc: 24.50,
        runningWorkflows: 3
      }
    };
  }
}
