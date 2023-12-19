import {ApiProperty} from '@nestjs/swagger';

export class SwaggerFilterBySportID {
  @ApiProperty({ description: 'ID of the Sport' })
  sportID: number;
}

export class SwaggerMarket {
  @ApiProperty({ description: 'ID of the market' })
  marketID: number;

  @ApiProperty({ description: 'Name of the market' })
  marketName: string;
}

export class SwaggerAllMarketsResponse {
  @ApiProperty({
    type: [SwaggerMarket],
    description: 'Array of markets',
  })
  markets: SwaggerMarket[];
}

export class SwaggerTournament {

  @ApiProperty({ description: 'ID of the tournament' })
  tournamentID: number;

  @ApiProperty({ description: 'Name of the tournament' })
  tournamentName: string;
}

export class SwaggerAllTournamentResponse {
  @ApiProperty({
    type: [SwaggerTournament],
    description: 'Array of tournaments',
  })
  tournaments: SwaggerTournament[];
}

export class SwaggerSport {

  @ApiProperty({ description: 'ID of the sport' })
  sportID: number;

  @ApiProperty({ description: 'Name of the sport' })
  sportName: string;
}

export class SwaggerSportMenu {

  @ApiProperty({ description: 'ID of the sport' })
  sportID: number;

  @ApiProperty({ description: 'Name of the sport' })
  sportName: string;

  @ApiProperty({ description: 'Total upcoming fixtures'})
  total: number;

  @ApiProperty({ description: 'Sport Categories'})
  categories: SwaggerCategory[]
}

export class SwaggerCategory {

  @ApiProperty({ description: 'ID of the sport category' })
  categoryID: number;

  @ApiProperty({ description: 'Name of the sport category' })
  categoryName: string;

  @ApiProperty({ description: 'Total upcoming fixtures for sport category'})
  total: number;

  @ApiProperty({ description: 'array of tournaments'})
  tournaments: SwaggerUpcomingTournament[]
}

export class SwaggerUpcomingTournament {

  @ApiProperty({ description: 'ID of the tournament' })
  tournamentID: number;

  @ApiProperty({ description: 'Name of the tournament' })
  tournamentName: string;

  @ApiProperty({ description: 'Total upcoming fixtures'})
  total: number;

}

export class SwaggerAllSportResponse {
  @ApiProperty({
    type: [SwaggerSport],
    description: 'Array of sports',
  })
  sports: SwaggerSport[];
}

export class SwaggerSportMenuRequest {
  @ApiProperty({ 
    description: 'date range in specified string',
    example: '1hour | 24hour | 72hour'
  })
  period: string;

  @ApiProperty({ description: "Start date", nullable: true, example: '2023-10-01'})
  start: string;

  @ApiProperty({ description: "End date", nullable: true, example: '2023-10-10'})
  end: string;

  @ApiProperty({ description: 'GTM Time offset of the customer, default is 0, can either be a positive or negative integer' })
  timeoffset: number;
}

export class SwaggerSportMenuResponse {
  @ApiProperty({
    type: [SwaggerSportMenu],
    description: 'Array of sports',
  })
  sports: SwaggerSportMenu[];
}

export class SwaggerCountResponse {

  @ApiProperty({ description: 'Count' })
  count: number;
}

export class SwaggerHighlightsRequest {
  @ApiProperty({ description: 'ID of the sport' })
  sportID: number;

  @ApiProperty({ description: 'ID of the market' })
  marketID: number;

  @ApiProperty({ description: 'Pagination page number' })
  page: number;

  @ApiProperty({ description: 'Filter fixtures starting in the next x hours' })
  hours?: number;

  @ApiProperty({ description: 'Fixtures per page' })
  perPage: number;

  @ApiProperty({ description: 'FIlter by competition ID' })
  competitionID?: number;

  @ApiProperty({ description: 'Filter by country code' })
  countryCode?: string;
}

export class SwaggerHighlightsResponse {
  fixtures: any;
  
  markets: any;

  @ApiProperty({ description: 'Last page number' })
  last_page: number;

  @ApiProperty({ description: 'From this record to' })
  from: number;

  @ApiProperty({ description: 'To this record count' })
  to: number;

  @ApiProperty({ description: 'Remaining records' })
  remaining_records: number;
}

export class SwaggerFixturesRequest {

  @ApiProperty({ description: 'ID of the market' })
  marketID: number;

