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
  minimumBettingStake: number;
}

export interface CreateNewBonusRequest {
  bonusName: string;
  bonusCode: string;
  target: string;
  bonusCategory: string;
  bonusType: string;
  bonusAmount: number;
  maxValue: number;
  sportPercentage: number;
  casinoPercentage: number;
  virtualPercentage: number;
  noOfSportRollover: number;
  noOfCasinoRollover: number;
  noOfVirtualRollover: number;
  duration: number;
  clientId: number;
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
  bonusAmountMultiplier: number;
  rolloverCount: number;
  name: string;
  minimumBettingStake: number;
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
  minimumBettingStake: number;
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
  bonusAmountMultiplier: number;
  rolloverCount: number;
  name: string;
  minimumBettingStake: number;
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
  bonusAmountMultiplier: number;
  rolloverCount: number;
  name: string;
  minimumBettingStake: number;
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
  bonusAmountMultiplier: number;
  rolloverCount: number;
  name: string;
  minimumBettingStake: number;
}

export interface CreateNewBonusResponse {
  bonusId: number;
  status: number;
  description: string;
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

export interface GetNewBonusResponse {
  bonus: CreateNewBonusRequest[];
}

export interface BonusResponse {
  status: number;
  description: string;
}

export interface GetUserBonusRequest {
  clientId: number;
  userId: number;
  bonusType: string;
  id: number;
  status: number;
}

export interface UserBetData {
  betId: number;
  stake: number;
  rolloverCount: number;
  status: number;
  rolledAmount: number;
  pendingAmount: number;
  created: string;
}

export interface GetUserBonusResponse {
  bonus: UserBonus[];
}

export interface UserBonus {
  bonusType: string;
  amount: number;
  expiryDateInTimestamp: number;
  created: string;
  id: number;
  name: string;
  rolledAmount: number;
  pendingAmount: number;
  totalRolloverCount: number;
  completedRolloverCount: number;
  bets: UserBetData[];
}

export interface UserBonusResponse {
  description: string;
  status: number;
  bonus: UserBonus | undefined;
}

export interface AwardBonusRequest {
  clientId: number;
  bonusId: number;
  userId: string;
  amount: number;
  baseValue: number;
}

export interface UserBet {
  betslip: BetSlip[];
  clientId: number;
  userId: number;
  stake: number;
  totalOdds: number;
  bonusId: number;
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

export interface CreateCampaignBonusDto {
  clientId: number;
  name: string;
  bonusCode: string;
  bonusId: number;
  expiryDate: string;
}

export interface UpdateCampaignBonusDto {
  clientId: number;
  name: string;
  bonusCode: string;
  bonusId: number;
  expiryDate: string;
  id: number;
}

export interface RedeemCampaignBonusDto {
  clientId: number;
  bonusCode: string;
  userId: number;
}

export interface DeleteCampaignBonusDto {
  clientId: number;
  id: number;
}

export interface CampaignBonusData {
  id: number;
  clientId: number;
  name: string;
  bonusCode: string;
  bonus: CreateBonusRequest | undefined;
  expiryDate: string;
}

export interface AllCampaignBonus {
  bonus: CampaignBonusData[];
}

export interface GetBonusByClientID {
  clientId: number;
}

export interface PlaceBetResponse {
  betId: number;
  status: number;
  statusDescription: string;
}

export const BONUS_PACKAGE_NAME = "bonus";

export interface BonusServiceClient {
  createCashbackBonus(request: CreateBonusRequest): Observable<CreateBonusResponse>;

  createNewBonus(request: CreateNewBonusRequest): Observable<CreateBonusResponse>;

  createBonus(request: CreateNewBonusRequest): Observable<CreateBonusResponse>;

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

  placeBonusBet(request: UserBet): Observable<PlaceBetResponse>;

  updateBonusStatus(request: BonusStatusRequest): Observable<CreateBonusResponse>;

  createCampaignBonus(request: CreateCampaignBonusDto): Observable<CreateBonusResponse>;

  updateCampaignBonus(request: UpdateCampaignBonusDto): Observable<CreateBonusResponse>;

  deleteCampaignBonus(request: DeleteCampaignBonusDto): Observable<CreateBonusResponse>;

  redeemCampaignBonus(request: RedeemCampaignBonusDto): Observable<CreateBonusResponse>;

  getCampaignBonus(request: GetBonusByClientID): Observable<AllCampaignBonus>;
}

export interface BonusServiceController {
  createCashbackBonus(
    request: CreateCashbackBonusRequest,
  ): Promise<CreateBonusResponse> | Observable<CreateBonusResponse> | CreateBonusResponse;

  createNewBonus(
    request: CreateNewBonusRequest,
  ): Promise<CreateBonusResponse> | Observable<CreateBonusResponse> | CreateBonusResponse;

  createBonus(
    request: CreateNewBonusRequest,
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

  placeBonusBet(request: UserBet): Promise<PlaceBetResponse> | Observable<PlaceBetResponse> | PlaceBetResponse;

  updateBonusStatus(
    request: BonusStatusRequest,
  ): Promise<CreateBonusResponse> | Observable<CreateBonusResponse> | CreateBonusResponse;

  createCampaignBonus(
    request: CreateCampaignBonusDto,
  ): Promise<CreateBonusResponse> | Observable<CreateBonusResponse> | CreateBonusResponse;

  updateCampaignBonus(
    request: UpdateCampaignBonusDto,
  ): Promise<CreateBonusResponse> | Observable<CreateBonusResponse> | CreateBonusResponse;

  deleteCampaignBonus(
    request: DeleteCampaignBonusDto,
  ): Promise<CreateBonusResponse> | Observable<CreateBonusResponse> | CreateBonusResponse;

  redeemCampaignBonus(
    request: RedeemCampaignBonusDto,
  ): Promise<CreateBonusResponse> | Observable<CreateBonusResponse> | CreateBonusResponse;

  getCampaignBonus(
    request: GetBonusByClientID,
  ): Promise<AllCampaignBonus> | Observable<AllCampaignBonus> | AllCampaignBonus;
}

export function BonusServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "createCashbackBonus",
      "createNewBonus",
      "createBonus",
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
      "placeBonusBet",
      "updateBonusStatus",
      "createCampaignBonus",
      "updateCampaignBonus",
      "deleteCampaignBonus",
      "redeemCampaignBonus",
      "getCampaignBonus",
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
