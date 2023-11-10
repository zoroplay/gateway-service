import {Inject, Injectable, OnModuleInit} from '@nestjs/common';
import {
  AddSpecifierRequest,
  CreateMarketGroupRequest,
  CreateOutcomeAliasRequest,
  DeleteMarketGroupRequest,
  DeleteSpecifierRequest,
  FIXTURE_SERVICE_NAME,
  FixtureServiceClient,
  GetFixturesRequest,
  GetHighlightsRequest,
  GetSportMenuRequest,
  protobufPackage,
  UpdateMarketRequest,
} from './fixture.pb';
import {ClientGrpc} from '@nestjs/microservices';

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


  GetSportsMenu(data: GetSportMenuRequest) {
    console.log('GetSportsMenu');
    return this.service.getSportsMenu(data);
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

  GetFixtures(data: GetFixturesRequest) {
    console.log('GetFixturesByTournament');
    return this.service.getFixtures(data);
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






  createMarketGroup(data: CreateMarketGroupRequest) {

    console.log('createMarketGroup ');
    return this.service.createMarketGroup(data);

  }

  updateMarketGroup(data: CreateMarketGroupRequest) {

    console.log('updateMarketGroup ');
    return this.service.updateMarketGroup(data);

  }

  deleteMarketGroup(data: DeleteMarketGroupRequest) {

    console.log('createMarketGroup ');
    return this.service.deleteMarketGroup(data);

  }

  getAllMarketGroup(clientID: number) {

    console.log('getAllMarketGroup ');
    return this.service.getAllMarketGroup({clientID: clientID});

  }

  addMarketGroupSpecifier(data: AddSpecifierRequest) {

    console.log('addMarketGroupSpecifier ');
    return this.service.addMarketGroupSpecifier(data);

  }

  updateMarketGroupSpecifier(data: AddSpecifierRequest) {

    console.log('updateMarketGroupSpecifier ');
    return this.service.updateMarketGroupSpecifier(data);

  }

  deleteMarketGroupSpecifier(data: DeleteSpecifierRequest) {

    console.log('deleteMarketGroupSpecifier ');
    return this.service.deleteMarketGroupSpecifier(data);

  }

}
