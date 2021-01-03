import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import 'dotenv/config';
import * as mongoose from 'mongoose';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.APP_PORT;
  const app = await NestFactory.create(AppModule);
  mongoose.set('debug', true);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  await app.listen(PORT);
  Logger.log(`App running at http://localhost:${PORT}`, 'NestApplication');
}
bootstrap();
