import { Controller, Get, Post, Patch, Delete, Body, Param, HttpCode, HttpStatus, Req } from '@nestjs/common';

@Controller('api/v1')
export class AuthController {
  private readonly authUrl = 'http://localhost:5001/api/v1';

  @Post('auth/register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() body: any) {
    try {
      const res = await fetch(`${this.authUrl}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      return await res.json();
    } catch (err: any) {
      return { success: false, message: `Auth service unreachable: ${err.message}` };
    }
  }

  @Post('auth/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: any) {
    try {
      const res = await fetch(`${this.authUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      return await res.json();
    } catch (err: any) {
      return { success: false, message: `Auth service unreachable: ${err.message}` };
    }
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
  async walletLogin(@Body() body: any) {
    try {
      const res = await fetch(`${this.authUrl}/auth/wallet`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      return await res.json();
    } catch (err: any) {
      return { success: false, message: `Auth service unreachable: ${err.message}` };
    }
  }

  @Post('auth/refresh')
  async refresh() {
    return {
      success: true,
      message: 'Token refreshed',
      data: { token: 'mock-jwt-token-new' },
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
  async getMe() {
    return {
      success: true,
      data: { id: 'user-1', email: 'user@orbitai.dev', username: 'orbit_builder', role: 'developer' },
    };
  }

  @Patch('users/me')
  updateMe(@Body() body: any) {
    return { success: true, message: 'Profile updated', data: body };
  }

  @Post('users/avatar')
  uploadAvatar() {
    return { success: true, message: 'Avatar updated', data: { url: 'https://orbitai.dev/avatar.jpg' } };
  }

  @Delete('users/me')
  deleteMe() {
    return { success: true, message: 'Profile removed' };
  }
}
