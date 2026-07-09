import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client-agent';

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
      let dir = __dirname;
      let localEnvPath = null;
      while (dir) {
        const pkgPath = path.join(dir, 'package.json');
        if (fs.existsSync(pkgPath)) {
          const envPath = path.join(dir, '.env');
          if (fs.existsSync(envPath)) {
            localEnvPath = envPath;
          }
          break;
        }
        const parent = path.dirname(dir);
        if (parent === dir) break;
        dir = parent;
      }
      if (localEnvPath) {
        const envContent = fs.readFileSync(localEnvPath, 'utf8');
        const match = envContent.match(/DATABASE_URL\s*=\s*["']?([^"'\r\n]+)["']?/);
        if (match && match[1]) {
          originalUrl = match[1];
        }
      }
    } catch (e) {
      // Fallback
    }

    // Dynamic schema fallback injection (P2 DB connection pass)
    try {
      if (originalUrl) {
        const parsed = new URL(originalUrl);
        parsed.searchParams.set('schema', 'agents');
        originalUrl = parsed.toString();
      }
    } catch (e) {
      // Ignore
    }
    
    // Diagnostics & Validation (P2 DB connection pass)
    const serviceName = process.env.RENDER_SERVICE_NAME || 'Agent Service';
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
    
    const isProduction = nodeEnv === 'production';
    const isNeon = hostname.includes('neon.tech');
    if ((isProduction || isNeon) && !originalUrl.includes('sslmode=require')) {
      const errMsg = `[DB_ERROR] Service: ${serviceName} | Env: ${nodeEnv} | DATABASE_URL is missing 'sslmode=require' query parameter!`;
      new Logger('PrismaService').error(errMsg);
      throw new Error(errMsg);
    }
    
    const redactedUrl = originalUrl.replace(/:([^:@]+)@/, ':****@');
    new Logger('PrismaService').log(
      `[DB_DIAGNOSTICS] Service: ${serviceName} | Env: ${nodeEnv} | Connecting to URL: ${redactedUrl}`
    );

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
      // Fallback to original
    }

    try {
      const parsed = new URL(modifiedUrl);
      if (parsed.hostname.includes('.neon.tech') && !parsed.hostname.match(/^\d+\.\d+\.\d+\.\d+$/)) {
        const { execSync } = require('child_process');
        const hostname = parsed.hostname;
        const endpointId = hostname.split('.')[0];
        const nslookupOut = execSync(`nslookup ${hostname}`).toString();
        const nameParts = nslookupOut.split(/Name:\s+/);
        if (nameParts.length > 1) {
          const ips = nameParts[1].match(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g);
          if (ips && ips.length > 0) {
            const ipv4 = ips[0];
            parsed.hostname = ipv4;
            parsed.searchParams.set('sslaccept', 'accept_invalid_certs');
            parsed.searchParams.set('options', `endpoint=${endpointId}`);
            modifiedUrl = parsed.toString();
          }
        }
      }
    } catch (e) {
      // Ignore and fallback
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
    // Await database connection on startup to fail fast if incorrect
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
  }

  private async validateDatabaseSchema() {
    const expectedTables = ['agents', 'agent_versions', 'capabilities', 'agent_capabilities', 'pricing_models', 'reviews'];
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
