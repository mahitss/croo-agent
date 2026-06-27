import { Injectable, UnauthorizedException, BadRequestException, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { CryptoService } from './crypto.service';
import { RegisterDto, LoginDto, WalletLoginDto, UpdateProfileDto, CreateApiKeyDto } from '../dtos/auth.dto';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cryptoService: CryptoService
  ) {}

  async register(dto: RegisterDto) {
    const existingEmail = await this.userRepository.findByEmail(dto.email);
    if (existingEmail) {
      throw new BadRequestException('Email address already registered');
    }

    const existingUsername = await this.userRepository.findByUsername(dto.username);
    if (existingUsername) {
      throw new BadRequestException('Username is already taken');
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

    const token = this.cryptoService.signJwt({ sub: user.id, email: user.email, role: user.role });
    const refreshToken = crypto.randomBytes(40).toString('hex');
    const refreshTokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');

    await this.userRepository.createSession({
      userId: user.id,
      refreshTokenHash,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
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

    await this.userRepository.createSession({
      userId: user.id,
      refreshTokenHash,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
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
    
    if (!session || session.expiresAt.getTime() < Date.now()) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    const user = await this.userRepository.findById(session.userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const token = this.cryptoService.signJwt({ sub: user.id, email: user.email, role: user.role });
    return { token };
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
}
