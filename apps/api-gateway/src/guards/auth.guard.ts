import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class GatewayAuthGuard implements CanActivate {
  private readonly jwtSecret = process.env.JWT_SECRET || 'nexus_secure_secret_hash_key_1012';

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    
    console.log(`[AUTH_GUARD] Incoming Authorization: ${authHeader ? authHeader.substring(0, 30) + '...' : 'none'}`);
    
    if (!authHeader) {
      console.warn('[AUTH_GUARD] Verification failed: Authorization header is missing');
      throw new UnauthorizedException('Authorization header is missing');
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
