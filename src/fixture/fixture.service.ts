import {Inject, Injectable, OnModuleInit} from '@nestjs/common';
import {
  AddFavouriteRequest,
  AddSpecifierRequest,
  BetradarMarketResponse,
  CreateMarketGroupRequest,
  CreateOutcomeAliasRequest, DefaultSportMarketDTO,
  DeleteMarketGroupRequest,
  FetchMarketGroup,
  FilterByClientIDRequest,
  FilterByMatchID,
  FIXTURE_SERVICE_NAME,
  FixtureServiceClient,
  GetFixturesRequest,
  GetHighlightsRequest,
  GetMarketResponse,
  GetMarketsRequest,
  GetSportMenuRequest,
  protobufPackage,
  SaveMarketRequest,
  SaveTopTournamentRequest,
  UpdateMarketRequest,
} from 'src/interfaces/fixture.pb';
import {ClientGrpc} from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class FixtureService implements OnModuleInit {
  private service: FixtureServiceClient;

  constructor(@Inject(protobufPackage) private client: ClientGrpc) {}

  onModuleInit() {
    this.service =
      this.client.getService<FixtureServiceClient>(FIXTURE_SERVICE_NAME);
  }

  async GetMarkets(data: GetMarketsRequest): Promise<GetMarketResponse> {

    console.log("get markets for ", data);
    return await firstValueFrom(this.service.getMarkets(data));

  }

  GetTournaments(sportID: number) {
    console.log('GetTournaments '+sportID);
    return this.service.getTournaments({sportID: sportID});
  }

  GetSports() {
    console.log('GetSports');
    return this.service.getSports({});
  }

  async GetBetradarMarkets(): Promise<BetradarMarketResponse> {
    console.log('Bet Betradar Markets');
    return await firstValueFrom(this.service.getBetradarMarkets({}));
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

  getAllMarketGroup(data: FetchMarketGroup) {
    console.log('getAllMarketGroup ', data);
    return this.service.getAllMarketGroup(data);
  }

  addMarketGroupSpecifier(data: AddSpecifierRequest) {

    console.log('addMarketGroupSpecifier ');
    return this.service.addMarketGroupSpecifier(data);

  }

  updateMarketGroupSpecifier(data: AddSpecifierRequest) {

    console.log('updateMarketGroupSpecifier ');
    return this.service.updateMarketGroupSpecifier(data);

  }

  deleteMarket(data: DeleteMarketGroupRequest) {

    console.log('delete market ');
    return this.service.deleteMarket(data);

  }

  saveMarket(data: SaveMarketRequest) {

    console.log('save market ');
    return this.service.saveMarket(data);

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
