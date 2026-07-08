// Pre-load schema before NestJS AppModule imports Prisma Client
(function preLoadSchema() {
  try {
    require('dns').setDefaultResultOrder('ipv4first');
  } catch (e) {}

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
        process.env.DATABASE_URL = match[1];
      }
    }
  } catch (e) {}
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

  const port = process.env.PORT || 5002;
  await app.listen(port, '0.0.0.0');
  console.log(`Orbit Agent Service listening on: ${await app.getUrl()}`);
}
bootstrap();
