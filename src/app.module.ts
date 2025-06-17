import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { IdentityModule } from './identity/identity.module';
import { GamingModule } from './gaming/gaming.module';
import { FixtureModule } from './fixture/fixture.module';
import { BettingModule } from './betting/betting.module';
import { BonusModule } from './bonus/bonus.module';
import { NotificationModule } from './notification/notification.module';
import { WalletModule } from './wallet/wallet.module';
import { RetailModule } from './retail/retail.module';
import { OddsModule } from './odds/odds.module';
import { CryptoModule } from './crypto/crypto.module';
import 'dotenv/config';
import { DashboardModule } from './dashboard/dasboard.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    IdentityModule,
    GamingModule,
    BettingModule,
    FixtureModule,
    BonusModule,
    NotificationModule,
    WalletModule,
    RetailModule,
    OddsModule,
    CryptoModule,
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule {}
