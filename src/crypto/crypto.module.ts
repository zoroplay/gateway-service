import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { CryptoService } from './crypto.service';
import { CryptoController } from './crypto.controller';
import { AuthService } from '../identity/auth/auth.service';
import { protobufPackage, IDENTITY_PACKAGE_NAME } from '../interfaces/identity.pb';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: protobufPackage,
        transport: Transport.GRPC,
        options: {
          package: IDENTITY_PACKAGE_NAME,
          protoPath: join(
            'node_modules/sbe-service-proto/proto/identity.proto',
          ),
          url: process.env.IDENTITY_SERVICE_URL,
        },
      },
    ]),
  ],
  providers: [
    CryptoService,
    AuthService, // Now AuthService will get the configured ClientGrpc
  ],
  controllers: [CryptoController],
  exports: [CryptoService],
})
export class CryptoModule {}
