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
    example: [
      {
        minSel: 1.01,
        maxSel: 10,
        rateIsLess: 5,
        rateIsMore: 5,
        rate: 80,
        targetCoupon: 100,
        targetStake: 15000,
        group: 'A',
      },
      {
        minSel: 10.01,
        maxSel: 30,
        rateIsLess: 15,
        rateIsMore: 5,
        rate: 80,
        targetCoupon: 100,
        targetStake: 15000,
        group: 'B',
      },
      {
        minSel: 30.01,
        maxSel: 90,
        rateIsLess: 20,
        rateIsMore: 10,
        rate: 80,
        targetCoupon: 100,
        targetStake: 15000,
        group: 'C',
      },
      {
        minSel: 90.01,
        maxSel: 100000,
        rateIsLess: 30,
        rateIsMore: 15,
        rate: 80,
        targetCoupon: 100,
        targetStake: 15000,
        group: 'D',
      },
    ],
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
    description: 'number of events/ selection',
    example: 1,
  })
  event: number;
  @ApiProperty({
    description: 'selection',
    example: 1,
  })
  percentage: number;

  @ApiProperty({
    description: 'maximum odd',
    example: 5.5,
  })
  maxOdd: number;

  @ApiProperty({
    description: 'minimum odd',
    example: 1.83,
  })
  minOdd: number;

  @ApiProperty({
    description: 'Is Odd Set',
    example: true,
  })
  oddSet: boolean;
}

export class SwaggerCreateCommissionProfile {
  @ApiProperty({
    description: 'name of commission profile',
    example: 'Testing turnovers 29',
  })
  name: string;

  @ApiProperty({
    description: 'set default state',
    example: false,
  })
  default: boolean;
  @ApiProperty({
    description: 'profile description',
    example: 'Testing',
  })
  description: string;
  @ApiProperty({
    description: 'Provider Group',
    example: 'sports',
  })
  providerGroup: string;

  @ApiProperty({
    description: 'profile period',
    example: 'monthly',
  })
  period: string;
  @ApiProperty({
    description: 'profile type',
    example: 'multiple',
  })
  type: string;

  @ApiProperty({
    description: 'profile percentage',
    example: 70,
  })
  percentage: number;

  @ApiProperty({
    description: 'profile commission type',
    example: 1,
  })
  commissionType: number;
  @ApiProperty({
    type: [SwaggerCreateCommissionTurnover],
    description: 'Array of Turnover Objects',
    example: [
      {
        event: 1,
        percentage: 20,
        maxOdd: 5.5,
        minOdd: 1.03,
        oddSet: true,
      },
      {
        event: 2,
        percentage: 20,
        maxOdd: 5.5,
        minOdd: 1.03,
        oddSet: true,
      },
      {
        event: 3,
        percentage: 20,
        maxOdd: 5.5,
        minOdd: 1.03,
        oddSet: true,
      },
    ],
  })
  turnovers: SwaggerCreateCommissionTurnover[];
}

export class SwaggerUpdateCommissionTurnover {
  @ApiProperty({
    description: 'id of commission Turnover',
    example: 1,
  })
  id: number;
  @ApiProperty({
    description: 'number of events/ selection',
    example: 1,
  })
  event: number;
  @ApiProperty({
    description: 'selection',
    example: 85,
  })
  percentage: number;

  @ApiProperty({
    description: 'maximum odd',
    example: 5.5,
  })
  maxOdd: number;

  @ApiProperty({
    description: 'minimum odd',
    example: 1.83,
  })
  minOdd: number;

  @ApiProperty({
    description: 'Is Odd Set',
    example: true,
  })
  oddSet: boolean;
}

export class SwaggerUpdateCommissionProfile {
  @ApiProperty({
    description: 'id of commission profile',
    example: 1,
  })
  id: string;
  @ApiProperty({
    description: 'name of commission profile',
    example: 'Testing turnovers 29',
  })
  name: string;

  @ApiProperty({
    description: 'set default state',
    example: true,
  })
  default: boolean;
  @ApiProperty({
    description: 'profile description',
    example: 'Testing',
  })
  description: string;
  @ApiProperty({
    description: 'Provider Group',
    example: 'sports',
  })
  providerGroup: string;

  @ApiProperty({
    description: 'profile period',
    example: 'monthly',
  })
  period: string;
  @ApiProperty({
    description: 'profile type',
    example: 'multiple',
  })
  type: string;

  @ApiProperty({
    description: 'profile percentage',
    example: 85,
  })
  percentage: number;

  @ApiProperty({
    description: 'profile commission type',
    example: 1,
  })
  commissionType: number;
  @ApiProperty({
    type: [SwaggerUpdateCommissionTurnover],
    description: 'Array of Turnover Objects',
    example: [
      {
        id: 1,
        event: 1,
        percentage: 20,
        maxOdd: 5.5,
        minOdd: 1.03,
        oddSet: true,
      },
      {
        id: 2,
        event: 2,
        percentage: 20,
        max_odd: 5.5,
        min_odd: 1.03,
        oddSet: true,
      },
      {
        id: 3,
        event: 3,
        percentage: 20,
        maxOdd: 5.5,
        minOdd: 1.03,
        oddSet: true,
      },
    ],
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
    example: 1,
  })
  profileId: number;

  @ApiProperty({
    description: 'user id',
    example: 1,
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
    example: 'sports',
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
    example: '01-01-2024',
  })
  fromDate: Date;
  @ApiProperty({
    description: 'To Date',
    example: '03-03-2024',
  })
  toDate: Date;
  @ApiProperty({
    description: 'Provider type',
    example: 'sports',
  })
  provider: string;
}

export class SwaggerPayNormalRequest {
  @ApiProperty({
    description: 'Bet Id',
    example: 1,
  })
  betId: number;
  @ApiProperty({
    description: 'Selections Count',
    example: 5,
  })
  selectionsCount: number;
  @ApiProperty({
    description: 'Total  Odds',
    example: 10.01,
  })
  totalOdds: number;
  @ApiProperty({
    description: 'Bet Id',
    example: 100,
  })
  stake: number;
  @ApiProperty({
    description: 'Client Id',
    example: 1,
  })
  clientId: number;
  @ApiProperty({
    description: 'Cashier or User Id',
    example: 1,
  })
  cashierId: number;
  @ApiProperty({
    description: 'Profile Group',
    example: 'sports',
  })
  profileGroup: string;
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
