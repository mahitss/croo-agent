import { Controller, Get, Post, Patch, Delete, Body, Param, HttpCode, HttpStatus, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as crypto from 'crypto';

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
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(@UploadedFile() file?: any, @Body('file') fileBase64?: string) {
    try {
      let fileData = fileBase64;
      if (file && file.buffer) {
        fileData = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
      }

      if (!fileData) {
        return { success: false, message: 'No file uploaded or provided' };
      }

      const timestamp = Math.floor(Date.now() / 1000);
      const apiSecret = process.env.CLOUDINARY_API_SECRET || '8sYTiGjk87a7OTezWDGcyiWQ2tc';
      const signature = crypto
        .createHash('sha1')
        .update(`timestamp=${timestamp}${apiSecret}`)
        .digest('hex');

      const formData = new FormData();
      formData.append('file', fileData);
      formData.append('api_key', process.env.CLOUDINARY_API_KEY || '787345945548967');
      formData.append('timestamp', timestamp.toString());
      formData.append('signature', signature);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME || 'dbw5rk2re'}/image/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.secure_url) {
        return {
          success: true,
          message: 'Avatar uploaded successfully to Cloudinary',
          data: { url: data.secure_url },
        };
      }
      return { success: false, message: data.error?.message || 'Cloudinary upload failed' };
    } catch (err: any) {
      return { success: false, message: `Cloudinary upload failed: ${err.message}` };
    }
  }

  @Delete('users/me')
  deleteMe() {
    return { success: true, message: 'Profile removed' };
  }
}
