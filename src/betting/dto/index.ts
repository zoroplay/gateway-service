import { ApiProperty } from '@nestjs/swagger';

export class SwaggerSyncGameDto {
  @ApiProperty({ description: 'Provider name, e.g., shack-evolution' })
  provider: string;
}

export class SwaggerOKProviderResponse {
  @ApiProperty({
    description: 'provider identifier',
  })
  id: number;
  @ApiProperty({
    description: 'provider slug e.g evo-play',
  })
  slug: string;
  @ApiProperty({
    description: 'provider name e.g Evo Play',
  })
  name: string;
  @ApiProperty({
    description:
      'provider description e.g Evo Play is a xyz provider founded in 0000 bc',
  })
  description: string;
  @ApiProperty({
    description: 'image url for provider',
  })
  imagePath: string;
  @ApiProperty({
    description:
      'parent provider name or identifier if available else same as name field',
  })
  parentProvider: string;
  @ApiProperty({
    description: 'date provider object was created',
  })
  createdAt: Date;
  @ApiProperty({
    description: 'date provider object was updated',
  })
  updatedAt: Date;
}

export class SwaggerOKGameResponse {
  @ApiProperty({
    description: 'id',
  })
  id: number;
  @ApiProperty({
    description: 'game id e.g penaldo',
  })
  gameId: string;
  @ApiProperty({
    description: 'game title e.g penaldo',
  })
  title: string;
  @ApiProperty({
    description: 'game description e.g casino game by shacks evolution',
  })
  description: string;
  @ApiProperty({
    description: 'game url',
  })
  url: string;
  @ApiProperty({
    description: 'gamee image url',
  })
  imagePath: string;
  @ApiProperty({
    description: 'game banner url',
  })
  bannerPath: string;
  @ApiProperty({
    description: 'game status',
  })
  status: boolean;
  @ApiProperty({
    description: 'game type e.g casino, slot',
  })
  type: string;
  @ApiProperty({
    description: 'game provider object',
  })
  provider: SwaggerOKProviderResponse;
  @ApiProperty({
    description: 'date game was created',
  })
  createdAt: Date;
  @ApiProperty({
    description: 'date game was updated',
  })
  updatedAt: Date;
}

export class SwaggerOKGameArrayResponse {
  @ApiProperty({
    type: [SwaggerOKGameResponse],
    description: 'Array of Game Objects',
  })
  games: SwaggerOKGameResponse[];
}

export class SwaggerSettings {

  @ApiProperty({
    description: 'ID of the client',
  })
  clientID: number;

  @ApiProperty({
    description: 'Percentage of tax to deduct from stake',
  })
  taxOnStake: number;

  @ApiProperty({
    description: 'Percentage of tax to deduct from gross winning',
  })
  taxOnWinning: number;

  @ApiProperty({
    description: 'Minimum allowed stake',
  })
  minimumStake: number;

  @ApiProperty({
    description: 'Maximum allowed stake',
  })
  maximumStake: number;

  @ApiProperty({
    description: 'Maximum allowed winning',
  })
  maximumWinning: number;

  @ApiProperty({
    description: 'How many selection can a punter select in one bet',
  })
  maximumSelections: number;

  @ApiProperty({
    description: 'MTS Limit ID',
  })
  mtsLimitID: number;

  @ApiProperty({
    description: 'Clients Currency, 3 letter ISO currency code ',
  })
  currency: string;

}

export class SwaggerSettingsResponse {

  @ApiProperty({
    description: 'ID of the client',
  })
  clientID: number;

  @ApiProperty({
    description: 'Percentage of tax to deduct from stake',
  })
  taxOnStake: number;

  @ApiProperty({
    description: 'Percentage of tax to deduct from gross winning',
  })
  taxOnWinning: number;

  @ApiProperty({
    description: 'Minimum allowed stake',
  })
  minimumStake: number;

  @ApiProperty({
    description: 'Maximum allowed stake',
  })
  maximumStake: number;

  @ApiProperty({
    description: 'Maximum allowed winning',
  })
  maximumWinning: number;

  @ApiProperty({
    description: 'How many selection can a punter select in one bet',
  })
  maximumSelections: number;

  @ApiProperty({
    description: 'MTS Limit ID',
  })
  mtsLimitID: number;

  @ApiProperty({
    description: 'Clients Currency, 3 letter ISO currency code ',
  })
  currency: string;

