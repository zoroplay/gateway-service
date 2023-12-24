/* eslint-disable */
import {GrpcMethod, GrpcStreamMethod} from "@nestjs/microservices";
import {Observable} from "rxjs";

export const protobufPackage = "outrights";

export interface GetOutrightsRequest {
  /** Filter fixtures by this sportID */
  sportID: number;
  /** current pagination page */
  page: number;
  /** If value is greater than 0, we will only display fixtures whoose start date is in the next x hours */
  perPage: number;
  /** If value > 0 only fixtures of this tournamentID will be loaded */
  tournamentID: number;
  /** If length > 0 only fixtures of this countryCode will be loaded */
  countryCode: string;
}

export interface OutrightsOutcomes {
  /** outcome name */
  outcomeName: string;

  /** outcomeID */
  outcomeID: string;

  /** current odds */
  odds: number;

  /** Odd ID */
  oddID: number;

  /** Outcome status, 0 - Active, 1 - Suspended, 2 - Deactivated, 5 - Handed Over */
  status: number;

  /** whether odd is active or deactivated, 1 - Active, 0 - Deactivated */
  active: number;

  /** ID of the producer that send the odds */
  producerID: number;

  /**  status name, Active,Suspended,Deactivated, Handed Over */
  statusName: string;

}

export interface OutrightsMarket {
  /** market ID */
  marketID: number;

  /** market name */
  marketName: string;

  /** specifier if any is available */
  specifier: string;

  /** Market Outcomes */
  outcomes: OutrightsOutcomes[];
}

export interface TournamentsData {
  /** tournament name */
  tournamentName: string;

  /** Unique ID of the sport */
  sportID: number;

  /** Unique ID of the tournament */
  eventId: number;

  /** tournament type */
  eventType: string;

  /** tournament prefix */
  eventPrefix: string;

  /** Fixture country code */
  countryCode: string;

  /** Market Outcomes */
  markets: OutrightsMarket[];
}

export interface GetOutrightsResponse {
  /** Array of tournaments */
  tournaments: TournamentsData[];

  /** Last pagination page */
  lastPage: number;

  /** From data index */
  from: number;

  /** to data index */
  to: number;

  /** how many records are remaining */
  remainingRecords: number;

}

export const OUTRIGHTS_PACKAGE_NAME = "outrights";

export interface OutrightsServiceClient {

  getFixtures(request: GetOutrightsRequest): Observable<GetOutrightsResponse>;

}

export interface OutrightsServiceController {

  getFixtures(request: GetOutrightsRequest): Promise<GetOutrightsResponse> | Observable<GetOutrightsResponse> | GetOutrightsResponse;

}

export function OutrightsServiceControllerMethods() {

  return function (constructor: Function) {

    const grpcMethods: string[] = ["getFixtures"];

    for (const method of grpcMethods) {

      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("OutrightsService", method)(constructor.prototype[method], method, descriptor);

    }

    const grpcStreamMethods: string[] = [];

    for (const method of grpcStreamMethods) {

      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("OutrightsService", method)(constructor.prototype[method], method, descriptor);

    }

  };
}

export const OUTRIGHTS_SERVICE_NAME = "OutrightsService";
