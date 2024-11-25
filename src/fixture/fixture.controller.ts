import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { FixtureService } from './fixture.service';
import {
  SwaggerAllMarketsResponse,
  SwaggerAllSportResponse,
  SwaggerAllTournamentResponse,
  SwaggerCountResponse,
  SwaggerFixtureOdds,
  SwaggerFixturesRequest,
  SwaggerFixturesResponse,
  SwaggerHighlightsResponse,
  SwaggerSportMenuRequest,
  SwaggerSportMenuResponse,
  SwaggerTimeoffset,
  SwaggerValidateSelection,
} from './dto';
import { SwaggerCommonResponse, SwaggerValidateSelectionResponse } from 'src/identity/dto';
import { ValidateSelectionRequests } from 'src/interfaces/fixture.pb';

const logger = new Logger();

@ApiTags('Sports APIs')
@Controller('sports')
export class FixtureController {
  constructor(private readonly fixtureService: FixtureService) {}


  @Get('/menu')
  @ApiOperation({
    summary: 'Get all upcoming sports',
    description:
      'This endpoint retrieves all upcoming sports based on a specified period of time',
  })
  @ApiQuery({ type: SwaggerSportMenuRequest})
  @ApiOkResponse({ type: SwaggerSportMenuResponse })
  sportsMenu(@Query() query) {
    // console.log(query)
    try {
      return this.fixtureService.GetSportsMenu(query);
    } catch (error) {
      console.error(error);
    }
  }

  @Get('/categories/:sport')
  @ApiOperation({
    summary: 'Get all upcoming categories by sports',
    description:
      'This endpoint retrieves all upcoming categories based on a specified period of time and sport id',
  })
  @ApiQuery({ type: SwaggerSportMenuRequest})
  @ApiOkResponse({ type: SwaggerSportMenuResponse })
  categoryMenu(
    @Param('sport') sport: number = 1,
    @Query() query
  ) {
    try {
      query.sportId = sport;
      return this.fixtureService.GetCategoryMenu(query);
    } catch (error) {
      console.error(error);
    }
  }

  @Get('/tournaments/:category')
  @ApiOperation({
    summary: 'Get all upcoming tournaments by category id',
    description:
      'This endpoint retrieves all upcoming tournaments based on a specified period of time and category id',
  })
  @ApiQuery({ type: SwaggerSportMenuRequest})
  @ApiOkResponse({ type: SwaggerSportMenuResponse })
  tournamentMenu(
    @Param('category') category: number = 1,
    @Query() query
  ) {
    try {
      query.categoryId = category;
      return this.fixtureService.GetTournamentMenu(query);
    } catch (error) {
      console.error(error);
    }
  }

  @Get('/markets/:sport_id')
  @ApiOperation({
    summary: 'Get markets for a specific sport',
    description: 'This endpoint retrieves market for a the supplied sport',
  })
  @ApiParam({
    name: 'sport_id',
    type: 'number',
    description: ' Unique ID of the sport',
  })
  @ApiOkResponse({ type: [SwaggerAllMarketsResponse] })
  GetMarkets(@Param() params: any) {
    try {
      return this.fixtureService.GetMarkets(params.sport_id);
    } catch (error) {
      console.error(error);
    }
  }

  @Get('/tournaments/:sport_id')
  @ApiOperation({
    summary: 'Get tournaments for a specific sport',
    description: 'This endpoint retrieves tournaments for a the supplied sport',
  })
  @ApiParam({
    name: 'sport_id',
    type: 'number',
    description: ' Unique ID of the sport',
  })
  @ApiOkResponse({ type: [SwaggerAllTournamentResponse] })
  GetTournaments(@Param() params: any) {
    try {
      return this.fixtureService.GetTournaments(params.sport_id);
    } catch (error) {
      console.error(error);
    }
  }

  @Get('/all')
  @ApiOperation({
    summary: 'Get all sports',
    description: 'This endpoint retrieves all the enabled sports',
  })
  @ApiOkResponse({ type: [SwaggerAllSportResponse] })
  GetSports() {
    try {
      return this.fixtureService.GetSports();
    } catch (error) {
      console.error(error);
    }
  }

  

