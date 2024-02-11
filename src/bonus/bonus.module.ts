import { Module } from '@nestjs/common';
import { BonusController } from './bonus.controller';
import { BonusService } from './bonus.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BONUS_PACKAGE_NAME, protobufPackage } from './bonus.pb';
import { BettingService } from '../betting/betting.service';
import 'dotenv/config'
import {join} from "path";
import { AdminBonusController } from './admin/admin-bonus.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: protobufPackage,
        transport: Transport.GRPC,
        options: {
          url: process.env.BONUS_SERVICE_URL,
          package: BONUS_PACKAGE_NAME,
          protoPath: join('node_modules/sbe-service-proto/proto/bonus.proto'),
        },
      },
    ]),
  ],
  controllers: [AdminBonusController, BonusController],
  providers: [BonusService],
  exports: [BonusService],
})
export class BonusModule {}
