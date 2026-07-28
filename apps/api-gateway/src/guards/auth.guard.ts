import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import * as crypto from 'crypto';

function parseCookies(cookieHeader: string | undefined): Record<string, string> {
  const list: Record<string, string> = {};
  if (!cookieHeader) return list;
  cookieHeader.split(';').forEach((cookie) => {
    let [name, ...rest] = cookie.split('=');
    name = name?.trim();
    if (!name) return;
    const value = rest.join('=').trim();
    if (!value) return;
    try {
      list[name] = decodeURIComponent(value);
    } catch {
      list[name] = value;
    }
  });
  return list;
}

@Injectable()
export class GatewayAuthGuard implements CanActivate {
  private readonly jwtSecret = process.env.JWT_SECRET || 'nexus_secure_secret_hash_key_1012';

  constructor() {
    const hash = crypto.createHash('sha256').update(this.jwtSecret).digest('hex');
    console.log(`[AUTH_GUARD] Active JWT Secret Hash: ${hash}`);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    let authHeader = request.headers.authorization;
    
    // Fallback: If Authorization header is missing, extract token from cookies
    if (!authHeader) {
      const cookies = request.cookies || parseCookies(request.headers.cookie);
      const cookieToken = cookies.orbit_token || cookies.access_token || cookies.token;
      if (cookieToken) {
        console.log('[AUTH_GUARD] Authorization header missing, but session token found in request cookies. Attaching Bearer header...');
        authHeader = `Bearer ${cookieToken}`;
        request.headers.authorization = authHeader;
      }
    }

    console.log(`[AUTH_GUARD] Incoming Authorization: ${authHeader ? authHeader.substring(0, 30) + '...' : 'none'}`);
    
    if (!authHeader) {
      console.warn('[AUTH_GUARD] Verification failed: Authorization header and auth cookies are missing');
      throw new UnauthorizedException('Authorization header or cookie session is missing');
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      console.warn('[AUTH_GUARD] Verification failed: Invalid authorization format');
      throw new UnauthorizedException('Invalid authorization format schema');
    }

    const token = parts[1];
    try {
      const tokenParts = token.split('.');
      if (tokenParts.length !== 3) {
        throw new Error('Invalid token structure');
      }

      const [header, payload, signature] = tokenParts;
      const signatureInput = `${header}.${payload}`;
      const expectedSignature = crypto
        .createHmac('sha256', this.jwtSecret)
        .update(signatureInput)
        .digest('base64url');

      if (signature !== expectedSignature) {
        throw new Error('JWT signature mismatch');
      }

      const decodedPayload = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
      const currentTimestamp = Math.floor(Date.now() / 1000);
      
      console.log(`[AUTH_GUARD] Token details - User ID: ${decodedPayload.sub || decodedPayload.id}, Exp: ${decodedPayload.exp}, Server time: ${currentTimestamp}`);

      if (decodedPayload.exp && currentTimestamp > decodedPayload.exp) {
        console.warn(`[AUTH_GUARD] Verification failed: JWT token has expired (exp: ${decodedPayload.exp}, current: ${currentTimestamp})`);
        throw new Error('JWT token has expired');
      }

      decodedPayload.id = decodedPayload.sub || decodedPayload.id;
      request.user = decodedPayload;
      
      console.log(`[AUTH_GUARD] Verification succeeded for user: ${decodedPayload.id}`);
      return true;
    } catch (err: any) {
      console.error(`[AUTH_GUARD] Verification error: ${err.message}`);
      throw new UnauthorizedException(`JWT Verification failed: ${err.message}`);
    }
  }
}
