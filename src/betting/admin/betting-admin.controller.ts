import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Ip,
  Query,
  Put,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { BettingService } from '../betting.service';
import {
  SwaggerGetVirtualBets,
} from '../dto';
import {
  GetRiskSettingRequest,
  GetTicketsRequest,
  UserRiskSettingsRequest,
} from 'src/interfaces/betting.pb';
import { SwaggerCommonResponse, SwaggerSettingsRequest } from 'src/identity/dto';

@ApiTags('BackOffice APIs')
@Controller('admin/bets')
export class BettingAdminController {
  constructor(private readonly bettingService: BettingService) {}


  @Post(':clientId/tickets')
  @ApiOperation({
    summary: 'Get all tickets for client',
    description: 'List all tickets for a particular client',
  })
  @ApiParam({name: 'clientId', description: 'SBE Client ID'})
  @ApiQuery({name: 'page', description: 'page number for pagination'})
  @ApiBody({ type: SwaggerGetVirtualBets })
  @ApiOkResponse({ type: SwaggerCommonResponse })
  GetAllVirtualBets(
    @Body() data: GetTicketsRequest,
    @Query('page') page: number,
    @Param('clientId') clientId: number,
  ) {
    try {
      data.clientId = clientId;
      data.page = page;

      return this.bettingService.getTickets(data);
    } catch (error) {
      console.error(error);
    }
  }

  @Get(':clientId/betting-parameters/:userId')
    @ApiOperation({
        summary: 'Get User Betting Parameters',
        description: 'This endpoint is used retrieve betting parameters for a user',
    })
    @ApiParam({ name: 'client', type: 'number', description: 'SBE Client ID' })
    @ApiParam({ name: 'user', type: 'number', description: 'User ID' })
    @ApiOkResponse({ type: SwaggerCommonResponse })
    getUserSettings(
        @Param('clientId') clientId: number,
        @Param('userId') userId: number,
    ) {
        
        const payload: GetRiskSettingRequest = {
            clientId,
            userId,
        }

        return this.bettingService.getUserRiskSettings(payload);
    }

    @Put(':userId/betting-parameters/save')
    @ApiOperation({
        summary: 'Save User Betting Parameters',
        description: 'This endpoint is used to save or update betting parameters for a user',
    })
    @ApiParam({ name: 'user', type: 'number', description: 'User ID' })
    @ApiBody({ type: SwaggerSettingsRequest })
    @ApiOkResponse({ type: SwaggerCommonResponse })
    saveUserBettingParameters(
        @Param('userId') userId: number,
        @Body() body,
    ) {
        
        const payload: UserRiskSettingsRequest = {
            userId,
            period: body.period,
            inputs: JSON.stringify(body)
        }
        return this.bettingService.saveUserRiskSettings(payload);
    }
}
