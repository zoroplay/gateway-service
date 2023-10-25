import { Module } from '@nestjs/common';
import { BonusController } from './bonus.controller';
import { BonusService } from './bonus.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BONUS_PACKAGE_NAME, protobufPackage } from './bonus.pb';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: protobufPackage,
        transport: Transport.GRPC,
        options: {
          package: BONUS_PACKAGE_NAME,
          protoPath: 'node_modules/sbe-service-proto/proto/bonus.proto',
        },
      },
    ]),
  ],
  controllers: [BonusController],
  providers: [BonusService],
})
export class BonusModule {}
