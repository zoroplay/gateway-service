import {Body, Controller, Delete, Get, Logger, Param, Post, Put, Query} from '@nestjs/common';
import {ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags} from '@nestjs/swagger';
import {FixtureService} from './fixture.service';
import {
  SwaggerAddSpecifierRequest,
  SwaggerAllMarketsResponse,
  SwaggerAllSportResponse,
  SwaggerAllTournamentResponse,
  SwaggerCountResponse,
  SwaggerCreateMarketGroupRequest,
  SwaggerCreateOutcomeAlias,
  SwaggerCreateOutcomeAliasResponse,
  SwaggerFixtureOdds,
  SwaggerFixturesRequest,
  SwaggerFixturesResponse,
  SwaggerHighlightsResponse,
  SwaggerMarketGroupResponse,
  SwaggerResponseString,
  SwaggerSportMenuRequest,
  SwaggerSportMenuResponse,
  SwaggerUpdateMarketRequest
} from "./dto";
import {
  AddSpecifierRequest,
  CreateMarketGroupRequest,
  CreateOutcomeAliasRequest,
  UpdateMarketRequest
} from "./fixture.pb";

const logger = new Logger();

@ApiTags('Sports APIs')
@Controller('sports')
export class FixtureController {

  constructor(private readonly fixtureService: FixtureService) {}

  @Get('/markets/:sport_id')
  @ApiOperation({ summary: 'Get markets for a specific sport', description: 'This endpoint retrieves market for a the supplied sport' })
  @ApiParam({ name: 'sport_id', type: 'number', description:' Unique ID of the sport'})
  @ApiOkResponse({ type: [SwaggerAllMarketsResponse] })
  GetMarkets(@Param() params: any) {

    try {

      return  this.fixtureService.GetMarkets(params.sport_id);

    } catch (error) {

      console.error(error);
    }

  }

  @Get('/tournaments/:sport_id')
  @ApiOperation({ summary: 'Get tournaments for a specific sport', description: 'This endpoint retrieves tournaments for a the supplied sport' })
  @ApiParam({ name: 'sport_id', type: 'number', description:' Unique ID of the sport'})
  @ApiOkResponse({ type: [SwaggerAllTournamentResponse] })
  GetTournaments(@Param() params: any) {

    try {

      return  this.fixtureService.GetTournaments(params.sport_id);

    } catch (error) {

      console.error(error);

    }

  }

  @Get('/')
  @ApiOperation({ summary: 'Get all sports', description: 'This endpoint retrieves all the enabled sports' })
  @ApiOkResponse({ type: [SwaggerAllSportResponse] })
  GetSports() {

    try {

      return  this.fixtureService.GetSports();

    } catch (error) {

      console.error(error);
    }

  }

  @Get('/upcoming-sports')
  @ApiOperation({ 
    summary: 'Get all upcoming sports', 
    description: 'This endpoint retrieves all upcoming sports, categories and tournaments based on a specified period of time' 
  })
  // @ApiQuery({ type: SwaggerSportMenuRequest})
  @ApiOkResponse({ type: SwaggerSportMenuResponse })
  GetSportsMenu(
    @Query() query: SwaggerSportMenuRequest
  ) {

    try {

      return  this.fixtureService.GetSportsMenu(query);

    } catch (error) {

      console.error(error);
    }

  }

  @Get('/live/games/count/:sport_id')
  @ApiOperation({ summary: 'Gets how many fixtures are live filtered by supplied sportID', description: 'This endpoint Gets how many fixtures are live filtered by supplied sportID' })
  @ApiParam({ name: 'sport_id', type: 'number', description:' Unique ID of the sport'})
  @ApiOkResponse({ type: [SwaggerCountResponse] })
  GetLiveGamesCount(@Param() params: any) {

    try {

      return  this.fixtureService.GetLiveGamesCount(params.sport_id);

    } catch (error) {

      console.error(error);
    }
  }

