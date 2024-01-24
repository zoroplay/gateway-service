/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "notification";

export interface SaveSettingsRequest {
  settingsID: number;
  clientId: number;
  enable: boolean;
  displayName: string;
  gatewayName: string;
  senderID: string;
  apiKey: string;
  username: string;
  password: string;
}

export interface SaveSettingsResponse {
  message: string;
  status: boolean;
}

export interface SendSmsRequest {
  msisdn: string;
  text: string;
  senderID: string;
  name: string;
  from: string;
  status: string;
  phoneNumbers: string[];
  schedule: string;
  channel: string;
  mode: string;
  campaignType: string;
  clientID: number;
}

export interface SendOtpRequest {
  clientID: number;
  phoneNumber: string;
}

export interface VerifyOtpRequest {
  clientID: number;
  phoneNumber: string;
  otpCode: string;
}

export interface SendSmsResponse {
  message: string;
  status: boolean;
}

export interface DeliveryReportRequest {
  username: string;
  password: string;
  messageId: string;
}

export interface DeliveryReportResponse {
  status: string;
  timeSubmitted: string;
  timeDelivered: string;
  message: string;
  sender: string;
  messageId: string;
}

export const NOTIFICATION_PACKAGE_NAME = "notification";

export interface NotificationServiceClient {
  saveSettings(request: SaveSettingsRequest): Observable<SaveSettingsResponse>;

  sendSms(request: SendSmsRequest): Observable<SendSmsResponse>;

  sendOtp(request: SendOtpRequest): Observable<SendSmsResponse>;

  verifyOtp(request: VerifyOtpRequest): Observable<SendSmsResponse>;

  getDeliveryReport(request: DeliveryReportRequest): Observable<DeliveryReportResponse>;
}

export interface NotificationServiceController {
  saveSettings(
    request: SaveSettingsRequest,
  ): Promise<SaveSettingsResponse> | Observable<SaveSettingsResponse> | SaveSettingsResponse;

  sendSms(request: SendSmsRequest): Promise<SendSmsResponse> | Observable<SendSmsResponse> | SendSmsResponse;

  sendOtp(request: SendOtpRequest): Promise<SendSmsResponse> | Observable<SendSmsResponse> | SendSmsResponse;

  verifyOtp(request: VerifyOtpRequest): Promise<SendSmsResponse> | Observable<SendSmsResponse> | SendSmsResponse;

  getDeliveryReport(
    request: DeliveryReportRequest,
  ): Promise<DeliveryReportResponse> | Observable<DeliveryReportResponse> | DeliveryReportResponse;
}

export function NotificationServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["saveSettings", "sendSms", "sendOtp", "verifyOtp", "getDeliveryReport"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("NotificationService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("NotificationService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const NOTIFICATION_SERVICE_NAME = "NotificationService";
