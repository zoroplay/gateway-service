import { Body, Controller, Get, Post,Param,Query } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags,ApiQuery } from '@nestjs/swagger';
import { FixtureService } from './fixture.service';
import {
  SwaggerAllMarketsResponse,
  SwaggerAllSportResponse,
  SwaggerAllTournamentResponse,
  SwaggerCountResponse,
  SwaggerFixtureOdds,
  SwaggerHighlightsResponse,
  SwaggerResponseString,
  SwaggerTournament,
  SwaggerUpdateMarketRequest
} from "./dto";
import {UpdateMarketRequest} from "./fixture.pb";

@ApiTags('Fixture APIs')
@Controller('fixture-service')
export class FixtureController {

  constructor(private readonly fixtureService: FixtureService) {}

  @Get('/markets/:sport_id')
  @ApiOkResponse({ type: [SwaggerAllMarketsResponse] })
  GetMarkets(@Param() params: any) {

    try {

      return  this.fixtureService.GetMarkets(params.sport_id);

    } catch (error) {

      console.error(error);
    }

  }

  @Get('/tournaments/:sport_id')
  @ApiOkResponse({ type: [SwaggerAllTournamentResponse] })
  GetTournaments(@Param() params: any) {

    try {

      return  this.fixtureService.GetTournaments(params.sport_id);

    } catch (error) {

      console.error(error);

    }

  }

  @Get('/sports')
  @ApiOkResponse({ type: [SwaggerAllSportResponse] })
  GetSports() {

    try {

      return  this.fixtureService.GetSports();

    } catch (error) {

      console.error(error);
    }

  }

  @Get('/live/games/count/:sport_id')
  @ApiOkResponse({ type: [SwaggerCountResponse] })
  GetLiveGamesCount(@Param() params: any) {

    try {

      return  this.fixtureService.GetLiveGamesCount(params.sport_id);

    } catch (error) {

      console.error(error);
    }
  }

  @Get('/highlight/prematch/:sport_id')
  @ApiOkResponse({ type: SwaggerHighlightsResponse })
  GetHighlights(@Param() params: any,@Query() query: any) {

    try {

      let rq = {
        competitionID : query.competitionID ? query.competitionID : -1,
        countryCode : query.countryCode ? query.countryCode : "",
        hours : query.hours ? query.hours : -1,
        marketID : query.marketID ? query.marketID : 1,
        page : query.page ? query.page : 1,
        perPage : query.perPage ? query.perPage : 10,
        sportID : params.sport_id ? params.sport_id : 1,
      }

      return this.fixtureService.GetHighlights(rq);

    } catch (error) {

      console.error(error);
    }

  }

  @Get('/highlight/live/:sport_id')
  @ApiOkResponse({ type: SwaggerHighlightsResponse })
  @ApiQuery({ name: 'sportID', description: 'ID of the sport' })
  @ApiQuery({ name: 'marketID', description: 'filter by marketID' })
  @ApiQuery({ name: 'page', description: 'Pagination page number' })
  @ApiQuery({ name: 'hours', description: 'show only fixture starting in the next x hours' })
  @ApiQuery({ name: 'perPage', description: 'record per page' })
  @ApiQuery({ name: 'competitionID', description: 'filter by competitionID' })
  @ApiQuery({ name: 'countryCode', description: 'ID of the countryCode' })
  GetLiveHighlights(@Param() params: any,@Query() query: any) {

    try {

      let rq = {
        competitionID : query.competitionID ? query.competitionID : -1,
        countryCode : query.countryCode ? query.countryCode : "",
        hours : query.hours ? query.hours : -1,
        marketID : query.marketID ? query.marketID : 1,
        page : query.page ? query.page : 1,
        perPage : query.perPage ? query.perPage : 10,
        sportID : params.sport_id ? params.sport_id : 1,
      }

      return this.fixtureService.GetLiveHighlights(rq);

    } catch (error) {

      console.error(error);
    }

  }

  @Post('/match/:match_id')
  @ApiOkResponse({ type: SwaggerFixtureOdds })
  GetFixtureWithOdds(@Param() params: any) {

    try {

      return this.fixtureService.GetFixtureWithOdds(params.match_id);

    } catch (error) {

      console.error(error);
    }

  }

  @Post('/admin/setting/market')
  @ApiBody({ type: SwaggerUpdateMarketRequest })
  @ApiOkResponse({ type: SwaggerResponseString })
  UpdateMarketPriority(@Body() data: UpdateMarketRequest) {

    try {

      return this.fixtureService.UpdateMarketPriority(data);

    } catch (error) {

      console.error(error);

    }

  }

}