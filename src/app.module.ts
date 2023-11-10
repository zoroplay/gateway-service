import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AgencyController } from './agency/agency.controller';
import { CmsController } from './cms/cms.controller';
import { UsersController } from './users/users.controller';
import { BetsController } from './bets/bets.controller';
import { CommunicationsController } from './communications/communications.controller';
import { TipstersController } from './tipsters/tipsters.controller';
import { PoolsController } from './pools/pools.controller';
import { JackpotsController } from './jackpots/jackpots.controller';
import { PaymentsController } from './wallets/payments.controller';
import { AuthModule } from './auth/auth.module';
import {GamingModule} from "./gaming/gaming.module";
import {FixtureModule} from "./fixture/fixture.module";
import {FixtureController} from "./fixture/fixture.controller";
import {BettingModule} from "./betting/betting.module";
import {BettingController} from "./betting/betting.controller";
import {BonusModule} from "./bonus/bonus.module";
import {BonusController} from "./bonus/bonus.controller";

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, GamingModule, BettingModule, FixtureModule,BonusModule],
  controllers: [
    AppController,
    AgencyController,
    CmsController,
    UsersController,
    BetsController,
    CommunicationsController,
    TipstersController,
    PoolsController,
    JackpotsController,
    PaymentsController,
    BettingController,
    FixtureController,
    BonusController
  ],
  providers: [AppService],
})
export class AppModule {}
