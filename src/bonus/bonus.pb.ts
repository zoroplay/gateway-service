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
  product: string;
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
  product: string;
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
  product: string;
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
  product: string;
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
  minimumEntryAmount: number;
  minimumBettingStake: number;
  product: string;
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

export interface Transaction {
  amount: number;
  balance: number;
  createdAt: string;
  desc: string;
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
  status: number;
  transactions: Transaction[];
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
  username: string;
  amount?: number | undefined;
  baseValue?: number | undefined;
  promoCode?: string | undefined;
  status?: number | undefined;
}

export interface UserBet {
  betslip: BetSlip[];
  clientId: number;
  userId: number;
  stake: number;
  totalOdds: number;
  bonusId: number;
  betId?: number | undefined;
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
  matchId: number;
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
  startDate: string;
  endDate: string;
  affiliateIds?: string | undefined;
  trackierCampaignId?: string | undefined;
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

export interface GetCampaignRequest {
  clientId: number;
  promoCode: string;
}

export interface GetCampaignResponse {
  success: boolean;
  message: string;
  data: CampaignBonusData | undefined;
}

export interface PlaceBetResponse {
  success: boolean;
  betId: number;
  status: number;
  statusDescription: string;
}

export interface ValidateBetResponse {
  success: boolean;
  id: number;
  message: string;
}

export const BONUS_PACKAGE_NAME = "bonus";

export interface BonusServiceClient {
  createBonus(request: CreateBonusRequest): Observable<CreateBonusResponse>;

  updateBonus(request: CreateBonusRequest): Observable<CreateBonusResponse>;

  getCampaign(request: GetCampaignRequest): Observable<GetCampaignResponse>;

  validateBetSelections(request: UserBet): Observable<ValidateBetResponse>;

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
  createBonus(
    request: CreateBonusRequest,
  ): Promise<CreateBonusResponse> | Observable<CreateBonusResponse> | CreateBonusResponse;

  updateBonus(
    request: CreateBonusRequest,
  ): Promise<CreateBonusResponse> | Observable<CreateBonusResponse> | CreateBonusResponse;

  getCampaign(
    request: GetCampaignRequest,
  ): Promise<GetCampaignResponse> | Observable<GetCampaignResponse> | GetCampaignResponse;

  validateBetSelections(
    request: UserBet,
  ): Promise<ValidateBetResponse> | Observable<ValidateBetResponse> | ValidateBetResponse;

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
      "createBonus",
      "updateBonus",
      "getCampaign",
      "validateBetSelections",
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
