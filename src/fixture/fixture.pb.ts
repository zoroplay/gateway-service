/* eslint-disable */
import { GrpcMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "fixture";

export interface Empty {
}

export const FIXTURE_PACKAGE_NAME = "fixture";

export interface FilterBySportID {
  sportID: number;
}

export interface AllMarketsResponse {
  markets: market[];
}

export interface market {
  marketID: number;
  marketName: string;
}

export interface tournament {
  tournamentID: number;
  tournamentName: string;
}

export interface AllTournamentResponse {
  tournaments: tournament[];
}

export interface sport {
  sportID: number;
  sportName: string;
}

export interface AllSportResponse {
  sports: sport[];
}

export interface CountResponse {
  count: number;
}

export interface GetHighlightsRequest {
  sportID: number;
  marketID: number;
  page: number;
  hours?: number;
  perPage: number;
  competitionID?: number;
  countryCode?: string;
}

export interface GetHighlightsResponse {
  fixtures: any;
  last_page: number;
  from: number;
  to: number;
  remaining_records: number;
}

export interface FilterByMarketID {
  marketID: number;
}

export interface FilterByMatchID {
  matchID: number;
}

export interface oddsOutcome {
  outcomeID: string,
  outcomeName: string,
  oddID: number,
  active: number,
  odds: number,
}

export interface oddsMarket {
  marketID: number,
  marketName: string,
  specifier: string,
  status: number,
  outcomes: oddsOutcome[]
}

export interface FixtureOdds {
  tournament: string;
  sportID: number;
  gameID: number;
  name: string;
  matchID: number;
  date: string;
  producerID: number;
  markets: oddsMarket[];
  country: string;
  status_code: number;
  producerStatus: number;
  matchStatus: string;
  homeScore: string;
  awayScore: string;
  competitor1: string;
  competitor2: string;
  eventTime: string;
}

export interface UpdateMarketRequest {
  marketID : number,
  priority: number
}

export interface ResponseString {
  status: string;
}

export interface FixtureServiceClient {

  GetMarkets(request: FilterBySportID): Observable<AllMarketsResponse>;

  GetTournaments(request: FilterBySportID): Observable<AllTournamentResponse>;

  GetSports(request: Empty): Observable<AllSportResponse>;

  GetLiveGamesCount(request: FilterBySportID): Observable<CountResponse>;

  GetHighlights(request: GetHighlightsRequest): Observable<GetHighlightsResponse>;

  GetLiveHighlights(request: GetHighlightsRequest): Observable<GetHighlightsResponse>;

  GetFixtureWithOdds(request: FilterByMatchID): Observable<FixtureOdds>;

  UpdateMarketPriority(request: UpdateMarketRequest):  Observable<ResponseString>;
}

export interface FixtureServiceController {

  GetMarkets(request: FilterBySportID): Promise<AllMarketsResponse> | Observable<AllMarketsResponse> | AllMarketsResponse;

  GetTournaments(request: FilterBySportID): Promise<AllTournamentResponse> | Observable<AllTournamentResponse> | AllTournamentResponse;

  GetSports(request: Empty): Promise<AllSportResponse> | Observable<AllSportResponse> | AllSportResponse;

  GetLiveGamesCount(request: FilterBySportID): Promise<CountResponse> | Observable<CountResponse> | CountResponse;

  GetHighlights(request: GetHighlightsRequest): Promise<GetHighlightsResponse> | Observable<GetHighlightsResponse> | GetHighlightsResponse;

  GetLiveHighlights(request: GetHighlightsRequest): Promise<GetHighlightsResponse> | Observable<GetHighlightsResponse> | GetHighlightsResponse;

  GetFixtureWithOdds(request: FilterByMatchID): Promise<FixtureOdds> | Observable<FixtureOdds> | FixtureOdds;

  UpdateMarketPriority(request: UpdateMarketRequest): Promise<ResponseString> | Observable<ResponseString> | ResponseString;

}

export function FixtureServiceControllerMethods() {

  return function (constructor: Function) {

    const grpcMethods: string[] = [
      "GetMarkets",
      "GetTournaments",
      "GetLiveGamesCount",
      "GetHighlights",
      "GetLiveHighlights",
      "GetFixtureWithOdds",
      "UpdateMarketPriority",
    ];

    for (const method of grpcMethods) {

      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("FixtureService", method)(constructor.prototype[method], method, descriptor);
    }

  };
}

export const FIXTURE_SERVICE_NAME = "FixtureService";
