import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { User, Session, ApiKey, AuditLog, Role, UserStatus } from '../generated/client';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: {
    email: string;
    username: string;
    passwordHash: string;
    displayName?: string;
    role?: Role;
  }): Promise<User> {
    return this.prisma.user.create({
      data: {
        email: data.email,
        username: data.username,
        passwordHash: data.passwordHash,
        displayName: data.displayName,
        role: data.role || Role.user,
      },
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: { id, deletedAt: null },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: { email, deletedAt: null },
    });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: { username, deletedAt: null },
    });
  }

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async createSession(data: {
    userId: string;
    refreshTokenHash: string;
    device?: string;
    ipAddress?: string;
    expiresAt: Date;
  }): Promise<Session> {
    return this.prisma.session.create({
      data,
    });
  }

  async findSession(refreshTokenHash: string): Promise<Session | null> {
    return this.prisma.session.findFirst({
      where: { refreshTokenHash },
    });
  }

  async deleteSessionsByUserId(userId: string): Promise<void> {
    await this.prisma.session.deleteMany({
      where: { userId },
    });
  }

  async createApiKey(data: {
    userId: string;
    keyPrefix: string;
    keyHash: string;
    name: string;
    expiresAt?: Date;
  }): Promise<ApiKey> {
    return this.prisma.apiKey.create({
      data,
    });
  }

  async findApiKey(keyHash: string): Promise<ApiKey | null> {
    return this.prisma.apiKey.findFirst({
      where: { keyHash },
    });
  }

  async getApiKeys(userId: string): Promise<ApiKey[]> {
    return this.prisma.apiKey.findMany({
      where: { userId },
    });
  }

  async deleteApiKey(id: string): Promise<void> {
    await this.prisma.apiKey.delete({
      where: { id },
    });
  }

  async writeAuditLog(data: {
    actorId?: string;
    action: string;
    resourceType: string;
    resourceId?: string;
    metadata?: any;
  }): Promise<AuditLog> {
    return this.prisma.auditLog.create({
      data: {
        actorId: data.actorId,
        action: data.action,
        resourceType: data.resourceType,
        resourceId: data.resourceId,
        metadata: data.metadata || {},
      },
    });
  }
}