  @Get('/live/games/count/:sport_id')
  @ApiOperation({
    summary: 'Gets how many fixtures are live filtered by supplied sportID',
    description:
      'This endpoint Gets how many fixtures are live filtered by supplied sportID',
  })
  @ApiParam({
    name: 'sport_id',
    type: 'number',
    description: ' Unique ID of the sport',
  })
  @ApiOkResponse({ type: [SwaggerCountResponse] })
  GetLiveGamesCount(@Param() params: any) {
    try {
      return this.fixtureService.GetLiveGamesCount(params.sport_id);
    } catch (error) {
      console.error(error);
    }
  }

  @Get('/highlight/prematch/:sport_id')
  @ApiOperation({
    summary: 'Get prematch odds ',
    description:
      'This endpoint gets prematch odds for the seleced sportID, the returned odds are for only the marketID passed in as query parameter, if market ID is not passed, default marketID is 1',
  })
  @ApiParam({
    name: 'sportID',
    type: 'number',
    description: ' Unique ID of the sport',
  })
  @ApiQuery({ name: 'marketID', description: 'filter by marketID' })
  @ApiQuery({ name: 'specifier', description: 'filter by market specifier' })
  @ApiQuery({ name: 'page', description: 'Pagination page number' })
  @ApiQuery({
    name: 'hours',
    description: 'show only fixture starting in the next x hours',
  })
  @ApiQuery({ name: 'perPage', description: 'record per page' })
  @ApiQuery({ name: 'tournamentID', description: 'filter by tournamentID' })
  @ApiQuery({ name: 'countryCode', description: 'ID of the countryCode' })
  @ApiQuery({
    name: 'upcoming',
    description:
      'Default is 0, If value is 1 then get Upcoming matches (start date is >= tomorrow )',
  })
  @ApiQuery({
    name: 'today',
    description:
      'Default is 0, If value is 1 then get todays matches (start date is todat )',
  })
  @ApiQuery({ name: 'timeoffset', description: 'Default is 0, GMT timeoffset' })
  @ApiQuery({
    name: 'favourite',
    description: 'Default is 0, Query fixtures by favourite teams',
  })
  @ApiQuery({ name: 'userId', description: 'UserID to query for favourites' })
  @ApiOkResponse({ type: SwaggerHighlightsResponse })
  GetHighlights(@Param() params: any, @Query() query: any) {
    logger.log('fetching highlights ');

    try {
      const rq = {
        tournamentID: query.tournamentID ? parseInt(query.tournamentID) : -1,
        countryCode: query.countryCode ? query.countryCode : '',
        hours: query.hours ? query.hours : -1,
        marketID: query.marketID ? query.marketID : 1,
        page: query.page ? query.page : 1,
        perPage: query.perPage ? query.perPage : 10,
        sportID: params.sport_id ? params.sport_id : 1,
        upcoming: query.upcoming ? query.upcoming : 0,
        today: query.today ? query.today : 0,
        timeoffset: query.timeoffset ? query.timeoffset : 0,
        specifier: query.specifier ? query.specifier : '',
        search: query.search ? query.search : '',
      };

      return this.fixtureService.GetHighlights(rq);
    } catch (error) {
      logger.error('error fetching highlights ' + error);

      console.error(error);
    }
  }

