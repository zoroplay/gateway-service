import {Body, Controller, Get, Patch, Post, Put, Query} from '@nestjs/common';
import {ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiTags} from '@nestjs/swagger';
import {BonusService} from './bonus.service';

import {
  AwardBonusRequest,
  BonusStatusRequest,
  CreateCashbackBonusRequest,
  CreateFirstDepositBonusRequest,
  CreateFreebetBonusRequest,
  CreateReferralBonusRequest,
  CreateShareBetBonusRequest,
  GetBonusRequest,
  GetUserBonusRequest,
  UserBet
} from "./bonus.pb";
import {
  SwaggerAwardBonusRequest,
  SwaggerBonusResponse,
  SwaggerBonusStatusRequest,
  SwaggerCreateBonusResponse,
  SwaggerCreateCashbackBonusRequest,
  SwaggerCreateFirstDepositBonusRequest,
  SwaggerCreateFreebetBonusRequest,
  SwaggerCreateReferralBonusRequest,
  SwaggerCreateShareBetBonusRequest,
  SwaggerGetBonusRequest,
  SwaggerGetUserBonusRequest,
  SwaggerGetUserBonusResponse,
  SwaggerHasBonusBetResponse,
  SwaggerUserBet
} from "./dto";

@ApiTags('Bonus APIs')
@Controller('bonus-service')
export class BonusController {

  constructor(private readonly bonusService: BonusService) {}

  @Post('/cashback/create')
  @ApiOperation({ summary: 'Create Cashback Bonus ', description: 'This endpoint creates a new cashback bonus for a particular client, it enables you to create cashback bonus with different settings/terms' })
  @ApiBody({ type: SwaggerCreateCashbackBonusRequest })
  @ApiOkResponse({ type: SwaggerCreateBonusResponse })
  CreateCashbackBonus(@Body() data: CreateCashbackBonusRequest) {

    try {

      return this.bonusService.CreateCashbackBonus(data);

    } catch (error) {

      console.error(error);

    }

  }

  @Put('/cashback/update')
  @ApiOperation({ summary: 'Update Cashback Bonus ', description: 'This endpoint updates an existing cashback bonus for a particular client, it enables you to update cashback bonus with different settings/terms' })
  @ApiBody({ type: SwaggerCreateCashbackBonusRequest })
  @ApiOkResponse({ type: SwaggerCreateBonusResponse })
  UpdateCashbackBonus(@Body() data: CreateCashbackBonusRequest) {

    try {

      return this.bonusService.UpdateCashbackBonus(data);

    } catch (error) {

      console.error(error);

    }

  }


  @Post('/first-deposit/create')
  @ApiOperation({ summary: 'Create First Deposit Bonus ', description: 'This endpoint creates a new First Deposit bonus for a particular client, it enables you to create First Deposit bonus with different settings/terms' })
  @ApiBody({ type: SwaggerCreateFirstDepositBonusRequest })
  @ApiOkResponse({ type: SwaggerCreateBonusResponse })
  CreateFirstDepositBonus(@Body() data: CreateFirstDepositBonusRequest) {

    try {

      return this.bonusService.CreateFirstDepositBonus(data);

    } catch (error) {

      console.error(error);

    }

  }

  @Put('/first-deposit/update')
  @ApiOperation({ summary: 'Update First Deposit Bonus ', description: 'This endpoint updates an existing First Deposit bonus for a particular client, it enables you to update First Deposit bonus with different settings/terms' })
  @ApiBody({ type: SwaggerCreateCashbackBonusRequest })
  @ApiOkResponse({ type: SwaggerCreateBonusResponse })
  UpdateFirstDepositBonus(@Body() data: CreateFirstDepositBonusRequest) {

    try {

      return this.bonusService.UpdateFirstDepositBonus(data);

    } catch (error) {

      console.error(error);

    }

  }


  @Post('/freebet/create')
  @ApiOperation({ summary: 'Create Freebet Bonus ', description: 'This endpoint creates a new Freebet bonus for a particular client, it enables you to create Freebet bonus with different settings/terms' })
  @ApiBody({ type: SwaggerCreateFreebetBonusRequest })
  @ApiOkResponse({ type: SwaggerCreateBonusResponse })
  CreateFreebetBonus(@Body() data: CreateFreebetBonusRequest) {

    try {

      return this.bonusService.CreateFreebetBonus(data);

    } catch (error) {

      console.error(error);

    }

  }


  @Put('/freebet/update')
  @ApiOperation({ summary: 'Update Freebet Bonus ', description: 'This endpoint updates an existing Freebet bonus for a particular client, it enables you to update Freebet bonus with different settings/terms' })
  @ApiBody({ type: SwaggerCreateFreebetBonusRequest })
  @ApiOkResponse({ type: SwaggerCreateBonusResponse })
  UpdateFreebetBonus(@Body() data: CreateFreebetBonusRequest) {

    try {

      return this.bonusService.UpdateFreebetBonus(data);

    } catch (error) {

      console.error(error);

    }

  }

  @Post('/referral/create')
  @ApiOperation({ summary: 'Create Referral Bonus ', description: 'This endpoint creates a new Referral bonus for a particular client, it enables you to create Referral bonus with different settings/terms' })
  @ApiBody({ type: SwaggerCreateReferralBonusRequest })
  @ApiOkResponse({ type: SwaggerCreateBonusResponse })
  CreateReferralBonus(@Body() data: CreateReferralBonusRequest) {

    try {

      return this.bonusService.CreateReferralBonus(data);

    } catch (error) {

      console.error(error);

    }

  }


