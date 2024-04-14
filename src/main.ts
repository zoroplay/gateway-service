import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from './filter/http-exception.filter';

const logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api/v2');

  const options = new DocumentBuilder()
    .setTitle('SportsBook Engine APIs')
    .setDescription('API Description for SBE sportsbook platform')
    .setVersion('2.0')
    .addBearerAuth()
    .build();

  app.enableCors();

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
