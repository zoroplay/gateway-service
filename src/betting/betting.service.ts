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
  UpdateBetRequest,
  FindBetRequest,
  GamingActivityRequest,
  GetVirtualBetsRequest,
  ProcessCashoutRequest,
  SalesReportRequest,
  GetCommissionsRequest,
  GetTicketsRequest,
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
    // console.log(data);
    return this.service.createSetting(data);
  }

  UpdateSetting(data: Settings) {
    // console.log('updatesettings');
    return this.service.updateSetting(data);
  }

  GetSettingsByID(data: SettingsById) {
    // console.log('get settings by ID');
    return this.service.getSettingsById(data);
  }

  GetAllSettings() {
    // console.log('get all settings ');
    return this.service.getAllSettings({});
  }

  async PlaceBet(data: PlaceBetRequest) {
    //console.log('place bet ', data.useBonus);
    return firstValueFrom(this.service.placeBet(data));
  }

  UpdateBet(data: UpdateBetRequest) {
    //console.log('update bet ');
    return this.service.updateBet(data);
  }

  GetCoupon(data: FindBetRequest) {
   // console.log('get bet');
    return this.service.getCoupon(data);
  }

  FindBooking(data: FindBetRequest) {
    //console.log('get booking code');
    return this.service.findBet(data);
  }

  BetHistory(data: BetHistoryRequest) {
    //console.log('bet history ');
    return this.service.betHistory(data);
  }

  getProbabilityFromBetId(data: BetID) {
    //console.log('check probability from betID  ');
    return this.service.getProbabilityFromBetId(data);
  }

  getGamingActivity(data: GamingActivityRequest) {
    //console.log('gaming activity ');
    return this.service.gamingActivity(data);
  }

  getTickets(data: GetTicketsRequest) {
    // console.log('get tickets ');
    return this.service.ticketsReport(data);
  }

  cashoutRequest(data: ProcessCashoutRequest) {
    //console.log('cashout request ');
    return this.service.cashoutRequest(data);
  }

  getAgentBets(data: BetHistoryRequest) {
    //console.log('get agent bet list ');
    return this.service.getRetailBets(data);
  }

  getAgentVBets(data: GetVirtualBetsRequest) {
    //console.log('get agent bet list');
    return this.service.getRetailVBets(data);
  }

  getSalesReport(data: SalesReportRequest) {
    //console.log('get sales retport ');
    return this.service.getSalesReport(data);
  }

  getCommissions(data: GetCommissionsRequest) {
    //console.log('get commission retport ');
    return this.service.getCommissions(data);
  }
}
