import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { GamingModule } from './gaming/gaming.module';
import { FixtureModule } from './fixture/fixture.module';
import { FixtureController } from './fixture/fixture.controller';
import { BettingModule } from './betting/betting.module';
import { BettingController } from './betting/betting.controller';
import { BonusModule } from './bonus/bonus.module';
import { BonusController } from './bonus/bonus.controller';
import { NotificationModule } from './notification/notification.module';
import { WalletModule } from './wallet/wallet.module';
import 'dotenv/config'
import {OutrightsModule} from "./outrights/outrights.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    GamingModule,
    BettingModule,
    FixtureModule,
    BonusModule,
    NotificationModule,
    WalletModule,
      OutrightsModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [AppService],
})
export class AppModule {}
