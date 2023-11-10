import { ApiProperty } from '@nestjs/swagger';

export class SwaggerFilterBySportID {
  @ApiProperty({ description: 'ID of the Sport' })
  sportID: number;
}

export class SwaggerCreateBonusRequest {
  @ApiProperty({ description: 'ID of the client' })
  clientId: number;

  @ApiProperty({ description: 'Bonus amount to award' })
  bonusAmount: number;

  @ApiProperty({ description: 'Bonus value' })
  maxValue: number;

  @ApiProperty({ description: 'Name of Bonus' })
  bonusName: string;

  @ApiProperty({ description: 'Bonus Code' })
  bonusCode: string;

  @ApiProperty({ description: 'Target' })
  target: string;

  @ApiProperty({ description: 'The expectedcategory of bonus, (first_deposit, referral, freebet)' })
  bonusCategory: string;

  @ApiProperty({ description: 'The expected bonus type, (All, sport, casino, virtual)' })
  bonusType: string;

  @ApiProperty({ description: 'The sport percentage' })
  sportPercentage: number;

  @ApiProperty({ description: 'The casino percentage' })
  casinoPercentage: number;

  @ApiProperty({ description: 'The virtual percentage' })
  virtualPercentage: number;

  @ApiProperty({ description: 'Number of sports rollover' })
  noOfSportRollover: number;

  @ApiProperty({ description: 'Number of casino rollover' })
  noOfCasinoRollover: number;

  @ApiProperty({ description: 'Number of virtual rollover' })
  noOfVirtualRollover: number;

  @ApiProperty({ description: 'The duration' })
  duration: number;
}

export class SwaggerCreateCashbackBonusRequest {
  @ApiProperty({ description: 'ID of the client' })
  clientId: number;

  @ApiProperty({ description: 'This bonus will expire after this number of hours' })
  expiryInHours: number;

  @ApiProperty({ description: 'This bonus can only be used when a punter has atleast this number of selection in their betslip' })
  minimumEvents: number;

  @ApiProperty({ description: 'This bonus can only be used when each selection in a betslip has atleast this number of odds' })
  minimumOddsPerEvent: number;

  @ApiProperty({ description: 'This bonus can only be used when total odds in a betslip has atleast this number of odds' })
  minimumTotalOdds: number;

  @ApiProperty({ description: 'This bonus can be used for the following bet types, this should be a list separated by comma, available values are 1 (sportsbook), 2 (casino)' })
  applicableBetType: string;

  @ApiProperty({ description: 'The maximum win when this bonus is used' })
  maximumWinning: number;

  @ApiProperty({ description: 'Minimum lost games for a punter to qualify for this cashback' })
  minimumLostGames: number;

  @ApiProperty({ description: 'Minimum number of games for a punter to qualify for this bonus' })
  minimumSelection: number;

  @ApiProperty({ description: 'Minimum stake to qualify for this bonus' })
  minimumEntryAmount: number;

  @ApiProperty({ description: 'Bonus amount to award' })
  bonusAmount: number;
}

export class SwaggerCreateFirstDepositBonusRequest {
  @ApiProperty({ description: 'ID of the client' })
  clientId: number;

  @ApiProperty({ description: 'This bonus will expire after this number of hours' })
  expiryInHours: number;

  @ApiProperty({ description: 'This bonus can only be used when a punter has atleast this number of selection in their betslip' })
  minimumEvents: number;

  @ApiProperty({ description: 'This bonus can only be used when each selection in a betslip has atleast this number of odds' })
  minimumOddsPerEvent: number;

  @ApiProperty({ description: 'This bonus can only be used when total odds in a betslip has atleast this number of odds' })
  minimumTotalOdds: number;

  @ApiProperty({ description: 'This bonus can be used for the following bet types, this should be a list separated by comma, available values are 1 (sportsbook), 2 (casino)' })
  applicableBetType: string;

  @ApiProperty({ description: 'The maximum win when this bonus is used' })
  maximumWinning: number;

  @ApiProperty({ description: 'Reset duration to award a new bonus' })
  resetIntervalType: string;

  @ApiProperty({ description: 'Minimum deposit to qualify for this bonus' })
  minimumEntryAmount: number;

  @ApiProperty({ description: 'Bonus amount to award' })
  bonusAmount: number;
}

export class SwaggerCreateFreebetBonusRequest {
  @ApiProperty({ description: 'ID of the client' })
  clientId: number;

