import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { urlencoded, json } from 'express';

const logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true
  });

  app.setGlobalPrefix('/api/v2');

  const options = new DocumentBuilder()
    .setTitle('SportsBook Engine APIs')
    .setDescription('API Description for SBE sportsbook platform')
    .setVersion('2.0')
    .addBearerAuth()
    .build();

  app.enableCors();
  // app.use(json({ limit: '50mb' }));
  // app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('swagger', app, document);

  await app.listen(process.env.PORT || 5001, () => {
    logger.log(
      'Sportsbook API Gateway Instance is running on ' + process.env.PORT,
    );
  });
}
bootstrap();
