/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "retail";

export interface Empty {
}

/** Bonus */
export interface BonusGroup {
  group: string;
  maxSel: number;
  minSel: number;
  rate: number;
  rateIsLess: number;
  rateIsMore: number;
  targetCoupon: number;
  targetStake: number;
  createdAt?: string | undefined;
  updatedAt?: string | undefined;
}

export interface BonusGroups {
  bonusGroups: BonusGroup[];
}

export interface BonusGroupResponse {
  success: boolean;
  message: string;
  data: BonusGroup[];
}

/** Commission Profile */
export interface CommissionProfile {
  id?: number | undefined;
  name: string;
  default: boolean;
  description: string;
  providerGroup: string;
  period: string;
  type: string;
  percentage: number;
  commissionType: number;
  turnovers: CommissionTurnover[];
  createdAt?: string | undefined;
  updatedAt?: string | undefined;
}

export interface CommissionProfileResponse {
  success: boolean;
  message: string;
  data: CommissionProfile | undefined;
}

export interface CommissionProfilesResponse {
  success: boolean;
  message: string;
  data: CommissionProfile[];
  meta?: Meta | undefined;
}

export interface AssignUserCommissionProfile {
  profileId: number;
  userId: number;
  clientId: number;
  createdAt?: string | undefined;
  updatedAt?: string | undefined;
}

/** Power Bonus */
export interface PowerRequest {
  userIds: number[];
  clientId: number;
  fromDate: string;
  toDate: string;
}

export interface BetData {
  id?: number | undefined;
  betId: number;
  userId: number;
  clientId: number;
  selectionCount: number;
  cancelledDate?: string | undefined;
  settledDate?: string | undefined;
  stake: number;
  commission: number;
  winnings: number;
  weightedStake: number;
  odds: number;
  createdAt?: string | undefined;
  updatedAt?: string | undefined;
}

export interface Response {
  success: boolean;
  message: string;
}

export interface PowerBonusData {
  id?: number | undefined;
  totalStake: number;
  totalTickets: number;
  totalWeightedStake: number;
  averageNoOfSelections: number;
  grossProfit: number;
  ggrPercent: number;
  rateIsLess: number;
  rateIsMore: number;
  rate: number;
  turnoverCommission: number;
  monthlyBonus: number;
  totalWinnings: number;
  bets: BetData[];
  createdAt?: string | undefined;
  updatedAt?: string | undefined;
}

export interface PayPowerRequest {
  clientId: number;
  userIds: number[];
  fromDate: string;
  toDate: string;
  provider: string;
}

export interface PowerCountData {
  paidUsers: string[];
  unPaidUsers: string[];
  errors: string[];
}

export interface PowerResponse {
  success: boolean;
  message: string;
  data: PowerCountData | undefined;
}

export interface PowerBonusResponse {
  success: boolean;
  message: string;
  data: PowerBonusData | undefined;
}

/** Normal Bonus */
export interface GetNormalRequest {
  fromDate: string;
  toDate: string;
  provider: string;
  meta?: Meta | undefined;
}

export interface PayNormalRequest {
  id?: number | undefined;
  betId: number;
  selectionsCount: number;
  totalOdds: number;
  stake: number;
  clientId: number;
  cashierId: number;
  profileId?: number | undefined;
  commission?: number | undefined;
  profileGroup: string;
  isPaid?: boolean | undefined;
}

export interface CurrentWeekData {
  totalWeeks: number;
  currentWeek: number;
  noOfTickets: number;
  played: number;
  won: number;
  net: number;
  commission: number;
}

export interface CurrentMonth {
  month: string;
}

export interface Meta {
  total?: number | undefined;
  totalPages?: number | undefined;
  currentPage: number;
  itemsPerPage: number;
}

export interface NormalResponse {
  success?: boolean | undefined;
  message?: string | undefined;
  data: NormalPayout[];
  meta?: Meta | undefined;
}

export interface PayNormalResponse {
  success: boolean;
  message: string;
  data: number;
}

export interface NormalPayout {
  id?: number | undefined;
  betId: number;
  selectionsCount: number;
  totalOdds: number;
  stake: number;
  userId: number;
  clientId: number;
  profileId: number;
  profileGroup: string;
  commission: number;
  isPaid: boolean;
  createdAt?: string | undefined;
  updatedAt?: string | undefined;
}

/** Commission Reequest */
export interface CommissionRequest {
  provider: string;
}

export interface ArrayCommissionResponse {
  commissions: Commission[];
}

export interface Commission {
  id?: number | undefined;
  userId: number;
  clientId: number;
  totalTickets: number;
  totalSales: number;
  totalWon: number;
  net: number;
  commission: number;
  startDate: string;
  endDate: string;
  isPaid: boolean;
  userCommissionProfileId: number;
  createdAt?: string | undefined;
  updatedAt?: string | undefined;
}

