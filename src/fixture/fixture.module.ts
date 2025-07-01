import { Module } from '@nestjs/common';
import { FixtureController } from './fixture.controller';
import { FixtureService } from './fixture.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { FIXTURE_PACKAGE_NAME, protobufPackage } from 'src/interfaces/fixture.pb';
import 'dotenv/config';
import { join } from 'path';
import { AdminFixtureController } from './admin/admin-fixture.controller';
import { IdentityModule } from 'src/identity/identity.module';

@Module({
  imports: [
    IdentityModule,
    ClientsModule.register([
      {
        name: protobufPackage,
        transport: Transport.GRPC,
        options: {
          url: process.env.FIXTURE_SERVICE_URL,
          package: FIXTURE_PACKAGE_NAME,
          protoPath: join('node_modules/sbe-service-proto/proto/fixture.proto'),
        },
      },
    ]),
  ],
  controllers: [FixtureController, AdminFixtureController],
  providers: [FixtureService],
  exports: [FixtureService],
})
export class FixtureModule {}
