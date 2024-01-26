import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NOTIFICATION_PACKAGE_NAME, protobufPackage } from './noti.pb';
import { AdminController } from './admin/admin.controller';
import {join} from "path";
import 'dotenv/config'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: protobufPackage,
        transport: Transport.GRPC,
        options: {
          url: process.env.NOTIFICATION_SERVICE_URL,
          package: NOTIFICATION_PACKAGE_NAME,
          protoPath: join('node_modules/sbe-service-proto/proto/noti.proto'),
        },
      },
    ]),
  ],
  controllers: [NotificationController, AdminController],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