  @Get('/highlight/prematch/:sport_id')
  @ApiOperation({ summary: 'Get prematch odds ', description: 'This endpoint gets prematch odds for the seleced sportID, the returned odds are for only the marketID passed in as query parameter, if market ID is not passed, default marketID is 1' })
  @ApiParam({ name: 'sportID', type: 'number', description:' Unique ID of the sport'})
  @ApiQuery({ name: 'marketID', description: 'filter by marketID' })
  @ApiQuery({ name: 'specifier', description: 'filter by market specifier' })
  @ApiQuery({ name: 'page', description: 'Pagination page number' })
  @ApiQuery({ name: 'hours', description: 'show only fixture starting in the next x hours' })
  @ApiQuery({ name: 'perPage', description: 'record per page' })
  @ApiQuery({ name: 'tournamentID', description: 'filter by tournamentID' })
  @ApiQuery({ name: 'countryCode', description: 'ID of the countryCode' })
  @ApiQuery({ name: 'upcoming', description: 'Default is 0, If value is 1 then get Upcoming matches (start date is >= tomorrow )' })
  @ApiQuery({ name: 'today', description: 'Default is 0, If value is 1 then get todays matches (start date is todat )' })
  @ApiOkResponse({ type: SwaggerHighlightsResponse })
  GetHighlights(
    @Param() params: any,
    @Query() query: any
  ) {
    logger.log('fetching highlights ');

    try {

      let rq = {
        tournamentID : query.tournamentID ? parseInt(query.tournamentID) : -1,
        countryCode : query.countryCode ? query.countryCode : "",
        hours : query.hours ? query.hours : -1,
        marketID : query.marketID ? query.marketID : 1,
        page : query.page ? query.page : 1,
        perPage : query.perPage ? query.perPage : 10,
        sportID : params.sportID ? params.sportID : 1,
        upcoming : query.upcoming ? query.upcoming : 0,
        today : query.today ? query.today : 0,
        specifier: query.specifier ? query.specifier : "",
      }

      return this.fixtureService.GetHighlights(rq);

    } catch (error) {
      logger.error('error fetching highlights ' + error);

      console.error(error);
    }

  }

  @Get('/highlight/live/:sport_id')
  @ApiOperation({ summary: 'Get live odds ', description: 'This endpoint gets prematch odds for the seleced sportID, the returned odds are for only the marketID passed in as query parameter, if market ID is not passed, default marketID is 1' })
  @ApiParam({ name: 'sportID', type: 'number', description:' Unique ID of the sport'})
  @ApiOkResponse({ type: SwaggerHighlightsResponse })
  @ApiQuery({ name: 'marketID', description: 'filter by marketID' })
  @ApiQuery({ name: 'specifier', description: 'filter by market specifier' })
  @ApiQuery({ name: 'page', description: 'Pagination page number' })
  @ApiQuery({ name: 'perPage', description: 'record per page' })
  @ApiQuery({ name: 'tournamentID', description: 'filter by tournamentID' })
  @ApiQuery({ name: 'countryCode', description: 'ID of the countryCode' })
  GetLiveHighlights(@Param() params: any,@Query() query: any) {

    try {
      logger.log('fetching live highlights ');


      let rq = {
        tournamentID : query.tournamentID ? parseInt(query.tournamentID) : -1,
        countryCode : query.countryCode ? query.countryCode : "",
        hours : -1,
        marketID : query.marketID ? query.marketID : 1,
        page : query.page ? query.page : 1,
        perPage : query.perPage ? query.perPage : 10,
        sportID : params.sportID ? params.sportID : 1,
        upcoming :  0,
        today :  0,
        specifier: query.specifier ? query.specifier : "",
      }

      return this.fixtureService.GetLiveHighlights(rq);

    } catch (error) {

      logger.error('error fetching live highlights ' + error);

      console.error(error);
    }

  }

