import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NOTIFICATION_PACKAGE_NAME, protobufPackage } from './noti.pb';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: protobufPackage,
        transport: Transport.GRPC,
        options: {
          url: process.env.NOTIFICATION_SERVICE_URL,
          package: NOTIFICATION_PACKAGE_NAME,
          protoPath: 'proto/noti.proto',
        },
      },
    ]),
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
