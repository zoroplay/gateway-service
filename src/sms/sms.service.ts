import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import {
  protobufPackage,
  SaveSettingsRequest,
  SendSMSRequest,
  SMS_SERVICE_NAME,
  SMSServiceClient,
} from './sms.pb';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class SMSService implements OnModuleInit {
  private service: SMSServiceClient;

  constructor(@Inject(protobufPackage) private client: ClientGrpc) {}

  onModuleInit() {
    this.service = this.client.getService<SMSServiceClient>(SMS_SERVICE_NAME);
  }

  SendSMS(data: SendSMSRequest) {
    console.log('send Sms');
    return this.service.sendsms(data);
  }

  SaveSettings(data: SaveSettingsRequest) {
    console.log('save settings');
    return this.service.saveSettings(data);
  }
}
