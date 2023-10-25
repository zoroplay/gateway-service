import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import {
  protobufPackage,
  FixtureServiceClient,
  FIXTURE_SERVICE_NAME,
  GetHighlightsRequest, UpdateMarketRequest,
} from './fixture.pb';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class FixtureService implements OnModuleInit {
  private service: FixtureServiceClient;

  constructor(@Inject(protobufPackage) private client: ClientGrpc) {}

  onModuleInit() {
    this.service =
      this.client.getService<FixtureServiceClient>(FIXTURE_SERVICE_NAME);
  }

  GetMarkets(sportID: number) {

    console.log("get markets for "+sportID);
    return this.service.GetMarkets({sportID: sportID});

  }

  GetTournaments(sportID: number) {

    console.log('GetTournaments '+sportID);
    return this.service.GetTournaments({sportID: sportID});
  }

  GetSports() {
    console.log('GetSports');
    return this.service.GetSports({});
  }

  GetLiveGamesCount(sportID: number) {

    console.log('GetLiveGamesCount ');
    return this.service.GetLiveGamesCount({sportID: sportID});
  }

  GetHighlights(data: GetHighlightsRequest) {

    console.log('GetHighlights ');
    return this.service.GetHighlights(data);
  }

  GetLiveHighlights(data: GetHighlightsRequest) {

    console.log('GetLiveHighlights ');
    return this.service.GetLiveHighlights(data);
  }

  GetFixtureWithOdds(matchID: number) {
    console.log('GetFixtureWithOdds ');
    return this.service.GetFixtureWithOdds({matchID: matchID});
  }

  UpdateMarketPriority(data: UpdateMarketRequest) {
    console.log('UpdateMarketPriority ');
    return this.service.UpdateMarketPriority(data);
  }

}
