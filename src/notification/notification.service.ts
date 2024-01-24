import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import {
  protobufPackage,
  SendSmsRequest,
  NOTIFICATION_SERVICE_NAME,
  NotificationServiceClient,
  SaveSettingsRequest,
} from './noti.pb';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class NotificationService implements OnModuleInit {
  private service: NotificationServiceClient;

  constructor(@Inject(protobufPackage) private client: ClientGrpc) {}

  onModuleInit() {
    this.service = this.client.getService<NotificationServiceClient>(
      NOTIFICATION_SERVICE_NAME,
    );
  }

  sendSMS(data: SendSmsRequest) {
    return this.service.sendSms(data);
  }
  sendOTP(data: SendSmsRequest) {
    return this.service.sendOtp(data);
  }
  verifyOTP(data: SendSmsRequest) {
    return this.service.verifyOtp(data);
  }

  saveSettings(data: SaveSettingsRequest) {
    console.log('save settings');
    return this.service.saveSettings(data);
  }
}
