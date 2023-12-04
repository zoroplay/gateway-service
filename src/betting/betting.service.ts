import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import {
  protobufPackage,
  BettingServiceClient,
  BETTING_SERVICE_NAME,
  Settings,
  SettingsById,
  BetHistoryRequest,
  PlaceBetRequest,
  Selections,
  BetID,
} from './betting.pb';
import { ClientGrpc } from '@nestjs/microservices';

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

  PlaceBet(data: PlaceBetRequest) {
    console.log('place bet ');
    return this.service.placeBet(data);
  }

  BetHistory(data: BetHistoryRequest) {
    console.log('bet history ');
    return this.service.betHistory(data);
  }

  getProbabilityFromSelection(data: Selections) {
    console.log('check probability from selections ');
    return this.service.getProbabilityFromSelection(data);
  }

  getProbabilityFromBetID(data: BetID) {
    console.log('check probability from betID ');
    return this.service.getProbabilityFromBetID(data);
  }

}
