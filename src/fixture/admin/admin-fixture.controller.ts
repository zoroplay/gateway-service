import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
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
import { FixtureService } from '../fixture.service';
import {
  SwaggerAddSpecifierRequest,
  SwaggerAllMarketsResponse,
  SwaggerAllSportResponse,
  SwaggerAllTournamentResponse,
  SwaggerCountResponse,
  SwaggerCreateMarketGroupRequest,
  SwaggerCreateOutcomeAlias,
  SwaggerCreateOutcomeAliasResponse,
  SwaggerDefaultSportMarketDTO,
  SwaggerDefaultSportMarketsDTO,
  SwaggerFixtureOdds,
  SwaggerFixturesRequest,
  SwaggerFixturesResponse,
  SwaggerHighlightsResponse,
  SwaggerMarketGroupResponse,
  SwaggerResponseString,
  SwaggerSportMenuRequest,
  SwaggerSportMenuResponse,
  SwaggerTimeoffset,
  SwaggerUpdateMarketRequest,
} from '../dto';
import {
  AddFavouriteRequest,
  AddSpecifierRequest,
  CreateMarketGroupRequest,
  CreateOutcomeAliasRequest,
  DefaultSportMarketDTO,
  UpdateMarketRequest,
} from '../fixture.pb';

const logger = new Logger();

@ApiTags('BackOffice APIs')
@Controller('admin/sports')
export class AdminFixtureController {
  constructor(private readonly fixtureService: FixtureService) {}

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

  @Post('/setting/market')
  @ApiOperation({
    summary: 'Update Market Order ',
    description:
      'This endpoint updates the market order, this is the arrangement of markets when data is return by *Get all match odds* API',
  })
  @ApiBody({ type: SwaggerUpdateMarketRequest })
  @ApiOkResponse({ type: SwaggerResponseString })
  UpdateMarketPriority(@Body() data: UpdateMarketRequest) {
    try {
      return this.fixtureService.UpdateMarketPriority(data);
    } catch (error) {
      console.error(error);
    }
  }

  @Post('/setting/outcome/alias/create')
  @ApiOperation({
    summary: 'Create outcome alias ',
    description: 'This endpoint creates a new outcome alias',
  })
  @ApiBody({ type: SwaggerCreateOutcomeAlias })
  @ApiOkResponse({ type: SwaggerCreateOutcomeAliasResponse })
  createOutcomeAlias(@Body() data: CreateOutcomeAliasRequest) {
    try {
      return this.fixtureService.createOutcomeAlias(data);
    } catch (error) {
      console.error(error);
    }
  }

  @Put('/setting/outcome/alias/update')
  @ApiOperation({
    summary: 'Update outcome alias ',
    description: 'This endpoint updates an existing outcome alias',
  })
  @ApiBody({ type: SwaggerCreateOutcomeAlias })
  @ApiOkResponse({ type: SwaggerCreateOutcomeAliasResponse })
  updateOutcomeAlias(@Body() data: CreateOutcomeAliasRequest) {
    try {
      return this.fixtureService.updateOutcomeAlias(data);
    } catch (error) {
      console.error(error);
    }
  }

  @Delete('/setting/outcome/alias/update')
  @ApiOperation({
    summary: 'Delete outcome alias ',
    description: 'This endpoint deletes an existing outcome alias',
  })
  @ApiBody({ type: SwaggerCreateOutcomeAlias })
  @ApiOkResponse({ type: SwaggerCreateOutcomeAliasResponse })
  deleteOutcomeAlias(@Body() data: CreateOutcomeAliasRequest) {
    try {
      return this.fixtureService.deleteOutcomeAlias(data);
    } catch (error) {
      console.error(error);
    }
  }

  @Get('/setting/outcome/alias/:client_id/all')
  @ApiOperation({
    summary: 'Get outcome alias ',
    description:
      'This endpoint retrieves all outcome alias for a particular client',
  })
  @ApiParam({
    name: 'client_id',
    type: 'number',
    description: ' Unique ID of the client',
  })
  findAllOutcomeAlias(@Param() params: any) {
    try {
      const clientID = parseInt(params.client_id);

      return this.fixtureService.findAllOutcomeAlias(clientID);
    } catch (error) {
      console.error(error);
    }
  }