  @Get('/match/:match_id')
  @ApiOperation({ summary: 'Get all match odds ', description: 'This endpoint gets odds for all the markets for the supplied matchID' })
  @ApiParam({ name: 'match_id', type: 'number', description:' Unique ID of the match'})
  @ApiOkResponse({ type: SwaggerFixtureOdds })
  GetFixtureWithOdds(@Param() params: any) {

    try {

      return this.fixtureService.GetFixtureWithOdds(params.match_id);

    } catch (error) {

      console.error(error);
    }
  }

  @Get('/get-fixtures/:tournament_id')
  @ApiOperation({ 
    summary: 'Get all upcoming fixtures by tournament ', 
    description: 'This endpoint gets matches with odds for the supplied tournamentID' })
  @ApiParam({ name: 'tournament_id', type: 'number', description:' Unique ID of the tournament'})
  @ApiQuery({ type: SwaggerFixturesRequest })
  @ApiOkResponse({ type: SwaggerFixturesResponse })
  GetFixturesByTournament(@Param() params: any, @Query() query: any) {

    try {

      let rq = {
        tournamentID : params.tournament_id ? params.tournament_id : 1,
        source : query.source ? query.source : 'web',
        markets : query.markets ? query.markets : '',
        limit : query.limit ? query.limit : 100,
        sportID : query.sportID ? query.sportID : 1,
      }

      return this.fixtureService.GetFixtures(rq);

    } catch (error) {

      console.error(error);
    }

  }

  @Post('/admin/setting/market')
  @ApiOperation({ summary: 'Update Market Order ', description: 'This endpoint updates the market order, this is the arrangement of markets when data is return by *Get all match odds* API' })
  @ApiBody({ type: SwaggerUpdateMarketRequest })
  @ApiOkResponse({ type: SwaggerResponseString })
  UpdateMarketPriority(@Body() data: UpdateMarketRequest) {

    try {

      return this.fixtureService.UpdateMarketPriority(data);

    } catch (error) {

      console.error(error);

    }

  }

  @Post('/admin/setting/outcome/alias/create')
  @ApiOperation({ summary: 'Create outcome alias ', description: 'This endpoint creates a new outcome alias' })
  @ApiBody({ type: SwaggerCreateOutcomeAlias })
  @ApiOkResponse({ type: SwaggerCreateOutcomeAliasResponse })
  createOutcomeAlias(@Body() data: CreateOutcomeAliasRequest) {

    try {

      return this.fixtureService.createOutcomeAlias(data);

    } catch (error) {

      console.error(error);

    }

  }

  @Put('/admin/setting/outcome/alias/update')
  @ApiOperation({ summary: 'Update outcome alias ', description: 'This endpoint updates an existing outcome alias' })
  @ApiBody({ type: SwaggerCreateOutcomeAlias })
  @ApiOkResponse({ type: SwaggerCreateOutcomeAliasResponse })
  updateOutcomeAlias(@Body() data: CreateOutcomeAliasRequest) {

    try {

      return this.fixtureService.updateOutcomeAlias(data);

    } catch (error) {

      console.error(error);

    }

  }

  @Delete('/admin/setting/outcome/alias/update')
  @ApiOperation({ summary: 'Delete outcome alias ', description: 'This endpoint deletes an existing outcome alias' })
  @ApiBody({ type: SwaggerCreateOutcomeAlias })
  @ApiOkResponse({ type: SwaggerCreateOutcomeAliasResponse })
  deleteOutcomeAlias(@Body() data: CreateOutcomeAliasRequest) {

    try {

      return this.fixtureService.deleteOutcomeAlias(data);

    } catch (error) {

      console.error(error);

    }

  }

  @Get('/admin/setting/outcome/alias/:client_id/all')
  @ApiOperation({ summary: 'Get outcome alias ', description: 'This endpoint retrieves all outcome alias for a particular client' })
  @ApiParam({ name: 'client_id', type: 'number', description:' Unique ID of the client'})
  findAllOutcomeAlias(@Param() params: any) {

    try {

      let clientID = parseInt(params.client_id)

      return this.fixtureService.findAllOutcomeAlias(clientID);

    } catch (error) {

      console.error(error);
    }

  }

