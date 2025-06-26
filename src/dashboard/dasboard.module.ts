import { Module, forwardRef } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { IdentityModule } from 'src/identity/identity.module';
import { protobufPackage } from 'src/interfaces/identity.pb';
import { WALLET_PACKAGE_NAME } from 'src/interfaces/wallet.pb';
import { DashBoardAdminController } from './dashboard.controller';
import { WalletModule } from 'src/wallet/wallet.module';

@Module({
  imports: [
    forwardRef(() => IdentityModule),
     forwardRef(() => WalletModule),
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
  controllers: [DashBoardAdminController],
 
})
export class DashboardModule {}
