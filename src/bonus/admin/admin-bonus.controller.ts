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
  BonusStatusRequest,
  CreateBonusRequest,
  CreateCampaignBonusDto,
  DeleteCampaignBonusDto,
  GetBonusRequest,
  UpdateCampaignBonusDto,
} from '../bonus.pb';
import {
  SwaggerAllCampaignBonus,
  SwaggerBonusResponse,
  SwaggerBonusStatusRequest,
  SwaggerCreateBonusRequest,
  SwaggerCreateBonusResponse,
  SwaggerCreateCampaignBonus,
  SwaggerDeleteCampaignBonusDto,
  SwaggerUpdateCampaignBonus,
} from '../dto';

@ApiTags('BackOffice APIs')
@Controller('admin/bonus')
export class AdminBonusController {
  constructor(private readonly bonusService: BonusService) {}


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

  @Patch('status/update')
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

  @Delete('delete-campaign')
  @ApiOperation({
    summary: 'Delete an existing campaign',
    description: 'This endpoint deletes an existing promotional campaign ',
  })
  @ApiBody({ type: SwaggerDeleteCampaignBonusDto })
  @ApiOkResponse({ type: SwaggerCreateBonusResponse })
  DeleteCampaignBonus(@Body() data: DeleteCampaignBonusDto) {
    try {
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
}