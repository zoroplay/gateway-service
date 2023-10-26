/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "bonus";

export interface CreateFirstDepositBonusRequest {
  clientId: number;
  expiryInHours: number;
  minimumEvents: number;
  minimumOddsPerEvent: number;
  minimumTotalOdds: number;
  applicableBetType: string;
  maximumWinning: number;
  minimumEntryAmount: number;
  bonusAmount: number;
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
  minimumSelection: number;
  minimumLostGames: number;
  bonusAmount: number;
}

export interface CreateFreebetBonusRequest {
  clientId: number;
  expiryInHours: number;
  minimumEvents: number;
  minimumOddsPerEvent: number;
  minimumTotalOdds: number;
  applicableBetType: string;
  maximumWinning: number;
  bonusAmount: number;
}

export interface CreateReferralBonusRequest {
  clientId: number;
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
  expiryInHours: number;
  minimumEvents: number;
  minimumOddsPerEvent: number;
  minimumTotalOdds: number;
  applicableBetType: string;
  maximumWinning: number;
  minimumEntryAmount: number;
  bonusAmount: number;
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
  bonusAmount: number;
  status: number;
  created: string;
  updated: string;
  id: number;
}

export interface CreateBonusResponse {
  bonusId: number;
  status: number;
  description: string;
}

export interface GetBonusRequest {
  clientId: number;
}

export interface DeleteBonusRequest {
  clientId: number;
  bonusType: string;
}

export interface GetBonusResponse {
  bonus: CreateBonusRequest[];
}

export interface BonusResponse {
  status: number;
  description: string;
}

export interface GetUserBonusRequest {
  clientId: number;
  userId: number;
}

export interface GetUserBonusResponse {
  bonus: UserBonus[];
}

export interface UserBonus {
  bonusType: string;
  amount: number;
  expiryDateInTimestamp: number;
  created: string;
}

export interface UserBonusResponse {
  description: string;
  status: number;
  bonus: UserBonus | undefined;
}

export interface AwardBonusRequest {
  clientId: number;
  bonusType: string;
  userId: number;
  amount: number;
}

export interface UserBet {
  betslip: BetSlip[];
  clientId: number;
  userId: number;
  stake: number;
  bonusType: string;
  totalOdds: number;
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

export interface DebitBonusRequest {
  clientId: number;
  userId: number;
  amount: number;
  bonusType: string;
}

export interface HasBonusBetResponse {
  status: number;
  description: string;
  bonus: UserBonus | undefined;
}

export interface BonusStatusRequest {
  clientId: number;
  bonusType: string;
  status: number;
}

export const BONUS_PACKAGE_NAME = "bonus";

export interface BonusServiceClient {
  createCashbackBonus(request: CreateCashbackBonusRequest): Observable<CreateBonusResponse>;

  updateCashbackBonus(request: CreateCashbackBonusRequest): Observable<CreateBonusResponse>;

  createFirstDepositBonus(request: CreateFirstDepositBonusRequest): Observable<CreateBonusResponse>;

  updateFirstDepositBonus(request: CreateFirstDepositBonusRequest): Observable<CreateBonusResponse>;

  createFreebetBonus(request: CreateFreebetBonusRequest): Observable<CreateBonusResponse>;

  updateFreebetBonus(request: CreateFreebetBonusRequest): Observable<CreateBonusResponse>;

  createReferralBonus(request: CreateReferralBonusRequest): Observable<CreateBonusResponse>;

  updateReferralBonus(request: CreateReferralBonusRequest): Observable<CreateBonusResponse>;

  createShareBetBonus(request: CreateShareBetBonusRequest): Observable<CreateBonusResponse>;

  updateShareBetBonus(request: CreateShareBetBonusRequest): Observable<CreateBonusResponse>;

  getBonus(request: GetBonusRequest): Observable<GetBonusResponse>;

  deleteBonus(request: DeleteBonusRequest): Observable<BonusResponse>;

  getUserBonus(request: GetUserBonusRequest): Observable<GetUserBonusResponse>;

