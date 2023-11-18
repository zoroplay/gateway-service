import { Module } from '@nestjs/common';
import { SMSController } from './sms.controller';
import { SMSService } from './sms.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BONUS_PACKAGE_NAME, protobufPackage } from './sms.pb';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: protobufPackage,
        transport: Transport.GRPC,
        options: {
          url: process.env.BONUS_SERVICE_URL,
          package: BONUS_PACKAGE_NAME,
          protoPath: 'proto/bonus.proto',
        },
      },
    ]),
  ],
  controllers: [SMSController],
  providers: [SMSService],
  exports: [SMSService],
})
export class SMSModule {}