  @Get('/market/group/:client_id/all')
  @ApiOperation({
    summary: 'Get all market groups ',
    description:
      'This endpoint retrieves all marketgroups for a particular client',
  })
  @ApiParam({
    name: 'client_id',
    type: 'number',
    description: ' Unique ID of the client',
  })
  @ApiOkResponse({ type: SwaggerMarketGroupResponse })
  getAllMarketGroup(@Param() params: any) {
    try {
      const clientID = parseInt(params.client_id);

      return this.fixtureService.getAllMarketGroup(clientID);
    } catch (error) {
      console.error(error);
    }
  }

  @Post('/market/group/create')
  @ApiOperation({
    summary: 'Create market group ',
    description:
      'This endpoint creates a new market group, if the group exist it will be updated',
  })
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
  @ApiOperation({
    summary: 'Update market group ',
    description: 'This endpoint updates an existing market group',
  })
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
  @ApiOperation({
    summary: 'Delete market group ',
    description: 'This endpoint deletes an existing market group',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: ' ID of the group t delete',
  })
  @ApiOkResponse({ type: SwaggerCreateOutcomeAliasResponse })
  deleteMarketGroup(@Param() params: any) {
    try {
      const id = parseInt(params.id);

      return this.fixtureService.deleteMarketGroup({ id: id });
    } catch (error) {
      console.error(error);
    }
  }

  @Post('/market/group/specifier/create')
  @ApiOperation({
    summary: 'Create market group specifier',
    description:
      'This endpoint creates a new market group specifier, if the group exist it will be updated',
  })
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
  @ApiOperation({
    summary: 'update market group specifier',
    description:
      'This endpoint updates an existing market group specifier, if the group exist it will be updated',
  })
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
  @ApiOperation({
    summary: 'Delete market group specifier',
    description: 'This endpoint deletes an existing market group specifier',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: ' ID of the specifier to delete',
  })
  @ApiOkResponse({ type: SwaggerCreateOutcomeAliasResponse })
  deleteMarketGroupSpecifier(@Param() params: any) {
    try {
      const id = parseInt(params.id);

      return this.fixtureService.deleteMarketGroupSpecifier({ id: id });
    } catch (error) {
      console.error(error);
    }
  }

  @Post('/sports/default-market')
  @ApiOperation({
    summary: 'Create default sport market',
    description: 'This endpoint creates Create default sport market',
  })
  @ApiBody({ type: SwaggerDefaultSportMarketDTO })
  @ApiOkResponse({ type: SwaggerResponseString })
  createDefaultSportMarket(@Body() data: DefaultSportMarketDTO) {
    try {
      return this.fixtureService.createDefaultSportMarket(data);
    } catch (error) {
      console.error(error);
    }
  }

  @Put('/sports/default-market')
  @ApiOperation({
    summary: 'Update default sport market',
    description: 'This endpoint updates default sport market',
  })
  @ApiBody({ type: SwaggerDefaultSportMarketDTO })
  @ApiOkResponse({ type: SwaggerResponseString })
  updateDefaultSportMarket(@Body() data: DefaultSportMarketDTO) {
    try {
      return this.fixtureService.updateDefaultSportMarket(data);
    } catch (error) {
      console.error(error);
    }
  }

  @Get('/sports/default-market')
  @ApiOperation({
    summary: 'Get default sport markets',
    description: 'This endpoint gets default sport market',
  })
  @ApiOkResponse({ type: SwaggerDefaultSportMarketsDTO })
  getDefaultSportMarket() {
    try {
      return this.fixtureService.getDefaultSportMarket();
    } catch (error) {
      console.error(error);
    }
  }

  @Delete('/sports/default-market/:sport_id')
  @ApiOperation({
    summary: 'Delete default sport market',
    description: 'This endpoint deletes an existing default sport market',
  })
  @ApiParam({
    name: 'sport_id',
    type: 'number',
    description: ' ID of the the sport',
  })
  @ApiOkResponse({ type: SwaggerResponseString })
  deleteDefaultSportMarket(@Param() params: any) {
    try {
      const id = parseInt(params.sport_id);

      return this.fixtureService.deleteDefaultSportMarket(id);
    } catch (error) {
      console.error(error);
    }
  }
}
