import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client-notification';

declare const process: any;
declare const require: any;
declare const __dirname: string;

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);
  private targetSchema!: string;

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

    try {
      if (originalUrl) {
        const parsed = new URL(originalUrl);
        parsed.searchParams.set('schema', 'notifications');
        originalUrl = parsed.toString();
      }
    } catch (e) {
      // Ignore
    }
    
    const serviceName = 'Notification Service';
    const nodeEnv = process.env.NODE_ENV || 'development';
    let hostname = 'N/A';
    let database = 'N/A';
    
    if (!originalUrl) {
      const errMsg = `[DB_ERROR] Service: ${serviceName} | DATABASE_URL is missing!`;
      new Logger('PrismaService').error(errMsg);
      throw new Error(errMsg);
    }
    
    try {
      const parsed = new URL(originalUrl);
      hostname = parsed.hostname;
      database = parsed.pathname.replace('/', '');
    } catch (e) {
      const errMsg = `[DB_ERROR] Service: ${serviceName} | DATABASE_URL is not a valid URL!`;
      new Logger('PrismaService').error(errMsg);
      throw new Error(errMsg);
    }
    
    let modifiedUrl = originalUrl;
    try {
      const parsed = new URL(originalUrl);
      if (parsed.hostname.includes('-pooler') || originalUrl.includes('pgbouncer=true')) {
        parsed.searchParams.set('pgbouncer', 'true');
        parsed.searchParams.set('statement_cache_size', '0');
        if (!parsed.searchParams.has('connection_limit')) {
          parsed.searchParams.set('connection_limit', '1');
        }
        modifiedUrl = parsed.toString();
      }
    } catch (e) {
      // Fallback
    }

    

    process.env.DATABASE_URL = modifiedUrl;

    let targetSchemaName = 'public';
    try {
      const parsedUrl = new URL(modifiedUrl);
      targetSchemaName = parsedUrl.searchParams.get('schema') || 'public';
    } catch (e) {}

    super({
      datasources: {
        db: {
          url: modifiedUrl,
        },
      },
      log: ['info', 'warn', 'error'],
    });

    this.targetSchema = targetSchemaName;
  }

  async onModuleInit() {
    this.logger.log('Database connection initialization started in the background...');
    this.initializePrismaBackground();
  }

  private async initializePrismaBackground() {
    try {
      await this.connectWithRetry();
      await this.validateDatabaseSchema();

      // Start a periodic heartbeat to keep PgBouncer/Neon connections warm and prevent "Error { kind: Closed }"
      const pingInterval = setInterval(async () => {
        try {
          await this.$queryRawUnsafe('SELECT 1');
        } catch (err) {
          this.logger.warn(`Database heartbeat ping failed: ${err.message}`);
        }
      }, 15000);

      (this as any)._pingInterval = pingInterval;
    } catch (err) {
      this.logger.error(`Database startup background initialization failed: ${err.message}`);
    }
  }

  private async validateDatabaseSchema() {
    const expectedTables = ['notifications', 'notification_preferences'];
    try {
      const schemaName = this.targetSchema;
      const tableList = expectedTables.map(t => `'${t}'`).join(', ');
      const tables: any = await this.$queryRawUnsafe(`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = '${schemaName}' AND table_name IN (${tableList})
      `);

      const existingTables = tables.map((t: any) => t.table_name);
      const missingTables = expectedTables.filter(t => !existingTables.includes(t));

      if (missingTables.length > 0) {
        const errMsg = `[DB_VALIDATION_ERROR] Missing expected tables in schema "${schemaName}": ${missingTables.join(', ')}`;
        this.logger.error(errMsg);
        throw new Error(errMsg);
      }
      this.logger.log(`[DB_VALIDATION_SUCCESS] All required tables verified in schema "${schemaName}".`);
    } catch (err) {
      this.logger.error(`Database startup validation failed: ${err.message}`);
      throw err;
    }
  }

  private async connectWithRetry(retries = 10, delay = 2000): Promise<void> {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        await this.$connect();
        this.logger.log('Database connection established successfully');
        return;
      } catch (error) {
        this.logger.warn(`Database connection attempt ${attempt}/${retries} failed: ${error.message}`);
        if (attempt === retries) {
          throw new Error('All database connection attempts exhausted. Failed to connect to database.');
        }
        const backoff = delay * Math.pow(1.5, attempt - 1);
        await new Promise((resolve) => setTimeout(resolve, backoff));
      }
    }
  }

  async onModuleDestroy() {
    if ((this as any)._pingInterval) {
      clearInterval((this as any)._pingInterval);
    }
    await this.$disconnect();
  }
}
