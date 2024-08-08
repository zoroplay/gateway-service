/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { wrappers } from "protobufjs";
import { Observable } from "rxjs";
import { Struct } from "./google/protobuf/struct.pb";

export const protobufPackage = "fixture";

export interface CommonResponse {
  success: boolean;
  message: string;
}

export interface TopTournamentData {
  id: number;
  sportID: number;
  sportName: string;
  categoryID: number;
  categoryName: string;
  tournamentID: number;
  tournamentName: string;
}

export interface GetTopTournamentResponse {
  data: TopTournamentData[];
}

export interface CommonResponseObj {
  success: boolean;
  message: string;
  status: number;
  data?: { [key: string]: any } | undefined;
}

export interface GetMarketResponse {
  status?: number | undefined;
  success?: boolean | undefined;
  message: string;
  data: CustomMarket[];
}

export interface CustomMarket {
  id: number;
  /** Name of the market */
  marketName: string;
  /** Unique ID of this market */
  marketID: number;
  /** Market group ID */
  groupID: string;
  /** Market group ID */
  displayName: string;
  /** Market status, 0 - active, 1 - suspended, 2 - deactivated, 5 - handedover, only displaye markets with status 0 on the site */
  status: number;
  /** Market line */
  specifier: string;
  /** Market line */
  priority: string;
  /** is Market a popular ond */
  isPopular: string;
  /** Market description */
  description: string;
  /** Market description */
  hasCashout: string;
  /** Market description */
  sportID: number;
  /** Array of outcomes */
  outcomes: OutcomeAlias[];
}

export interface BetradarMarketResponse {
  success: boolean;
  message: string;
  status: number;
  data: BetradarMarketResponse_BetradarMarket[];
}

export interface BetradarMarketResponse_BetradarMarket {
  marketID: string;
  marketName: string;
}

export interface SaveTopTournamentRequest {
  clientID: number;
  sportId: number;
  categoryId: number;
  tournamentId: number;
  sideMenu: string;
  homeScreen: string;
}

export interface CreateMarketGroupRequest {
  clientID: number;
  sportID: number;
  groupName: string;
  id?: number | undefined;
}

export interface DeleteMarketGroupRequest {
  id: number;
}

export interface FetchMarketGroup {
  clientID: number;
  sportID: number;
}

export interface FilterByClientIDRequest {
  clientID: number;
}

export interface AddSpecifierRequest {
  marketGroupID: number;
  name: string;
  marketID: number;
  specifier: string;
}

export interface MarketGroupSpecifier {
  id: number;
  name: string;
  marketID: number;
  specifier: string;
}

export interface MarketGroupData {
  marketGroupID: number;
  groupName: string;
  priority: number;
  /** repeated MarketGroupSpecifier specifiers = 4; */
  status: number;
}

export interface GetMarketsRequest {
  clientID: number;
  sportID: number;
  groupID?: number | undefined;
}

export interface SaveMarketRequest {
  clientID: number;
  sportID: number;
  marketID: number;
  groupID?: number | undefined;
  name: string;
  displayName?: string | undefined;
  description?: string | undefined;
  status: number;
  enableCashout?: number | undefined;
  isDefault: number;
  id?: number | undefined;
  priority?: number | undefined;
  specifier?: string | undefined;
}

export interface MarketGroupResponse {
  groups: MarketGroupData[];
}

export interface DeleteSpecifierRequest {
  id: number;
}

export interface CountResponse {
  /** number of live games */
  count: number;
}

export interface FilterBySportID {
  /** SportID of a particular sport */
  sportID: number;
}

export interface FilterByMarketID {
  /** marketID of a particular market */
  marketID: number;
}

export interface FilterByMatchID {
  /** matchID of a particular match */
  matchID: number;
  timeoffset: number;
}

