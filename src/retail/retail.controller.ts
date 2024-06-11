import { Body, Controller, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { RetailService } from './retail.service';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/identity/auth/auth.guard';
import { WalletService } from 'src/wallet/wallet.service';
import { WalletTransferRequest } from 'src/interfaces/wallet.pb';
import { SwaggerBetHistoryRequest, SwaggerBetHistoryResponse } from 'src/betting/dto';
import { BetHistoryRequest } from 'src/interfaces/betting.pb';
import { BettingService } from 'src/betting/betting.service';
import { IAuthorizedRequest } from 'src/interfaces/authorized-request.interface';


@ApiTags('Retail APIs')
@UseGuards(AuthGuard)
@Controller('retail')
export class RetailController {
  
  constructor(
    private readonly retailService: RetailService,
    private readonly walletService: WalletService,
    private readonly bettingService: BettingService,
  ) {}

  @Post(':clientId/fund-user')
  @ApiOperation({
      summary: 'Transfer Funds',
      description: 'This endpoint is used to transfer funds between retail user',
  })
  @ApiParam({name: 'clientId', description: 'SBE Client ID'})
  // @ApiBody({ type: SwaggerUserDetailsRequest })
  // @ApiOkResponse({ type: SwaggerCommonResponse })
  saveRole(
      @Body() body: WalletTransferRequest,
      @Param('clientId') clientId: number,
  ) {
      body.clientId = clientId;
      return this.walletService.transferFunds(body);
  }

  @Post(':clientId/betlist')
  @ApiOperation({
    summary: 'Retrieve bet history of a retail user',
    description:
      'Retrieves bet history for a retail, date object can be passed to filter only bets for a specific day',
  })
  @ApiBody({ type: SwaggerBetHistoryRequest })
  @ApiOkResponse({ type: SwaggerBetHistoryResponse })
  BetHistory(
    @Param('clientId') clientId: number,
    @Query() query, 
    @Body() data: BetHistoryRequest,
    @Req() req: IAuthorizedRequest
  ) {
    try {
      data.userId = req.user.id;
      data.clientId = clientId;
      data.page = query.page || 1;

      return this.bettingService.getAgentBets(data);
    } catch (error) {
      console.error(error);
    }
  }
  
}
