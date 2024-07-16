import {Inject, Injectable, OnModuleInit} from '@nestjs/common';
import {
  AddFavouriteRequest,
  AddSpecifierRequest,
  CreateMarketGroupRequest,
  CreateOutcomeAliasRequest, DefaultSportMarketDTO,
  DeleteMarketGroupRequest,
  DeleteSpecifierRequest,
  FilterByClientIDRequest,
  FilterByMatchID,
  FIXTURE_SERVICE_NAME,
  FixtureServiceClient,
  GetFixturesRequest,
  GetHighlightsRequest,
  GetSportMenuRequest,
  protobufPackage,
  SaveTopTournamentRequest,
  UpdateMarketRequest,
} from 'src/interfaces/fixture.pb';
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

  GetCategoryMenu(data: GetSportMenuRequest) {
    console.log('GetCategoryMenu');
    return this.service.getCategoriesMenu(data);
  }

  GetTournamentMenu(data: GetSportMenuRequest) {
    console.log('GetTournamentMenu');
    return this.service.getTournamentsMenu(data);
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
    console.log('GetFixturesByTournamentOrCategory');
    return this.service.getFixtures(data);
  }

  GetRetailFixtures(data: GetFixturesRequest) {
    console.log('Get Retail Fixtures');
    return this.service.getRetailFixtures(data);
  }

  GetRetailFixture(data: FilterByMatchID) {
    return this.service.getRetailFixture(data);
  }

  GetFixtureWithOdds(matchID: number,timeoffset: number) {
    console.log('GetFixtureWithOdds ');
    return this.service.getFixtureWithOdds({matchID: matchID, timeoffset: timeoffset});
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

  createDefaultSportMarket(data: DefaultSportMarketDTO) {

    console.log('createDefaultSportMarket ');
    return this.service.createDefaultSportMarket(data);

  }

  updateDefaultSportMarket(data: DefaultSportMarketDTO) {

    console.log('updateDefaultSportMarket ');
    return this.service.updateDefaultSportMarket(data);

  }

  getDefaultSportMarket() {

    console.log('getDefaultSportMarket ');
    return this.service.getDefaultSportMarket({});

  }

  deleteDefaultSportMarket(sportID: number) {
    console.log('deleteDefaultSportMarket ');
    return this.service.deleteDefaultSportMarket({id: sportID});
  }


  saveFavourite(data: AddFavouriteRequest) {
    console.log('add favourite ');
    return this.service.addFavourites(data);
  }

  getTopTournament(data: FilterByClientIDRequest) {
    console.log('get top tournament ');
    return this.service.getTopTournaments(data);
  }

  deleteTopTournamnet(data: DeleteMarketGroupRequest) {
    console.log('remove top tournament');
    return this.service.removeTopTournament(data);
  }

  saveTopTournament(data: SaveTopTournamentRequest) {
    console.log('save top tournament ');
    return this.service.saveTopTournament(data);
  }

}