  @Get('/market/group/:client_id/all')
  @ApiOperation({ summary: 'Get all market groups ', description: 'This endpoint retrieves all marketgroups for a particular client' })
  @ApiParam({ name: 'client_id', type: 'number', description:' Unique ID of the client'})
  @ApiOkResponse({ type: SwaggerMarketGroupResponse })
  getAllMarketGroup(@Param() params: any) {

    try {

      let clientID = parseInt(params.client_id)

      return this.fixtureService.getAllMarketGroup(clientID);

    } catch (error) {

      console.error(error);
    }

  }

  @Post('/market/group/create')
  @ApiOperation({ summary: 'Create market group ', description: 'This endpoint creates a new market group, if the group exist it will be updated' })
  @ApiBody({ type: SwaggerCreateMarketGroupRequest })
  @ApiOkResponse({ type: SwaggerCreateOutcomeAliasResponse })
  createMarketGroup(@Body() data: CreateMarketGroupRequest) {

    try {

      return this.fixtureService.createMarketGroup(data);

    } catch (error) {

      console.error(error);

    }

  }

  @Put('/market/group/update')
  @ApiOperation({ summary: 'Update market group ', description: 'This endpoint updates an existing market group' })
  @ApiBody({ type: SwaggerCreateMarketGroupRequest })
  @ApiOkResponse({ type: SwaggerCreateOutcomeAliasResponse })
  updateMarketGroup(@Body() data: CreateMarketGroupRequest) {

    try {

      return this.fixtureService.updateMarketGroup(data);

    } catch (error) {

      console.error(error);

    }

  }

  @Delete('/market/group/:id/delete')
  @ApiOperation({ summary: 'Delete market group ', description: 'This endpoint deletes an existing market group' })
  @ApiParam({ name: 'id', type: 'number', description:' ID of the group t delete'})
  @ApiOkResponse({ type: SwaggerCreateOutcomeAliasResponse })
  deleteMarketGroup(@Param() params: any) {

    try {

      let id = parseInt(params.id)

      return this.fixtureService.deleteMarketGroup({id: id});

    } catch (error) {

      console.error(error);

    }

  }


  @Post('/market/group/specifier/create')
  @ApiOperation({ summary: 'Create market group specifier', description: 'This endpoint creates a new market group specifier, if the group exist it will be updated' })
  @ApiBody({ type: SwaggerAddSpecifierRequest })
  @ApiOkResponse({ type: SwaggerCreateOutcomeAliasResponse })
  addMarketGroupSpecifier(@Body() data: AddSpecifierRequest) {

    try {

      return this.fixtureService.addMarketGroupSpecifier(data);

    } catch (error) {

      console.error(error);

    }

  }

  @Put('/market/group/specifier/update')
  @ApiOperation({ summary: 'update market group specifier', description: 'This endpoint updates an existing market group specifier, if the group exist it will be updated' })
  @ApiBody({ type: SwaggerAddSpecifierRequest })
  @ApiOkResponse({ type: SwaggerCreateOutcomeAliasResponse })
  updateMarketGroupSpecifier(@Body() data: AddSpecifierRequest) {

    try {

      return this.fixtureService.updateMarketGroupSpecifier(data);

    } catch (error) {

      console.error(error);

    }

  }

  @Delete('/market/group/specifier/:id/delete')
  @ApiOperation({ summary: 'Delete market group specifier', description: 'This endpoint deletes an existing market group specifier' })
  @ApiParam({ name: 'id', type: 'number', description:' ID of the specifier to delete'})
  @ApiOkResponse({ type: SwaggerCreateOutcomeAliasResponse })
  deleteMarketGroupSpecifier(@Param() params: any) {

    try {

      let id = parseInt(params.id)

      return this.fixtureService.deleteMarketGroupSpecifier({id: id});

    } catch (error) {

      console.error(error);

    }

  }

}