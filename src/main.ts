import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

const logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api/v2');

  const options = new DocumentBuilder()
    .setTitle('Clearing Hub')
    .setDescription('Sportsbook API Gateway description')
    .addTag('Users')
    .addTag('Bets')
    .addTag('Settings')
    .addTag('Agency')
    .addTag('CMS')
    .addTag('Sports')
    .addTag('Communications')
    .setVersion('1.0')
    .build();

  app.enableCors();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('swagger', app, document);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: process.env.GRPC_SERVER_URL,
      package: 'sports',
      protoPath: process.cwd() + '/src/core/shared/proto/sports.proto',
    },
  });

  // await app.startAllMicroservicesAsync();
  await app.listen(process.env.PORT || 8010, () => {
    logger.log(
      'Sportsbook API Gateway Instance is running on ' + process.env.PORT,
    );
  });
}
bootstrap();
