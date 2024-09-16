/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  NOTIFICATION_PACKAGE_NAME,
  protobufPackage,
} from 'src/interfaces/noti.pb';
import { AdminController } from './admin/admin.controller';
import { join } from 'path';
import 'dotenv/config';
import { AuthService } from 'src/identity/auth/auth.service';
import { IdentityModule } from 'src/identity/identity.module';

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
    IdentityModule,
  ],
  controllers: [NotificationController, AdminController],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
