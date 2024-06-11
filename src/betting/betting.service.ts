import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import {
  protobufPackage,
  BettingServiceClient,
  BETTING_SERVICE_NAME,
  Settings,
  SettingsById,
  BetHistoryRequest,
  PlaceBetRequest,
  BetID,
  BookingCode,
  UpdateBetRequest,
  FindBetRequest,
  GamingActivityRequest,
  GetVirtualBetsRequest,
  ProcessCashoutRequest,
} from 'src/interfaces/betting.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class BettingService implements OnModuleInit {
  private service: BettingServiceClient;

  constructor(@Inject(protobufPackage) private client: ClientGrpc) {}

  onModuleInit() {
    this.service =
      this.client.getService<BettingServiceClient>(BETTING_SERVICE_NAME);
  }

  CreateSetting(data: Settings) {
    console.log(data);
    return this.service.createSetting(data);
  }

  UpdateSetting(data: Settings) {
    console.log('updatesettings');
    return this.service.updateSetting(data);
  }

  GetSettingsByID(data: SettingsById) {
    console.log('get settings by ID');
    return this.service.getSettingsById(data);
  }

  GetAllSettings() {
    console.log('get all settings ');
    return this.service.getAllSettings({});
  }

  async PlaceBet(data: PlaceBetRequest) {
    console.log('place bet ', data.useBonus);
    return firstValueFrom(this.service.placeBet(data));
  }

  UpdateBet(data: UpdateBetRequest) {
    console.log('update bet ');
    return this.service.updateBet(data);
  }

  GetCoupon(data: FindBetRequest) {
    console.log('get booking code');
    return this.service.getCoupon(data);
  }

  BetHistory(data: BetHistoryRequest) {
    console.log('bet history ');
    return this.service.betHistory(data);
  }

  getProbabilityFromBetId(data: BetID) {
    console.log('check probability from betID  ');
    return this.service.getProbabilityFromBetId(data);
  }

  getGamingActivity(data: GamingActivityRequest) {
    console.log('gaming activity ');
    return this.service.gamingActivity(data);
  }

  getVirtualBets(data: GetVirtualBetsRequest) {
    console.log('get virtual bets ');
    return this.service.getVirtualBets(data);
  }

  cashoutRequest(data: ProcessCashoutRequest) {
    console.log('cashout request ');
    return this.service.cashoutRequest(data);
  }

  getAgentBets(data: BetHistoryRequest) {
    console.log('get agent bet list ');
    return this.service.getRetailBets(data);
  }
}
