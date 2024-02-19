import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { WalletAdminController } from './admin/wallet-admin.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { WALLET_PACKAGE_NAME, protobufPackage } from './wallet.pb';
import { join } from 'path';
import { IdentityModule } from 'src/identity/identity.module';

@Module({
  imports: [
    IdentityModule,
    ClientsModule.register([
      {
        name: protobufPackage,
        transport: Transport.GRPC,
        options: {
          url: process.env.WALLET_SERVICE_URL,
          package: WALLET_PACKAGE_NAME,
          protoPath: join('node_modules/sbe-service-proto/proto/wallet.proto'),
        },
      },
    ]),
  ],
  controllers: [WalletController, WalletAdminController],
  providers: [WalletService]
})
export class WalletModule {}
