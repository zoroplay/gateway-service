import { ApiProperty } from '@nestjs/swagger';

export class SwaggerSyncGameDto {
  @ApiProperty({ description: 'Provider name, e.g., shack-evolution' })
  provider: string;
}

export class SwaggerMeta {
  @ApiProperty({
    description: 'Current Page',
  })
  currentPage: number;
  @ApiProperty({
    description: 'Items Per Page',
  })
  itemsPerPage: number;
}

export class SwaggerBonusGroup {
  @ApiProperty({
    description: 'group of the bonus',
  })
  group: string;

  @ApiProperty({
    description: 'maximum selection allowed',
  })
  maxSel: number;

  @ApiProperty({
    description: 'minimum selection allowed',
  })
  minSel: number;

  @ApiProperty({
    description: 'bonus rate',
  })
  rate: number;

  @ApiProperty({
    description: 'rate is less threshold',
  })
  rateIsLess: number;

  @ApiProperty({
    description: 'rate is more threshold',
  })
  rateIsMore: number;

  @ApiProperty({
    description: 'coupon target to reach payout',
  })
  targetCoupon: number;

  @ApiProperty({
    description: 'stake target to reach payout',
  })
  targetStake: number;
}
export class SwaggerBonusGroups {
  @ApiProperty({
    type: [SwaggerBonusGroup],
    description: 'Array of Bonus Group Objects',
  })
  bonusGroups: SwaggerBonusGroup[];
}

export class SwaggerBonusGroupResponse {
  @ApiProperty({
    description: 'Status of request',
  })
  success: boolean;

  @ApiProperty({
    description: 'message of error or success',
  })
  message: string;

  @ApiProperty({
    type: [SwaggerBonusGroup],
    description: 'Array of Bonus Group Objects',
  })
  data: SwaggerBonusGroup[];
}
export class SwaggerCreateCommissionTurnover {
  @ApiProperty({
    description: 'name of commission profile',
  })
  event: string;

  @ApiProperty({
    description: 'maximum selection allowed',
  })
  commissionProfileId: number;

  @ApiProperty({
    description: 'minimum selection allowed',
  })
  percentage: string;

  @ApiProperty({
    description: 'bonus rate',
  })
  maxOdd: string;

  @ApiProperty({
    description: 'rate is less threshold',
  })
  minOdd: string;

  @ApiProperty({
    description: 'rate is more threshold',
  })
  oddSet: string;
}

export class SwaggerCreateCommissionProfile {
  @ApiProperty({
    description: 'name of commission profile',
  })
  name: string;

  @ApiProperty({
    description: 'maximum selection allowed',
  })
  default: number;

  @ApiProperty({
    description: 'minimum selection allowed',
  })
  description: number;

  @ApiProperty({
    description: 'bonus rate',
  })
  providerGroup: number;

  @ApiProperty({
    description: 'rate is less threshold',
  })
  period: number;

  @ApiProperty({
    description: 'rate is more threshold',
  })
  type: number;

  @ApiProperty({
    description: 'coupon target to reach payout',
  })
  percentage: number;

  @ApiProperty({
    description: 'stake target to reach payout',
  })
  commissionType: number;
  @ApiProperty({
    type: [SwaggerCreateCommissionTurnover],
    description: 'Array of Turnover Objects',
  })
  turnovers: SwaggerCreateCommissionTurnover[];
}

export class SwaggerUpdateCommissionTurnover {
  @ApiProperty({
    description: 'name of commission profile',
  })
  id: string;

  @ApiProperty({
    description: 'name of commission profile',
  })
  event: string;

  @ApiProperty({
    description: 'maximum selection allowed',
  })
  commissionProfileId: number;

  @ApiProperty({
    description: 'minimum selection allowed',
  })
  percentage: string;

  @ApiProperty({
    description: 'bonus rate',
  })
  maxOdd: string;

  @ApiProperty({
    description: 'rate is less threshold',
  })
  minOdd: string;

  @ApiProperty({
    description: 'rate is more threshold',
  })
  oddSet: string;
}

export class SwaggerUpdateCommissionProfile {
  @ApiProperty({
    description: 'name of commission profile',
  })
  id: string;

  @ApiProperty({
    description: 'name of commission profile',
  })
  name: string;

