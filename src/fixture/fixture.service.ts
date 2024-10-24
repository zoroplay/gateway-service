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
  UpdateSportsMenuOrderRequest,
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

    // //("get markets for ", data);
    return await firstValueFrom(this.service.getMarkets(data));

  }

  GetTournaments(sportID: number) {
    // //('GetTournaments '+sportID);
    return this.service.getTournaments({sportID: sportID});
  }

  GetSports() {
    //('GetSports');
    return this.service.getSports({});
  }

  async GetBetradarMarkets(): Promise<BetradarMarketResponse> {
    //('Bet Betradar Markets');
    return await firstValueFrom(this.service.getBetradarMarkets({}));
  }


  GetSportsMenu(data: GetSportMenuRequest) {
    //('GetSportsMenu');
    return this.service.getSportsMenu(data);
  }

  GetCategoryMenu(data: GetSportMenuRequest) {
    // //('GetCategoryMenu');
    return this.service.getCategoriesMenu(data);
  }

  GetTournamentMenu(data: GetSportMenuRequest) {
    //('GetTournamentMenu');
    return this.service.getTournamentsMenu(data);
  }

  GetLiveGamesCount(sportID: number) {

    //('GetLiveGamesCount ');
    return this.service.getLiveGamesCount({sportID: sportID});
  }

  GetHighlights(data: GetHighlightsRequest) {

    //('GetHighlights ');
    return this.service.getHighlights(data);
  }

  GetLiveHighlights(data: GetHighlightsRequest) {

    //('GetLiveHighlights ');
    return this.service.getLiveHighlights(data);
  }

  GetFixtures(data: GetFixturesRequest) {
    //('GetFixturesByTournamentOrCategory');
    return this.service.getFixtures(data);
  }

  GetRetailFixtures(data: GetFixturesRequest) {
    //('Get Retail Fixtures');
    return this.service.getRetailFixtures(data);
  }

  GetRetailFixture(data: FilterByMatchID) {
    return this.service.getRetailFixture(data);
  }

  GetFixtureWithOdds(matchID: number,timeoffset: number) {
    //('GetFixtureWithOdds ');
    return this.service.getFixtureWithOdds({matchID: matchID, timeoffset: timeoffset});
  }

  UpdateMarketPriority(data: UpdateMarketRequest) {
    //('UpdateMarketPriority ');
    return this.service.updateMarketPriority(data);
  }

  createOutcomeAlias(data: CreateOutcomeAliasRequest) {
    //('CreateOutcomeAlias ');
    return this.service.createOutcomeAlias(data);
  }

  updateOutcomeAlias(data: CreateOutcomeAliasRequest) {
    //('updateOutcomeAlias ');
    return this.service.updateOutcomeAlias(data);
  }

  deleteOutcomeAlias(data: CreateOutcomeAliasRequest) {
    //('deleteOutcomeAlias ');
    return this.service.deleteOutcomeAlias(data);
  }

  findAllOutcomeAlias(clientID: number) {
    //('findAllOutcomeAlias ');
    return this.service.getAllOutcomeAlias({clientID: clientID});
  }


  createMarketGroup(data: CreateMarketGroupRequest) {
    //('createMarketGroup ');
    
    return this.service.createMarketGroup(data);
  }

  updateMarketGroup(data: CreateMarketGroupRequest) {
    //('updateMarketGroup ');
    return this.service.updateMarketGroup(data);
  }

  deleteMarketGroup(data: DeleteMarketGroupRequest) {
    //('createMarketGroup ');
    return this.service.deleteMarketGroup(data);
  }

  getAllMarketGroup(data: FetchMarketGroup) {
    //('getAllMarketGroup ', data);
    return this.service.getAllMarketGroup(data);
  }

  addMarketGroupSpecifier(data: AddSpecifierRequest) {

    //('addMarketGroupSpecifier ');
    return this.service.addMarketGroupSpecifier(data);

  }

  updateMarketGroupSpecifier(data: AddSpecifierRequest) {

    //('updateMarketGroupSpecifier ');
    return this.service.updateMarketGroupSpecifier(data);

  }

  deleteMarket(data: DeleteMarketGroupRequest) {
    //('delete market ');
    return this.service.deleteMarket(data);
  }

  saveMarket(data: SaveMarketRequest) {
    //('save market ');
    return this.service.saveMarket(data);
  }

  updateDefaultSportMarket(data: DefaultSportMarketDTO) {
    //('updateDefaultSportMarket ');
    return this.service.updateDefaultSportMarket(data);

  }

  getDefaultSportMarket() {

    //('getDefaultSportMarket ');
    return this.service.getDefaultSportMarket({});

  }

  deleteDefaultSportMarket(sportID: number) {
    //('deleteDefaultSportMarket ');
    return this.service.deleteDefaultSportMarket({id: sportID});
  }


  saveFavourite(data: AddFavouriteRequest) {
    //('add favourite ');
    return this.service.addFavourites(data);
  }

  getTopTournament(data: FilterByClientIDRequest) {
    //('get top tournament ');
    return this.service.getTopTournaments(data);
  }

  deleteTopTournamnet(data: DeleteMarketGroupRequest) {
    //('remove top tournament');
    return this.service.removeTopTournament(data);
  
  }

  saveTopTournament(data: SaveTopTournamentRequest) {
    //('save top tournament ');
    return this.service.saveTopTournament(data);
  }

  getSportTournamentMenu() {
    //('save top tournament ');
    return firstValueFrom(this.service.getSportsTournamentMenu({}));
  }

  updateSportsTournamentMenu(data: UpdateSportsMenuOrderRequest) {
    //('update sports tournament ');
    return this.service.updateSportsMenuOrder(data);
  }

  getActiveGames(data) {
    return this.service.getActiveGamesMarkets(data);
  }

  validateSelections(body) {
    return this.service.validateSelections(body);
  }
}
