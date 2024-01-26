import { Module } from '@nestjs/common';
import { GamingController } from './gaming.controller';
import { GamingService } from './gaming.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GAMING_PACKAGE_NAME, protobufPackage } from './gaming.pb';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: protobufPackage,
        transport: Transport.GRPC,
        options: {
          url: process.env.GAMING_SERVICE_URL,
          package: GAMING_PACKAGE_NAME,
          protoPath: join('node_modules/sbe-service-proto/proto/gaming.proto'),
        },
      },
    ]),
  ],
  controllers: [GamingController],
  providers: [GamingService],
})
export class GamingModule {}
