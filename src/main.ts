import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { pagination } from 'typeorm-pagination';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = new Logger();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.use(cookieParser());
  app.enableCors({
    // origin: 'https://all-done-note-front-ntd6w6kwk-matsuda1129.vercel.app',
    // origin: 'https://all-done-note-front.vercel.app',
    origin: 'http://localhost:3000',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept,Authorization',
    credentials: true,
  });
  app.use(pagination);
  await app.listen(3000);
  logger.log(`Server is running in ${await app.getUrl()}`);
}
bootstrap();