export interface SportFilters {
  /** SportID of a particular sport */
  sportID: number;
  /** marketID of a particular market */
  marketID: number;
  /** pass tournamentID to filter by tournament */
  tournamentID: number;
  /** pass countryCode (2 Letter ISO Code) to filter by country */
  countyCode: string;
}

/** Used where the method does not require any input */
export interface Empty {
}

export interface MarketResponse {
  /** marketID of a particular market */
  marketID: number;
  /** name of the market */
  marketName: string;
}

/** Object used to hold array of markets */
export interface AllMarketResponse {
  markets: MarketResponse[];
}

export interface TournamentResponse {
  /** Unique ID of the tournament */
  tournamentID: number;
  /** Name of the tournament */
  tournamentName: string;
  /** current number of live games under this tournament */
  liveGames: number;
  /** current number of total games under this tournament */
  allGames: number;
}

/** Object used to hold array of tournament */
export interface AllTournamentResponse {
  tournaments: TournamentResponse[];
}

export interface SportResponse {
  /** unique ID of a sport */
  sportID: number;
  /** Sport name */
  sportName: string;
}

export interface Category {
  categoryID: number;
  categoryName: string;
  total: number;
  code: string;
  tournaments: Tournament[];
}

export interface Tournament {
  tournamentID: number;
  tournamentName: string;
  total: number;
}

export interface SportMenuResponse {
  /** unique ID of a sport */
  sportID: number;
  /** Sport name */
  sportName: string;
  /** total fixtures count for a sport */
  total: string;
  categories: Category[];
}

export interface CategoryMenuResponse {
  sports: Category[];
}

export interface TournamentMenuResponse {
  sports: Tournament[];
}

/** Object used to hold array of sports */
export interface AllSportResponse {
  sports: SportResponse[];
}

/** Object used to hold array of sports */
export interface AvailableSportMenuResponse {
  sports: SportMenuResponse[];
}

export interface GetSportMenuRequest {
  /** period to display */
  period: string;
  /** start date */
  start: string;
  /** end date */
  end: string;
  timeoffset: number;
  sportId?: number | undefined;
  categoryId?: number | undefined;
}

export interface GetHighlightsRequest {
  /** Filter fixtures by this sportID */
  sportID: number;
  /** load odds for this particular marketID */
  marketID: number;
  /** current pagination page */
  page: number;
  /** If value is greater than 0, we will only display fixtures whoose start date is in the next x hours */
  hours: number;
  /** records to load per page (pagination) */
  perPage: number;
  /** If value > 0 only fixtures of this tournamentID will be loaded */
  tournamentID: number;
  /** If length > 0 only fixtures of this countryCode will be loaded */
  countryCode: string;
  upcoming: number;
  today: number;
  specifier: string;
  timeoffset: number;
  search?: string | undefined;
  favourite?: string | undefined;
  userId?: string | undefined;
}

export interface GetFixturesRequest {
  /** Filter fixtures by this sportID */
  sportID: number;
  /** comma separated string of market ids to be loaded */
  markets: string;
  /** mobile or web client making the request */
  source: string;
  /** no of records to be loaded (optional) */
  limit: number;
  /** fetch fixtures of this tournamentID will */
  tournamentID?:
    | number
    | undefined;
  /** date range to fetch fixtures */
  period: string;
  timeoffset: number;
  /** fetch fixtures of this categoryID if present */
  categoryID?: number | undefined;
  specifier?: string | undefined;
  startDate?: string | undefined;
  endDate?: string | undefined;
}

export interface HighlightOutcomes {
  /** outcome name alias */
  alias: string;
  /** market name */
  marketName: string;
  /** outcome name */
  outcomeName: string;
  /** specifier if any is available */
  specifier: string;
  /** outcomeID */
  outcomeID: string;
  /** current odds */
  odds: number;
  /** previous odds, odds values before we received current odds */
  previousOdds: number;
  /** Odd ID */
  oddID: number;
  /** Outcome status, 0 - Active, 1 - Suspended, 2 - Deactivated, 5 - Handed Over */
  status: number;
  /** wether odd is active or deactivated, 1 - ACtive, 0 - Deactivated */
  active: number;
  /** ID of the producer that send the odds */
  producerID: number;
  /** Unique ID of this market */
  marketID: number;
  /** ID of the producer that send the odds */
  producerStatus: number;
  /** outcome display name */
  displayName: string;
}

