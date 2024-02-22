import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { IDENTITY_PACKAGE_NAME, protobufPackage } from './identity.pb';
import {join} from "path";
import { UsersController } from './admin/users.controller';
import 'dotenv/config'
import { RolesController } from './admin/roles.controller';
import { PlayersController } from './admin/players.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: protobufPackage,
        transport: Transport.GRPC,
        options: {
          url: process.env.IDENTITY_SERVICE_URL,
          package: IDENTITY_PACKAGE_NAME,
          protoPath: join('node_modules/sbe-service-proto/proto/identity.proto'),
        },
      },
    ]),
  ],
  controllers: [AuthController, PlayersController, UsersController, RolesController],
  providers: [AuthService],
  exports: [AuthService],
})
export class IdentityModule {}
