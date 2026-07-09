declare const require: any;
try {
  require('dns').setDefaultResultOrder('ipv4first');
} catch (e) {}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/http-exception.filter';
import { TransformInterceptor } from './common/transform.interceptor';
import * as dotenv from 'dotenv';
import * as path from 'path';

declare const process: any;

async function bootstrap() {
  const isProduction = process.env.NODE_ENV === 'production' || process.env.RENDER === 'true';
  if (!isProduction || !process.env.DATABASE_URL) {
    dotenv.config();
    dotenv.config({ path: path.resolve(process.cwd(), '../../.env') });
  }

  const app = await NestFactory.create(AppModule);
  
  // Enable CORS
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Global Validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
  }));

  // Global Filter and Interceptor
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());

  const port = process.env.PORT || 5001;
  await app.listen(port, '0.0.0.0');
  console.log(`Orbit Authentication Service listening on: ${await app.getUrl()}`);
}
bootstrap();