export interface FixturesWithOdds {
  /** tournament name */
  tournament: string;
  /** Unique ID of the sport */
  sportID: string;
  /** Unique ID of the fixture (will always be between 1000 and 99999) */
  gameID: string;
  /** fixture name e.g ABC FC vs Yanga FC */
  name: string;
  /** Unique ID of the match (Betradar ID) */
  matchID: string;
  /** Match date */
  date: string;
  /** Number of active markets */
  activeMarkets: number;
  /** Unique ID of the tournament */
  tournamentID: number;
  /** match Status code */
  statusCode: number;
  /** Match status */
  status: number;
  /** Fixture country */
  categoryID: string;
  /** Fixture country code */
  categoryName: string;
  /** Current event time e.g 00:10 */
  eventTime: string;
  /** Current Home Score */
  homeScore: string;
  /** Match status description, available values NotStarted,Live,Ended,Suspended */
  matchStatus: string;
  /** event status of a live game available values Live,1st Half,2nd Half,Break,Overtime */
  eventStatus: string;
  /** Current score of the away team */
  awayScore: string;
  /** Home team name */
  homeTeam: string;
  /** Home team ID */
  homeTeamID: number;
  /** Away team name */
  awayTeam: string;
  /** Away team ID */
  awayTeamID: number;
  /** Away team name */
  sportName: string;
  /** Market Outcomes */
  outcomes: HighlightOutcomes[];
}

export interface GetHighlightsResponse {
  /** Array of fixtures */
  fixtures: FixturesWithOdds[];
  /** Last pagination page */
  lastPage: number;
  /** From data index */
  from: number;
  /** to data index */
  to: number;
  /** how many records are remaining */
  remainingRecords: number;
  /** Array of available markets */
  markets: AvailableMarket[];
}

export interface GetFixturesResponse {
  /** Array of fixtures */
  fixtures: FixturesWithOdds[];
  /** Array of selected markets */
  selectedMarket: AvailableMarket[];
  /** Array of available markets */
  markets: AvailableMarket[];
  /** Array of available markets */
  groups: MarketGroup[];
  /** Array of selected markets outcomes */
  outcomeTypes: MarketOutcome[];
}

export interface Outcome {
  /** Outcome alias */
  alias: string;
  /** Outcome name */
  outcomeName: string;
  /** Unique ID of the outcome */
  outcomeID: string;
  /** Current odds of the outcome */
  odds: number;
  /** Previous odds of the outcome */
  previousOdds: number;
  /** Odd ID */
  oddID: number;
  /** wether odd is active (1) or not (0), only display active odds on the site */
  active: number;
  displayName?: string | undefined;
  producerID: number;
  marketName?: string | undefined;
  specifier?: string | undefined;
  id?: number | undefined;
  marketId?: number | undefined;
  status?: number | undefined;
  priority?: number | undefined;
  marketAlias?: string | undefined;
}

export interface AvailableMarket {
  marketID: string;
  marketName: string;
  specifier: string;
  marketGroupID: string;
  outcomes: MarketOutcome[];
  sportID: number;
}

export interface MarketGroup {
  groupID: string;
  groupName: string;
}

export interface Market {
  /** Name of the market */
  marketName: string;
  /** Unique ID of this market */
  marketID: number;
  /** Market status name */
  statusName: string;
  /** Market status, 0 - active, 1 - suspended, 2 - deactivated, 5 - handedover, only displaye markets with status 0 on the site */
  status: number;
  /** Market line */
  specifier: string;
  /** Array of outcomes */
  outcomes: Outcome[];
}

