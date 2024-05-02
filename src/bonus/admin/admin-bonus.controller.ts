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
} from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { BonusService } from '../bonus.service';

import {
  AwardBonusRequest,
  BonusStatusRequest,
  CreateBonusRequest,
  CreateCampaignBonusDto,
  DeleteBonusRequest,
  FetchReportRequest,
  GetBonusRequest,
  UpdateCampaignBonusDto,
} from '../bonus.pb';
import {
  SwaggerAllCampaignBonus,
  SwaggerAwardBonusRequest,
  SwaggerBonusResponse,
  SwaggerBonusStatusRequest,
  SwaggerCreateBonusRequest,
  SwaggerCreateBonusResponse,
  SwaggerCreateCampaignBonus,
  SwaggerGetUserBonusResponse,
  SwaggerUpdateCampaignBonus,
} from '../dto';
import {
  SwaggerFetchReportResponse,
  SwaggerGetPaymentMethodResponse,
} from 'src/wallet/dto';
import { BonusServiceClient } from '../bonus.pb';

@ApiTags('BackOffice APIs')
@Controller('admin/bonus')
export class AdminBonusController {
  constructor(private readonly bonusService: BonusService) {}

  @Get('player-bonus')
  @ApiOperation({
    summary: 'Fetch user bonus',
    description:
      'This endpoint is used to fetch user-bonus for a particular SBE client',
  })
  @ApiQuery({
    name: 'bonusType',
    type: 'string',
    description: 'bonus type',
  })
  @ApiQuery({
    name: 'from',
    type: 'string',
    description: 'Date-From',
  })
  @ApiQuery({
    name: 'to',
    type: 'string',
    description: 'Date-to',
  })
  @ApiQuery({
    name: 'clientId',
    type: 'string',
    description: 'SBE Client ID',
  })
  @ApiOkResponse({ type: SwaggerFetchReportResponse })
  fetchBonus(@Query() query: FetchReportRequest) {
    console.log('Fetch Bonus');

    return this.bonusService.fetchBonusReport({
      bonusType: query.bonusType,
      from: query.from,
      to: query.to,
      clientId: query.clientId
    });
  }

  @Post('create')
  @ApiOperation({
    summary: 'Create Bonus ',
    description:
      'This endpoint creates a new bonus for a particular client, it enables you to create bonus with different settings/terms',
  })
  @ApiBody({ type: SwaggerCreateBonusRequest })
  @ApiOkResponse({ type: SwaggerCreateBonusResponse })
  CreateBonus(@Body() data: CreateBonusRequest) {
    try {
      return this.bonusService.CreateBonus(data);
    } catch (error) {
      console.error(error);
    }
  }

  @Put('update')
  @ApiOperation({
    summary: 'Update Bonus ',
    description:
      'This endpoint updates an existing bonus for a particular client, it enables you to update bonus with different settings/terms',
  })
  @ApiBody({ type: SwaggerCreateBonusRequest })
  @ApiOkResponse({ type: SwaggerCreateBonusResponse })
  UpdateCashbackBonus(@Body() data: CreateBonusRequest) {
    try {
      return this.bonusService.UpdateBonus(data);
    } catch (error) {
      console.error(error);
    }
  }

  @Get('list')
  @ApiOperation({
    summary: 'Get all bonus types for a client ',
    description:
      'This endpoint retrieves all the bonus types for a particular client',
  })
  @ApiQuery({ name: 'clientId', description: 'ID of the client' })
  @ApiOkResponse({ type: SwaggerBonusResponse })
  GetBonus(@Query() query: any) {
    try {
      const data = {} as GetBonusRequest;
      data.clientId = query.clientId ? parseInt(query.clientId) : -1;

      return this.bonusService.GetBonus(data);
    } catch (error) {
      console.error(error);
    }
  }

