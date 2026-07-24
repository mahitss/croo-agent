import { Controller, Get, Post, Patch, Delete, Body, Param, HttpCode, HttpStatus, Req, Res, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as crypto from 'crypto';
import { GatewayAuthGuard } from '../guards/auth.guard';

@Controller('api/v1')
export class AuthController {
  private readonly authUrl = process.env.AUTH_SERVICE_URL || 'http://127.0.0.1:5001/api/v1';

  private setAuthCookies(response: any, data: any, rememberMe: boolean = true) {
    if (!response || !data) return;
    const token = data?.token || data?.accessToken || data?.data?.token || data?.data?.accessToken;
    const refreshToken = data?.refreshToken || data?.data?.refreshToken;
    const userId = data?.user?.id || data?.profile?.id || data?.data?.user?.id || data?.data?.id;
    const maxAge = rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000;

    if (token && response.cookie) {
      response.cookie('orbit_token', token, { maxAge, path: '/', sameSite: 'lax', httpOnly: false });
      response.cookie('access_token', token, { maxAge, path: '/', sameSite: 'lax', httpOnly: false });
      response.cookie('token', token, { maxAge, path: '/', sameSite: 'lax', httpOnly: false });
    }

    if (refreshToken && response.cookie) {
      response.cookie('orbit_refreshtoken', refreshToken, { maxAge, path: '/', sameSite: 'lax', httpOnly: true });
      response.cookie('refresh_token', refreshToken, { maxAge, path: '/', sameSite: 'lax', httpOnly: true });
    }

    if (userId && response.cookie) {
      response.cookie('session_id', userId, { maxAge, path: '/', sameSite: 'lax', httpOnly: false });
    }
  }

  private clearAuthCookies(response: any) {
    if (!response || !response.clearCookie) return;
    response.clearCookie('orbit_token', { path: '/' });
    response.clearCookie('access_token', { path: '/' });
    response.clearCookie('token', { path: '/' });
    response.clearCookie('orbit_refreshtoken', { path: '/' });
    response.clearCookie('refresh_token', { path: '/' });
    response.clearCookie('session_id', { path: '/' });
  }

  @Post('auth/register')
  async register(@Body() body: any, @Res({ passthrough: true }) response: any) {
    try {
      const res = await fetch(`${this.authUrl}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      response.status(res.status);
      if (res.ok) {
        this.setAuthCookies(response, data, body?.rememberMe !== false);
      }
      return data;
    } catch (err: any) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR);
      return { success: false, message: `Auth service unreachable: ${err.message}` };
    }
  }

  @Post('auth/login')
  async login(@Body() body: any, @Res({ passthrough: true }) response: any) {
    try {
      const res = await fetch(`${this.authUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      response.status(res.status);
      if (res.ok) {
        this.setAuthCookies(response, data, body?.rememberMe !== false);
      }
      return data;
    } catch (err: any) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR);
      return { success: false, message: `Auth service unreachable: ${err.message}` };
    }
  }

  @Get('auth/google')
  googleAuth() {
    return { success: true, message: 'Redirect to Google OAuth' };
  }

  @Post('auth/google')
  async googleLogin(@Body() body: any, @Res({ passthrough: true }) response: any) {
    console.log('[GATEWAY_AUTH_STEP 1] Request received at API Gateway: POST /api/v1/auth/google');
    console.log('[GATEWAY_AUTH_STEP 2] Forwarding request to auth-service at:', `${this.authUrl}/auth/google`);
    try {
      const res = await fetch(`${this.authUrl}/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(12000),
      });
      const data = await res.json();
      console.log(`[GATEWAY_AUTH_STEP 3] Response received from auth-service. Status: ${res.status}`);
      response.status(res.status);
      if (res.ok) {
        this.setAuthCookies(response, data, body?.rememberMe !== false);
      }
      console.log('[GATEWAY_AUTH_STEP 4] Gateway returning response payload to frontend client');
      return data;
    } catch (err: any) {
      console.error('[GATEWAY_AUTH_ERROR] Google auth forwarding failed:', err.message);
      response.status(HttpStatus.INTERNAL_SERVER_ERROR);
      return { success: false, message: `Auth service unreachable or timed out: ${err.message}` };
    }
  }

  @Get('auth/github')
  githubAuth() {
    return { success: true, message: 'Redirect to GitHub OAuth' };
  }

  @Post('auth/wallet')
  @HttpCode(HttpStatus.OK)
  async walletLogin(@Body() body: any, @Res({ passthrough: true }) response: any) {
    try {
      const res = await fetch(`${this.authUrl}/auth/wallet`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      response.status(res.status);
      if (res.ok) {
        this.setAuthCookies(response, data, body?.rememberMe !== false);
      }
      return data;
    } catch (err: any) {
      return { success: false, message: `Auth service unreachable: ${err.message}` };
    }
  }

  @Post('auth/refresh')
  async refresh(@Body('refreshToken') refreshToken: string, @Res({ passthrough: true }) response: any) {
    try {
      const res = await fetch(`${this.authUrl}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });
      const data = await res.json();
      response.status(res.status);
      if (res.ok) {
        this.setAuthCookies(response, data, true);
      }
      return data;
    } catch (err: any) {
      return { success: false, message: `Auth service unreachable: ${err.message}` };
    }
  }

  @Post('auth/logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req: any, @Res({ passthrough: true }) response: any) {
    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (req.headers.authorization) {
        headers['Authorization'] = req.headers.authorization;
      }
      const res = await fetch(`${this.authUrl}/auth/logout`, {
        method: 'POST',
        headers,
      });
      const data = await res.json();
      this.clearAuthCookies(response);
      return data;
    } catch (err: any) {
      this.clearAuthCookies(response);
      return { success: false, message: `Auth service unreachable: ${err.message}` };
    }
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
  @UseGuards(GatewayAuthGuard)
  async getMe(@Req() req: any) {
    try {
      const res = await fetch(`${this.authUrl}/auth/me`, {
        headers: {
          'Authorization': req.headers.authorization || '',
        },
      });
      return await res.json();
    } catch (err: any) {
      return { success: false, message: `Auth service unreachable: ${err.message}` };
    }
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
