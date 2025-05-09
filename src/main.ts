import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { urlencoded, json } from 'express';
import { getBodyParserOptions } from '@nestjs/platform-express/adapters/utils/get-body-parser-options.util';
import { AuditLogInterceptor } from './identity/Audit_log/audit.interceptor';
import { Reflector } from '@nestjs/core';
import { AuthService } from './identity/auth/auth.service';
import { CryptoService } from './crypto/crypto.service';
import * as bodyParser from 'body-parser';
import * as bodyParserXml from 'body-parser-xml';


const logger = new Logger('Main');

bodyParserXml(bodyParser);

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
  });

  app.setGlobalPrefix('/api/v2');

  app.use(
    '/api/v2/webhook/4/tigo/notify',
    bodyParser.raw({ type: 'text/xml' }),
  );

  app.use(
    '/webhook/checkout/4/opay/callback',
    bodyParser.raw({ type: 'application/json' }),
  );

  const options = new DocumentBuilder()
    .setTitle('SportsBook Engine APIs')
    .setDescription('API Description for SBE sportsbook platform')
    .setVersion('2.0')
    .addBearerAuth()
    .build();

  app.enableCors();
  app.use(json(getBodyParserOptions(true, { limit: '50mb' })));
  app.use(urlencoded(getBodyParserOptions(true, { limit: '50mb' })));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());

  //intercept all requests and log them except the ones that are marked with @SkipAudit decorator
  app.useGlobalInterceptors(
    new AuditLogInterceptor(
      app.get(AuthService),
      app.get(CryptoService),
      app.get(Reflector),
    ),
  );

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('swagger', app, document);

  await app.listen(process.env.PORT || 5001, () => {
    logger.log(
      'Sportsbook API Gateway Instance is running on ' + process.env.PORT,
    );
  });
}
bootstrap();
