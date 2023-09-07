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

@Module({
  imports: [ConfigModule.forRoot()],
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
  ],
  providers: [AppService],
})
export class AppModule {}
