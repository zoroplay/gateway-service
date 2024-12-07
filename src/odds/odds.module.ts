import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { OddsService } from './odds.service';
import { PROTOBUF_PACKAGE_NAME, protobufPackage } from './odds.pb';

@Module({
    imports: [
        ClientsModule.register([
            {
              name: protobufPackage,
              transport: Transport.GRPC,
              options: {
                  url: process.env.FEEDS_SERVICE_GRPC_URI,
                  package: PROTOBUF_PACKAGE_NAME,
                  protoPath: join('src/odds/odds.proto'),
              },
            },
        ]),
      ],
      providers: [OddsService],
      exports: [OddsService]
})
export class OddsModule {}
