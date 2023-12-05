/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "betting";

export interface Settings {
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

export interface SettingsById {
  clientID: number;
}

export interface GetAll {
}

export interface AllSettingsResponse {
  settings: SettingsResponse[];
}

export interface BetID {
  betID: number;
}

export interface StatusResponse {
  response: string;
}

export interface PlaceBetRequest {
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

export interface PlaceBetResponse {
  betId: number;
  status: number;
  statusDescription: string;
}

export interface BetHistoryRequest {
  userId: number;
  clientId: number;
  date: string;
}

export interface BetSlipHistory {
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
  status: number;
  statusDescription: string;
}

export interface BetHistory {
  betslip: BetSlipHistory[];
  stake: number;
  date: string;
  status: number;
  statusDescription: string;
  cashOutAmount: number;
  source: string;
}

export interface BetHistoryResponse {
  data: BetHistoryResponse[];
}

export interface ProbabilityBetSlipSelection {
  eventId: number;
  marketId: number;
  marketName: string;
  specifier: string;
  outcomeId: string;
  outcomeName: string;
  sportId: number;
  currentProbability: number;
  initialProbability: number;
}

export interface Probability {
  currentProbability: number;
  initialProbability: number;
  selections: ProbabilityBetSlipSelection[];
}


export const BETTING_PACKAGE_NAME = "betting";

export interface BettingServiceClient {

  createSetting(request: Settings): Observable<SettingsResponse>;

  updateSetting(request: Settings): Observable<SettingsResponse>;

  getSettingsById(request: SettingsById): Observable<SettingsResponse>;

  getAllSettings(request: GetAll): Observable<AllSettingsResponse>;

  cancelBet(request: BetID): Observable<StatusResponse>;

  placeBet(request: PlaceBetRequest): Observable<PlaceBetResponse>;

  betHistory(request: BetHistoryRequest): Observable<BetHistoryResponse>;

  getProbabilityFromBetId(request: BetID): Observable<Probability>;

}

export interface BettingServiceController {
  createSetting(request: Settings): Promise<SettingsResponse> | Observable<SettingsResponse> | SettingsResponse;

  updateSetting(request: Settings): Promise<SettingsResponse> | Observable<SettingsResponse> | SettingsResponse;

  getSettingsById(request: SettingsById): Promise<SettingsResponse> | Observable<SettingsResponse> | SettingsResponse;

  getAllSettings(request: GetAll): Promise<AllSettingsResponse> | Observable<AllSettingsResponse> | AllSettingsResponse;

  cancelBet(request: BetID): Promise<StatusResponse> | Observable<StatusResponse> | StatusResponse;

  placeBet(request: PlaceBetRequest): Promise<PlaceBetResponse> | Observable<PlaceBetResponse> | PlaceBetResponse;

  betHistory(
    request: BetHistoryRequest,
  ): Promise<BetHistoryResponse> | Observable<BetHistoryResponse> | BetHistoryResponse;

  getProbabilityFromBetID(
      request: BetID,
  ): Promise<Probability> | Observable<Probability> | Probability;

}

export function BettingServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "createSetting",
      "updateSetting",
      "getSettingsById",
      "getAllSettings",
      "cancelBet",
      "placeBet",
      "betHistory",
      "getProbabilityFromBetId"
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("BettingService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("BettingService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const BETTING_SERVICE_NAME = "BettingService";
