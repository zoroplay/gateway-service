import { ApiProperty } from '@nestjs/swagger';

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

export class SwaggerAllSportResponse {
  @ApiProperty({
    type: [SwaggerSport],
    description: 'Array of sports',
  })
  sports: SwaggerSport[];
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

  @ApiProperty({ description: 'Last page number' })
  last_page: number;

  @ApiProperty({ description: 'From this record to' })
  from: number;

  @ApiProperty({ description: 'To this record count' })
  to: number;

  @ApiProperty({ description: 'Remaining records' })
  remaining_records: number;
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
  country: string;

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