  @ApiProperty({ description: 'This bonus will expire after this number of hours' })
  expiryInHours: number;

  @ApiProperty({ description: 'This bonus can only be used when a punter has atleast this number of selection in their betslip' })
  minimumEvents: number;

  @ApiProperty({ description: 'This bonus can only be used when each selection in a betslip has atleast this number of odds' })
  minimumOddsPerEvent: number;

  @ApiProperty({ description: 'This bonus can only be used when total odds in a betslip has atleast this number of odds' })
  minimumTotalOdds: number;

  @ApiProperty({ description: 'This bonus can be used for the following bet types, this should be a list separated by comma, available values are 1 (sportsbook), 2 (casino)' })
  applicableBetType: string;

  @ApiProperty({ description: 'The maximum win when this bonus is used' })
  maximumWinning: number;

  @ApiProperty({ description: 'Bonus amount to award' })
  bonusAmount: number;
}

export class SwaggerCreateReferralBonusRequest {
  @ApiProperty({ description: 'ID of the client' })
  clientId: number;

  @ApiProperty({ description: 'This bonus will expire after this number of hours' })
  expiryInHours: number;

  @ApiProperty({ description: 'This bonus can only be used when a punter has atleast this number of selection in their betslip' })
  minimumEvents: number;

  @ApiProperty({ description: 'This bonus can only be used when each selection in a betslip has atleast this number of odds' })
  minimumOddsPerEvent: number;

  @ApiProperty({ description: 'This bonus can only be used when total odds in a betslip has atleast this number of odds' })
  minimumTotalOdds: number;

  @ApiProperty({ description: 'This bonus can be used for the following bet types, this should be a list separated by comma, available values are 1 (sportsbook), 2 (casino)' })
  applicableBetType: string;

  @ApiProperty({ description: 'The maximum win when this bonus is used' })
  maximumWinning: number;

  @ApiProperty({ description: 'Minimum stake (the referred punter should use ) to qualify for this bonus' })
  minimumEntryAmount: number;

  @ApiProperty({ description: 'Bonus amount to award' })
  bonusAmount: number;
}

export class SwaggerCreateShareBetBonusRequest {
  @ApiProperty({ description: 'ID of the client' })
  clientId: number;

  @ApiProperty({ description: 'This bonus will expire after this number of hours' })
  expiryInHours: number;

  @ApiProperty({ description: 'This bonus can only be used when a punter has atleast this number of selection in their betslip' })
  minimumEvents: number;

  @ApiProperty({ description: 'This bonus can only be used when each selection in a betslip has atleast this number of odds' })
  minimumOddsPerEvent: number;

  @ApiProperty({ description: 'This bonus can only be used when total odds in a betslip has atleast this number of odds' })
  minimumTotalOdds: number;

  @ApiProperty({ description: 'This bonus can be used for the following bet types, this should be a list separated by comma, available values are 1 (sportsbook), 2 (casino)' })
  applicableBetType: string;

  @ApiProperty({ description: 'The maximum win when this bonus is used' })
  maximumWinning: number;

  @ApiProperty({ description: 'Minimum stake (the referred punter should use ) to qualify for this bonus' })
  minimumEntryAmount: number;

  @ApiProperty({ description: 'Bonus amount to award' })
  bonusAmount: number;
}

export enum bonusTypes {
  firstDepositBonus = 'first_deposit',
  freebetBonus = 'free_bet',
  referralBonus = 'referral',
  shareBetBonus = 'share_bet',
  cashbackBonus = 'cashback',
}

export class SwaggerGetBonusRequest {
  @ApiProperty({ description: 'ID of the client' })
  clientId: number;

  @ApiProperty({ description: 'Bonus type', enum: bonusTypes })
  bonusType: string;
}

export class SwaggerBonus {

  @ApiProperty({ description: 'ID of the client' })
  clientId: number;

  @ApiProperty({ description: 'This bonus will expire after this number of hours' })
  expiryInHours: number;

  @ApiProperty({ description: 'This bonus can only be used when a punter has atleast this number of selection in their betslip' })
  minimumEvents: number;

  @ApiProperty({ description: 'This bonus can only be used when each selection in a betslip has atleast this number of odds' })
  minimumOddsPerEvent: number;

  @ApiProperty({ description: 'This bonus can only be used when total odds in a betslip has atleast this number of odds' })
  minimumTotalOdds: number;

