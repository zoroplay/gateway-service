import { Module } from '@nestjs/common';
import { FixtureController } from './fixture.controller';
import { FixtureService } from './fixture.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { FIXTURE_PACKAGE_NAME, protobufPackage } from './fixture.pb';
import {BonusService} from "../bonus/bonus.service";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: protobufPackage,
        transport: Transport.GRPC,
        options: {
          url: process.env.FIXTURE_SERVICE_URL,
          package: FIXTURE_PACKAGE_NAME,
          protoPath: 'proto/fixture.proto',
        },
      },
    ]),
  ],
  controllers: [FixtureController],
  providers: [FixtureService],
  exports: [FixtureService],
})
export class FixtureModule {}
