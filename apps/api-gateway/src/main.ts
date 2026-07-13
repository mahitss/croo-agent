declare const require: any;
try {
  require('dns').setDefaultResultOrder('ipv4first');
} catch (e) {}

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as express from 'express';
import * as Sentry from '@sentry/node';
import * as dotenv from 'dotenv';
import * as path from 'path';

async function bootstrap() {
  console.log('[STARTUP] Loading env');
  const isProduction = process.env.NODE_ENV === 'production' || process.env.RENDER === 'true';
  let localEnv: any = { parsed: {} };
  let parentEnv: any = { parsed: {} };
  
  try {
    if (!isProduction || !process.env.DATABASE_URL) {
      localEnv = dotenv.config();
      parentEnv = dotenv.config({ path: path.resolve(process.cwd(), '../../.env') });
    }
  } catch (e) {
    console.error('[STARTUP_WARNING] Failed to load .env files, relying on environment:', e);
  }

  // Check critical variables and log missing ones
  const requiredEnv = [
    'DATABASE_URL',
    'UPSTASH_REDIS_REST_URL',
    'UPSTASH_REDIS_REST_TOKEN',
    'JWT_SECRET',
    'OPENROUTER_API_KEY'
  ];
  requiredEnv.forEach((key) => {
    if (!process.env[key]) {
      console.warn(`[STARTUP_WARNING] Missing critical environment variable: ${key}`);
    }
  });

  console.log('[STARTUP] Database');
  if (process.env.DATABASE_URL) {
    const redacted = process.env.DATABASE_URL.replace(/:([^:@]+)@/, ':****@');
    console.log(`[STARTUP] Database configured to use: ${redacted}`);
  } else {
    console.warn('[STARTUP_WARNING] DATABASE_URL is not set.');
  }

  console.log('[STARTUP] Redis');
  if (process.env.UPSTASH_REDIS_REST_URL) {
    console.log(`[STARTUP] Upstash Redis configured at: ${process.env.UPSTASH_REDIS_REST_URL}`);
  } else {
    console.warn('[STARTUP_WARNING] UPSTASH_REDIS_REST_URL is not set.');
  }

  console.log('[STARTUP] Authentication');
  if (process.env.JWT_SECRET) {
    console.log('[STARTUP] JWT secrets validated successfully.');
  } else {
    console.warn('[STARTUP_WARNING] JWT_SECRET is missing. Falling back to default secret.');
  }

  console.log('[STARTUP] AI providers');
  if (process.env.OPENROUTER_API_KEY) {
    console.log('[STARTUP] OpenRouter client credentials ready.');
  } else {
    console.warn('[STARTUP_WARNING] OPENROUTER_API_KEY is not configured.');
  }

  console.log('[STARTUP] Routes');
  
  try {
    // Sentry init
    const sentryDsn = process.env.SENTRY_DSN;
    if (sentryDsn) {
      Sentry.init({
        dsn: sentryDsn,
        environment: process.env.NODE_ENV || 'development',
        tracesSampleRate: 1.0,
      });
      console.log('[SENTRY] Sentry initialized successfully.');
    }

    const app = await NestFactory.create(AppModule);

    // Express trust proxy
    const expressApp = app.getHttpAdapter().getInstance();
    expressApp.set('trust proxy', 1);

    // CORS
    const defaultOrigins = [
      "http://localhost:3000",
      "https://croo-agent-web.vercel.app",
      "https://orbitai.dev",
    ];
    const envOrigins = process.env.ALLOWED_ORIGINS
      ? process.env.ALLOWED_ORIGINS.split(",").map((o) => o.trim())
      : [];
    const allowedOrigins = [...defaultOrigins, ...envOrigins];

    app.enableCors({
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin) || /^https:\/\/.*\.vercel\.app$/.test(origin)) {
          return callback(null, true);
        }
        return callback(new Error(`Origin ${origin} not allowed by CORS`), false);
      },
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization", "Accept", "Origin", "X-Requested-With", "x-execution-mode"],
      optionsSuccessStatus: 200,
    });

    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      transform: true,
    }));

    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ limit: '10mb', extended: true }));

    // Rate limiter
    const ipRequests = new Map<string, { count: number; resetTime: number }>();
    app.use((req: any, res: any, next: any) => {
      const ip = req.ip || req.connection.remoteAddress || '127.0.0.1';
      const now = Date.now();
      const limit = 150;
      const windowMs = 60000;
      let tracker = ipRequests.get(ip);
      if (!tracker || now > tracker.resetTime) {
        tracker = { count: 0, resetTime: now + windowMs };
      }
      tracker.count++;
      ipRequests.set(ip, tracker);
      if (tracker.count > limit) {
        res.status(429).json({ statusCode: 429, message: 'Too many requests.', error: 'Too Many Requests' });
        return;
      }
      next();
    });

    // Custom headers
    app.use((req: any, res: any, next: any) => {
      res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'; object-src 'none';");
      res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.setHeader('X-Frame-Options', 'DENY');
      res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
      res.setHeader('Permissions-Policy', 'geolocation=(), camera=(), microphone=()');
      next();
    });

    // Sanitizer
    app.use((req: any, res: any, next: any) => {
      const sanitize = (data: any): any => {
        if (typeof data === 'string') {
          return data
            .replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, '')
            .replace(/on\w+="[^"]*"/gi, '')
            .replace(/href="javascript:[^"]*"/gi, '');
        }
        if (Array.isArray(data)) return data.map(sanitize);
        if (data !== null && typeof data === 'object') {
          const cleaned: any = {};
          for (const key in data) cleaned[key] = sanitize(data[key]);
          return cleaned;
        }
        return data;
      };
      req.body = sanitize(req.body);
      req.query = sanitize(req.query);
      next();
    });

    // Audit log
    app.use((req: any, res: any, next: any) => {
      const ip = req.ip || req.connection.remoteAddress || '127.0.0.1';
      res.on('finish', () => {
        if (res.statusCode >= 400) {
          console.warn(`[AUDIT_ALERT] ${new Date().toISOString()} - IP: ${ip} - Method: ${req.method} - URL: ${req.originalUrl} - Status: ${res.statusCode}`);
        }
      });
      next();
    });

    console.log('[STARTUP] Server listening');
    const port = process.env.PORT || 10000;
    await app.listen(port, '0.0.0.0');
    console.log(`Orbit API Gateway listening on: ${await app.getUrl()}`);
  } catch (error) {
    console.error('[FATAL_STARTUP_ERROR] Crash during NestJS API Gateway bootstrap:', error);
    // Keep process alive so log can be examined on Render dashboard
    setInterval(() => {
      console.log('[MANAGER_HEARTBEAT] Still alive after startup crash. Check logs above.');
    }, 10000);
  }
}
bootstrap();