  @ApiProperty({ description: 'This bonus can be used for the following bet types, this should be a list separated by comma, available values are 1 (sportsbook), 2 (casino)' })
  applicableBetType: string;

  @ApiProperty({ description: 'The maximum win when this bonus is used' })
  maximumWinning: number;

  @ApiProperty({ description: 'Minimum lost games for a punter to qualify for this cashback' })
  minimumLostGames: number;

  @ApiProperty({ description: 'Minimum number of games for a punter to qualify for this bonus' })
  minimumSelection: number;

  @ApiProperty({ description: 'Reset duration to award a new bonus' })
  resetIntervalType: string;

  @ApiProperty({ description: 'Minimum stake/deposit to qualify for this bonus' })
  minimumEntryAmount: number;

  @ApiProperty({ description: 'Bonus amount to award' })
  bonusAmount: number;

  @ApiProperty({ description: 'Bonus type', enum: bonusTypes })
  bonusType: string;

  @ApiProperty({ description: 'Bonus status - active(1) or deactivated(0)' })
  status: number;

  @ApiProperty({ description: 'Created' })
  created: string;

  @ApiProperty({ description: 'Updated' })
  updated: string;
}

export class SwaggerBonusResponse {
  @ApiProperty({
    type: [SwaggerBonus],
    description: 'Array of bonus',
  })
  bonus: SwaggerBonus[];
}

export class SwaggerGetUserBonusRequest {
  @ApiProperty({ description: 'ID of the client' })
  clientId: number;

  @ApiProperty({ description: 'ID of the user' })
  userId: number;
}

export class SwaggerAwardBonusRequest {
  @ApiProperty({ description: 'ID of the client', required: true })
  clientId: number;

  @ApiProperty({ description: 'ID of the user, join multiple userIDs separated by comma e.g 1,2,3,4,5', required: true })
  userId: string;

  @ApiProperty({ description: 'Bonus type', enum: bonusTypes, required: false })
  bonusType: string;

  @ApiProperty({ description: 'amount of bonus to award', required: false })
  amount: number;

  @ApiProperty({ description: 'If supplied the user will be awarded a bonus equivalent to this value multiplied by the set multiplier', required: false })
  baseValue: number;

  @ApiProperty({ description: 'ID of the bonus to award', required: false })
  bonusId: number;
}

export class SwaggerBetslip {
  @ApiProperty({ description: 'ID of the match' })
  matchId: number;

  @ApiProperty({ description: 'ID of the market' })
  marketId: number;

  @ApiProperty({ description: 'market specifier' })
  specifier: string;

  @ApiProperty({ description: 'market outcome' })
  outcomeId: number;
  odds: number;
}

export class SwaggerUserBetWithBonus {
  @ApiProperty({
    type: [SwaggerBetslip],
    description: 'Array of selections',
  })
  betslip: SwaggerBetslip[];

  @ApiProperty({ description: 'ID of the client' })
  clientId: number;

  @ApiProperty({ description: 'ID of the user' })
  userId: number;

  @ApiProperty({ description: 'ID of the bonus to use to place a bet' })
  bonusId: number;

  @ApiProperty({ description: 'Stake' })
  stake: number;

  @ApiProperty({ description: 'Total odds' })
  totalOdds: number;
}

export class SwaggerUserBetDTO {
  @ApiProperty({ description: 'Bet ID'})
  betId : number;

  @ApiProperty({ description: 'Stake' })
  stake : number;

  @ApiProperty({ description: 'This bet was which rollover count' })
  rolloverCount : number;

  @ApiProperty({ description: 'Bet status' })
  status : number;

  @ApiProperty({ description: 'Total rolled amount when this bet was placed' })
  rolledAmount : number;

  @ApiProperty({ description: 'Total amount pending rollover after this bet was placed' })
  pendingAmount : number;

  @ApiProperty({ description: 'Created date' })
  created : string;
}

export class SwaggerUserBonus {
  @ApiProperty({ description: 'Bonus type', enum: bonusTypes })
  bonusType: string;

  @ApiProperty({ description: 'bonus amount' })
  amount: number;

  @ApiProperty({ description: 'created' })
  created: string;

  @ApiProperty({ description: 'unix timestamp in seconds this bonus expires' })
  expiryDateInTimestamp: number


  @ApiProperty({ description: 'Name of bonus' })
  name : string;

