import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client-workflow';

declare const process: any;
declare const require: any;
declare const __dirname: string;

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    let originalUrl = process.env.DATABASE_URL;
    
    try {
      const fs = require('fs');
      const path = require('path');
      const envPaths = [
        path.resolve(__dirname, '..', '..', '.env'),
        path.resolve(__dirname, '..', '..', '..', '.env'),
        path.resolve(process.cwd(), '.env')
      ];
      for (const envPath of envPaths) {
        if (fs.existsSync(envPath)) {
          const envContent = fs.readFileSync(envPath, 'utf8');
          const match = envContent.match(/DATABASE_URL\s*=\s*["']?([^"'\r\n]+)["']?/);
          if (match && match[1] && match[1].includes('schema=')) {
            originalUrl = match[1];
            break;
          }
        }
      }
    } catch (e) {
      // Fallback
    }

    // Dynamic schema fallback injection (P2 DB connection pass)
    try {
      if (originalUrl) {
        const parsed = new URL(originalUrl);
        if (!parsed.searchParams.has('schema')) {
          parsed.searchParams.set('schema', 'workflows');
          originalUrl = parsed.toString();
        }
      }
    } catch (e) {
      // Ignore
    }
    
    // Diagnostics & Validation (P2 DB connection pass)
    const serviceName = process.env.RENDER_SERVICE_NAME || 'Workflow Service';
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

    process.env.DATABASE_URL = modifiedUrl;

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

    // Start a periodic heartbeat to keep PgBouncer/Neon connections warm and prevent "Error { kind: Closed }"
    const pingInterval = setInterval(async () => {
      try {
        await this.$queryRawUnsafe('SELECT 1');
      } catch (err) {
        this.logger.warn(`Database heartbeat ping failed: ${err.message}`);
      }
    }, 15000);

    (this as any)._pingInterval = pingInterval;
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
    if ((this as any)._pingInterval) {
      clearInterval((this as any)._pingInterval);
    }
    console.error("PRISMA DISCONNECT CALLED");
    console.error(new Error().stack);
    await this.$disconnect();
  }
}
