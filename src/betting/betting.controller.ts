import { Body, Controller, Get, Post, Patch,Param } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
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
import {BetHistoryDto, PlaceBetDto, Settings} from "./betting.pb";

@ApiTags('Betting APIs')
@Controller('betting-service')
export class BettingController {

  constructor(private readonly bettingService: BettingService) {}

  @Post('/settings')
  @ApiBody({ type: SwaggerSettings })
  @ApiOkResponse({ type: [SwaggerSettingsResponse] })
  CreateSetting(@Body() data: Settings) {

    try {

      return  this.bettingService.CreateSetting(data);

    } catch (error) {

      console.error(error);
    }

  }

  @Patch('/settings')
  @ApiBody({ type: SwaggerSettings })
  @ApiOkResponse({ type: [SwaggerSettingsResponse] })
  UpdateSetting(@Body() data: Settings) {

    try {

      return  this.bettingService.UpdateSetting(data);

    } catch (error) {

      console.error(error);

    }

  }

  @Get('/settings')
  @ApiOkResponse({ type: [SwaggerAllSettings] })
  GetAllSettings() {

    try {

      return  this.bettingService.GetAllSettings();

    } catch (error) {

      console.error(error);
    }

  }

  @Get('/settings/:client_id')
  @ApiOkResponse({ type: [SwaggerSettingsResponse] })
  GetSettingsByID(@Param() params: any) {

    try {

      return  this.bettingService.GetSettingsByID({clientID: params.client_id});

    } catch (error) {

      console.error(error);
    }
  }

  @Post('/bet/create')
  @ApiBody({ type: SwaggerPlaceBet })
  @ApiOkResponse({ type: SwaggerPlaceBetResponse })
  PlaceBet(@Body() data: PlaceBetDto) {

    try {

      return this.bettingService.PlaceBet(data);

    } catch (error) {

      console.error(error);
    }

  }

  @Post('/bet/history')
  @ApiBody({ type: SwaggerBetHistoryRequest })
  @ApiOkResponse({ type: SwaggerBetHistoryResponse })
  BetHistory(@Body() data: BetHistoryDto) {

    try {

      return this.bettingService.BetHistory(data);

    } catch (error) {

      console.error(error);
    }

  }

}