export interface MarketOutcome {
  /** internal id */
  id: number;
  /** betradar ID */
  outcomeID: number;
  /** market outcome name */
  outcomeName: string;
  /** market name */
  marketName: string;
  /** market id */
  marketID: string;
  /**  */
  displayName: string;
}

export interface FixtureOdds {
  /** Tournament name */
  tournament: string;
  /** Unique ID of the sport */
  sportID: number;
  /** Unique ID of the match (internal ID) */
  gameID: number;
  /** Fixture name */
  name: string;
  /** Unique ID of the match (betradr ID) */
  matchID: number;
  /** Fixture date */
  date: string;
  /** Unique ID of the producer that sent the odd */
  producerID: number;
  /** array of markets */
  markets: Market[];
  /** Fixture country */
  categoryName: string;
  /** match status code */
  statusCode: number;
  /** producer status */
  producerStatus: number;
  /** Match status description, available values NotStarted,Live,Ended,Suspended */
  matchStatus: string;
  /** Current score of the home team */
  homeScore: string;
  /** Current score of the away team */
  awayScore: string;
  /** Home team name */
  competitor1: string;
  /** Away team name */
  competitor2: string;
  /** Current event time e.g 00:10 */
  eventTime: string;
  sportName: string;
  categoryID: string;
}

export interface FixtureWithOutcomes {
  /** Tournament name */
  tournament: string;
  /** Unique ID of the sport */
  sportID: number;
  /** Unique ID of the match (internal ID) */
  gameID: number;
  /** Fixture name */
  name: string;
  /** Unique ID of the match (betradr ID) */
  matchID: number;
  /** Fixture date */
  date: string;
  /** Unique ID of the producer that sent the odd */
  producerID: number;
  /** array of markets */
  outcomes: Outcome[];
  /** Fixture country */
  categoryName: string;
  /** match status code */
  statusCode: number;
  /** producer status */
  producerStatus: number;
  /** Match status description, available values NotStarted,Live,Ended,Suspended */
  matchStatus: string;
  /** Current score of the home team */
  homeScore: string;
  /** Current score of the away team */
  awayScore: string;
  /** Home team name */
  competitor1: string;
  /** Away team name */
  competitor2: string;
  /** Current event time e.g 00:10 */
  eventTime: string;
  sportName: string;
  categoryID: string;
}

export interface ResponseString {
  status: string;
}

export interface UpdateMarketRequest {
  /** Unique Market ID */
  marketID: number;
  /** Market priority, the higher the value, the more the market priority */
  priority: number;
}

export interface CreateOutcomeAliasRequest {
  clientID: number;
  alias: string;
  /** market name */
  marketName: string;
  /** outcome name */
  outcomeName: string;
  /** specifier if any is available */
  specifier: string;
  /** outcomeID */
  outcomeID: string;
  /** Unique ID of this market */
  marketID: number;
}

export interface CreateOutcomeAliasResponse {
  success: boolean;
  status: number;
  statusDescription: string;
}

export interface OutcomeAlias {
  /** outcome name alias */
  id: number;
  /** market name */
  marketName: string;
  /** outcome name */
  outcomeName: string;
  /** specifier if any is available */
  specifier: string;
  /** outcomeID */
  outcomeID: string;
  /** Unique ID of this market */
  marketID: number;
  codeWA: string;
  codeEA: string;
}

export interface GetAllOutcomeAliasResponse {
  outcomes: OutcomeAlias[];
}

export interface GetAllOutcomeAliasRequest {
  clientID: number;
}

export interface ID {
  id: number;
}

export interface DefaultSportMarketDTO {
  sportID: number;
  marketID: number;
}

export interface DefaultSportMarketsDTO {
  sports: DefaultSportMarketDTO[];
}