  @Get('/highlight/live/:sport_id')
  @ApiOperation({
    summary: 'Get live odds ',
    description:
      'This endpoint gets prematch odds for the seleced sportID, the returned odds are for only the marketID passed in as query parameter, if market ID is not passed, default marketID is 1',
  })
  @ApiParam({
    name: 'sportID',
    type: 'number',
    description: ' Unique ID of the sport',
  })
  @ApiOkResponse({ type: SwaggerHighlightsResponse })
  @ApiQuery({ name: 'marketID', description: 'filter by marketID' })
  @ApiQuery({ name: 'specifier', description: 'filter by market specifier' })
  @ApiQuery({ name: 'page', description: 'Pagination page number' })
  @ApiQuery({ name: 'perPage', description: 'record per page' })
  @ApiQuery({ name: 'tournamentID', description: 'filter by tournamentID' })
  @ApiQuery({ name: 'countryCode', description: 'ID of the countryCode' })
  @ApiQuery({ name: 'timeoffset', description: 'Default is 0, GMT timeoffset' })
  @ApiQuery({
    name: 'search',
    description: 'Search string for team name, tournament or category',
  })
  GetLiveHighlights(@Param() params: any, @Query() query: any) {
    try {
      logger.log('fetching live highlights');

      const rq = {
        tournamentID: query.tournamentID ? parseInt(query.tournamentID) : -1,
        countryCode: query.countryCode ? query.countryCode : '',
        hours: -1,
        marketID: query.marketID ? query.marketID : 1,
        page: query.page ? query.page : 1,
        perPage: query.perPage ? query.perPage : 100,
        sportID: params.sport_id ? params.sport_id : 0,
        upcoming: 0,
        today: 0,
        timeoffset: query.timeoffset ? query.timeoffset : 0,
        specifier: query.specifier ? query.specifier : '',
        search: query.search ? query.search : '',
      };

      return this.fixtureService.GetLiveHighlights(rq);
    } catch (error) {
      logger.error('error fetching live highlights ' + error);

      console.error(error);
    }
  }

  @Get('/match/:match_id')
  @ApiOperation({
    summary: 'Get all match odds ',
    description:
      'This endpoint gets odds for all the markets for the supplied matchID',
  })
  @ApiParam({
    name: 'match_id',
    type: 'number',
    description: ' Unique ID of the match',
  })
  @ApiQuery({ type: SwaggerTimeoffset })
  @ApiOkResponse({ type: SwaggerFixtureOdds })
  GetFixtureWithOdds(@Param() params: any, @Query() query: any) {
    const timeoffset = query.timeoffset ? query.timeoffset : 0;

    try {
      return this.fixtureService.GetFixtureWithOdds(
        params.match_id,
        timeoffset,
      );
    } catch (error) {
      console.error(error);
    }
  }

  @Get('/get-fixtures/:tournament_id')
  @ApiOperation({
    summary: 'Get all upcoming fixtures by tournament ',
    description:
      'This endpoint gets matches with odds for the supplied tournamentID',
  })
  @ApiParam({
    name: 'tournament_id',
    type: 'number',
    description: ' Unique ID of the tournament',
  })
  @ApiQuery({ type: SwaggerFixturesRequest })
  @ApiOkResponse({ type: SwaggerFixturesResponse })
  GetFixturesByTournament(@Param() params: any, @Query() query: any) {
    try {
      const rq = {
        tournamentID: params.tournament_id ? parseInt(params.tournament_id) : 1,
        source: query.source ? query.source : 'web',
        markets: query.markets ? query.markets : '',
        limit: query.limit ? query.limit : 100,
        sportID: query.sportID ? query.sportID : 1,
        period: query.period ? query.period : 'all',
        timeoffset: query.timeoffset ? query.timeoffset : 0,
      };

      return this.fixtureService.GetFixtures(rq);
    } catch (error) {
      console.error(error);
    }
  }

  @Get('/fixtures/upcoming')
  @ApiOperation({
    summary: 'Get all upcoming fixtures by period ',
    description:
      'This endpoint gets matches with odds for the specified period',
  })
  @ApiQuery({ type: SwaggerFixturesRequest })
  @ApiOkResponse({ type: SwaggerFixturesResponse })
  GetFixturesByPeriod(@Param() params: any, @Query() query: any) {
    try {
      const rq = {
        source: query.source ? query.source : 'web',
        markets: query.markets ? query.markets : '',
        limit: query.limit ? query.limit : 100,
        sportID: query.sportID ? query.sportID : 1,
        period: query.period ? query.period : 'all',
        timeoffset: query.timeoffset ? query.timeoffset : 0,
        startDate: query.start,
        endDate: query.end,
      };

      return this.fixtureService.GetFixtures(rq);
    } catch (error) {
      console.error(error);
    }
  }