  @ApiProperty({ description: 'Date range to fetch' })
  period: string;

  @ApiProperty({ description: 'No of Fixtures to fetch' })
  limit: number;

  @ApiProperty({ description: 'Specify device type' })
  source?: string;

  @ApiProperty({ description: 'filter markets by sport ID' })
  sportID?: string;

  @ApiProperty({ description: 'GTM Time offset of the customer, default is 0, can either be a positive or negative integer' })
  timeoffset: number;
}

export class SwaggerTimeoffset {

  @ApiProperty({ description: 'GTM Time offset of the customer, default is 0, can either be a positive or negative integer' })
  timeoffset: number;

}

export class SwaggerFixturesResponse {
  fixtures: any;
  
  markets: any;

  groups: any;

  selectedMarket: any;

  outcomes: any;
}

export class SwaggerFilterByMarketID {

  @ApiProperty({ description: 'ID of the market' })
  marketID: number;
}

export class SwaggerFilterByMatchID {

  @ApiProperty({ description: 'ID of the match' })
  matchID: number;
}

export class SwaggerOddsOutcome {

  @ApiProperty({ description: 'ID of the outcome' })
  outcomeID: string;

  @ApiProperty({ description: 'Outcome name' })
  outcomeName: string;

  @ApiProperty({ description: 'ID of the ODD' })
  oddID: number;

  @ApiProperty({ description: 'Wether outcome is active (1) or deactivated (0), deactivated outcome should not be selectable on the user interface' })
  active: number;

  @ApiProperty({ description: 'Outcome odds' })
  odds: number;

}

export class SwaggerOddsMarket {
  @ApiProperty({ description: 'ID of the market e.g 18' })
  marketID: number;

  @ApiProperty({ description: 'name of the market e.g Totals' })
  marketName: string;

  @ApiProperty({ description: 'Market specifier e.g 2.5' })
  specifier: string;

  @ApiProperty({ description: 'Market status. 0 - active, 1 - deactivated, 2 - suspended, 5 - handed over, only display markets which are active - status 0' })
  status: number;

  @ApiProperty({
    type: [SwaggerOddsOutcome],
    description: 'Outcomes of this particular market',
  })
  outcomes: SwaggerOddsOutcome[]
}

export class SwaggerFixtureOdds {
  @ApiProperty({ description: 'Tournament name' })
  tournament: string;

  @ApiProperty({ description: 'Sport ID' })
  sportID: number;

  @ApiProperty({ description: 'Sport name' })
  sportName: string;

  @ApiProperty({ description: 'Game ID' })
  gameID: number;

  @ApiProperty({ description: 'Event name' })
  name: string;

  @ApiProperty({ description: 'Event ID or Match ID' })
  matchID: number;

  @ApiProperty({ description: 'Fixture date' })
  date: string;

  @ApiProperty({ description: 'Producer ID of the producer that send this message' })
  producerID: number;

  @ApiProperty({
    type: [SwaggerOddsMarket],
    description: 'Markets of this particular match',
  })
  markets: SwaggerOddsMarket[];

  @ApiProperty({ description: 'Country name' })
  categoryName: string;

  @ApiProperty({ description: 'category ID' })
  categoryID: number;

  @ApiProperty({ description: 'Match status code' })
  status_code: number;

  @ApiProperty({ description: 'Producer status' })
  producerStatus: number;

  @ApiProperty({ description: 'match status' })
  matchStatus: string;

  @ApiProperty({ description: 'Home score' })
  homeScore: string;

  @ApiProperty({ description: 'Away score' })
  awayScore: string;

  @ApiProperty({ description: 'Home team name' })
  competitor1: string;

  @ApiProperty({ description: 'Away team name' })
  competitor2: string;

  @ApiProperty({ description: 'Current time into the match' })
  eventTime: string;
}

export class SwaggerUpdateMarketRequest {

  @ApiProperty({ description: 'ID of the market e.g 18' })
  marketID : number;

  @ApiProperty({ description: 'Priority of the arrangement in the ui, the higher the value the higher the priority' })
  priority: number;
}

export class SwaggerResponseString {

  @ApiProperty({ description: 'Action status' })
  status: string;
}

export class SwaggerCreateOutcomeAlias {

  @ApiProperty({ description: 'client id' })
  clientID: number;

  /** outcome name alias */
  @ApiProperty({ description: 'outcome name alias' })
  alias: string;

