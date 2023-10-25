/* eslint-disable */
import { GrpcMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "betting";

export interface Empty {
}

export const BETTING_PACKAGE_NAME = "betting";

export interface Settings{
  clientID: number;
  taxOnStake: number;
  taxOnWinning: number;
  minimumStake: number;
  maximumStake: number;
  maximumWinning: number;
  maximumSelections: number;
  mtsLimitID: number;
  currency: string;
}

export interface SettingsById {
  clientID: number;
}

export interface PlaceBetDto {
  betslip: BetSlip[];
  clientId: number;
  userId: number;
  stake: number;
  source: string;
  ipAddress: string;
}

export interface BetSlip {
  eventName: string;
  eventType: string;
  eventId: number;
  producerId: number;
  marketId: number;
  marketName: string;
  specifier: string;
  outcomeId: string;
  outcomeName: string;
  odds: number;
  sportId: number;
}

export interface BetHistoryDto {
  userId: number;
  status: number;
  date: string;
  clientId: number,
}

export interface SettingsResponse {
  clientID: number;
  taxOnStake: number;
  taxOnWinning: number;
  minimumStake: number;
  maximumStake: number;
  maximumWinning: number;
  maximumSelections: number;
  mtsLimitID: number;
  currency: string;
  created: string;
  updated: string;
}

export interface AllSettingsResponse {
  settings: SettingsResponse[];
}

export interface PlaceBetResponse {
  betId: number;
  status: number;
  statusDescription: string;
}

export interface BetHistory {
  betslip: BetSlip[];
  stake: number;
  source: string;
  date: string,
  status: number,
  statusDescription: string,
}

export interface BetHistoryResponse {
  data: BetHistory[];
}

export interface BettingServiceClient {
  
  CreateSetting(request: Settings): Observable<SettingsResponse>;

  UpdateSetting(request: Settings): Observable<SettingsResponse>;

  GetSettingsByID(request: SettingsById): Observable<SettingsResponse>;

  GetAllSettings(request: Empty): Observable<AllSettingsResponse>;

  PlaceBet(request: PlaceBetDto): Observable<PlaceBetResponse>;

  BetHistory(request: BetHistoryDto): Observable<BetHistoryResponse>;

}

export interface BettingServiceController {

  CreateSetting(request: Settings): Promise<SettingsResponse> | Observable<SettingsResponse> | SettingsResponse;

  UpdateSetting(request: Settings): Promise<SettingsResponse> | Observable<SettingsResponse> | SettingsResponse;

  GetSettingsByID(request: SettingsById): Promise<SettingsResponse> | Observable<SettingsResponse> | SettingsResponse;

  GetAllSettings(request: Empty): Promise<AllSettingsResponse> | Observable<AllSettingsResponse> | AllSettingsResponse;

  PlaceBet(request: PlaceBetDto): Promise<PlaceBetResponse> | Observable<PlaceBetResponse> | PlaceBetResponse;

  BetHistory(request: BetHistoryDto): Promise<BetHistoryResponse> | Observable<BetHistoryResponse> | BetHistoryResponse;

}

export function BettingServiceControllerMethods() {

  return function (constructor: Function) {

    const grpcMethods: string[] = [
      "CreateSetting",
      "UpdateSetting",
      "GetSettingsByID",
      "GetAllSettings",
      "PlaceBet",
      "BetHistory",
    ];

    for (const method of grpcMethods) {

      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("BettingService", method)(constructor.prototype[method], method, descriptor);
    }

  };
}

export const BETTING_SERVICE_NAME = "BettingService";
