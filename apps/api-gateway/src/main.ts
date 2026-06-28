import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Apply strict CORS options
  app.enableCors({
    origin: ['http://localhost:3000', 'https://orbitai.dev'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Limit request payload sizes to 10MB to avoid buffer overflows (P13 Security)
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ limit: '10mb', extended: true }));

  // In-memory sliding-window rate-limiting middleware (Phase 8 Security Compliance)
  const ipRequests = new Map<string, { count: number; resetTime: number }>();
  app.use((req: any, res: any, next: any) => {
    const ip = req.ip || req.connection.remoteAddress || '127.0.0.1';
    const now = Date.now();
    const limit = 150; // max 150 requests per minute
    const windowMs = 60000;

    let tracker = ipRequests.get(ip);
    if (!tracker || now > tracker.resetTime) {
      tracker = { count: 0, resetTime: now + windowMs };
    }

    tracker.count++;
    ipRequests.set(ip, tracker);

    if (tracker.count > limit) {
      res.status(429).json({
        statusCode: 429,
        message: 'Too many requests. Please slow down and try again later.',
        error: 'Too Many Requests',
      });
      return;
    }
    next();
  });

  // Set production security headers manually (Part 3.7 Security Headers)
  app.use((req: any, res: any, next: any) => {
    res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'; object-src 'none';");
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'geolocation=(), camera=(), microphone=()');
    next();
  });

  await app.listen(5000);
  console.log(`Orbit API Gateway listening on: ${await app.getUrl()}`);
}
bootstrap();
