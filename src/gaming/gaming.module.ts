import { Module } from '@nestjs/common';
import { GamingController } from './gaming.controller';
import { GamingService } from './gaming.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GAMING_PACKAGE_NAME, protobufPackage } from 'src/interfaces/gaming.pb';
import { join } from 'path';
import { VirtualController } from './virtual.controller';
import { GamingAdminController } from './admin/gaming.admin.controller';
import { FirebaseService } from 'src/common/services/firebaseUpload';
import { IdentityModule } from 'src/identity/identity.module';

@Module({
  imports: [
    IdentityModule,
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
  controllers: [GamingAdminController, GamingController, VirtualController],
  providers: [GamingService, FirebaseService],
  exports: [GamingService, FirebaseService],
})
export class GamingModule {}
