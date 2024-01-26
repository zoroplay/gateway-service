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
export interface CommissionProfileWithDate {
  id: number;
  name: string;
  default: number;
  description: string;
  providerGroup: string;
  period: string;
  type: string;
  percentage: string;
  commissionType: number;
  turnovers: CreateCommissionTurnover[];
  createdAt: string;
  updatedAt: string;
}

export interface CommissionProfileResponse {
  success: boolean;
  message: string;
  data: CommissionProfileWithDate | undefined;
}

export interface CommissionProfilesResponse {
  success: boolean;
  message: string;
  data: CommissionProfileWithDate[];
}

export interface AssignUserCommissionProfile {
  profileId: number;
  userId: number;
}

/** Power Bonus */
export interface PowerRequest {
  fromDate: string;
  toDate: string;
}

export interface BetData {
  date: string;
  settledBet: number;
  selectionCount: number;
  totalStake: number;
  totalCommission: number;
  totalWinnings: number;
  weightedStake: number;
}

export interface PowerBonusData {
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
}

export interface PayPowerRequest {
  agentIds: number[];
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
export interface NormalRequest {
  fromDate: string;
  toDate: string;
  provider: string;
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

export interface NormalDataResponse {
  currentWeek: CurrentWeekData | undefined;
  currentMonth: CurrentMonth | undefined;
  commissions: Commission[];
}

export interface NormalResponse {
  success: boolean;
  message: string;
  data: NormalDataResponse | undefined;
}

export interface CommissionRequest {
  provider: string;
}

export interface ArrayCommissionResponse {
  commissions: Commission[];
}

export interface Commission {
  userId: string;
  totalTickets: string;
  totalSales: string;
  totalWon: string;
  net: string;
  commission: string;
  startDate: string;
  endDate: string;
  isPaid: boolean;
  userCommissionProfileId: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCommissionProfile {
  name: string;
  default: number;
  description: string;
  providerGroup: string;
  period: string;
  type: string;
  percentage: string;
  commissionType: number;
  turnovers: CreateCommissionTurnover[];
}

export interface UpdateCommissionProfile {
  id: number;
  name: string;
  default: number;
  description: string;
  providerGroup: string;
  period: string;
  type: string;
  percentage: string;
  commissionType: number;
  turnovers: UpdateCommissionTurnover[];
}

export interface CreateCommissionTurnover {
  event: string;
  CommissionProfileId: number;
  percentage: string;
  maxOdd: string;
  minOdd: string;
  oddSet: string;
}

export interface UpdateCommissionTurnover {
  id: number;
  event: string;
  CommissionProfileId: number;
  percentage: string;
  maxOdd: string;
  minOdd: string;
  oddSet: string;
}

export const RETAIL_PACKAGE_NAME = "retail";

export interface RetailServiceClient {
  /** Bonus Groups */

  getBonusGroups(request: Empty): Observable<BonusGroupResponse>;

  createBonusGroups(request: BonusGroups): Observable<BonusGroupResponse>;

  /** Profiles */

  getCommissionProfiles(request: Empty): Observable<CommissionProfilesResponse>;

  createCommissionProfile(request: CreateCommissionProfile): Observable<CommissionProfileResponse>;

  updateCommissionProfile(request: UpdateCommissionProfile): Observable<CommissionProfileResponse>;

  assignUserCommissionProfile(request: AssignUserCommissionProfile): Observable<CommissionProfileResponse>;

  getPowerBonus(request: PowerRequest): Observable<PowerBonusResponse>;

  payOutPowerBonus(request: PayPowerRequest): Observable<PowerResponse>;

  getNormalBonus(request: NormalRequest): Observable<NormalResponse>;

  payOutNormalBonus(request: NormalRequest): Observable<NormalResponse>;
}

export interface RetailServiceController {
  /** Bonus Groups */

  getBonusGroups(request: Empty): Promise<BonusGroupResponse> | Observable<BonusGroupResponse> | BonusGroupResponse;

  createBonusGroups(
    request: BonusGroups,
  ): Promise<BonusGroupResponse> | Observable<BonusGroupResponse> | BonusGroupResponse;

  /** Profiles */

  getCommissionProfiles(
    request: Empty,
  ): Promise<CommissionProfilesResponse> | Observable<CommissionProfilesResponse> | CommissionProfilesResponse;

  createCommissionProfile(
    request: CreateCommissionProfile,
  ): Promise<CommissionProfileResponse> | Observable<CommissionProfileResponse> | CommissionProfileResponse;

  updateCommissionProfile(
    request: UpdateCommissionProfile,
  ): Promise<CommissionProfileResponse> | Observable<CommissionProfileResponse> | CommissionProfileResponse;

  assignUserCommissionProfile(
    request: AssignUserCommissionProfile,
  ): Promise<CommissionProfileResponse> | Observable<CommissionProfileResponse> | CommissionProfileResponse;

  getPowerBonus(
    request: PowerRequest,
  ): Promise<PowerBonusResponse> | Observable<PowerBonusResponse> | PowerBonusResponse;

  payOutPowerBonus(request: PayPowerRequest): Promise<PowerResponse> | Observable<PowerResponse> | PowerResponse;

  getNormalBonus(request: NormalRequest): Promise<NormalResponse> | Observable<NormalResponse> | NormalResponse;

  payOutNormalBonus(request: NormalRequest): Promise<NormalResponse> | Observable<NormalResponse> | NormalResponse;
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
      "getPowerBonus",
      "payOutPowerBonus",
      "getNormalBonus",
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
