import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Ip,
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
import { BettingService } from './betting.service';
import {
  FindBetDTO,
  SwaggerAllSettings,
  SwaggerBetHistoryRequest,
  SwaggerBetHistoryResponse,
  SwaggerCashoutRequest,
  SwaggerFindBetResponse,
  SwaggerPlaceBet,
  SwaggerPlaceBetResponse,
  SwaggerProbability,
  SwaggerSettings,
  SwaggerSettingsResponse,
  SwaggerUpdateBetRequest,
  SwaggerUpdateBetResponse,
} from './dto';
import {
  BetHistoryRequest,
  GamingActivityRequest,
  PlaceBetRequest,
  ProcessCashoutRequest,
  Settings,
  UpdateBetRequest,
} from './betting.pb';
import { SwaggerCommonResponse } from 'src/identity/dto';

@ApiTags('Betting APIs')
@Controller('bets')
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

  @Post('/place-bet/:client_id')
  @ApiOperation({
    summary: 'Place a bet request',
    description:
      'Receives a bet request with all the required detailed, upon successful bet placement, unique betID is returned',
  })
  @ApiParam({ name: 'client_id', type: 'number' })
  @ApiBody({ type: SwaggerPlaceBet })
  @ApiOkResponse({ type: SwaggerPlaceBetResponse })
  PlaceBet(
    @Body() data, 
    @Param() param: any, 
    @Ip() ip: any
  ) {
    try {
      data.clientId = param.client_id;
      data.ipAddress = ip;
      data.betType = data.bet_type;
      data.type = data.event_type;
      // console.log(data);
      return this.bettingService.PlaceBet(data);
    } catch (error) {
      console.error(error);
    }
  }

  @Post('/update-bet/:client_id')
  @ApiOperation({
    summary: 'Update a bet request',
    description: 'Update bet or bet selections status',
  })
  @ApiParam({ name: 'client_id', type: 'number' })
  @ApiBody({ type: SwaggerUpdateBetRequest })
  @ApiOkResponse({ type: SwaggerUpdateBetResponse })
  UpdateBet(
    @Body() data: UpdateBetRequest,
    @Param() param: any,
    @Ip() ip: any,
  ) {
    try {
      data.clientId = param.client_id;
      return this.bettingService.UpdateBet(data);
    } catch (error) {
      console.error(error);
    }
  }

  @Post('/find-coupon')
  @ApiOperation({
    summary: 'Find bet by betslip ID',
    description:
        'This endpoints retrieves a bet if found',
  })
  @ApiOkResponse({ type: SwaggerFindBetResponse })
  FindCoupon(
    @Body() body: FindBetDTO,
  ) {

    try {

      return this.bettingService.GetCoupon(body);

    } catch (error) {

      console.error(error);

    }
  }

  @Post('/history')
  @ApiOperation({
    summary: 'Retrieve bet history of a user',
    description:
      'Retrieves bet history of user, date object can be passed to filter only bets for a specific day',
  })
  @ApiBody({ type: SwaggerBetHistoryRequest })
  @ApiOkResponse({ type: SwaggerBetHistoryResponse })
  BetHistory(@Query() query, @Body() data: BetHistoryRequest) {
    try {
      const rq = {
        userId: data.userId,
        clientId: data.clientId,
        status: data.status,
        from: data.from,
        to: data.to,
        page: query.page ? query.page : 1,
        perPage: query.perPage ? query.perPage : 100,
      };
      return this.bettingService.BetHistory(data);
    } catch (error) {
      console.error(error);
    }
  }

  @Get('/probability/:bet_id')
  @ApiOperation({
    summary: 'Get probability of the supplied betID',
    description: 'This endpoints retrieve probability of the supplied betID',
  })
  @ApiParam({ name: 'bet_id', type: 'number' })
  @ApiOkResponse({ type: SwaggerProbability })
  GetProbabilityFromBetID(@Param() params: any) {
    try {
      return this.bettingService.getProbabilityFromBetId({
        betID: params.bet_id,
      });
    } catch (error) {
      console.error(error);
    }
  }

  @Post('/find-bet')
  @ApiOperation({
    summary: 'Get booking code',
    description: 'This endpoints retrieves a booked game for rebet',
  })
  @ApiParam({ name: 'client_id', type: 'number' })
  @ApiQuery({ name: 'code', type: 'string' })
  @ApiOkResponse({ type: SwaggerPlaceBetResponse })
  GetBooking(@Param() param: any, @Query() query: any) {
    try {
      return this.bettingService.GetCoupon({
        betslipId: query.code,
        clientId: param.client_id,
      });
    } catch (error) {
      console.error(error);
    }
  }

  @Post('/reporting/gaming-activity')
  @ApiOperation({
    summary: 'Get client Gaming activity for a period',
    description:
        'This endpoints retrieves a summary of bets placed for either sports, virtual or casino',
  })
  @ApiBody({ type: SwaggerBetHistoryRequest })
  @ApiOkResponse({ type:  SwaggerFindBetResponse})
  GamingActivity(
    @Body() body: GamingActivityRequest,
  ) {

    try {

      return this.bettingService.getGamingActivity(body);

    } catch (error) {

      console.error(error);

    }
  }

  @Post('/cashout')
  @ApiOperation({
    summary: 'Process Cashout',
    description:
        'This endpoints process cashout request by user',
  })
  @ApiBody({ type: SwaggerCashoutRequest })
  @ApiOkResponse({ type:  SwaggerCommonResponse})
  CashoutRequest(
    @Body() body: ProcessCashoutRequest,
  ) {
    return this.bettingService.cashoutRequest(body);
  }
}
