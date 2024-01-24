import { Module } from '@nestjs/common';
import { RetailService } from './retail.service';
import { RetailController } from './retail.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RETAIL_PACKAGE_NAME, protobufPackage } from './retail.pb';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: protobufPackage,
        transport: Transport.GRPC,
        options: {
          url: process.env.RETAIL_SERVICE_URL,
          package: RETAIL_PACKAGE_NAME,
          protoPath: 'proto/retail.proto',
        },
      },
    ]),
  ],
  controllers: [RetailController],
  providers: [RetailService],
  exports: [RetailService],
})
export class RetailModule {}
