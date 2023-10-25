import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientProxyFactory } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AgencyController } from './agency/agency.controller';
import { CmsController } from './cms/cms.controller';
import { SportsController } from './sports/sports.controller';
import { UsersController } from './users/users.controller';
import { BetsController } from './bets/bets.controller';
import { CommunicationsController } from './communications/communications.controller';
import { TipstersController } from './tipsters/tipsters.controller';
import { PoolsController } from './pools/pools.controller';
import { JackpotsController } from './jackpots/jackpots.controller';
import { PaymentsController } from './wallets/payments.controller';
import { AuthModule } from './auth/auth.module';
import {BettingModule} from "./betting/betting.module";
import {GamingModule} from "./gaming/gaming.module";
import {BettingController} from "./betting/betting.controller";

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, GamingModule, BettingModule],
  controllers: [
    AppController,
    AgencyController,
    CmsController,
    SportsController,
    UsersController,
    BetsController,
    CommunicationsController,
    TipstersController,
    PoolsController,
    JackpotsController,
    PaymentsController,
    BettingController
  ],
  providers: [AppService],
})
export class AppModule {}
