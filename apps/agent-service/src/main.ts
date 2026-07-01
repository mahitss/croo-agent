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
