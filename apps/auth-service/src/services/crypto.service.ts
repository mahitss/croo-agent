import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class CryptoService {
  private readonly jwtSecret = process.env.JWT_SECRET || 'nexus_secure_secret_hash_key_1012';

  hashPassword(password: string): string {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return `${salt}:${hash}`;
  }

  verifyPassword(password: string, storedHash: string): boolean {
    const parts = storedHash.split(':');
    if (parts.length !== 2) return false;
    const [salt, hash] = parts;
    const checkHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return checkHash === hash;
  }

  signJwt(payload: any, expiresInSeconds: number = 3600): string {
    const header = { alg: 'HS256', typ: 'JWT' };
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + expiresInSeconds;
    
    const jwtPayload = { ...payload, iat, exp };
    
    const base64UrlHeader = this.toBase64Url(JSON.stringify(header));
    const base64UrlPayload = this.toBase64Url(JSON.stringify(jwtPayload));
    
    const signatureInput = `${base64UrlHeader}.${base64UrlPayload}`;
    const signature = crypto
      .createHmac('sha256', this.jwtSecret)
      .update(signatureInput)
      .digest('base64url');
      
    return `${signatureInput}.${signature}`;
  }

  verifyJwt(token: string): any {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid token format');
    }
    
    const [header, payload, signature] = parts;
    const signatureInput = `${header}.${payload}`;
    const expectedSignature = crypto
      .createHmac('sha256', this.jwtSecret)
      .update(signatureInput)
      .digest('base64url');
      
    if (signature !== expectedSignature) {
      throw new Error('JWT signature verification failed');
    }
    
    const decodedPayload = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (decodedPayload.exp && currentTimestamp > decodedPayload.exp) {
      throw new Error('JWT token has expired');
    }
    
    return decodedPayload;
  }

  private toBase64Url(str: string): string {
    return Buffer.from(str).toString('base64url');
  }
}
