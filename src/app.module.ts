import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { GamingModule } from './gaming/gaming.module';
import { FixtureModule } from './fixture/fixture.module';
import { BettingModule } from './betting/betting.module';
import { BonusModule } from './bonus/bonus.module';
import { NotificationModule } from './notification/notification.module';
import { WalletModule } from './wallet/wallet.module';
import { RetailModule } from './retail/retail.module';
import 'dotenv/config';

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
    RetailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
