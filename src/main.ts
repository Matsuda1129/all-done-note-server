import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { pagination } from 'typeorm-pagination';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options  = new DocumentBuilder()
    .setTitle('NestJS all-done-note')
    .setVersion('1.0.0')
    .addBearerAuth(  {
      description: 'Default JWT Authorization',
      type: 'http',
      in: 'header',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      // value: 'ThisIsASampleToken123'
    },
    'defaultBearerAuth',)
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  const logger = new Logger();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.use(cookieParser());
  app.enableCors({
    // origin: 'https://all-done-note-front-ahns6giu1-matsuda1129.vercel.app',
    origin: 'http://localhost:3000',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept,Authorization',
    credentials: true,
  });
  app.use(pagination);
  await app.listen(8000);
  logger.log(`Server is running in ${await app.getUrl()}`);
}
bootstrap();