  @ApiProperty({
    description: 'When the client was created',
  })
  created: string;

  @ApiProperty({
    description: 'When the client was updated',
  })
  updated: string;
}

export class SwaggerAllSettings {

  @ApiProperty({
    type: [SwaggerSettingsResponse],
    description: 'Array of Settings Objects',
  })
  settings: SwaggerSettingsResponse[];

}

export class SwaggerBetSlip {
  @ApiProperty({
    description: 'Fixture name',
  })
  eventName: string;

  @ApiProperty({
    description: 'Type of event default value is match, oter applicable values are season, stage, group',
  })
  eventType: string;

  @ApiProperty({
    description: 'Type of event prefix default value is sr, oter applicable values are sr',
  })
  eventPrefix: string;

  @ApiProperty({
    description: 'Event ID',
  })
  eventId: number;

  @ApiProperty({
    description: 'ID of the producer that send the odds',
  })
  producerId: number;

  @ApiProperty({
    description: 'Betradar market ID',
  })
  marketId: number;

  @ApiProperty({
    description: 'Market name',
  })
  marketName: string;

  @ApiProperty({
    description: 'Market specifier',
  })
  specifier: string;

  @ApiProperty({
    description: 'Outcome ID',
  })
  outcomeId: string;

  @ApiProperty({
    description: 'Outcome name',
  })
  outcomeName: string;

  @ApiProperty({
    description: 'Event odds',
  })
  odds: number;

  @ApiProperty({
    description: 'ID of the sport',
  })
  sportId: number;
}

export class SwaggerPlaceBet {

  @ApiProperty({
    type: [SwaggerBetSlip],
    description: 'Array of Settings Bet slips',
  })
  selections: SwaggerBetSlip[];

  @ApiProperty({
    description: 'Unique ID of the client',
  })
  clientId: number;

  @ApiProperty({
    description: 'User ID',
  })
  userId: number;

  @ApiProperty({
    description: 'Username',
  })
  username: string;

  @ApiProperty({
    description: 'Stake',
  })
  stake: number;

  @ApiProperty({
    description: 'Where is this bet coming from? Web - 1, SMS - 2, Mobile App - 3',
  })
  source: string;

  @ApiProperty({
    description: 'IP address of the user e.g 123.456.789.101',
  })
  ipAddress: string;
}

export class SwaggerPlaceBetResponse {

  @ApiProperty({
    description: 'Generate Bet Slip',
  })
  data: any;

  @ApiProperty({
    description: 'Corresponding http status of the action, 201 for success else failure',
  })
  status: number;

  @ApiProperty({
    description: 'Action status description, if failure, this field will contain failure reason',
  })
  message: string;

  @ApiProperty({
    description: 'Request success status, true or false if request was succesfull',
  })
  success: string;
}

export class SwaggerBetHistory {
  @ApiProperty({
    type: [SwaggerBetSlip],
    description: 'Array of Settings Bet slips',
  })
  betslip: SwaggerBetSlip[];

  @ApiProperty({
    description: 'Stake',
  })
  stake: number;

  @ApiProperty({
    description: 'Where is this bet coming from? Web - 1, SMS - 2, Mobile App - 3',
  })
  source: string;

  @ApiProperty({
    description: 'WHen the bet was placed',
  })
  date: string;

  @ApiProperty({
    description: 'Bet status.-1 - Cancelled, 0 - pending, 1 - Partially settled, 2 - Settled, 3 - Won, 4 - Lost, 4 - Rolled back',
  })
  status: number;

  @ApiProperty({
    description: 'Textual description of the status field',
  })
  statusDescription: string;
}

export class SwaggerBetHistoryResponse {

  @ApiProperty({
    type: [SwaggerBetHistory],
    description: 'Array of bets',
  })
  data: SwaggerBetHistory[];
}

export class SwaggerBetHistoryRequest {
  @ApiProperty({
    description: 'User ID',
  })
  userId: number;

  @ApiProperty({
    description: 'Filter by Bet status.-1 - Cancelled, 0 - pending, 1 - Partially settled, 2 - Settled, 3 - Won, 4 - Lost, 4 - Rolled back',
  })
  status: number;

  @ApiProperty({
    description: 'Start date to filter from',
  })
  from: string;

  @ApiProperty({
    description: 'End date to filter to',
  })
  to: string;