  awardBonus(request: AwardBonusRequest): Observable<UserBonusResponse>;

  hasBonusBet(request: UserBet): Observable<HasBonusBetResponse>;

  debitBonusBet(request: UserBet): Observable<HasBonusBetResponse>;

  updateBonusStatus(request: BonusStatusRequest): Observable<CreateBonusResponse>;
}

export interface BonusServiceController {
  createCashbackBonus(
    request: CreateCashbackBonusRequest,
  ): Promise<CreateBonusResponse> | Observable<CreateBonusResponse> | CreateBonusResponse;

  updateCashbackBonus(
    request: CreateCashbackBonusRequest,
  ): Promise<CreateBonusResponse> | Observable<CreateBonusResponse> | CreateBonusResponse;

  createFirstDepositBonus(
    request: CreateFirstDepositBonusRequest,
  ): Promise<CreateBonusResponse> | Observable<CreateBonusResponse> | CreateBonusResponse;

  updateFirstDepositBonus(
    request: CreateFirstDepositBonusRequest,
  ): Promise<CreateBonusResponse> | Observable<CreateBonusResponse> | CreateBonusResponse;

  createFreebetBonus(
    request: CreateFreebetBonusRequest,
  ): Promise<CreateBonusResponse> | Observable<CreateBonusResponse> | CreateBonusResponse;

  updateFreebetBonus(
    request: CreateFreebetBonusRequest,
  ): Promise<CreateBonusResponse> | Observable<CreateBonusResponse> | CreateBonusResponse;

  createReferralBonus(
    request: CreateReferralBonusRequest,
  ): Promise<CreateBonusResponse> | Observable<CreateBonusResponse> | CreateBonusResponse;

  updateReferralBonus(
    request: CreateReferralBonusRequest,
  ): Promise<CreateBonusResponse> | Observable<CreateBonusResponse> | CreateBonusResponse;

  createShareBetBonus(
    request: CreateShareBetBonusRequest,
  ): Promise<CreateBonusResponse> | Observable<CreateBonusResponse> | CreateBonusResponse;

  updateShareBetBonus(
    request: CreateShareBetBonusRequest,
  ): Promise<CreateBonusResponse> | Observable<CreateBonusResponse> | CreateBonusResponse;

  getBonus(request: GetBonusRequest): Promise<GetBonusResponse> | Observable<GetBonusResponse> | GetBonusResponse;

  deleteBonus(request: DeleteBonusRequest): Promise<BonusResponse> | Observable<BonusResponse> | BonusResponse;

  getUserBonus(
    request: GetUserBonusRequest,
  ): Promise<GetUserBonusResponse> | Observable<GetUserBonusResponse> | GetUserBonusResponse;

  awardBonus(
    request: AwardBonusRequest,
  ): Promise<UserBonusResponse> | Observable<UserBonusResponse> | UserBonusResponse;

  hasBonusBet(request: UserBet): Promise<HasBonusBetResponse> | Observable<HasBonusBetResponse> | HasBonusBetResponse;

  debitBonusBet(request: UserBet): Promise<HasBonusBetResponse> | Observable<HasBonusBetResponse> | HasBonusBetResponse;

  updateBonusStatus(
    request: BonusStatusRequest,
  ): Promise<CreateBonusResponse> | Observable<CreateBonusResponse> | CreateBonusResponse;
}

export function BonusServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "createCashbackBonus",
      "updateCashbackBonus",
      "createFirstDepositBonus",
      "updateFirstDepositBonus",
      "createFreebetBonus",
      "updateFreebetBonus",
      "createReferralBonus",
      "updateReferralBonus",
      "createShareBetBonus",
      "updateShareBetBonus",
      "getBonus",
      "deleteBonus",
      "getUserBonus",
      "awardBonus",
      "hasBonusBet",
      "debitBonusBet",
      "updateBonusStatus",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("BonusService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("BonusService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const BONUS_SERVICE_NAME = "BonusService";
