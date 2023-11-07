import {Body, Controller, Delete, Get, Param, Patch, Post, Put, Query} from '@nestjs/common';
import {ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags} from '@nestjs/swagger';
import {BonusService} from './bonus.service';

import {
  AwardBonusRequest,
  BonusStatusRequest, CreateCampaignBonusDto,
  CreateCashbackBonusRequest,
  CreateFirstDepositBonusRequest,
  CreateFreebetBonusRequest,
  CreateReferralBonusRequest,
  CreateShareBetBonusRequest, DeleteCampaignBonusDto,
  GetBonusRequest,
  GetUserBonusRequest, RedeemCampaignBonusDto, UpdateCampaignBonusDto,
  UserBetWithBonus
} from "./bonus.pb";
import {
  SwaggerAllCampaignBonus,
  SwaggerAwardBonusRequest,
  SwaggerBonusResponse,
  SwaggerBonusStatusRequest,
  SwaggerCreateBonusResponse, SwaggerCreateCampaignBonus,
  SwaggerCreateCashbackBonusRequest,
  SwaggerCreateFirstDepositBonusRequest,
  SwaggerCreateFreebetBonusRequest,
  SwaggerCreateReferralBonusRequest,
  SwaggerCreateShareBetBonusRequest, SwaggerDeleteCampaignBonusDto,
  SwaggerGetBonusRequest,
  SwaggerGetUserBonusRequest,
  SwaggerGetUserBonusResponse,
   SwaggerRedeemCampaignBonusDto, SwaggerUpdateCampaignBonus,
  SwaggerUserBetWithBonus
} from "./dto";
import {SwaggerPlaceBetResponse} from "../betting/dto";

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
  @ApiQuery({ name: 'id', description: 'ID of the bonus to filter' })
  @ApiQuery({ name: 'status', description: 'bonus status' })
  @ApiQuery({ name: 'bonus_type', description: 'filter by bonus type' })

  @ApiOkResponse({ type: SwaggerGetUserBonusResponse })
  GetUserBonus(@Query() query: any) {

    try {

      let data = {} as GetUserBonusRequest
      data.clientId =  query.clientId ? parseInt(query.clientId) : -1
      data.userId =  query.userId ? parseInt(query.userId) : -1
      data.id =  query.id ? parseInt(query.id) : 0
      data.status =  query.status ? parseInt(query.status) : -1
      data.bonusType =  query.bonus_type ? query.bonus_type : ""

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

  @Post('/bonus/bet/create')
  @ApiOperation({ summary: 'Place a new bet bet using bonus ', description: 'This endpoint will place a new bonus bet' })
  @ApiBody({ type: SwaggerUserBetWithBonus })
  @ApiOkResponse({ type: SwaggerPlaceBetResponse })
  PlaceBonusBet(@Body() data: UserBetWithBonus) {

    try {

      return this.bonusService.PlaceBonusBet(data);

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

  @Post('/campaign')
  @ApiOperation({ summary: 'Create a new campaign', description: 'This endpoint creates a new promotional campaign ' })
  @ApiBody({ type: SwaggerCreateCampaignBonus })
  @ApiOkResponse({ type: SwaggerCreateBonusResponse })
  CreateCampaignBonus(@Body() data: CreateCampaignBonusDto) {

    try {

      return this.bonusService.CreateCampaignBonus(data);

    } catch (error) {

      console.error(error);

    }

  }

  @Put('/campaign')
  @ApiOperation({ summary: 'Update an existing campaign', description: 'This endpoint updates an existing promotional campaign ' })
  @ApiBody({ type: SwaggerUpdateCampaignBonus })
  @ApiOkResponse({ type: SwaggerCreateBonusResponse })
  UpdateCampaignBonus(@Body() data: UpdateCampaignBonusDto) {

    try {

      return this.bonusService.UpdateCampaignBonus(data);

    } catch (error) {

      console.error(error);

    }

  }

  @Delete('/campaign')
  @ApiOperation({ summary: 'Delete an existing campaign', description: 'This endpoint deletes an existing promotional campaign ' })
  @ApiBody({ type: SwaggerDeleteCampaignBonusDto })
  @ApiOkResponse({ type: SwaggerCreateBonusResponse })
  DeleteCampaignBonus(@Body() data: DeleteCampaignBonusDto) {

    try {

      return this.bonusService.DeleteCampaignBonus(data);

    } catch (error) {

      console.error(error);

    }

  }

  @Get('/campaign/:client_id')
  @ApiOperation({ summary: 'Get all campaigns for a client ', description: 'This endpoint retrieves all campaigns for a particular client' })
  @ApiParam({ name: 'client_id', type: 'number', description:' Unique ID of the client'})
  @ApiOkResponse({ type: SwaggerAllCampaignBonus })
  GetCampaignBonus(@Param() params: any) {

    try {

      let clientID = parseInt(params.client_id)

      return this.bonusService.GetCampaignBonus({
        clientId: clientID
      });

    } catch (error) {

      console.error(error);
    }

  }

  @Post('/campaign/redeem-code')
  @ApiOperation({ summary: 'Redeems a bonus code', description: 'This endpoint redeems a bonus code ' })
  @ApiBody({ type: SwaggerRedeemCampaignBonusDto })
  @ApiOkResponse({ type: SwaggerCreateBonusResponse })
  RedeemCampaignBonus(@Body() data: RedeemCampaignBonusDto) {

    try {

      return this.bonusService.RedeemCampaignBonus(data);

    } catch (error) {

      console.error(error);

    }

  }

}