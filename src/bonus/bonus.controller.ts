import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { BonusService } from './bonus.service';

import {
  AwardBonusRequest,
  BonusStatusRequest,
  GetCampaignRequest,
  GetUserBonusRequest,
  RedeemCampaignBonusDto,
} from './bonus.pb';
import {
  SwaggerAwardBonusRequest,
  SwaggerBonusStatusRequest,
  SwaggerCheckFirstDepoistResponse,
  SwaggerCreateBonusResponse,
  SwaggerGetUserBonusResponse,
  SwaggerRedeemCampaignBonusDto,
  SwaggerValidateCampaignDTO,
  SwaggerValidateCampaignResponse,
} from './dto';
import { AuthGuard } from 'src/identity/auth/auth.guard';
import { IAuthorizedRequest } from 'src/interfaces/authorized-request.interface';

@ApiTags('Bonus APIs')
@UseGuards(AuthGuard)
@Controller('bonus')
export class BonusController {
  constructor(private readonly bonusService: BonusService) {}

  @Get('/user/list')
  @ApiOperation({
    summary: 'Get all bonus balance for a user ',
    description:
      'This endpoint retrieves all the bonus balance for a particular user',
  })
  @ApiQuery({ name: 'client_id', description: 'ID of the client' })
  @ApiQuery({ name: 'id', description: 'ID of the bonus to filter' })
  @ApiQuery({ name: 'status', description: 'bonus status' })
  @ApiQuery({ name: 'bonus_type', description: 'filter by bonus type' })
  @ApiOkResponse({ type: SwaggerGetUserBonusResponse })
  GetUserBonus(
    @Query() query: any,
    @Req() req: IAuthorizedRequest
  ) {
    try {
      const data = {} as GetUserBonusRequest;
      data.clientId = query.client_id ? parseInt(query.client_id) : 1;
      data.userId = req.user.id
      if (query.id)
        data.id = query.id;

      if (query.status)
        data.status = query.status;

      return this.bonusService.GetUserBonus(data);
    } catch (error) {
      console.error(error);
    }
  }

  @Post('/user/award')
  @ApiOperation({
    summary: 'Award user a bonus ',
    description:
      'This endpoint awards a user a bonus, this endpoint is meant to be used for administrative purposes only',
  })
  @ApiQuery({ name: 'client_id', description: 'SBE client ID' })
  @ApiBody({ type: SwaggerAwardBonusRequest })
  @ApiOkResponse({ type: SwaggerGetUserBonusResponse })
  AwardBonus(
    @Body() data: AwardBonusRequest,
    @Query() query,
    @Req() req: IAuthorizedRequest
  ) {
    try {
      data.clientId = query.client_id;
      data.userId = req.user.id.toString();
      return this.bonusService.AwardBonus(data);
    } catch (error) {
      console.error(error);
    }
  }

  @Get('user/check-deposit-bonus')
  @ApiOperation({
    summary: 'Check if first deposit bonus or deposit bonus is available',
    description: 'This endpoint will check and return success true or false if first deposit is available.',
  })
  @ApiQuery({ name: 'clientId', description: 'ID of the client' })
  @ApiOkResponse({ type: SwaggerCheckFirstDepoistResponse })
  CheckFirstDeposit(
    @Req() req: IAuthorizedRequest,
    @Query() query
  ) {
    try {
      const body = {
        clientId: query.client_id,
        userId: req.user.id
      }
      return this.bonusService.CheckFirstDeposit(body);
    } catch (error) {
      console.error(error);
    }
  }

  @Patch('/status/update')
  @ApiOperation({
    summary: 'Activate or Deactivate client bonus type ',
    description: 'Use this endpoint to activate or deactivate a client bonus',
  })
  @ApiBody({ type: SwaggerBonusStatusRequest })
  @ApiOkResponse({ type: SwaggerCreateBonusResponse })
  UpdateBonusStatus(@Body() data: BonusStatusRequest) {
    try {
      return this.bonusService.UpdateBonusStatus(data);
    } catch (error) {
      console.error(error);
    }
  }


  @Post('/redeem')
  @ApiOperation({
    summary: 'Redeems a bonus code',
    description: 'This endpoint redeems a bonus code ',
  })
  @ApiBody({ type: SwaggerRedeemCampaignBonusDto })
  @ApiOkResponse({ type: SwaggerCreateBonusResponse })
  RedeemCampaignBonus(@Body() data: RedeemCampaignBonusDto) {
    try {
      return this.bonusService.RedeemCampaignBonus(data);
    } catch (error) {
      console.error(error);
    }
  }

  @Post('/validate-code')
  @ApiOperation({
    summary: 'Validate or Get Bonus with Promo code',
    description: 'This endpoint can be used to validate or a get bonus data via promo code ',
  })
  @ApiBody({ type: SwaggerValidateCampaignDTO })
  @ApiOkResponse({ type: SwaggerValidateCampaignResponse })
  validatePromoCode(@Body() data: GetCampaignRequest) {
    try {
      return this.bonusService.GetCampaign(data);
    } catch (error) {
      console.error(error);
    }
  }
}
