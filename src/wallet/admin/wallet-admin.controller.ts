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
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {
  GetShopUserWalletSummaryRequest,
  GetTransactionsRequest,
  ListDepositRequests,
  ListWithdrawalRequests,
  PaymentMethodRequest,
  ShopUsersSummaryRequest,
  SummaryRequest,
  UpdateWithdrawalRequest,
} from 'src/interfaces/wallet.pb';
import {
  SwaggerFundTransfer,
  SwaggerGetPaymentMethodResponse,
  SwaggerListDepositRequest,
  SwaggerListWithdrawalRequests,
  SwaggerPaymentMethodRequest,
  SwaggerPaymentMethodResponse,
  SwaggerUpdateWithdrawalRequest,
} from '../dto';

import { WalletService } from '../wallet.service';
import { AuthGuard } from 'src/identity/auth/auth.guard';

@ApiTags('BackOffice APIs')
@UseGuards(AuthGuard)
@Controller('admin/wallet')
export class WalletAdminController {
  constructor(private readonly walletService: WalletService) {}

  @Post('/payment-methods')
  @ApiOperation({
    summary: 'Save Payment Methods',
    description:
      'This endpoint is used to save or update payment methods for client',
  })
  @ApiBody({ type: SwaggerPaymentMethodRequest })
  @ApiOkResponse({ type: SwaggerPaymentMethodResponse })
  savePaymentMethod(@Body() body: PaymentMethodRequest) {
    return this.walletService.savePaymentMethod(body);
  }

  @Get('payment-methods/:client_id')
  @ApiOperation({
    summary: 'Fetch SMS Settings',
    description:
      'This endpoint is used to fetch sms settings for a particular SBE client',
  })
  @ApiParam({
    name: 'client_id',
    type: 'number',
    description: ' Unique ID of the client',
  })
  @ApiOkResponse({ type: SwaggerGetPaymentMethodResponse })
  fetchRoles(@Param() param: any, @Query() query) {
    return this.walletService.getPaymentMethods({
      clientId: param.client_id,
      status: query.status,
    });
  }

  @Post('withdrawals')
  @ApiOperation({
    summary: 'Fetch Withdrawal Requests',
    description: 'This endpoint is used to fetch all withdrawal requests',
  })
  @ApiBody({ type: SwaggerListWithdrawalRequests })
  @ApiOkResponse({ type: SwaggerGetPaymentMethodResponse })
  withdrawals(@Body() param: ListWithdrawalRequests, @Query() query) {
    return this.walletService.listWithdrawals({
      clientId: param.clientId,
      from: param.from,
      to: param.to,
      status: query.status,
      userId: param.userId,
      username: '',
      bankName: '',
      page: 0,
      limit: 0,
    });
  }

  @Post('deposits')
  @ApiOperation({
    summary: 'Fetch Deposit Transactions',
    description: 'Fetch deposit transactions for a given period and filters.',
  })
  @ApiHeader({
    name: 'Sbe-client-id',
    description: 'Client ID for identifying the requesting client',
    required: true,
    schema: { type: 'string' },
  })
  @ApiBody({ type: SwaggerListWithdrawalRequests }) // should match DTO class/interface name
  @ApiOkResponse({ type: SwaggerListDepositRequest }) // this should be the actual response DTO
  async deposits(
    @Body() body: ListDepositRequests,
    @Query('page') page: number = 1,
    @Req() req,
  ) {
    body.page = page;
    return this.walletService.listDeposits(body);
  }

  // @Post('deposits')
  // @ApiOperation({
  //   summary: 'Fetch Deposit Transactions',
  //   description:
  //     'This endpoint is used to fetch deposit transactions for a period',
  // })
  // @ApiHeader({
  //   name: 'Sbe-client-id',
  //   description: 'Client ID for identifying the requesting client',
  //   required: true,
  //   schema: { type: 'string' },
  // })
  // @ApiBody({ type: SwaggerListWithdrawalRequests })
  // @ApiOkResponse({ type: SwaggerListDepositRequest })
  // deposits(
  //   @Body() body: ListDepositRequests,
  //   @Query('page') page: number = 1,
  //   @Req() req,
  // ) {
  //   body.page = page;

  //   return this.walletService.listDeposits(body);
  // }

  @Put('withdrawals/update')
  @ApiOperation({
    summary: 'Update Withdrawal Requests',
    description:
      'This endpoint is used to update a withdrawal requests (approve|reject)',
  })
  @ApiBody({ type: SwaggerUpdateWithdrawalRequest })
  @ApiOkResponse({ type: SwaggerPaymentMethodResponse })
  updateWithdrawals(
    @Body() body: UpdateWithdrawalRequest,
    @Query() query,
    @Req() req,
  ) {
    console.log(body);

    return this.walletService.updateWithdrawal({
      clientId: body.clientId,
      withdrawalId: body.withdrawalId,
      action: body.action,
      comment: body.action,
      updatedBy: '',
    });
  }