export interface AddFavouriteRequest {
  userId: number;
  clientId: number;
  competitor1: number;
  competitor2: number;
  action: string;
}

export interface AddFavouriteResponse {
  success: boolean;
  message: string;
}

export const FIXTURE_PACKAGE_NAME = "fixture";

wrappers[".google.protobuf.Struct"] = { fromObject: Struct.wrap, toObject: Struct.unwrap } as any;

export interface FixtureServiceClient {
  /** Gets a list of sports, categories, tournaments based on upcoming fixtures for a period */

  getSportsMenu(request: GetSportMenuRequest): Observable<AvailableSportMenuResponse>;

  /** Gets a list of sports, categories, tournaments based on upcoming fixtures for a period */

  getCategoriesMenu(request: GetSportMenuRequest): Observable<CategoryMenuResponse>;

  /** Gets a list of sports, categories, tournaments based on upcoming fixtures for a period */

  getTournamentsMenu(request: GetSportMenuRequest): Observable<TournamentMenuResponse>;

  /** Gets all Betradar markets */

  getBetradarMarkets(request: Empty): Observable<BetradarMarketResponse>;

  /** Gets a list of available markets, markets are pulled peridocally from betradr API */

  getMarkets(request: GetMarketsRequest): Observable<GetMarketResponse>;

  /** Gets a list of available markets, markets are pulled peridocally from betradr API */

  saveMarket(request: SaveMarketRequest): Observable<CommonResponseObj>;

  deleteMarket(request: DeleteMarketGroupRequest): Observable<CommonResponseObj>;

  /** GetTournaments - Gets a list of available tournaments, the tournaments are filterred by the supplied sportID */

  getTournaments(request: FilterBySportID): Observable<AllTournamentResponse>;

  /** GetSports - Gets a list of all sports */

  getSports(request: Empty): Observable<AllSportResponse>;

  /** GetLiveGamesCount - Get a count of all the live games */

  getLiveGamesCount(request: FilterBySportID): Observable<CountResponse>;

  /** GetHighlights - This GRPC method retrieves the odds for a particular market (e.g 1x2, total, Double chance etc) for games, the method provides a way to pass pagination parameters, this method will be used to load games in the front page of the site */

  getHighlights(request: GetHighlightsRequest): Observable<GetHighlightsResponse>;

  /** GetHighlights - This GRPC method retrieves the odds for a particular market (e.g 1x2, total, Double chance etc) for games, the method provides a way to pass pagination parameters, this method will be used to load games in the front page of the site */

  getFixtures(request: GetFixturesRequest): Observable<GetFixturesResponse>;

  /** GetLiveHighlights - This GRPC method retrieves the odds for a particular market (e.g 1x2, total, Double chance etc) for live games, the method provides a way to pass pagination parameters, this method will be used to load games in the front page of the site */

  getLiveHighlights(request: GetHighlightsRequest): Observable<GetHighlightsResponse>;

  /** GetFixtureWithOdds - Loads odds for all the markets of the supplied matchID */

  getFixtureWithOdds(request: FilterByMatchID): Observable<FixtureOdds>;

  /** UpdateMarketPriority - Update market priority, this will affect the order of markets in GetFixtureWithOdds method */

  updateMarketPriority(request: UpdateMarketRequest): Observable<ResponseString>;

  createOutcomeAlias(request: CreateOutcomeAliasRequest): Observable<CreateOutcomeAliasResponse>;

  updateOutcomeAlias(request: CreateOutcomeAliasRequest): Observable<CreateOutcomeAliasResponse>;

  getAllOutcomeAlias(request: GetAllOutcomeAliasRequest): Observable<GetAllOutcomeAliasResponse>;

  deleteOutcomeAlias(request: CreateOutcomeAliasRequest): Observable<CreateOutcomeAliasResponse>;

  createMarketGroup(request: CreateMarketGroupRequest): Observable<CreateOutcomeAliasResponse>;

