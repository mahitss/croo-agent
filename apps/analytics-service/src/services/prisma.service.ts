import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '../generated/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      log: ['info', 'warn', 'error'],
    });
  }

  async onModuleInit() {
    // Run database connection asynchronously to prevent blocking NestJS bootstrap health checks
    this.connectWithRetry();
  }

  private async connectWithRetry(retries = 5, delay = 2000): Promise<void> {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        await this.$connect();
        this.logger.log('Database connection established');
        return;
      } catch (error) {
        this.logger.warn(
          `Database connection attempt ${attempt}/${retries} failed: ${error.message}`,
        );
        if (attempt === retries) {
          this.logger.error(
            'All database connection attempts exhausted. Service starting without DB.',
          );
          // Don't throw - let the service start and retry on first query
          return;
        }
        const backoff = delay * Math.pow(1.5, attempt - 1);
        this.logger.log(`Retrying in ${Math.round(backoff)}ms...`);
        await new Promise((resolve) => setTimeout(resolve, backoff));
      }
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