  @Get('status/update')
  @ApiOperation({
    summary: 'Activate or Deactivate client bonus type ',
    description: 'Use this endpoint to activate or deactivate a client bonus',
  })
  @ApiQuery({ name: 'id', description: 'Bonus ID' })
  @ApiQuery({ name: 'status', description: 'Bonus Status' })
  @ApiOkResponse({ type: SwaggerCreateBonusResponse })
  UpdateBonusStatus(
    @Query('id') id: number,
    @Query('status') status: number,
  ) {
    try {
      const payload = {
        bonusId: id,
        status
      }
      return this.bonusService.UpdateBonusStatus(payload);
    } catch (error) {
      console.error(error);
    }
  }

  @Delete('delete-bonus/:id')
  @ApiOperation({
    summary: 'Delete an existing campaign',
    description: 'This endpoint deletes an existing promotional campaign ',
  })
  @ApiParam({ name: 'id', description: 'Campaign id to be deleted' })
  @ApiQuery({ name: 'client_id', description: 'SBE client ID' })
  @ApiOkResponse({ type: SwaggerCreateBonusResponse })
  deleeteBonus(@Query() query, @Param() param) {
    try {
      const data = {
        id: param.id,
        clientId: query.client_id,
      };
      return this.bonusService.DeleteBonus(data);
    } catch (error) {
      console.error(error);
    }
  }

  @Post('create-campaign')
  @ApiOperation({
    summary: 'Create a new campaign',
    description: 'This endpoint creates a new promotional campaign ',
  })
  @ApiBody({ type: SwaggerCreateCampaignBonus })
  @ApiOkResponse({ type: SwaggerCreateBonusResponse })
  CreateCampaignBonus(@Body() data: CreateCampaignBonusDto) {
    try {
      return this.bonusService.CreateCampaignBonus(data);
    } catch (error) {
      console.error(error);
    }
  }

  @Put('update-campaign')
  @ApiOperation({
    summary: 'Update an existing campaign',
    description: 'This endpoint updates an existing promotional campaign ',
  })
  @ApiBody({ type: SwaggerUpdateCampaignBonus })
  @ApiOkResponse({ type: SwaggerCreateBonusResponse })
  UpdateCampaignBonus(@Body() data: UpdateCampaignBonusDto) {
    try {
      return this.bonusService.UpdateCampaignBonus(data);
    } catch (error) {
      console.error(error);
    }
  }

  @Delete('delete-campaign/:id')
  @ApiOperation({
    summary: 'Delete an existing campaign',
    description: 'This endpoint deletes an existing promotional campaign ',
  })
  @ApiParam({ name: 'id', description: 'Campaign id to be deleted' })
  @ApiQuery({ name: 'client_id', description: 'SBE client ID' })
  @ApiOkResponse({ type: SwaggerCreateBonusResponse })
  DeleteCampaignBonus(
    @Query('client_id') clientId: number, 
    @Param('id') id: number) {
    try {
      const data = {
        id,
        clientId,
      };
      return this.bonusService.DeleteCampaignBonus(data);
    } catch (error) {
      console.error(error);
    }
  }

  @Get('campaign/:client_id/list')
  @ApiOperation({
    summary: 'Get all campaigns for a client ',
    description:
      'This endpoint retrieves all campaigns for a particular client',
  })
  @ApiParam({
    name: 'client_id',
    type: 'number',
    description: ' Unique ID of the client',
  })
  @ApiOkResponse({ type: SwaggerAllCampaignBonus })
  GetCampaignBonus(@Param() params: any) {
    try {
      const clientID = parseInt(params.client_id);

      return this.bonusService.GetCampaignBonus({
        clientId: clientID,
      });
    } catch (error) {
      console.error(error);
    }
  }

  @Post('/award')
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
    // @Req() req: IAuthorizedRequest,
  ) {
    try {
      data.clientId = query.client_id;

      return this.bonusService.AwardBonus(data);
    } catch (error) {
      console.error(error);
    }
  }
}