  @ApiProperty({ description: 'Amount already rolled' })
  rolledAmount : number;

  @ApiProperty({ description: 'Amount pending to be rolled' })
  pendingAmount : number;

  @ApiProperty({ description: 'Total number of roles to be made' })
  totalRolloverCount : number;

  @ApiProperty({ description: 'Total number of roles made' })
  completedRolloverCount : number;

  @ApiProperty({
    type: [SwaggerUserBetDTO],
    description: 'Array of Bets placed with bonus',
  })
  bets: SwaggerUserBetDTO[]
}

export class SwaggerHasBonusBetResponse {
  @ApiProperty({ description: 'user bonus' })
  bonus: SwaggerUserBonus;

  @ApiProperty({ description: ' status code 201 (success) otherwise failed' })
  status: number;

  @ApiProperty({ description: 'Failure reason' })
  description: string;
}

export class SwaggerBonusStatusRequest {
  @ApiProperty({ description: 'ID of the client' })
  clientId: number;

  @ApiProperty({ description: 'Bonus to use, optional', enum: bonusTypes })
  bonusType: string;

  @ApiProperty({ description: 'activate (1), deactivate(0)' })
  status: number;
}

export class SwaggerCreateBonusResponse {

  @ApiProperty({ description: 'ID of the bonus' })
  bonusId: number;

  @ApiProperty({ description: ' status code 201 (success) otherwise failed' })
  status: number;

  @ApiProperty({ description: 'Failure reason' })
  description: string;
}

export class SwaggerCreateCampaignBonus {
  @ApiProperty({ description: 'ID of the client' })
  clientId: number;

  @ApiProperty({ description: 'Name of the campaign bonus' })
  name: string;

  @ApiProperty({ description: 'Bonus code' })
  bonusCode: string;

  @ApiProperty({ description: 'ID of the bonus to use in the campaign' })
  bonusId: number;

  @ApiProperty({ description: 'Date When the code expires, date form should be yyyy-mm-dd e.g 2023-09-08  ' })
  expiryDate: string;
}

export class SwaggerUpdateCampaignBonus {
  @ApiProperty({ description: 'ID of the campaign to update' })
  id: number;

  @ApiProperty({ description: 'ID of the client' })
  clientId: number;

  @ApiProperty({ description: 'Name of the campaign bonus' })
  name: string;

  @ApiProperty({ description: 'Bonus code' })
  bonusCode: string;

  @ApiProperty({ description: 'ID of the bonus to use in the campaign' })
  bonusId: number;

  @ApiProperty({ description: 'Date When the code expires, date form should be yyyy-mm-dd e.g 2023-09-08  ' })
  expiryDate: string;
}

export class SwaggerRedeemCampaignBonusDto {
  @ApiProperty({ description: 'ID of the client' })
  clientId: number;

  @ApiProperty({ description: 'Bonus code' })
  bonusCode: string;

  @ApiProperty({ description: 'ID of the user' })
  userId: number;
}

export class SwaggerDeleteCampaignBonusDto {
  @ApiProperty({ description: 'ID of the client' })
  clientId: number;

  @ApiProperty({ description: 'ID of the campaign to delete' })
  id: number;
}

export class SwaggerCampaignBonusData {
  @ApiProperty({ description: 'ID of the client' })
  clientId: number;

  @ApiProperty({ description: 'ID of the campaign ' })
  id: number;

  @ApiProperty({ description: 'Name of the campaign bonus' })
  name: string;

  @ApiProperty({ description: 'Bonus code' })
  bonusCode: string;

  @ApiProperty({
    type: SwaggerCreateBonusRequest,
    description: 'Bonus attached to the campaign',
  })
  bonus: SwaggerCreateBonusRequest;

  @ApiProperty({ description: 'Date When the code expires, date form should be yyyy-mm-dd e.g 2023-09-08  ' })
  expiryDate: string;
}

export class SwaggerAllCampaignBonus {
  @ApiProperty({
    type: [SwaggerCampaignBonusData],
    description: 'Array of campaigns',
  })
  bonus: SwaggerCampaignBonusData[];
}

export class SwaggerGetBonusByClientID {
  @ApiProperty({ description: 'ID of the client' })
  clientId: number;
}

export class SwaggerGetUserBonusResponse {

  @ApiProperty({
    type: [SwaggerUserBonus],
    description: 'Array of bonus',
  })
  bonus: SwaggerUserBonus[];
}
