import { Injectable, OnModuleDestroy, Logger } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleDestroy {
  private readonly logger = new Logger('RedisService');
  private redisClient: Redis | null = null;
  private readonly useRest: boolean = false;
  private readonly restUrl: string | null = null;
  private readonly restToken: string | null = null;

  constructor() {
    const redisUrl = process.env.REDIS_URL;
    this.restUrl = process.env.UPSTASH_REDIS_REST_URL;
    this.restToken = process.env.UPSTASH_REDIS_REST_TOKEN;

    if (this.restUrl && this.restToken) {
      this.logger.log('Initializing in Upstash Redis REST mode.');
      this.useRest = true;
    } else if (redisUrl) {
      this.logger.log(`Connecting to standard TCP Redis: ${redisUrl}`);
      try {
        this.redisClient = new Redis(redisUrl);
        this.redisClient.on('error', (err) => {
          this.logger.error('Redis connection error:', err);
        });
      } catch (err) {
        this.logger.error('Failed to initialize ioredis client:', err);
      }
    } else {
      this.logger.warn('No REDIS_URL or UPSTASH_REDIS_REST credentials provided. Caching will be bypassed.');
    }
  }

  async get(key: string): Promise<string | null> {
    if (this.useRest && this.restUrl && this.restToken) {
      try {
        const response = await fetch(`${this.restUrl}/get/${key}`, {
          headers: {
            Authorization: `Bearer ${this.restToken}`,
          },
        });
        const data = await response.json();
        return data.result || null;
      } catch (err) {
        this.logger.error(`Upstash REST get error for key ${key}:`, err);
        return null;
      }
    }

    if (this.redisClient) {
      try {
        return await this.redisClient.get(key);
      } catch (err) {
        this.logger.error(`ioredis get error for key ${key}:`, err);
        return null;
      }
    }

    return null;
  }

  async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
    if (this.useRest && this.restUrl && this.restToken) {
      try {
        const url = ttlSeconds 
          ? `${this.restUrl}/set/${key}/${encodeURIComponent(value)}/EX/${ttlSeconds}`
          : `${this.restUrl}/set/${key}/${encodeURIComponent(value)}`;
        await fetch(url, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.restToken}`,
          },
        });
      } catch (err) {
        this.logger.error(`Upstash REST set error for key ${key}:`, err);
      }
      return;
    }

    if (this.redisClient) {
      try {
        if (ttlSeconds) {
          await this.redisClient.set(key, value, 'EX', ttlSeconds);
        } else {
          await this.redisClient.set(key, value);
        }
      } catch (err) {
        this.logger.error(`ioredis set error for key ${key}:`, err);
      }
    }
  }

  async del(key: string): Promise<void> {
    if (this.useRest && this.restUrl && this.restToken) {
      try {
        await fetch(`${this.restUrl}/del/${key}`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.restToken}`,
          },
        });
      } catch (err) {
        this.logger.error(`Upstash REST del error for key ${key}:`, err);
      }
      return;
    }

    if (this.redisClient) {
      try {
        await this.redisClient.del(key);
      } catch (err) {
        this.logger.error(`ioredis del error for key ${key}:`, err);
      }
    }
  }

  onModuleDestroy() {
    if (this.redisClient) {
      this.redisClient.disconnect();
      this.logger.log('Disconnected standard TCP Redis connection.');
    }
  }
}
