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
  AddFavouriteResponse,
  SwaggerAddSpecifierRequest,
  SwaggerAllSportResponse,
  SwaggerCreateMarketGroupRequest,
  SwaggerCreateOutcomeAlias,
  SwaggerCreateOutcomeAliasResponse,
  SwaggerDefaultSportMarketDTO,
  SwaggerDefaultSportMarketsDTO,
  SwaggerMarketGroupResponse,
  SwaggerResponseString,
  SwaggerUpdateMarketRequest,
} from '../dto';
import {
  AddSpecifierRequest,
  CreateMarketGroupRequest,
  CreateOutcomeAliasRequest,
  DefaultSportMarketDTO,
  SaveMarketRequest,
  SaveTopTournamentRequest,
  UpdateSportsMenuOrderRequest,
} from 'src/interfaces/fixture.pb';
import { SwaggerCommonResponse } from 'src/identity/dto';

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

  @Get('/markets/betradar')
  @ApiOperation({
    summary: 'Get all betradar markets',
    description: 'This endpoint retrieves all market list by betradar',
  })
  @ApiOkResponse({ type: [SwaggerCommonResponse] })
  GetBetradarMarkets() {
    try {
      return this.fixtureService.GetBetradarMarkets();
    } catch (error) {
      console.error(error);
    }
  }

  @Get(':client_id/markets/list')
  @ApiOperation({
    summary: 'Get all markets by client, sports and market group',
    description: 'This endpoint retrieves all markets for a client by sport ID and market group ID',
  })
  @ApiOkResponse({ type: [SwaggerCommonResponse] })
  @ApiParam({
    name: 'client_id',
    type: 'number',
    description: ' Unique ID of the client',
  })
  @ApiQuery({
    name: 'sport_id',
    type: 'number',
    description: ' Unique ID of the sport',
  })
  @ApiParam({
    name: 'group_id',
    type: 'number',
    description: ' Unique ID of the market group',
  })
  GetMarkets(
    @Param('client_id') clientID: number,
    @Query('sport_id') sportID: number,
    @Query('group_id') groupID: number,
  ) {
    try {
      return this.fixtureService.GetMarkets({
        clientID, sportID, groupID
      });
    } catch (error) {
      console.error(error);
    }
  }

  @Post(':client_id/markets/save')
  @ApiOperation({
    summary: 'Update Market Order ',
    description:
      'This endpoint updates the market order, this is the arrangement of markets when data is return by *Get all match odds* API',
  })
  @ApiParam({
    name: 'client_id',
    type: 'number',
    description: ' Unique ID of the client',
  })
  @ApiBody({ type: SwaggerUpdateMarketRequest })
  @ApiOkResponse({ type: SwaggerCommonResponse })
  SaveMarket(
    @Body() data: SaveMarketRequest,
    @Param('client_id') clientID: number
  ) {
    try {
      data.clientID = clientID;
      return this.fixtureService.saveMarket(data);
    } catch (error) {
      console.error(error);
    }
  }

  @Post(':client_id/markets/save-outcomes')
  @ApiOperation({
    summary: 'Save Market Outcomes ',
    description: 'This endpoint is used to create or update market outcomes',
  })
  @ApiBody({ type: SwaggerCreateOutcomeAlias })
  @ApiOkResponse({ type: SwaggerCreateOutcomeAliasResponse })
  createOutcomeAlias(
    @Body() data: CreateOutcomeAliasRequest,
    @Param('client_id') clientID: number
  ) {
    try {
      data.clientID = clientID;
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

  @Get(':client_id/market/:sport_id/groups')
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
  @ApiParam({
    name: 'sport_id',
    type: 'number',
    description: ' Unique ID of the sport',
  })
  @ApiOkResponse({ type: SwaggerMarketGroupResponse })
  getAllMarketGroup(@Param() params: any) {
    try {
      const clientID = parseInt(params.client_id);
      const sportID = parseInt(params.sport_id);

      return this.fixtureService.getAllMarketGroup({clientID, sportID});
    } catch (error) {
      console.error(error);
    }
  }

  @Post('/markets/groups/create')
  @ApiOperation({
    summary: 'Create new market group ',
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

  @Put('/markets/groups/update')
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

  @Delete('/markets/:id/delete')
  @ApiOperation({
    summary: 'Delete a market',
    description: 'This endpoint deletes an existing market',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: ' ID of the market to delete',
  })
  @ApiOkResponse({ type: SwaggerCommonResponse })
  deleteMarket(@Param() params: any) {
    try {
      const id = parseInt(params.id);

      return this.fixtureService.deleteMarket({ id: id });
    } catch (error) {
      console.error(error);
    }
  }

  @Get('/get-menu')
  @ApiOperation({
    summary: 'Get All Sports Menu',
    description: 'This endpoint fetches all Sports, Categories and Tournaments',
  })
  // @ApiBody({ type: SwaggerDefaultSportMarketDTO })
  @ApiOkResponse({ type: SwaggerResponseString })
  fetchSportsMenu() {
    return this.fixtureService.getSportTournamentMenu();
  }

  @Put('/update/sports-menu')
  @ApiOperation({
    summary: 'Update sports menu order',
    description: 'This endpoint updates default sport market',
  })
  @ApiOkResponse({ type: SwaggerResponseString })
  updateDefaultSportMarket(@Body() body) {
    try {
      const data = JSON.stringify(body.data);
      return this.fixtureService.updateSportsTournamentMenu({data});
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

  @Get(':clientId/top-bets')
  @ApiOperation({
    summary: 'Get top tournaments',
    description: 'This endpoint fetches top tournaments',
  })
  @ApiParam({
    name: 'clientId',
    type: 'number',
    description: 'SBE Client ID',
  })
  @ApiOkResponse({ type: AddFavouriteResponse })
  getTopTournaments(@Param() params: any) {
    try {
      const id = parseInt(params.clientId);

      return this.fixtureService.getTopTournament({clientID: id});
    } catch (error) {
      console.error(error);
    }
  }

  @Post(':clientId/top-bets')
  @ApiOperation({
    summary: 'Save top tournament',
    description: 'This endpoint adds new top tournament',
  })
  @ApiParam({
    name: 'clientId',
    type: 'number',
    description: 'SBE Client ID',
  })
  @ApiOkResponse({ type: AddFavouriteResponse })
  saveTopTournamnet(
    @Param() params: any,
    @Body() body: SaveTopTournamentRequest
  ) {
    try {
      body.clientID = parseInt(params.clientId);

      return this.fixtureService.saveTopTournament(body);
    } catch (error) {
      console.error(error);
    }
  }

  @Delete(':clientId/top-bets/delete/:id')
  @ApiOperation({
    summary: 'Delete top tournament',
    description: 'This endpoint deletes an existing top tournament',
  })
  @ApiParam({
    name: 'clientId',
    type: 'number',
    description: 'SBE Client ID',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'Top tournament ID',
  })
  @ApiOkResponse({ type: AddFavouriteResponse })
  deletTopTournament(@Param() params: any) {
    try {
      const id = parseInt(params.id);

      return this.fixtureService.deleteTopTournamnet({id});
    } catch (error) {
      console.error(error);
    }
  }
}
