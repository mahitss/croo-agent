import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class GatewayAuthGuard implements CanActivate {
  private readonly jwtSecret = process.env.JWT_SECRET || 'nexus_secure_secret_hash_key_1012';

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
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
      if (decodedPayload.exp && currentTimestamp > decodedPayload.exp) {
        throw new Error('JWT token has expired');
      }

      request.user = decodedPayload;
      return true;
    } catch (err: any) {
      throw new UnauthorizedException(`JWT Verification failed: ${err.message}`);
    }
  }
}
