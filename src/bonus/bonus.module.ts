import { Module } from '@nestjs/common';
import { BonusController } from './bonus.controller';
import { BonusService } from './bonus.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BONUS_PACKAGE_NAME, protobufPackage } from './bonus.pb';
import {BettingService} from "../betting/betting.service";

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
  controllers: [BonusController],
  providers: [BonusService],
  exports: [BonusService],
})
export class BonusModule {}
