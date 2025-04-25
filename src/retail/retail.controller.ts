/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
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
import {
  GetShopUserWalletSummaryRequest,
  ProcessRetailTransaction,
  SummaryRequest,
  ValidateTransactionRequest,
  WalletTransferRequest,
} from 'src/interfaces/wallet.pb';
import {
  SwaggerBetHistoryRequest,
  SwaggerBetHistoryResponse,
} from 'src/betting/dto';
import {
  BetHistoryRequest,
  SalesReportRequest,
} from 'src/interfaces/betting.pb';
import { BettingService } from 'src/betting/betting.service';
import { IAuthorizedRequest } from 'src/interfaces/authorized-request.interface';
import { RetailService } from './retail.service';

@ApiTags('Retail APIs')
@UseGuards(AuthGuard)
@Controller('retail')
export class RetailController {
  constructor(
    private readonly walletService: WalletService,
    private readonly bettingService: BettingService,
    private readonly retailService: RetailService,
  ) {}

  @Post(':clientId/fund-user')
  @ApiOperation({
    summary: 'Transfer Funds',
    description: 'This endpoint is used to transfer funds between retail user',
  })
  @ApiParam({ name: 'clientId', description: 'SBE Client ID' })
  // @ApiBody({ type: SwaggerUserDetailsRequest })
  // @ApiOkResponse({ type: SwaggerCommonResponse })
  fundUser(
    @Body() body: WalletTransferRequest,
    @Param('clientId') clientId: number,
  ) {
    body.clientId = clientId;
    return this.walletService.transferFunds(body);
  }

  @Post(':clientId/wallet/deposit/validate')
  @ApiOperation({
    summary: 'Validate Deposit Code',
    description: 'This endpoint is used to validate the deposit code on retail',
  })
  @ApiParam({ name: 'clientId', description: 'SBE Client ID' })
  validateDepositCode(
    @Body() body: ValidateTransactionRequest,
    @Param('clientId') clientId: number,
    @Req() req: IAuthorizedRequest,
  ) {
    body.clientId = clientId;
    body.userId = req.user.id;
    return this.walletService.validateDepositCode(body);
  }

  @Get(':clientId/wallet/deposit/transfer/:id')
  @ApiOperation({
    summary: 'Process Transfer',
    description: 'This endpoint is used to process deposit transfer',
  })
  @ApiParam({ name: 'clientId', description: 'SBE Client ID' })
  @ApiParam({ name: 'id', description: 'Transaction ID' })
  @ApiQuery({ name: 'role', description: 'User Role name' })
  processTransfer(
    @Param('clientId') clientId: number,
    @Param('id') id: number,
    @Query('role') role: string,
    @Req() req: IAuthorizedRequest,
  ) {
    const payload: ProcessRetailTransaction = {
      id,
      clientId,
      userId: req.user.id,
      username: req.user.username,
      userRole: role,
    };
    return this.walletService.processShopDeposit(payload);
  }

  @Post(':clientId/wallet/withdraw/validate')
  @ApiOperation({
    summary: 'Validate Withdrawal Code',
    description:
      'This endpoint is used to validate the withdrawal code on retail',
  })
  @ApiParam({ name: 'clientId', description: 'SBE Client ID' })
  validateWithdrawCode(
    @Body() body: ValidateTransactionRequest,
    @Param('clientId') clientId: number,
    @Req() req: IAuthorizedRequest,
  ) {
    body.clientId = clientId;
    body.userId = req.user.id;
    return this.walletService.validateWithdrawalCode(body);
  }

  @Get(':clientId/wallet/withdraw/transfer/:id')
  @ApiOperation({
    summary: 'Process Withdrawal Request',
    description: 'This endpoint is used to process withdrawal request',
  })
  @ApiParam({ name: 'clientId', description: 'SBE Client ID' })
  @ApiParam({ name: 'id', description: 'Transaction ID' })
  @ApiQuery({ name: 'role', description: 'User Role name' })
  processWithdrawal(
    @Param('clientId') clientId: number,
    @Param('id') id: number,
    @Query('role') role: string,
    @Req() req: IAuthorizedRequest,
  ) {
    const payload: ProcessRetailTransaction = {
      id,
      clientId,
      userId: req.user.id,
      username: req.user.username,
      userRole: role,
    };
    return this.walletService.processShopWithdrawal(payload);
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
    @Req() req: IAuthorizedRequest,
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

  @Post(':clientId/reports/sales')
  @ApiOperation({
    summary: 'Retail Sales Report',
    description: 'Retrieves sales report for a retail user',
  })
  @ApiBody({ type: SwaggerBetHistoryRequest })
  @ApiOkResponse({ type: SwaggerBetHistoryResponse })
  SalesReport(
    @Param('clientId') clientId: number,
    @Body() data: SalesReportRequest,
    @Req() req: IAuthorizedRequest,
  ) {
    try {
      data.userId = req.user.id;
      data.clientId = clientId;
      return this.bettingService.getSalesReport(data);
    } catch (error) {
      console.error(error);
    }
  }

  @Post(':clientId/reports/commission')
  @ApiOperation({
    summary: 'Retail Commission Report',
    description: 'Retrieves commission report for a retail user',
  })
  @ApiBody({ type: SwaggerBetHistoryRequest })
  @ApiOkResponse({ type: SwaggerBetHistoryResponse })
  CommissionReport(
    @Param('clientId') clientId: number,
    @Body() data: SalesReportRequest,
    @Req() req: IAuthorizedRequest,
  ) {
    try {
      data.userId = req.user.id;
      data.clientId = clientId;
      return this.bettingService.getShopUserCommissions(data);
    } catch (error) {
      console.error(error);
    }
  }

  @Get('transaction-summary/:clientId')
  async getTransactionSummary(
    @Param('clientId') clientId: number,
    @Query('range') range?: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    const payload: SummaryRequest = {
      clientId,
      range: range || '',
      from: from || '',
      to: to || '',
    };

    return this.walletService.getSummeryMethod(payload);
  }

  @Get('agent-agent-users/:clientId')
  async getAllClientsSummary(
    @Param('clientId') clientId: number,
    @Query('dateRange') dateRange?: string,
  ) {
    const payload: GetShopUserWalletSummaryRequest = { clientId, dateRange };

    return this.walletService.AgentUsersSummaryRequestMethod(payload);
  }
}
