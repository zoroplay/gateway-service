// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.181.2
//   protoc               v5.28.0
// source: noti.proto

/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "notification";

export interface HandleNotificationsRequest {
  userId: number;
  description: string;
  title: string;
}

export interface GetUserNotificationsRequest {
  userId: number;
}

export interface SetReadNotificationsRequest {
  id: number;
}

export interface HandleNotificationsResponse {
  message: string;
  status: boolean;
  data?: Notifications | undefined;
}

export interface SetReadNotificationsResponse {
  message: string;
  status: boolean;
  data: Notifications | undefined;
}

export interface GetUserNotificationsResponse {
  message: string;
  status: boolean;
  data: Notifications[];
}

export interface Notifications {
  userId: number;
  description: string;
  title: string;
  status: number;
  createdAt: string;
  id: number;
}

export interface SaveSettingsRequest {
  settingsID?: number | undefined;
  clientId: number;
  enable: boolean;
  displayName: string;
  gatewayName: string;
  senderID: string;
  apiKey?: string | undefined;
  username?: string | undefined;
  password?: string | undefined;
}

export interface SaveSettingsResponse {
  message: string;
  status: boolean;
}

export interface GetSettingsRequest {
  clientId: number;
}

export interface GetSettingsResponse {
  message: string;
  status: boolean;
  data: SettingData[];
}

export interface SettingData {
  id: number;
  status: boolean;
  displayName: string;
  gatewayName: string;
  senderID: string;
  apiKey: string;
  username: string;
  password: string;
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
  operator: string;
}

export interface SendOtpRequest {
  clientID: number;
  phoneNumber: string;
  operator: string;
}

export interface VerifyOtpRequest {
  clientID: number;
  phoneNumber: string;
  code: string;
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
  setReadNotifications(request: SetReadNotificationsRequest): Observable<SetReadNotificationsResponse>;

  getUserNotifications(request: GetUserNotificationsRequest): Observable<GetUserNotificationsResponse>;

  handleNotifications(request: HandleNotificationsRequest): Observable<HandleNotificationsResponse>;

  saveSettings(request: SaveSettingsRequest): Observable<SaveSettingsResponse>;

  getSettings(request: GetSettingsRequest): Observable<GetSettingsResponse>;

  sendSms(request: SendSmsRequest): Observable<SendSmsResponse>;

  sendOtp(request: SendOtpRequest): Observable<SendSmsResponse>;

  verifyOtp(request: VerifyOtpRequest): Observable<SendSmsResponse>;

  getDeliveryReport(request: DeliveryReportRequest): Observable<DeliveryReportResponse>;
}

export interface NotificationServiceController {
  setReadNotifications(
    request: SetReadNotificationsRequest,
  ): Promise<SetReadNotificationsResponse> | Observable<SetReadNotificationsResponse> | SetReadNotificationsResponse;

  getUserNotifications(
    request: GetUserNotificationsRequest,
  ): Promise<GetUserNotificationsResponse> | Observable<GetUserNotificationsResponse> | GetUserNotificationsResponse;

  handleNotifications(
    request: HandleNotificationsRequest,
  ): Promise<HandleNotificationsResponse> | Observable<HandleNotificationsResponse> | HandleNotificationsResponse;

  saveSettings(
    request: SaveSettingsRequest,
  ): Promise<SaveSettingsResponse> | Observable<SaveSettingsResponse> | SaveSettingsResponse;

  getSettings(
    request: GetSettingsRequest,
  ): Promise<GetSettingsResponse> | Observable<GetSettingsResponse> | GetSettingsResponse;

  sendSms(request: SendSmsRequest): Promise<SendSmsResponse> | Observable<SendSmsResponse> | SendSmsResponse;

  sendOtp(request: SendOtpRequest): Promise<SendSmsResponse> | Observable<SendSmsResponse> | SendSmsResponse;

  verifyOtp(request: VerifyOtpRequest): Promise<SendSmsResponse> | Observable<SendSmsResponse> | SendSmsResponse;

  getDeliveryReport(
    request: DeliveryReportRequest,
  ): Promise<DeliveryReportResponse> | Observable<DeliveryReportResponse> | DeliveryReportResponse;
}

export function NotificationServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "setReadNotifications",
      "getUserNotifications",
      "handleNotifications",
      "saveSettings",
      "getSettings",
      "sendSms",
      "sendOtp",
      "verifyOtp",
      "getDeliveryReport",
    ];
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
