import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import {
  protobufPackage,
  OutrightsServiceClient,
  OUTRIGHTS_SERVICE_NAME,
  Settings,
  SettingsById,
  BetHistoryRequest,
  PlaceBetRequest,
  BetID,
  BookingCode,
  UpdateBetRequest,
} from './outrights.pb';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class OutrightsService implements OnModuleInit {
  private service: OutrightsServiceClient;

  constructor(@Inject(protobufPackage) private client: ClientGrpc) {}

  onModuleInit() {
    this.service =
      this.client.getService<OutrightsServiceClient>(OUTRIGHTS_SERVICE_NAME);
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

  UpdateBet(data: UpdateBetRequest) {
    console.log('update bet ');
    return this.service.updateBet(data);
  }

  BookBet(data: PlaceBetRequest) {
    console.log('book bet ');
    return this.service.bookBet(data);
  }

  GetBooking(data: BookingCode) {
    console.log('get booking code ');
    return this.service.getBooking(data);
  }

  BetHistory(data: BetHistoryRequest) {
    console.log('bet history ');
    return this.service.betHistory(data);
  }

  getProbabilityFromBetId(data: BetID) {

    console.log('check probability from betID  ');
    return this.service.getProbabilityFromBetId(data);
  }


}
