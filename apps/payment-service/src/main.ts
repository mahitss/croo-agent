// Pre-load schema before NestJS AppModule imports Prisma Client
(function preLoadSchema() {
  try {
    require('dns').setDefaultResultOrder('ipv4first');
  } catch (e) {}

  const fs = require('fs');
  const path = require('path');
  const envPaths = [
    path.resolve(__dirname, '..', '.env'),
    path.resolve(__dirname, '..', '..', '.env'),
    path.resolve(process.cwd(), '.env')
  ];
  for (const envPath of envPaths) {
    if (fs.existsSync(envPath)) {
      try {
        const envContent = fs.readFileSync(envPath, 'utf8');
        const match = envContent.match(/DATABASE_URL\s*=\s*["']?([^"'\r\n]+)["']?/);
        if (match && match[1] && match[1].includes('schema=')) {
          process.env.DATABASE_URL = match[1];
          break;
        }
      } catch (e) {}
    }
  }
})();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

declare const process: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  const port = process.env.PORT || 5004;
  await app.listen(port, '0.0.0.0');
  console.log(`Orbit Payment Service listening on: ${await app.getUrl()}`);
}
bootstrap();