  @Get('/retail/fixtures/:tournament_id')
  @ApiOperation({
    summary: 'Get all upcoming fixtures by tournament ',
    description:
      'This endpoint gets matches with odds for the supplied tournamentID',
  })
  @ApiParam({
    name: 'tournament_id',
    type: 'number',
    description: ' Unique ID of the tournament',
  })
  @ApiQuery({ type: SwaggerFixturesRequest })
  @ApiOkResponse({ type: SwaggerFixturesResponse })
  GetRetailFixtures(@Param() params: any, @Query() query: any) {
    try {
      const rq = {
        tournamentID: params.tournament_id ? parseInt(params.tournament_id) : 1,
        source: query.source ? query.source : 'web',
        markets: query.markets ? query.markets : '',
        limit: query.limit ? query.limit : 100,
        sportID: query.sportID ? query.sportID : 1,
        period: query.period ? query.period : 'all',
        timeoffset: query.timeoffset ? query.timeoffset : 0,
        specifier: query.specifier || ''
      };
      return this.fixtureService.GetRetailFixtures(rq);
    } catch (error) {
      console.error(error);
    }
  }

  @Get('/retail/fixture/:match_id')
  @ApiOperation({
    summary: 'Get all match odds ',
    description:
      'This endpoint gets odds for all the markets for the supplied matchID',
  })
  @ApiParam({
    name: 'match_id',
    type: 'number',
    description: ' Unique ID of the match',
  })
  @ApiQuery({ type: SwaggerTimeoffset })
  @ApiOkResponse({ type: SwaggerFixtureOdds })
  GetRetailFixture(
    @Param() params: any,
    @Query() query: any
  ) {
    const timeoffset = query.timeoffset ? query.timeoffset : 0;

    try {
      return this.fixtureService.GetRetailFixture({
        matchID: params.match_id,
        timeoffset,
      });
    } catch (error) {
      console.error(error);
    }
  }


  @Get('/retail/get-active-games')
  @ApiOperation({
    summary: 'Get active games and markets ',
    description:
      'This endpoint gets active games and markets for cashier',
  })
  @ApiQuery({ type: SwaggerTimeoffset })
  @ApiOkResponse({ type: SwaggerCommonResponse })
  GetActiveGames(
    @Query() query: any
  ) {
    const timeoffset = query.timeoffset ? query.timeoffset : 0;

    try {
      return this.fixtureService.getActiveGames({
        timeoffset,
      });
    } catch (error) {
      console.error(error);
    }
  }

  @Post('/retail/validate-selections')
  @ApiOperation({
    summary: 'Validate retail bet selections',
    description:
      'This endpoint validates cashier selections before placing bet',
  })
  @ApiBody({ type: SwaggerValidateSelection, description: 'submit as an array' })
  @ApiOkResponse({ type: SwaggerValidateSelectionResponse })
  ValidateSelections(
    @Body() data: ValidateSelectionRequests
  ) {
    try {
      // console.log(data)
      return this.fixtureService.validateSelections({data});
    } catch (error) {
      console.error(error);
    }
  }

  @Get('/get-fixtures-by-category/:category_id')
  @ApiOperation({
    summary: 'Get all upcoming fixtures by category ',
    description:
      'This endpoint gets matches with odds for the supplied categoryID',
  })
  @ApiParam({
    name: 'category_id',
    type: 'number',
    description: ' Unique ID of the category',
  })
  @ApiQuery({ type: SwaggerFixturesRequest })
  @ApiOkResponse({ type: SwaggerFixturesResponse })
  GetFixturesByCategory(@Param() params: any, @Query() query: any) {
    try {
      const rq = {
        categoryID: params.category_id ? parseInt(params.category_id) : 1,
        source: query.source ? query.source : 'web',
        markets: query.markets ? query.markets : '',
        limit: query.limit ? query.limit : 100,
        sportID: query.sportID ? query.sportID : 1,
        period: query.period ? query.period : 'all',
        timeoffset: query.timeoffset ? query.timeoffset : 0,
      };

      return this.fixtureService.GetFixtures(rq);
    } catch (error) {
      console.error(error);
    }
  }

}