  updateMarketGroup(request: CreateMarketGroupRequest): Observable<CreateOutcomeAliasResponse>;

  deleteMarketGroup(request: DeleteMarketGroupRequest): Observable<CreateOutcomeAliasResponse>;

  getAllMarketGroup(request: FilterByClientIDRequest): Observable<MarketGroupResponse>;

  addMarketGroupSpecifier(request: AddSpecifierRequest): Observable<CreateOutcomeAliasResponse>;

  updateMarketGroupSpecifier(request: AddSpecifierRequest): Observable<CreateOutcomeAliasResponse>;

  deleteMarketGroupSpecifier(request: DeleteSpecifierRequest): Observable<CreateOutcomeAliasResponse>;

  createDefaultSportMarket(request: DefaultSportMarketDTO): Observable<ResponseString>;

  updateDefaultSportMarket(request: DefaultSportMarketDTO): Observable<ResponseString>;

  deleteDefaultSportMarket(request: ID): Observable<ResponseString>;

  getDefaultSportMarket(request: Empty): Observable<DefaultSportMarketsDTO>;

  addFavourites(request: AddFavouriteRequest): Observable<AddFavouriteResponse>;

  /** GetHighlights - This GRPC method retrieves the odds for a particular market (e.g 1x2, total, Double chance etc) for games, the method provides a way to pass pagination parameters, this method will be used to load games in the front page of the site */

  getRetailFixtures(request: GetFixturesRequest): Observable<GetFixturesResponse>;

  /** Get Fixture Retail - Loads odds for all the markets of the supplied matchID */

  getRetailFixture(request: FilterByMatchID): Observable<FixtureWithOutcomes>;

  getTopTournaments(request: FilterByClientIDRequest): Observable<GetTopTournamentResponse>;

  saveTopTournament(request: SaveTopTournamentRequest): Observable<CommonResponse>;

  removeTopTournament(request: DeleteMarketGroupRequest): Observable<CommonResponse>;
}

export interface FixtureServiceController {
  /** Gets a list of sports, categories, tournaments based on upcoming fixtures for a period */

  getSportsMenu(
    request: GetSportMenuRequest,
  ): Promise<AvailableSportMenuResponse> | Observable<AvailableSportMenuResponse> | AvailableSportMenuResponse;

  /** Gets a list of sports, categories, tournaments based on upcoming fixtures for a period */

  getCategoriesMenu(
    request: GetSportMenuRequest,
  ): Promise<CategoryMenuResponse> | Observable<CategoryMenuResponse> | CategoryMenuResponse;

  /** Gets a list of sports, categories, tournaments based on upcoming fixtures for a period */

  getTournamentsMenu(
    request: GetSportMenuRequest,
  ): Promise<TournamentMenuResponse> | Observable<TournamentMenuResponse> | TournamentMenuResponse;

  /** Gets all Betradar markets */

  getBetradarMarkets(
    request: Empty,
  ): Promise<BetradarMarketResponse> | Observable<BetradarMarketResponse> | BetradarMarketResponse;

  /** Gets a list of available markets, markets are pulled peridocally from betradr API */

  getMarkets(
    request: GetMarketsRequest,
  ): Promise<GetMarketResponse> | Observable<GetMarketResponse> | GetMarketResponse;

  /** Gets a list of available markets, markets are pulled peridocally from betradr API */

  saveMarket(
    request: SaveMarketRequest,
  ): Promise<CommonResponseObj> | Observable<CommonResponseObj> | CommonResponseObj;

  deleteMarket(
    request: DeleteMarketGroupRequest,
  ): Promise<CommonResponseObj> | Observable<CommonResponseObj> | CommonResponseObj;

  /** GetTournaments - Gets a list of available tournaments, the tournaments are filterred by the supplied sportID */