  @ApiProperty({
    description: 'Client ID',
  })
  clientId: number;

  @ApiProperty({
    description: 'Current page number',
  })
  page: number;

  @ApiProperty({
    description: 'Number of records per page',
  })
  perPage: number;

}

export class SwaggerGamingActivityRequest {
  @ApiProperty({
    description: 'Username',
  })
  username: string;

  @ApiProperty({
    description: 'Item to group result by',
  })
  groupBy: string;

  @ApiProperty({
    description: 'Start date to filter from',
  })
  from: string;

  @ApiProperty({
    description: 'End date to filter to',
  })
  to: string;

  @ApiProperty({
    description: 'Client ID',
  })
  clientId: number;

  @ApiProperty({
    description: 'Current page number',
  })
  page: number;

  @ApiProperty({
    description: 'Number of records per page',
  })
  perPage: number;

  @ApiProperty({
    description: 'Filter by event type Live, Prematch or both',
  })
  eventType: string;

  @ApiProperty({
    description: 'Filter by product type. Sports, Virtual, Casino',
  })
  productType: string;

  @ApiProperty({
    description: 'Filter by bet type',
  })
  betType: string;

  @ApiProperty({
    description: 'Source by which bet was placed',
  })
  source: string;

  @ApiProperty({
    description: 'Filter by sport',
  })
  sport: string;

  @ApiProperty({
    description: 'filter by league',
  })
  league: string;
}

export class SwaggerProbabilityBetSlipSelection {

  @ApiProperty({
    description: 'Type of event default value is match, oter applicable values are season, stage, group',
  })
  eventType: string;

  @ApiProperty({
    description: 'Type of event prefix default value is sr, oter applicable values are sr',
  })
  eventPrefix: string;

  @ApiProperty({
    description: 'Event ID',
  })
  eventId: number;

  @ApiProperty({
    description: 'Betradar market ID',
  })
  marketId: number;

  @ApiProperty({
    description: 'Market name',
  })
  marketName: string;

  @ApiProperty({
    description: 'Market specifier',
  })
  specifier: string;

  @ApiProperty({
    description: 'Outcome ID',
  })
  outcomeId: string;

  @ApiProperty({
    description: 'Outcome name',
  })
  outcomeName: string;

  @ApiProperty({
    description: 'Event odds',
  })
  odds: number;

  @ApiProperty({
    description: 'ID of the sport',
  })
  sportId: number;

  @ApiProperty({
    description: 'Current Probability of the supplied selections or betID',
  })
  currentProbability: number;

  @ApiProperty({
    description: 'Initial Probability of the supplied selections or betID',
  })
  initialProbability: number;
}

export class SwaggerProbability {
  @ApiProperty({
    description: 'Current Probability of the supplied selections or betID',
  })
  currentProbability: number;

  @ApiProperty({
    description: 'Initial Probability of the supplied selections or betID',
  })
  initialProbability: number;

  @ApiProperty({
    type: [SwaggerProbabilityBetSlipSelection],
    description: 'Array of probability of each selections',
  })
  selections: SwaggerProbabilityBetSlipSelection[];
}

export class SwaggerUpdateBetRequest {
  @ApiProperty({
    description: 'Entity ID bet or bet selection ID',
  })
  betId: number;

  @ApiProperty({
    description: 'The bet status to update. Expecte status could either of the following won|lost|void|pending',
  })
  status: string;

  @ApiProperty({
    description: 'The entity type to be updated. bet or selection',
  })
  entityType: string;
}

export class SwaggerUpdateBetResponse {


  @ApiProperty({
    description: 'Corresponding http status of the action, 201|200 for success else failure',
  })
  status: number;

  @ApiProperty({
    description: 'Action status description, if failure, this field will contain failure reason',
  })
  message: string;

  @ApiProperty({
    description: 'Request success status, true or false if request was succesfull',
  })
  success: string;
}

export class FindBetDTO {
  @ApiProperty({ description: 'Operator ID' })
  clientId: number;

  @ApiProperty({ description: 'Betslip ID' })
  betslipId: string;
}

export class SwaggerFindBetResponse {

  @ApiProperty({ description: 'Request status' })
  success: boolean;

  @ApiProperty({ description: 'Server response message' })
  message: string;

  @ApiProperty({ description: 'Bet object if found'})
  bet: any;

}
