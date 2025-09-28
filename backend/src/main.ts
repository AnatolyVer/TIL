import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
      origin: true,
      credentials: true,
      methods: 'GET,POST,PUT,DELETE',
      allowedHeaders: 'Content-Type,Range',
      exposedHeaders: 'Content-Range,Accept-Ranges,Content-Length',
  });
  await app.listen(5000);
}
bootstrap().then(() => console.log('Server is running on port 5000...'));