  getTournaments(
    request: FilterBySportID,
  ): Promise<AllTournamentResponse> | Observable<AllTournamentResponse> | AllTournamentResponse;

  /** GetSports - Gets a list of all sports */

  getSports(request: Empty): Promise<AllSportResponse> | Observable<AllSportResponse> | AllSportResponse;

  /** GetLiveGamesCount - Get a count of all the live games */

  getLiveGamesCount(request: FilterBySportID): Promise<CountResponse> | Observable<CountResponse> | CountResponse;

  /** GetHighlights - This GRPC method retrieves the odds for a particular market (e.g 1x2, total, Double chance etc) for games, the method provides a way to pass pagination parameters, this method will be used to load games in the front page of the site */

  getHighlights(
    request: GetHighlightsRequest,
  ): Promise<GetHighlightsResponse> | Observable<GetHighlightsResponse> | GetHighlightsResponse;

  /** GetHighlights - This GRPC method retrieves the odds for a particular market (e.g 1x2, total, Double chance etc) for games, the method provides a way to pass pagination parameters, this method will be used to load games in the front page of the site */

  getFixtures(
    request: GetFixturesRequest,
  ): Promise<GetFixturesResponse> | Observable<GetFixturesResponse> | GetFixturesResponse;

  /** GetLiveHighlights - This GRPC method retrieves the odds for a particular market (e.g 1x2, total, Double chance etc) for live games, the method provides a way to pass pagination parameters, this method will be used to load games in the front page of the site */

  getLiveHighlights(
    request: GetHighlightsRequest,
  ): Promise<GetHighlightsResponse> | Observable<GetHighlightsResponse> | GetHighlightsResponse;

  /** GetFixtureWithOdds - Loads odds for all the markets of the supplied matchID */

  getFixtureWithOdds(request: FilterByMatchID): Promise<FixtureOdds> | Observable<FixtureOdds> | FixtureOdds;

  /** UpdateMarketPriority - Update market priority, this will affect the order of markets in GetFixtureWithOdds method */

  updateMarketPriority(
    request: UpdateMarketRequest,
  ): Promise<ResponseString> | Observable<ResponseString> | ResponseString;

  createOutcomeAlias(
    request: CreateOutcomeAliasRequest,
  ): Promise<CreateOutcomeAliasResponse> | Observable<CreateOutcomeAliasResponse> | CreateOutcomeAliasResponse;

  updateOutcomeAlias(
    request: CreateOutcomeAliasRequest,
  ): Promise<CreateOutcomeAliasResponse> | Observable<CreateOutcomeAliasResponse> | CreateOutcomeAliasResponse;

  getAllOutcomeAlias(
    request: GetAllOutcomeAliasRequest,
  ): Promise<GetAllOutcomeAliasResponse> | Observable<GetAllOutcomeAliasResponse> | GetAllOutcomeAliasResponse;

  deleteOutcomeAlias(
    request: CreateOutcomeAliasRequest,
  ): Promise<CreateOutcomeAliasResponse> | Observable<CreateOutcomeAliasResponse> | CreateOutcomeAliasResponse;

  createMarketGroup(
    request: CreateMarketGroupRequest,
  ): Promise<CreateOutcomeAliasResponse> | Observable<CreateOutcomeAliasResponse> | CreateOutcomeAliasResponse;

  updateMarketGroup(
    request: CreateMarketGroupRequest,
  ): Promise<CreateOutcomeAliasResponse> | Observable<CreateOutcomeAliasResponse> | CreateOutcomeAliasResponse;

  deleteMarketGroup(
    request: DeleteMarketGroupRequest,
  ): Promise<CreateOutcomeAliasResponse> | Observable<CreateOutcomeAliasResponse> | CreateOutcomeAliasResponse;

  getAllMarketGroup(
    request: FilterByClientIDRequest,
  ): Promise<MarketGroupResponse> | Observable<MarketGroupResponse> | MarketGroupResponse;

