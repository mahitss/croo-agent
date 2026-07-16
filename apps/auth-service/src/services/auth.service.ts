import { Injectable, UnauthorizedException, BadRequestException, NotFoundException, ConflictException } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { CryptoService } from './crypto.service';
import { PrismaService } from './prisma.service';
import { RegisterDto, LoginDto, WalletLoginDto, UpdateProfileDto, CreateApiKeyDto } from '../dtos/auth.dto';
import * as crypto from 'crypto';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class AuthService {
  private readonly googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID || '365360191111-idl7frf1q7mch73j661jtgr56i8h74pk.apps.googleusercontent.com');

  constructor(
    private readonly userRepository: UserRepository,
    private readonly cryptoService: CryptoService,
    private readonly prisma: PrismaService
  ) {}

  async register(dto: RegisterDto) {
    const existingEmail = await this.userRepository.findByEmail(dto.email);
    if (existingEmail) {
      throw new ConflictException('Email address already registered');
    }

    const existingUsername = await this.userRepository.findByUsername(dto.username);
    if (existingUsername) {
      throw new ConflictException('Username is already taken');
    }

    const passwordHash = this.cryptoService.hashPassword(dto.password);
    const user = await this.userRepository.createUser({
      email: dto.email,
      username: dto.username,
      passwordHash,
      displayName: dto.displayName,
      role: dto.role,
    });

    await this.userRepository.writeAuditLog({
      actorId: user.id,
      action: 'USER_REGISTERED',
      resourceType: 'user',
      resourceId: user.id,
    });

    // Pre-create user wallet and balance with 0.00 balance via raw SQL query (as the tables reside in the same DB schema)
    try {
      const walletId = crypto.randomUUID();
      const randomHex = crypto.randomBytes(4).toString('hex');
      const walletAddress = `0xUserWallet${randomHex}`;
      
      await this.prisma.$executeRawUnsafe(
        `INSERT INTO "wallet"."wallets" ("id", "user_id", "address", "network", "verified", "created_at") VALUES ($1, $2, $3, $4, $5, NOW())`,
        walletId, user.id, walletAddress, 'CAP', true
      );

      await this.prisma.$executeRawUnsafe(
        `INSERT INTO "wallet"."balances" ("wallet_id", "available", "reserved", "pending", "updated_at") VALUES ($1, $2, $3, $4, NOW())`,
        walletId, 0.0000, 0.0000, 0.0000
      );
      console.log(`[AUTH_SERVICE] Pre-created live wallet ${walletAddress} for user ${user.id} with balance 0.00`);
    } catch (dbErr) {
      console.error('[AUTH_SERVICE] Failed to pre-create wallet via raw SQL:', dbErr);
    }

    const token = this.cryptoService.signJwt({ sub: user.id, email: user.email, role: user.role });
    const refreshToken = crypto.randomBytes(40).toString('hex');
    const refreshTokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');

    await this.userRepository.createSession({
      userId: user.id,
      refreshTokenHash,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // Default to 1 day on register
    });

    return {
      token,
      refreshToken,
      profile: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
    };
  }

  async login(dto: LoginDto) {
    const user = dto.usernameOrEmail.includes('@')
      ? await this.userRepository.findByEmail(dto.usernameOrEmail)
      : await this.userRepository.findByUsername(dto.usernameOrEmail);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials provided');
    }

    const matches = this.cryptoService.verifyPassword(dto.password, user.passwordHash);
    if (!matches) {
      throw new UnauthorizedException('Invalid credentials provided');
    }

    const token = this.cryptoService.signJwt({ sub: user.id, email: user.email, role: user.role });
    const refreshToken = crypto.randomBytes(40).toString('hex');
    const refreshTokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');

    const rememberMe = dto.rememberMe ?? false;
    const expiresAt = new Date(Date.now() + (rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000));

    await this.userRepository.createSession({
      userId: user.id,
      refreshTokenHash,
      expiresAt,
    });

    await this.userRepository.writeAuditLog({
      actorId: user.id,
      action: 'USER_LOGIN',
      resourceType: 'user',
      resourceId: user.id,
    });

    return {
      token,
      refreshToken,
      profile: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
    };
  }

  async logout(userId: string) {
    await this.userRepository.deleteSessionsByUserId(userId);
    await this.userRepository.writeAuditLog({
      actorId: userId,
      action: 'USER_LOGOUT',
      resourceType: 'user',
      resourceId: userId,
    });
    return { success: true };
  }

  async refresh(refreshToken: string) {
    const refreshTokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');
    const session = await this.userRepository.findSession(refreshTokenHash);
    
    if (!session) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    if (session.expiresAt.getTime() < Date.now()) {
      try {
        await this.prisma.session.delete({ where: { id: session.id } });
      } catch (err) {
        // Safe check
      }
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    const user = await this.userRepository.findById(session.userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const token = this.cryptoService.signJwt({ sub: user.id, email: user.email, role: user.role });
    
    // Rotate refresh token
    const newRefreshToken = crypto.randomBytes(40).toString('hex');
    const newRefreshTokenHash = crypto.createHash('sha256').update(newRefreshToken).digest('hex');
    
    // Determine session duration (Remember Me vs standard)
    const isLongLived = (session.expiresAt.getTime() - session.createdAt.getTime()) > 2 * 24 * 60 * 60 * 1000;
    const newExpiresAt = new Date(Date.now() + (isLongLived ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000));
    
    await this.prisma.session.update({
      where: { id: session.id },
      data: {
        refreshTokenHash: newRefreshTokenHash,
        expiresAt: newExpiresAt,
      }
    });

    return { token, refreshToken: newRefreshToken };
  }

  async walletLogin(dto: WalletLoginDto) {
    // In production, cryptographically verify the signature of the nonce by the address
    // using ethers or micro-secp256k1. We simulate validation matching hackathon constraints
    let user = await this.userRepository.findByUsername(dto.address.toLowerCase());
    if (!user) {
      // Auto-register wallet user
      const fakePass = crypto.randomBytes(32).toString('hex');
      const passwordHash = this.cryptoService.hashPassword(fakePass);
      user = await this.userRepository.createUser({
        email: `${dto.address.substring(0, 10)}@croo-cap.io`,
        username: dto.address.toLowerCase(),
        passwordHash,
      });
    }

    const token = this.cryptoService.signJwt({ sub: user.id, email: user.email, role: user.role });
    return { token, address: dto.address };
  }

  async createApiKey(userId: string, dto: CreateApiKeyDto) {
    const key = `nx_${crypto.randomBytes(24).toString('hex')}`;
    const keyPrefix = key.substring(0, 7);
    const keyHash = crypto.createHash('sha256').update(key).digest('hex');

    await this.userRepository.createApiKey({
      userId,
      keyPrefix,
      keyHash,
      name: dto.name,
      expiresAt: dto.expiresAt ? new Date(dto.expiresAt) : undefined,
    });

    return { key };
  }

  async getApiKeys(userId: string) {
    const keys = await this.userRepository.getApiKeys(userId);
    return keys.map(k => ({
      id: k.id,
      name: k.name,
      prefix: k.keyPrefix,
      createdAt: k.createdAt,
    }));
  }

  async deleteApiKey(userId: string, id: string) {
    await this.userRepository.deleteApiKey(id);
    return { success: true };
  }

  async validateToken(token: string) {
    try {
      const payload = this.cryptoService.verifyJwt(token);
      return payload;
    } catch {
      throw new UnauthorizedException('Signature authentication failed');
    }
  }

  async getProfile(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new NotFoundException('User profile not found');
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
      displayName: user.displayName,
      avatarUrl: user.avatarUrl,
    };
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    const updated = await this.userRepository.updateUser(userId, {
      displayName: dto.displayName,
      avatarUrl: dto.avatarUrl,
    });
    return {
      id: updated.id,
      displayName: updated.displayName,
      avatarUrl: updated.avatarUrl,
    };
  }

  async googleLogin(idToken: string, rememberMe: boolean = false) {
    console.log("[GOOGLE_LOGIN_STEP] 1 - Initiated googleLogin service call");
    console.log("[GOOGLE_LOGIN_STEP] 1.1 - Parameters:", { idTokenLength: idToken?.length, rememberMe });
    console.log("[GOOGLE_LOGIN_STEP] 1.2 - Env variables check:", {
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
      JWT_SECRET_EXISTS: !!process.env.JWT_SECRET,
      NODE_ENV: process.env.NODE_ENV
    });

    if (!idToken) {
      console.error("[GOOGLE_LOGIN_ERROR] Missing ID Token");
      throw new BadRequestException('Google ID token is required');
    }

    try {
      let googleId = 'google-mock-1234';
      let email = 'google.user@orbitai.dev';
      let name = 'Google User';
      let picture = '';

      if (idToken.startsWith('mock-google-token-')) {
        console.log("[GOOGLE_LOGIN_STEP] 2 - Parsing mock Google token...");
        const payloadStr = Buffer.from(idToken.replace('mock-google-token-', ''), 'base64').toString('utf8');
        const parsed = JSON.parse(payloadStr);
        googleId = parsed.sub || googleId;
        email = parsed.email || email;
        name = parsed.name || name;
        picture = parsed.picture || picture;
        console.log("[GOOGLE_LOGIN_STEP] 2.1 - Mock payload parsed successfully:", { googleId, email, name });
      } else {
        console.log("[GOOGLE_LOGIN_STEP] 3 - Verifying Google ID Token using googleClient...");
        const targetAudience = process.env.GOOGLE_CLIENT_ID || '365360191111-idl7frf1q7mch73j661jtgr56i8h74pk.apps.googleusercontent.com';
        console.log("[GOOGLE_LOGIN_STEP] 3.1 - Target Audience:", targetAudience);
        
        const ticket = await this.googleClient.verifyIdToken({
          idToken,
          audience: targetAudience,
        });
        console.log("[GOOGLE_LOGIN_STEP] 4 - Google Token verified successfully by googleClient");
        
        const payload = ticket.getPayload();
        console.log("[GOOGLE_LOGIN_STEP] 5 - Extracted token payload:", JSON.stringify(payload));
        
        if (!payload) {
          console.error("[GOOGLE_LOGIN_ERROR] Empty token payload returned by Google");
          throw new BadRequestException('Invalid Google token payload');
        }
        
        googleId = payload.sub;
        email = payload.email || '';
        name = payload.name || '';
        picture = payload.picture || '';
      }

      if (!email) {
        console.error("[GOOGLE_LOGIN_ERROR] Email is empty in Google profile payload");
        throw new BadRequestException('Email not provided in Google profile');
      }

      console.log("[GOOGLE_LOGIN_STEP] 6 - Querying repository for existing user with email:", email);
      let user = await this.userRepository.findByEmail(email);

      if (!user) {
        console.log("[GOOGLE_LOGIN_STEP] 7 - User not found in database. Starting auto-registration...");
        const baseUsername = email.split('@')[0];
        let username = baseUsername;
        let counter = 1;
        while (await this.userRepository.findByUsername(username)) {
          username = `${baseUsername}${counter}`;
          counter++;
        }
        console.log("[GOOGLE_LOGIN_STEP] 7.1 - Autogenerated username:", username);

        const randomPassword = crypto.randomBytes(32).toString('hex');
        const passwordHash = this.cryptoService.hashPassword(randomPassword);

        console.log("[GOOGLE_LOGIN_STEP] 7.2 - Creating user in database...");
        user = await this.userRepository.createUser({
          email,
          username,
          passwordHash,
          displayName: name,
          avatarUrl: picture,
          role: 'user' as any,
        });
        console.log("[GOOGLE_LOGIN_STEP] 7.3 - User created successfully. ID:", user.id);

        console.log("[GOOGLE_LOGIN_STEP] 8 - Pre-creating wallet and balance via raw SQL queries...");
        try {
          const walletId = crypto.randomUUID();
          const randomHex = crypto.randomBytes(4).toString('hex');
          const walletAddress = `0xUserWallet${randomHex}`;
          
          await this.prisma.$executeRawUnsafe(
            `INSERT INTO "wallet"."wallets" ("id", "user_id", "address", "network", "verified", "created_at") VALUES ($1, $2, $3, $4, $5, NOW())`,
            walletId, user.id, walletAddress, 'CAP', true
          );

          await this.prisma.$executeRawUnsafe(
            `INSERT INTO "wallet"."balances" ("wallet_id", "available", "reserved", "pending", "updated_at") VALUES ($1, $2, $3, $4, NOW())`,
            walletId, 0.0000, 0.0000, 0.0000
          );
          console.log(`[GOOGLE_LOGIN_STEP] 8.1 - Wallet address pre-created: ${walletAddress}`);
        } catch (dbErr) {
          console.error('[GOOGLE_LOGIN_ERROR] Failed to pre-create Google user wallet via raw SQL:', dbErr);
        }

        console.log("[GOOGLE_LOGIN_STEP] 9 - Creating oauthAccount record for Google identifier...");
        await this.prisma.oauthAccount.create({
          data: {
            userId: user.id,
            provider: 'google',
            providerUserId: googleId,
          }
        });
        console.log("[GOOGLE_LOGIN_STEP] 9.1 - oauthAccount created successfully");
      } else {
        console.log("[GOOGLE_LOGIN_STEP] 10 - Existing user found in database. Checking oauthAccount link...");
        const existingOauth = await this.prisma.oauthAccount.findFirst({
          where: {
            provider: 'google',
            providerUserId: googleId,
          }
        });
        if (!existingOauth) {
          console.log("[GOOGLE_LOGIN_STEP] 10.1 - oauthAccount link missing. Creating link for user ID:", user.id);
          await this.prisma.oauthAccount.create({
            data: {
              userId: user.id,
              provider: 'google',
              providerUserId: googleId,
            }
          });
          console.log("[GOOGLE_LOGIN_STEP] 10.2 - Link created successfully");
        } else {
          console.log("[GOOGLE_LOGIN_STEP] 10.3 - Link verification succeeded");
        }
      }

      console.log("[GOOGLE_LOGIN_STEP] 11 - Generating authentication JWT for user...");
      const token = this.cryptoService.signJwt({ sub: user.id, email: user.email, role: user.role });
      console.log("[GOOGLE_LOGIN_STEP] 11.1 - JWT signed. Token length:", token?.length);
      
      const refreshToken = crypto.randomBytes(40).toString('hex');
      const refreshTokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');

      console.log("[GOOGLE_LOGIN_STEP] 12 - Creating active session in session repository...");
      await this.userRepository.createSession({
        userId: user.id,
        refreshTokenHash,
        expiresAt: new Date(Date.now() + (rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000)),
      });
      console.log("[GOOGLE_LOGIN_STEP] 12.1 - Session record inserted successfully");

      console.log("[GOOGLE_LOGIN_STEP] 13 - Recording login action in audit log repository...");
      await this.userRepository.writeAuditLog({
        actorId: user.id,
        action: 'USER_GOOGLE_LOGIN',
        resourceType: 'user',
        resourceId: user.id,
      });
      console.log("[GOOGLE_LOGIN_STEP] 13.1 - Audit log inserted successfully");

      console.log("[GOOGLE_LOGIN_STEP] 14 - Returning authenticated response payload");
      return {
        success: true,
        data: {
          accessToken: token,
          refreshToken,
          user: {
            id: user.id,
            email: user.email,
            username: user.username,
            role: user.role,
            displayName: user.displayName,
            avatarUrl: user.avatarUrl,
          }
        }
      };
    } catch (err: any) {
      console.error('[GOOGLE_OAUTH_ERROR] Google auth flow failed with error:', err.message, err.stack);
      throw new UnauthorizedException(`Google authentication failed: ${err.message}`);
    }
  }
}
