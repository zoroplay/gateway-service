import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import {
  protobufPackage,
  FixtureServiceClient,
  FIXTURE_SERVICE_NAME,
  GetHighlightsRequest, UpdateMarketRequest, CreateOutcomeAliasRequest,
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
    return this.service.getMarkets({sportID: sportID});

  }

  GetTournaments(sportID: number) {

    console.log('GetTournaments '+sportID);
    return this.service.getTournaments({sportID: sportID});
  }

  GetSports() {
    console.log('GetSports');
    return this.service.getSports({});
  }

  GetLiveGamesCount(sportID: number) {

    console.log('GetLiveGamesCount ');
    return this.service.getLiveGamesCount({sportID: sportID});
  }

  GetHighlights(data: GetHighlightsRequest) {

    console.log('GetHighlights ');
    return this.service.getHighlights(data);
  }

  GetLiveHighlights(data: GetHighlightsRequest) {

    console.log('GetLiveHighlights ');
    return this.service.getLiveHighlights(data);
  }

  GetFixtureWithOdds(matchID: number) {
    console.log('GetFixtureWithOdds ');
    return this.service.getFixtureWithOdds({matchID: matchID});
  }

  UpdateMarketPriority(data: UpdateMarketRequest) {
    console.log('UpdateMarketPriority ');
    return this.service.updateMarketPriority(data);
  }

  createOutcomeAlias(data: CreateOutcomeAliasRequest) {

    console.log('CreateOutcomeAlias ');
    return this.service.createOutcomeAlias(data);

  }


  updateOutcomeAlias(data: CreateOutcomeAliasRequest) {

    console.log('updateOutcomeAlias ');
    return this.service.updateOutcomeAlias(data);

  }

  deleteOutcomeAlias(data: CreateOutcomeAliasRequest) {

    console.log('deleteOutcomeAlias ');
    return this.service.deleteOutcomeAlias(data);

  }

  findAllOutcomeAlias(clientID: number) {

    console.log('findAllOutcomeAlias ');
    return this.service.getAllOutcomeAlias({clientID: clientID});

  }

}