  @Put('/referral/update')
  @ApiOperation({ summary: 'Update Referral Bonus ', description: 'This endpoint updates an existing Referral bonus for a particular client, it enables you to update Referral bonus with different settings/terms' })
  @ApiBody({ type: SwaggerCreateReferralBonusRequest })
  @ApiOkResponse({ type: SwaggerCreateBonusResponse })
  UpdateReferralBonus(@Body() data: CreateReferralBonusRequest) {

    try {

      return this.bonusService.UpdateReferralBonus(data);

    } catch (error) {

      console.error(error);

    }

  }


  @Post('/sharebet/create')
  @ApiOperation({ summary: 'Create ShareBet Bonus ', description: 'This endpoint creates a new ShareBet bonus for a particular client, it enables you to create ShareBet bonus with different settings/terms' })
  @ApiBody({ type: SwaggerCreateShareBetBonusRequest })
  @ApiOkResponse({ type: SwaggerCreateBonusResponse })
  CreateShareBetBonus(@Body() data: CreateShareBetBonusRequest) {

    try {

      return this.bonusService.CreateShareBetBonus(data);

    } catch (error) {

      console.error(error);

    }

  }


  @Put('/sharebet/update')
  @ApiOperation({ summary: 'Update ShareBet Bonus ', description: 'This endpoint updates an existing ShareBet bonus for a particular client, it enables you to update ShareBet bonus with different settings/terms' })
  @ApiBody({ type: SwaggerCreateShareBetBonusRequest })
  @ApiOkResponse({ type: SwaggerCreateBonusResponse })
  UpdateShareBetBonus(@Body() data: CreateShareBetBonusRequest) {

    try {

      return this.bonusService.UpdateShareBetBonus(data);

    } catch (error) {

      console.error(error);

    }

  }


  @Get('/client/bonus/view')
  @ApiOperation({ summary: 'Get all bonus types for a client ', description: 'This endpoint retrieves all the bonus types for a particular client' })
  @ApiQuery({ name: 'clientId', description: 'ID of the client' })
  @ApiOkResponse({ type: SwaggerBonusResponse })
  GetBonus(@Query() query: any) {

    try {

      let data = {} as GetBonusRequest
      data.clientId =  query.clientId ? parseInt(query.clientId) : -1

      return this.bonusService.GetBonus(data);

    } catch (error) {

      console.error(error);

    }

  }

  @Get('/user/bonus/view')
  @ApiOperation({ summary: 'Get all bonus balance for a user ', description: 'This endpoint retrieves all the bonus balance for a particular user' })
  @ApiQuery({ name: 'clientId', description: 'ID of the client' })
  @ApiQuery({ name: 'userId', description: 'ID of the user' })
  @ApiOkResponse({ type: SwaggerGetUserBonusResponse })
  GetUserBonus(@Query() query: any) {

    try {

      let data = {} as GetUserBonusRequest
      data.clientId =  query.clientId ? parseInt(query.clientId) : -1
      data.userId =  query.userId ? parseInt(query.userId) : -1

      return this.bonusService.GetUserBonus(data);

    } catch (error) {

      console.error(error);

    }

  }

  @Post('/user/bonus/award')
  @ApiOperation({ summary: 'Award user a bonus ', description: 'This endpoint awards a user a bonus, this endpoint is meant to be used for administrative purposes only' })
  @ApiBody({ type: SwaggerAwardBonusRequest })
  @ApiOkResponse({ type: SwaggerGetUserBonusResponse })
  AwardBonus(@Body() data: AwardBonusRequest) {

    try {

      return this.bonusService.AwardBonus(data);

    } catch (error) {

      console.error(error);

    }

  }

  @Post('/user/bonus/check')
  @ApiOperation({ summary: 'Check if a user bet selection qualifies for a bonus ', description: 'Check if user bet selection qualifies for a particular bonus' })
  @ApiBody({ type: SwaggerUserBet })
  @ApiOkResponse({ type: SwaggerHasBonusBetResponse })
  HasBonusBet(@Body() data: UserBet) {

    try {

      return this.bonusService.HasBonusBet(data);

    } catch (error) {

      console.error(error);

    }

  }

  @Post('/user/bonus/redeem')
  @ApiOperation({ summary: 'Place Bonus Bet', description: 'This endpoint allows placing a bonus bet. This endpoint is meant to be used by Betting Service during place bet operation' })
  @ApiBody({ type: SwaggerUserBet })
  @ApiOkResponse({ type: SwaggerHasBonusBetResponse })
  DebitBonusBet(@Body() data: UserBet) {

    try {

      return this.bonusService.DebitBonusBet(data);

    } catch (error) {

      console.error(error);

    }

  }

  @Patch('/bonus/status/update')
  @ApiOperation({ summary: 'Activate or Deactivate client bonus type ', description: 'Use this endpoint to activate or deactivate a client bonus' })
  @ApiBody({ type: SwaggerBonusStatusRequest })
  @ApiOkResponse({ type: SwaggerCreateBonusResponse })
  UpdateBonusStatus(@Body() data: BonusStatusRequest) {

    try {

      return this.bonusService.UpdateBonusStatus(data);

    } catch (error) {

      console.error(error);

    }

  }
}