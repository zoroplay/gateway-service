import { Module } from '@nestjs/common';
import { GamingController } from './gaming.controller';
import { GamingService } from './gaming.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GAMING_PACKAGE_NAME, GAMING_SERVICE_NAME } from './gaming.pb';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: GAMING_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: process.env.GAMING_SERVICE_URL,
          package: GAMING_PACKAGE_NAME,
          protoPath: 'node_modules/sbe-service-proto/proto/gaming.proto',
        },
      },
    ]),
  ],
  controllers: [GamingController],
  providers: [GamingService],
})
export class GamingModule {}
