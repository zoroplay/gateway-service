import {Controller, Get, Param, Query} from '@nestjs/common';
import {ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags,} from '@nestjs/swagger';
import {OutrightsService} from './outrights.service';
import {SwaggerOutrightsResponse} from "./dto";

@ApiTags('Outrights APIs')
@Controller('outrights')
export class OutrightsController {

  constructor(private readonly outrightsService: OutrightsService) {}

  @Get('/fixture/:sport_id')
  @ApiOperation({ summary: 'Get outrights fixtures ', description: 'This endpoint gets outrights fixtures and odds for the seleced sportID' })
  @ApiParam({ name: 'sportID', type: 'number', description:' Unique ID of the sport'})
  @ApiOkResponse({ type: SwaggerOutrightsResponse })
  @ApiQuery({ name: 'page', description: 'Pagination page number' })
  @ApiQuery({ name: 'perPage', description: 'record per page' })
  @ApiQuery({ name: 'tournamentID', description: 'filter by tournamentID' })
  @ApiQuery({ name: 'countryCode', description: 'ID of the countryCode' })
  GetFixtures(@Param() params: any,@Query() query: any) {

    try {

      let rq = {
        tournamentID : query.tournamentID ? parseInt(query.tournamentID) : -1,
        countryCode : query.countryCode ? query.countryCode : "",
        page : query.page ? query.page : 1,
        perPage : query.perPage ? query.perPage : 100,
        sportID : params.sport_id ? params.sport_id : 0,
      }

      return this.outrightsService.GetFixtures(rq);

    } catch (error) {

      console.error(error);
    }

  }


}
