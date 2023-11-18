import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import {
  protobufPackage,
  BonusServiceClient,
  BONUS_SERVICE_NAME,
  CreateCashbackBonusRequest,
 ,
} from './sms.pb';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class SMSService implements OnModuleInit {
  private service: BonusServiceClient;

  constructor(@Inject(protobufPackage) private client: ClientGrpc) {}

  onModuleInit() {
    this.service =
      this.client.getService<BonusServiceClient>(BONUS_SERVICE_NAME);
  }

  SendSMS(data: CreateCashbackBonusRequest) {
    console.log('CreateCashbackBonus ');
    return this.service.SendSMS(data);
  }


}
