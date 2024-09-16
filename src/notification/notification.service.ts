import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import {
  protobufPackage,
  SendSmsRequest,
  NOTIFICATION_SERVICE_NAME,
  NotificationServiceClient,
  SaveSettingsRequest,
  SendOtpRequest,
  VerifyOtpRequest,
  GetUserNotificationsRequest,
} from 'src/interfaces/noti.pb';
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
  sendOTP(data: SendOtpRequest) {
    return this.service.sendOtp(data);
  }
  verifyOTP(data: VerifyOtpRequest) {
    return this.service.verifyOtp(data);
  }

  saveSettings(data: SaveSettingsRequest) {
    // console.log('save settings');
    return this.service.saveSettings(data);
  }
  getUserNotifications(data: GetUserNotificationsRequest) {
    // console.log('getUserNotifications');
    return this.service.getUserNotifications(data);
  }
}