  @Post('funds-transfer')
  @ApiOperation({
    summary: 'Credit or Debit user wallet',
    description: 'This endpoint is used to credit or debit a users wallet',
  })
  @ApiBody({ type: SwaggerFundTransfer })
  @ApiOkResponse({ type: SwaggerPaymentMethodResponse })
  fundsTransfer(@Body() body) {
    const payload = {
      clientId: body.clientId,
      userId: body.userId,
      username: body.username,
      amount: body.amount,
      source: body.source,
      description: body.description,
      wallet: body.wallet,
      subject: body.subject,
      channel: body.channel,
    };

    if (body.action === 'deposit') {
      return this.walletService.creditUser(payload);
    } else {
      return this.walletService.debitUser(payload);
    }
  }

  @Post(':clientId/get-money-transactions')
  @ApiOperation({
    summary: 'Get admin money transactions',
    description: 'This endpoint is used to fetch money transactions',
  })
  @ApiBody({ type: SwaggerFundTransfer })
  @ApiParam({ name: 'clientId', description: 'SBE Client ID' })
  @ApiQuery({ name: 'page', description: 'Current Page' })
  @ApiQuery({ name: 'limit', description: 'No of Records' })
  @ApiOkResponse({ type: SwaggerPaymentMethodResponse })
  getMoneyTransactions(
    @Body() body: GetTransactionsRequest,
    @Query() query,
    @Param('clientId') clientId: number,
  ) {
    body.page = query.page || 1;
    body.limit = query.limit || 100;
    body.clientId = clientId;

    return this.walletService.getMoneyTransactions(body);
  }

  @Post(':clientId/get-system-transactions')
  @ApiOperation({
    summary: 'Get admin system transactions',
    description: 'This endpoint is used to fetch system transactions',
  })
  @ApiBody({ type: SwaggerFundTransfer })
  @ApiParam({ name: 'clientId', description: 'SBE Client ID' })
  @ApiQuery({ name: 'page', description: 'Current Page' })
  @ApiQuery({ name: 'limit', description: 'No of Records' })
  @ApiOkResponse({ type: SwaggerPaymentMethodResponse })
  getSystemTransactions(
    @Body() body: GetTransactionsRequest,
    @Query() query,
    @Param('clientId') clientId: number,
  ) {
    body.page = query.page || 1;
    body.limit = query.limit || 100;
    body.clientId = clientId;

    // return this.walletService.getSystemTransactions(body)
  }

  @Get('transaction-summary/:clientId')
  @ApiOperation({ summary: 'Get client transaction summary' })
  @ApiQuery({ name: 'range', required: false, type: String })
  @ApiQuery({ name: 'from', required: false, type: String })
  @ApiQuery({ name: 'to', required: false, type: String })
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

  @Get('agent-users/:clientId')
  @ApiOperation({ summary: 'Get wallet summary for agent users' })
  @ApiQuery({ name: 'dateRange', required: false, type: String })
  async getAllClientsSummary(
    @Param('clientId') clientId: number,
    @Query('dateRange') dateRange?: string,
  ) {
    const payload: GetShopUserWalletSummaryRequest = { clientId, dateRange };

    return this.walletService.AgentUsersSummaryRequestMethod(payload);
  }

  @Get('net-cash/:clientId')
  @ApiOperation({ summary: 'Get net cash flow summary for shop users' })
  @ApiParam({ name: 'clientId', type: Number, description: 'Client ID' })
  @ApiQuery({ name: 'range', required: false, type: String })
  @ApiQuery({ name: 'from', required: false, type: String })
  @ApiQuery({
    name: 'to',
    required: false,
    type: String,
    description: 'Range (day, week, month, yesterday, etc.)',
  })
  async getNetCash(
    @Param('clientId') clientId: number,
    @Query('range') range?: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    const payload: ShopUsersSummaryRequest = {
      clientId,
      rangeZ: range || '',
      from: from || '',
      to: to || '',
    };
    return this.walletService.getNetCashFlow(payload);
  }

  @Patch('update/payment-method')
  async updatePaymentMethod(@Body() payload: PaymentMethodRequest) {
    return this.walletService.UpdatePaymentMethod(payload);
  }

  @Delete('payment-method/:clientId')
  async deletePaymentMethod(
    @Query('id') id: number,
    @Param('clientId') clientId: number,
  ) {
    return this.walletService.DeletePaymentMethod({ id, clientId });
  }

}
