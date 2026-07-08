import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client-auth';

declare const process: any;

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    const originalUrl = process.env.DATABASE_URL;
    
    // Diagnostics & Validation (P2 DB connection pass)
    const serviceName = process.env.RENDER_SERVICE_NAME || 'Auth Service';
    const nodeEnv = process.env.NODE_ENV || 'development';
    let hostname = 'N/A';
    let database = 'N/A';
    
    if (!originalUrl) {
      const errMsg = `[DB_ERROR] Service: ${serviceName} | Env: ${nodeEnv} | DATABASE_URL is missing!`;
      new Logger('PrismaService').error(errMsg);
      throw new Error(errMsg);
    }
    
    try {
      const parsed = new URL(originalUrl);
      hostname = parsed.hostname;
      database = parsed.pathname.replace('/', '');
    } catch (e) {
      const errMsg = `[DB_ERROR] Service: ${serviceName} | Env: ${nodeEnv} | DATABASE_URL is not a valid URL!`;
      new Logger('PrismaService').error(errMsg);
      throw new Error(errMsg);
    }
    
    if (!originalUrl.startsWith('postgresql://') && !originalUrl.startsWith('postgres://')) {
      const errMsg = `[DB_ERROR] Service: ${serviceName} | Env: ${nodeEnv} | DATABASE_URL must start with postgresql:// or postgres://`;
      new Logger('PrismaService').error(errMsg);
      throw new Error(errMsg);
    }
    
    const isProduction = process.env.NODE_ENV === 'production' || process.env.RENDER === 'true';
    const isNeon = hostname.includes('neon.tech');
    if ((isProduction || isNeon) && !originalUrl.includes('sslmode=require')) {
      const errMsg = `[DB_ERROR] Service: ${serviceName} | Env: ${nodeEnv} | DATABASE_URL is missing 'sslmode=require' query parameter!`;
      new Logger('PrismaService').error(errMsg);
      throw new Error(errMsg);
    }
    
    new Logger('PrismaService').log(
      `[DB_DIAGNOSTICS] Service: ${serviceName} | Env: ${nodeEnv} | Connecting to Host: ${hostname} | DB: ${database}`
    );

    let modifiedUrl = originalUrl;
    try {
      const parsed = new URL(originalUrl);
      if (parsed.hostname.includes('-pooler') || originalUrl.includes('pgbouncer=true')) {
        parsed.searchParams.set('pgbouncer', 'true');
        parsed.searchParams.set('statement_cache_size', '0');
        if (!parsed.searchParams.has('connection_limit')) {
          parsed.searchParams.set('connection_limit', '5');
        }
        modifiedUrl = parsed.toString();
      }
    } catch (e) {
      // Fallback to original
    }

    super({
      datasources: {
        db: {
          url: modifiedUrl,
        },
      },
      log: ['info', 'warn', 'error'],
    });
  }

  async onModuleInit() {
    // Await database connection on startup to fail fast if incorrect
    await this.connectWithRetry();
  }

  private async connectWithRetry(retries = 5, delay = 2000): Promise<void> {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        await this.$connect();
        this.logger.log('Database connection established successfully');
        return;
      } catch (error) {
        this.logger.warn(
          `Database connection attempt ${attempt}/${retries} failed: ${error.message}`,
        );
        if (attempt === retries) {
          const errMsg = 'All database connection attempts exhausted. Failed to connect to database.';
          this.logger.error(errMsg);
          throw new Error(errMsg);
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
