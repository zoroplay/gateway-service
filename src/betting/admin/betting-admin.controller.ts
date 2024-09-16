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
import { BettingService } from '../betting.service';
import {
  SwaggerGetVirtualBets,
} from '../dto';
import {
  GetTicketsRequest,
} from 'src/interfaces/betting.pb';
import { SwaggerCommonResponse } from 'src/identity/dto';

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
}
