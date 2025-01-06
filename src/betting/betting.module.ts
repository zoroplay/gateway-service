import { Module } from '@nestjs/common';
import { BettingController } from './betting.controller';
import { BettingService } from './betting.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BETTING_PACKAGE_NAME, protobufPackage } from 'src/interfaces/betting.pb';
import {join} from "path";
import 'dotenv/config'
import { BettingAdminController } from './admin/betting-admin.controller';
import { IdentityModule } from 'src/identity/identity.module';

@Module({
  imports: [
    IdentityModule,
    ClientsModule.register([
      {
        name: protobufPackage,
        transport: Transport.GRPC,
        options: {
          url: process.env.BETTING_SERVICE_URL,
          package: BETTING_PACKAGE_NAME,
          protoPath: join('node_modules/sbe-service-proto/proto/betting.proto'),
        },
      },
    ]),
  ],
  controllers: [BettingController, BettingAdminController],
  providers: [BettingService],
  exports: [BettingService],
})
export class BettingModule {}
