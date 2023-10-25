/* eslint-disable */
import { GrpcMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "bonus";

export interface Empty {
}

export const BONUS_PACKAGE_NAME = "bonus";

export interface CreateBonusResponse {
  bonusId: number;
  description: string;
  status: number;
}

export interface CreateBonusRequest {
  clientId: number;
  bonusType: string;
  minimumStake: number;
  expiryInHours: number;
  minimumEvents: number;
  minimumOddsPerEvent: number;
  minimumTotalOdds: number;
  applicableBetType: string;
  maximumWinning: number;

  minimumLostGames: number;
  minimumSelection: number;
  resetIntervalType: string;
  minimumEntryAmount: number;
  bonusAmount: number;
}

export interface Bonus {
  clientId: number;
  bonusType: string;
  minimumStake: number;
  expiryInHours: number;
  minimumEvents: number;
  minimumOddsPerEvent: number;
  minimumTotalOdds: number;
  applicableBetType: string;
  maximumWinning: number;
  minimumLostGames: number;
  minimumSelection: number;
  resetIntervalType: string;
  minimumEntryAmount: number;
  bonusAmount: number;
  status: number;
  created: string;
  updated: string;
}

export interface CreateCashbackBonusRequest {
  clientId: number;
  minimumStake: number;
  expiryInHours: number;
  minimumEvents: number;
  minimumOddsPerEvent: number;
  minimumTotalOdds: number;
  applicableBetType: string;
  maximumWinning: number;

  minimumLostGames: number;
  minimumSelection: number;
  minimumEntryAmount: number;
  bonusAmount: number;
}

export interface CreateFirstDepositBonusRequest {
  clientId: number;
  bonusType: string;
  minimumStake: number;
  expiryInHours: number;
  minimumEvents: number;
  minimumOddsPerEvent: number;
  minimumTotalOdds: number;
  applicableBetType: string;
  maximumWinning: number;

  resetIntervalType: string;
  minimumEntryAmount: number;
  bonusAmount: number;
}

export interface CreateFreebetBonusRequest {
  clientId: number;
  bonusType: string;
  minimumStake: number;
  expiryInHours: number;
  minimumEvents: number;
  minimumOddsPerEvent: number;
  minimumTotalOdds: number;
  applicableBetType: string;
  maximumWinning: number;
}

export interface CreateReferralBonusRequest {
  clientId: number;
  bonusType: string;
  minimumStake: number;
  expiryInHours: number;
  minimumEvents: number;
  minimumOddsPerEvent: number;
  minimumTotalOdds: number;
  applicableBetType: string;
  maximumWinning: number;
  minimumEntryAmount: number;
  bonusAmount: number;
}

export interface CreateShareBetBonusRequest {
  clientId: number;
  bonusType: string;
  minimumStake: number;
  expiryInHours: number;
  minimumEvents: number;
  minimumOddsPerEvent: number;
  minimumTotalOdds: number;
  applicableBetType: string;
  maximumWinning: number;
  minimumEntryAmount: number;
  bonusAmount: number;
}

export interface GetBonusRequest {
  clientId: number;
  bonusType: string;
}

export interface BonusResponse {
  bonus: Bonus[];
}

export interface GetUserBonusRequest {
  clientId: number;
  userId: number;
}

export interface UserBonus {
  bonusType: string;
  amount: number;
  created: string;
  expiryDateInTimestamp: number
}

export interface GetUserBonusResponse {
  bonus: UserBonus[];
}

export interface AwardBonusRequest {
  clientId: number;
  bonusType: string;
  userId: number;
  amount: number;
}

export interface Betslip {
  matchId: number;
  marketId: number;
  specifier: string;
  outcomeId: number;
  odds: number;
}

export interface UserBet {
  betslip: Betslip[];
  clientId: number;
  userId: number;
  stake: number;
  bonusType: string;
  totalOdds: number;
}

export interface HasBonusBetResponse {
  bonus: UserBonus;
  status: number;
  description: string;
}

export interface BonusStatusRequest {
  clientId: number;
  bonusType: string;
  status: number;
}

export interface BonusServiceClient {

  CreateCashbackBonus(request: CreateCashbackBonusRequest): Observable<CreateBonusResponse>;

  UpdateCashbackBonus(request: CreateCashbackBonusRequest): Observable<CreateBonusResponse>;

  CreateFirstDepositBonus(request: CreateFirstDepositBonusRequest): Observable<CreateBonusResponse>;

  UpdateFirstDepositBonus(request: CreateFirstDepositBonusRequest): Observable<CreateBonusResponse>;

  CreateFreebetBonus(request: CreateFreebetBonusRequest): Observable<CreateBonusResponse>;

  UpdateFreebetBonus(request: CreateFreebetBonusRequest): Observable<CreateBonusResponse>;

  CreateReferralBonus(request: CreateReferralBonusRequest): Observable<CreateBonusResponse>;

  UpdateReferralBonus(request: CreateReferralBonusRequest):  Observable<CreateBonusResponse>;

  CreateShareBetBonus(request: CreateShareBetBonusRequest):  Observable<CreateBonusResponse>;

  UpdateShareBetBonus(request: CreateShareBetBonusRequest):  Observable<CreateBonusResponse>;

  GetBonus(request: GetBonusRequest):  Observable<BonusResponse>;

  GetUserBonus(request: GetUserBonusRequest):  Observable<GetUserBonusResponse>;

  AwardBonus(request: AwardBonusRequest):  Observable<GetUserBonusResponse>;

  HasBonusBet(request: UserBet):  Observable<HasBonusBetResponse>;

  DebitBonusBet(request: UserBet):  Observable<HasBonusBetResponse>;

  UpdateBonusStatus(request: BonusStatusRequest):  Observable<CreateBonusResponse>;

}

export interface BonusServiceController {

  CreateCashbackBonus(request: CreateCashbackBonusRequest): Promise<CreateBonusResponse> | Observable<CreateBonusResponse> | CreateBonusResponse;

  UpdateCashbackBonus(request: CreateCashbackBonusRequest): Promise<CreateBonusResponse> | Observable<CreateBonusResponse> | CreateBonusResponse;

  CreateFirstDepositBonus(request: CreateFirstDepositBonusRequest): Promise<CreateBonusResponse> | Observable<CreateBonusResponse> | CreateBonusResponse;

  UpdateFirstDepositBonus(request: CreateFirstDepositBonusRequest): Promise<CreateBonusResponse> | Observable<CreateBonusResponse> | CreateBonusResponse;

  CreateFreebetBonus(request: CreateFreebetBonusRequest): Promise<CreateBonusResponse> | Observable<CreateBonusResponse> | CreateBonusResponse;

  UpdateFreebetBonus(request: CreateFreebetBonusRequest): Promise<CreateBonusResponse> | Observable<CreateBonusResponse> | CreateBonusResponse;

  CreateReferralBonus(request: CreateReferralBonusRequest): Promise<CreateBonusResponse> | Observable<CreateBonusResponse> | CreateBonusResponse;

  UpdateReferralBonus(request: CreateReferralBonusRequest):  Promise<CreateBonusResponse> | Observable<CreateBonusResponse> | CreateBonusResponse;

  CreateShareBetBonus(request: CreateShareBetBonusRequest):  Promise<CreateBonusResponse> | Observable<CreateBonusResponse> | CreateBonusResponse;

  UpdateShareBetBonus(request: CreateShareBetBonusRequest):  Promise<CreateBonusResponse> | Observable<CreateBonusResponse> | CreateBonusResponse;

  GetBonus(request: GetBonusRequest):  Promise<BonusResponse> | Observable<BonusResponse> | BonusResponse;

  GetUserBonus(request: GetUserBonusRequest):  Promise<GetUserBonusResponse> | Observable<GetUserBonusResponse> | GetUserBonusResponse;

  AwardBonus(request: AwardBonusRequest):  Promise<HasBonusBetResponse> | Observable<HasBonusBetResponse> | HasBonusBetResponse;

  HasBonusBet(request: UserBet):  Promise<HasBonusBetResponse> | Observable<HasBonusBetResponse> | HasBonusBetResponse;

  DebitBonusBet(request: UserBet):  Promise<HasBonusBetResponse> | Observable<HasBonusBetResponse> | HasBonusBetResponse;

  UpdateBonusStatus(request: BonusStatusRequest):  Promise<CreateBonusResponse> | Observable<CreateBonusResponse> | CreateBonusResponse;
  
}

export function BonusServiceControllerMethods() {

  return function (constructor: Function) {

    const grpcMethods: string[] = [
      "CreateCashbackBonus",
      "UpdateCashbackBonus",
      "CreateFirstDepositBonus",
      "UpdateFirstDepositBonus",
      "CreateFreebetBonus",
      "UpdateFreebetBonus",
      "CreateReferralBonus",
      "UpdateReferralBonus",
      "CreateShareBetBonus",
      "UpdateShareBetBonus",
      "GetBonus",
      "GetUserBonus",
      "AwardBonus",
      "HasBonusBet",
      "DebitBonusBet",
      "UpdateBonusStatus",
    ];

    for (const method of grpcMethods) {

      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("BonusService", method)(constructor.prototype[method], method, descriptor);
    }

  };
}

export const BONUS_SERVICE_NAME = "BonusService";