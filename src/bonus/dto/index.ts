import { ApiProperty } from '@nestjs/swagger';

export class SwaggerFilterBySportID {
  @ApiProperty({ description: 'ID of the Sport' })
  sportID: number;
}

export class SwaggerCreateBonusRequest {
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

export class SwaggerUserBonus {
  @ApiProperty({ description: 'Bonus type', enum: bonusTypes })
  bonusType: string;

  @ApiProperty({ description: 'bonus amount' })
  amount: number;

  @ApiProperty({ description: 'created' })
  created: string;

  @ApiProperty({ description: 'unix timestamp in seconds this bonus expires' })
  expiryDateInTimestamp: number
}

export class SwaggerGetUserBonusResponse {

  @ApiProperty({
    type: [SwaggerUserBonus],
    description: 'Array of bonus',
  })
  bonus: SwaggerUserBonus[];
}

export class SwaggerAwardBonusRequest {
  @ApiProperty({ description: 'ID of the client' })
  clientId: number;

  @ApiProperty({ description: 'ID of the user' })
  userId: number;

  @ApiProperty({ description: 'Bonus type', enum: bonusTypes })
  bonusType: string;

  @ApiProperty({ description: 'amount of bonus to award' })
  amount: number;
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

export class SwaggerUserBet {
  @ApiProperty({
    type: [SwaggerBetslip],
    description: 'Array of selections',
  })
  betslip: SwaggerBetslip[];

  @ApiProperty({ description: 'ID of the client' })
  clientId: number;

  @ApiProperty({ description: 'ID of the user' })
  userId: number;

  @ApiProperty({ description: 'Stake' })
  stake: number;

  @ApiProperty({ description: 'Bonus to use, optional', enum: bonusTypes })
  bonusType: string;

  @ApiProperty({ description: 'Total odds' })
  totalOdds: number;
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