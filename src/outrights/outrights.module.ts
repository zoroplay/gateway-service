import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OUTRIGHTS_PACKAGE_NAME, protobufPackage } from './outrights.pb';
import {OutrightsController} from "./outrights.controller";
import {OutrightsService} from "./outrights.service";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: protobufPackage,
        transport: Transport.GRPC,
        options: {
          url: process.env.OUTRIGHTS_SERVICE_URL,
          package: OUTRIGHTS_PACKAGE_NAME,
          protoPath: 'proto/outrights.proto',
        },
      },
    ]),
  ],
  controllers: [OutrightsController],
  providers: [OutrightsService],
  exports: [OutrightsService],

})
export class OutrightsModule {}
