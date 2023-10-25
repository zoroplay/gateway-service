import { Module } from '@nestjs/common';
import { BettingController } from './betting.controller';
import { BettingService } from './betting.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BETTING_PACKAGE_NAME, protobufPackage } from './betting.pb';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: protobufPackage,
        transport: Transport.GRPC,
        options: {
          package: BETTING_PACKAGE_NAME,
          protoPath: 'node_modules/sbe-service-proto/proto/betting.proto',
        },
      },
    ]),
  ],
  controllers: [BettingController],
  providers: [BettingService],
})
export class BettingModule {}