  addMarketGroupSpecifier(
    request: AddSpecifierRequest,
  ): Promise<CreateOutcomeAliasResponse> | Observable<CreateOutcomeAliasResponse> | CreateOutcomeAliasResponse;

  updateMarketGroupSpecifier(
    request: AddSpecifierRequest,
  ): Promise<CreateOutcomeAliasResponse> | Observable<CreateOutcomeAliasResponse> | CreateOutcomeAliasResponse;

  deleteMarketGroupSpecifier(
    request: DeleteSpecifierRequest,
  ): Promise<CreateOutcomeAliasResponse> | Observable<CreateOutcomeAliasResponse> | CreateOutcomeAliasResponse;

  createDefaultSportMarket(
    request: DefaultSportMarketDTO,
  ): Promise<ResponseString> | Observable<ResponseString> | ResponseString;

  updateDefaultSportMarket(
    request: DefaultSportMarketDTO,
  ): Promise<ResponseString> | Observable<ResponseString> | ResponseString;

  deleteDefaultSportMarket(request: ID): Promise<ResponseString> | Observable<ResponseString> | ResponseString;

  getDefaultSportMarket(
    request: Empty,
  ): Promise<DefaultSportMarketsDTO> | Observable<DefaultSportMarketsDTO> | DefaultSportMarketsDTO;

  addFavourites(
    request: AddFavouriteRequest,
  ): Promise<AddFavouriteResponse> | Observable<AddFavouriteResponse> | AddFavouriteResponse;

  /** GetHighlights - This GRPC method retrieves the odds for a particular market (e.g 1x2, total, Double chance etc) for games, the method provides a way to pass pagination parameters, this method will be used to load games in the front page of the site */

  getRetailFixtures(
    request: GetFixturesRequest,
  ): Promise<GetFixturesResponse> | Observable<GetFixturesResponse> | GetFixturesResponse;

  /** Get Fixture Retail - Loads odds for all the markets of the supplied matchID */

  getRetailFixture(
    request: FilterByMatchID,
  ): Promise<FixtureWithOutcomes> | Observable<FixtureWithOutcomes> | FixtureWithOutcomes;

  getTopTournaments(
    request: FilterByClientIDRequest,
  ): Promise<GetTopTournamentResponse> | Observable<GetTopTournamentResponse> | GetTopTournamentResponse;

  saveTopTournament(
    request: SaveTopTournamentRequest,
  ): Promise<CommonResponse> | Observable<CommonResponse> | CommonResponse;

  removeTopTournament(
    request: DeleteMarketGroupRequest,
  ): Promise<CommonResponse> | Observable<CommonResponse> | CommonResponse;
}

export function FixtureServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "getSportsMenu",
      "getCategoriesMenu",
      "getTournamentsMenu",
      "getBetradarMarkets",
      "getMarkets",
      "saveMarket",
      "deleteMarket",
      "getTournaments",
      "getSports",
      "getLiveGamesCount",
      "getHighlights",
      "getFixtures",
      "getLiveHighlights",
      "getFixtureWithOdds",
      "updateMarketPriority",
      "createOutcomeAlias",
      "updateOutcomeAlias",
      "getAllOutcomeAlias",
      "deleteOutcomeAlias",
      "createMarketGroup",
      "updateMarketGroup",
      "deleteMarketGroup",
      "getAllMarketGroup",
      "addMarketGroupSpecifier",
      "updateMarketGroupSpecifier",
      "deleteMarketGroupSpecifier",
      "createDefaultSportMarket",
      "updateDefaultSportMarket",
      "deleteDefaultSportMarket",
      "getDefaultSportMarket",
      "addFavourites",
      "getRetailFixtures",
      "getRetailFixture",
      "getTopTournaments",
      "saveTopTournament",
      "removeTopTournament",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("FixtureService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("FixtureService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const FIXTURE_SERVICE_NAME = "FixtureService";