  /** market name */
  @ApiProperty({ description: 'market name alias' })
  marketName: string;

  /** outcome name */
  @ApiProperty({ description: 'outcome name' })
  outcomeName: string;

  /** specifier if any is available */
  @ApiProperty({ description: 'market specifier' })
  specifier: string;

  /** outcomeID */
  @ApiProperty({ description: 'outcomeID' })
  outcomeID: string;

  /** Unique ID of this market */
  @ApiProperty({ description: 'market ID' })
  marketID: number;
}

export class SwaggerCreateOutcomeAliasResponse {
  @ApiProperty({ description: 'Action status' })
  status: string;

  @ApiProperty({ description: 'Action status description' })
  statusDescription: string
}

export class SwaggerOutcomeAlias {

  /** outcome name alias */
  @ApiProperty({ description: 'outcome name alias' })
  alias: string;

  /** market name */
  @ApiProperty({ description: 'market name alias' })
  marketName: string;

  /** outcome name */
  @ApiProperty({ description: 'outcome name' })
  outcomeName: string;

  /** specifier if any is available */
  @ApiProperty({ description: 'market specifier' })
  specifier: string;

  /** outcomeID */
  @ApiProperty({ description: 'outcomeID' })
  outcomeID: string;

  /** Unique ID of this market */
  @ApiProperty({ description: 'market ID' })
  marketID: number;
}

export class GetAllOutcomeAliasResponse {

  @ApiProperty({
    type: [SwaggerOutcomeAlias],
    description: 'Outcomes of this particular market',
  })
  outcomes: SwaggerOutcomeAlias[]
}

export class SwaggerMarketGroupSpecifierData {
  @ApiProperty({ description: 'ID' })
  id: number;

  @ApiProperty({ description: 'Specifer name' })
  name: string;

  @ApiProperty({ description: 'market ID' })
  marketID: number;

  @ApiProperty({ description: 'specifier value' })
  specifier: string;
}

export class SwaggerMarketGroupData {
  @ApiProperty({ description: 'group ID' })
  marketGroupID: number;

  @ApiProperty({ description: 'group name' })
  groupName: string;

  @ApiProperty({ description: 'priority number, the higher the value the higher the priority' })
  priority: number;

  @ApiProperty({
    type: [SwaggerMarketGroupSpecifierData],
    description: 'specifies attached to this group',
  })
  specifiers: SwaggerMarketGroupSpecifierData[]
}

export class SwaggerMarketGroupResponse {
  @ApiProperty({
    type: [SwaggerMarketGroupData],
    description: 'Markets array',
  })
  markets: SwaggerMarketGroupData[];
}


export class SwaggerCreateMarketGroupRequest {
  @ApiProperty({ description: 'ID of the client' })
  clientID: number;

  @ApiProperty({ description: 'name of group' })
  groupName: string;

  @ApiProperty({ description: 'Priority' })
  priority: number;
}

export class SwaggerDeleteMarketGroupRequest {

  @ApiProperty({ description: 'ID of the market group' })
  id: number;
}

export class SwaggerAddSpecifierRequest {
  @ApiProperty({ description: 'ID of the market group' })
  marketGroupID: number;

  @ApiProperty({ description: 'Human readable name' })
  name: string;

  @ApiProperty({ description: 'ID of the market' })
  marketID: number;

  @ApiProperty({ description: 'specifier value' })
  specifier: string;
}


export class SwaggerDefaultSportMarketDTO {
  @ApiProperty({ description: 'ID of the sport' })
  sportID: number;

  @ApiProperty({ description: 'ID of the market' })
  marketID: number;
}

export class SwaggerDefaultSportMarketsDTO {
  @ApiProperty({
    type: [SwaggerDefaultSportMarketDTO],
    description: 'sports array',
  })
  sports: SwaggerDefaultSportMarketDTO[];
}

export class AddFavouritesDTO {
  @ApiProperty({ description: 'Operator ID' })
  clientId: number;

  @ApiProperty({ description: 'Authenticated user ID' })
  userId: number;

  @ApiProperty({ description: 'Home Team ID' })
  competitor1: number;

  @ApiProperty({ description: 'Away Team ID' })
  competitor2: number;
}

export class AddFavouriteResponse {

  @ApiProperty({ description: 'Request status' })
  success: boolean;

  @ApiProperty({ description: 'Server response message' })
  message: string;

}