  @ApiProperty({
    description: 'maximum selection allowed',
  })
  default: number;

  @ApiProperty({
    description: 'minimum selection allowed',
  })
  description: number;

  @ApiProperty({
    description: 'bonus rate',
  })
  providerGroup: number;

  @ApiProperty({
    description: 'rate is less threshold',
  })
  period: number;

  @ApiProperty({
    description: 'rate is more threshold',
  })
  type: number;

  @ApiProperty({
    description: 'coupon target to reach payout',
  })
  percentage: number;

  @ApiProperty({
    description: 'stake target to reach payout',
  })
  commissionType: number;
  @ApiProperty({
    type: [SwaggerUpdateCommissionTurnover],
    description: 'Array of Turnover Objects',
  })
  turnovers: SwaggerUpdateCommissionTurnover[];
}

export class SwaggerCommissionProfileResponse {
  @ApiProperty({
    description: 'Status of request',
  })
  success: boolean;

  @ApiProperty({
    description: 'message of error or success',
  })
  message: string;

  @ApiProperty({
    type: [SwaggerUpdateCommissionProfile],
    description: 'Array of Commission Profile Objects',
  })
  data: SwaggerUpdateCommissionProfile[];
}

export class SwaggerAssignUserCommissionProfile {
  @ApiProperty({
    description: 'commission profile id',
  })
  profileId: number;

  @ApiProperty({
    description: 'user id',
  })
  userId: number;
}

export class SwaggerPowerRequest {
  @ApiProperty({
    description: 'From Date',
  })
  fromDate: string;
  @ApiProperty({
    description: 'To Date',
  })
  toDate: string;
}

export class SwaggerPayPowerRequest {
  @ApiProperty({
    description: 'Ids of Agents you want to pay',
  })
  agentIds: number[];
  @ApiProperty({
    description: 'From Date',
  })
  fromDate: string;
  @ApiProperty({
    description: 'To Date',
  })
  toDate: string;
  @ApiProperty({
    description: 'Provider type : sports, casino etc.',
  })
  provider: string;
}

export class SwaggerPowerCountData {
  @ApiProperty({
    description: 'Ids of Agents you have paid',
  })
  paidUsers: string[];
  @ApiProperty({
    description: 'Ids of Agents you have not paid',
  })
  unPaidUsers: string[];
  @ApiProperty({
    description: 'Array of Errors that occurred',
  })
  errors: string[];
}

export class SwaggerPowerResponse {
  @ApiProperty({
    description: 'Success boolean response',
  })
  success: boolean;

  @ApiProperty({
    description: 'Message response',
  })
  message: string;

  @ApiProperty({
    description: 'Count data object',
  })
  data: SwaggerPowerCountData | undefined;
}

export class SwaggerNormalRequest {
  @ApiProperty({
    description: 'From Date',
  })
  fromDate: string;
  @ApiProperty({
    description: 'To Date',
  })
  toDate: string;
  @ApiProperty({
    description: 'Provider type',
    example: 'sports',
  })
  provider: string;
}

export class SwaggerCurrentWeekData {
  totalWeeks: number;
  currentWeek: number;
  noOfTickets: number;
  played: number;
  won: number;
  net: number;
  commission: number;
}

export class SwaggerCurrentMonth {
  month: string;
}

export class SwaggerCommission {
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

export class SwaggerNormalDataResponse {
  currentWeek: SwaggerCurrentWeekData | undefined;
  currentMonth: SwaggerCurrentMonth | undefined;
  commissions: SwaggerCommission[];
}

export class SwaggerNormalResponse {
  success: boolean;
  message: string;
  data: SwaggerNormalDataResponse | undefined;
}

export class SwaggerCommissionRequest {
  provider: string;
}

export class SwaggerArrayCommissionResponse {
  commissions: SwaggerCommission[];
}

export class SwaggerBetData {
  date: string;
  settledBet: number;
  selectionCount: number;
  totalStake: number;
  totalCommission: number;
  totalWinnings: number;
  weightedStake: number;
}

export class SwaggerPowerBonusData {
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
  bets: SwaggerBetData[];
}

export class SwaggerPowerBonusResponse {
  success: boolean;
  message: string;
  data: SwaggerPowerBonusData | undefined;
}
