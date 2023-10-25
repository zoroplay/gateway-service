import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import {
  protobufPackage,
  BettingServiceClient, BETTING_SERVICE_NAME, Settings, SettingsById, PlaceBetDto, BetHistoryDto,
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
    return this.service.CreateSetting(data);
  }

  UpdateSetting(data: Settings) {
    console.log('updatesettings');
    return this.service.UpdateSetting(data);
  }

  GetSettingsByID(data: SettingsById) {
    console.log('get settings by ID');
    return this.service.GetSettingsByID(data);
  }

  GetAllSettings() {
    console.log('get all settings ');
    return this.service.GetAllSettings({});
  }

  PlaceBet(data: PlaceBetDto) {
    console.log('place bet ');
    return this.service.PlaceBet(data);
  }

  BetHistory(data: BetHistoryDto) {
    console.log('bet history ');
    return this.service.BetHistory(data);
  }

}
