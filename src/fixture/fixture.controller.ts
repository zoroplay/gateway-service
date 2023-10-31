import {Body, Controller, Get, Post, Param, Query, Put, Delete} from '@nestjs/common';
import {ApiBody, ApiOkResponse, ApiTags, ApiQuery, ApiOperation, ApiParam} from '@nestjs/swagger';
import { FixtureService } from './fixture.service';
import {
  SwaggerAllMarketsResponse,
  SwaggerAllSportResponse,
  SwaggerAllTournamentResponse,
  SwaggerCountResponse, SwaggerCreateOutcomeAlias, SwaggerCreateOutcomeAliasResponse,
  SwaggerFixtureOdds,
  SwaggerHighlightsResponse,
  SwaggerResponseString,
  SwaggerSportMenuRequest,
  SwaggerSportMenuResponse,
  SwaggerUpdateMarketRequest
} from "./dto";
import {CreateOutcomeAliasRequest, UpdateMarketRequest} from "./fixture.pb";

@ApiTags('Fixture APIs')
@Controller('fixture-service')
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

  @Get('/sports')
  @ApiOperation({ summary: 'Get all sports', description: 'This endpoint retrieves all the enabled sports' })
  @ApiOkResponse({ type: [SwaggerAllSportResponse] })
  GetSports() {

    try {

      return  this.fixtureService.GetSports();

    } catch (error) {

      console.error(error);
    }

  }

  @Get('/sports-menu')
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
  @ApiQuery({ name: 'page', description: 'Pagination page number' })
  @ApiQuery({ name: 'hours', description: 'show only fixture starting in the next x hours' })
  @ApiQuery({ name: 'perPage', description: 'record per page' })
  @ApiQuery({ name: 'tournamentID', description: 'filter by tournamentID' })
  @ApiQuery({ name: 'countryCode', description: 'ID of the countryCode' })
  @ApiQuery({ name: 'upcoming', description: 'Default is 0, If value is 1 then get Upcoming matches (start date is >= tomorrow )' })
  @ApiQuery({ name: 'today', description: 'Default is 0, If value is 1 then get todays matches (start date is todat )' })
  @ApiOkResponse({ type: SwaggerHighlightsResponse })
  GetHighlights(@Param() params: any,@Query() query: any) {

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
      }

      return this.fixtureService.GetHighlights(rq);

    } catch (error) {

      console.error(error);
    }

  }

  @Get('/highlight/live/:sport_id')
  @ApiOperation({ summary: 'Get live odds ', description: 'This endpoint gets prematch odds for the seleced sportID, the returned odds are for only the marketID passed in as query parameter, if market ID is not passed, default marketID is 1' })
  @ApiParam({ name: 'sportID', type: 'number', description:' Unique ID of the sport'})
  @ApiOkResponse({ type: SwaggerHighlightsResponse })
  @ApiQuery({ name: 'marketID', description: 'filter by marketID' })
  @ApiQuery({ name: 'page', description: 'Pagination page number' })
  @ApiQuery({ name: 'perPage', description: 'record per page' })
  @ApiQuery({ name: 'tournamentID', description: 'filter by tournamentID' })
  @ApiQuery({ name: 'countryCode', description: 'ID of the countryCode' })
  GetLiveHighlights(@Param() params: any,@Query() query: any) {

    try {

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
      }

      return this.fixtureService.GetLiveHighlights(rq);

    } catch (error) {

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

}