export interface CommissionTurnover {
  id?: number | undefined;
  event: number;
  commissionProfile?: CommissionProfile | undefined;
  percentage: number;
  maxOdd: number;
  minOdd: number;
  oddSet: boolean;
  createdAt?: string | undefined;
  updatedAt?: string | undefined;
}

export const RETAIL_PACKAGE_NAME = "retail";

export interface RetailServiceClient {
  /** Bonus Groups */

  getBonusGroups(request: Empty): Observable<BonusGroupResponse>;

  createBonusGroups(request: BonusGroups): Observable<BonusGroupResponse>;

  /** Profiles */

  getCommissionProfiles(request: Meta): Observable<CommissionProfilesResponse>;

  createCommissionProfile(request: CommissionProfile): Observable<CommissionProfileResponse>;

  updateCommissionProfile(request: CommissionProfile): Observable<CommissionProfileResponse>;

  assignUserCommissionProfile(request: AssignUserCommissionProfile): Observable<CommissionProfileResponse>;

  onBetPlaced(request: BetData): Observable<Response>;

  onBetSettled(request: BetData): Observable<Response>;

  onBetCancelled(request: BetData): Observable<Response>;

  createPowerBonus(request: PowerRequest): Observable<PowerBonusResponse>;

  getPowerBonus(request: PowerRequest): Observable<PowerBonusResponse>;

  payOutPowerBonus(request: PayPowerRequest): Observable<PowerResponse>;

  getNormalBonus(request: GetNormalRequest): Observable<NormalResponse>;

  calculateNormalBonus(request: PayNormalRequest): Observable<PayNormalResponse>;

  payOutNormalBonus(request: PayNormalRequest): Observable<PayNormalResponse>;
}

export interface RetailServiceController {
  /** Bonus Groups */

  getBonusGroups(request: Empty): Promise<BonusGroupResponse> | Observable<BonusGroupResponse> | BonusGroupResponse;

  createBonusGroups(
    request: BonusGroups,
  ): Promise<BonusGroupResponse> | Observable<BonusGroupResponse> | BonusGroupResponse;

  /** Profiles */

  getCommissionProfiles(
    request: Meta,
  ): Promise<CommissionProfilesResponse> | Observable<CommissionProfilesResponse> | CommissionProfilesResponse;

  createCommissionProfile(
    request: CommissionProfile,
  ): Promise<CommissionProfileResponse> | Observable<CommissionProfileResponse> | CommissionProfileResponse;

  updateCommissionProfile(
    request: CommissionProfile,
  ): Promise<CommissionProfileResponse> | Observable<CommissionProfileResponse> | CommissionProfileResponse;

  assignUserCommissionProfile(
    request: AssignUserCommissionProfile,
  ): Promise<CommissionProfileResponse> | Observable<CommissionProfileResponse> | CommissionProfileResponse;

  onBetPlaced(request: BetData): Promise<Response> | Observable<Response> | Response;

  onBetSettled(request: BetData): Promise<Response> | Observable<Response> | Response;

  onBetCancelled(request: BetData): Promise<Response> | Observable<Response> | Response;

  createPowerBonus(
    request: PowerRequest,
  ): Promise<PowerBonusResponse> | Observable<PowerBonusResponse> | PowerBonusResponse;

  getPowerBonus(
    request: PowerRequest,
  ): Promise<PowerBonusResponse> | Observable<PowerBonusResponse> | PowerBonusResponse;

  payOutPowerBonus(request: PayPowerRequest): Promise<PowerResponse> | Observable<PowerResponse> | PowerResponse;

  getNormalBonus(request: GetNormalRequest): Promise<NormalResponse> | Observable<NormalResponse> | NormalResponse;

  calculateNormalBonus(
    request: PayNormalRequest,
  ): Promise<PayNormalResponse> | Observable<PayNormalResponse> | PayNormalResponse;

  payOutNormalBonus(
    request: PayNormalRequest,
  ): Promise<PayNormalResponse> | Observable<PayNormalResponse> | PayNormalResponse;
}

export function RetailServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "getBonusGroups",
      "createBonusGroups",
      "getCommissionProfiles",
      "createCommissionProfile",
      "updateCommissionProfile",
      "assignUserCommissionProfile",
      "onBetPlaced",
      "onBetSettled",
      "onBetCancelled",
      "createPowerBonus",
      "getPowerBonus",
      "payOutPowerBonus",
      "getNormalBonus",
      "calculateNormalBonus",
      "payOutNormalBonus",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("RetailService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("RetailService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const RETAIL_SERVICE_NAME = "RetailService";
