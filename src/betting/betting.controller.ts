import { Body, Controller, Get, Post, Patch, Param } from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { BettingService } from './betting.service';
import {
  SwaggerAllSettings,
  SwaggerBetHistoryRequest,
  SwaggerBetHistoryResponse,
  SwaggerPlaceBet,
  SwaggerPlaceBetResponse,
  SwaggerSettings,
  SwaggerSettingsResponse,
} from './dto';
import {
  BetHistoryRequest,
  BetHistoryResponse,
  PlaceBetRequest,
  Settings,
} from './betting.pb';

@ApiTags('Betting APIs')
@Controller('betting-service')
export class BettingController {
  constructor(private readonly bettingService: BettingService) {}

  @Post('/settings')
  @ApiOperation({
    summary: 'Create a client betting settings',
    description:
      'Clients betting settings includes all the unique features of particular client in regards to processing bets, this includes tax settings, stake settings, risk settings etc',
  })
  @ApiBody({ type: SwaggerSettings })
  @ApiOkResponse({ type: [SwaggerSettingsResponse] })
  CreateSetting(@Body() data: Settings) {
    try {
      return this.bettingService.CreateSetting(data);
    } catch (error) {
      console.error(error);
    }
  }

  @Patch('/settings')
  @ApiOperation({
    summary: 'Update a client betting settings',
    description:
      'Clients betting settings includes all the unique features of particular client in regards to processing bets, this includes tax settings, stake settings, risk settings etc',
  })
  @ApiBody({ type: SwaggerSettings })
  @ApiOkResponse({ type: [SwaggerSettingsResponse] })
  UpdateSetting(@Body() data: Settings) {
    try {
      return this.bettingService.UpdateSetting(data);
    } catch (error) {
      console.error(error);
    }
  }

  @Get('/settings')
  @ApiOperation({
    summary: 'Get all clients betting settings',
    description:
      'Clients betting settings includes all the unique features of particular client in regards to processing bets, this includes tax settings, stake settings, risk settings etc',
  })
  @ApiOkResponse({ type: [SwaggerAllSettings] })
  GetAllSettings() {
    try {
      return this.bettingService.GetAllSettings();
    } catch (error) {
      console.error(error);
    }
  }

  @Get('/settings/:client_id')
  @ApiOperation({
    summary: 'Get a client betting settings',
    description:
      'Clients betting settings includes all the unique features of particular client in regards to processing bets, this includes tax settings, stake settings, risk settings etc',
  })
  @ApiParam({ name: 'client_id', type: 'number' })
  @ApiOkResponse({ type: [SwaggerSettingsResponse] })
  GetSettingsByID(@Param() params: any) {
    try {
      return this.bettingService.GetSettingsByID({
        clientID: params.client_id,
      });
    } catch (error) {
      console.error(error);
    }
  }

  @Post('/bet/create')
  @ApiOperation({
    summary: 'Place a bet request',
    description:
      'Receives a bet request with all the required detailed, upon successful bet placement, unique betID is returned',
  })
  @ApiBody({ type: SwaggerPlaceBet })
  @ApiOkResponse({ type: SwaggerPlaceBetResponse })
  PlaceBet(@Body() data: PlaceBetRequest) {
    try {
      return this.bettingService.PlaceBet(data);
    } catch (error) {
      console.error(error);
    }
  }

  @Post('/bet/history')
  @ApiOperation({
    summary: 'Retrieve bet history of a user',
    description:
      'Retrieves bet history of user, date object can be passed to filter only bets for a specific day',
  })
  @ApiBody({ type: SwaggerBetHistoryRequest })
  @ApiOkResponse({ type: SwaggerBetHistoryResponse })
  BetHistory(@Body() data: BetHistoryRequest) {
    try {
      return this.bettingService.BetHistory(data);
    } catch (error) {
      console.error(error);
    }
  }
}
