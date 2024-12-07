/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
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
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {
  CashbookApproveCashInOutRequest,
  CashbookApproveExpenseRequest,
  CashbookCreateCashInOutRequest,
  CashbookCreateExpenseRequest,
  CashbookCreateExpenseTypeRequest,
  CreateBulkPawapayRequest,
  CreatePawapayRequest,
  FetchLastApprovedRequest,
  FetchReportRequest,
  FetchUsersWithdrawalRequest,
  GetBalanceRequest,
  HandleReportRequest,
  InitiateDepositRequest,
  PawapayPredCorrRequest,
  StkRegisterUrlRequest,
  StkTransactionRequest,
  UserTransactionRequest,
  VerifyBankAccountRequest,
  VerifyDepositRequest,
  WithdrawRequest,
} from '../interfaces/wallet.pb';
import {
  SwaggerApproveCashInOutRequest,
  SwaggerApproveExpenseRequest,
  SwaggerCashbookReponse,
  SwaggerCommonResponseObj,
  SwaggerCreateBulkPawaPayRequest,
  SwaggerCreateCashInOutRequest,
  SwaggerCreateExpenseRequest,
  SwaggerCreatePawaPayRequest,
  SwaggerDepositReponse,
  SwaggerFetchLastApprovedRequest,
  SwaggerFetchReportsRequest,
  SwaggerFetchSalesReportRequest,
  SwaggerGetPaymentMethodResponse,
  SwaggerHandleReportsRequest,
  SwaggerInitiateDepositRequest,
  SwaggerListTransactionResponse,
  SwaggerListTransactions,
  SwaggerPawapayPredCorrRequest,
  SwaggerPitch90RegisterUrlRequest,
  SwaggerPitch90TransactionRequest,
  SwaggerVerifyBankAccountRequest,
  SwaggerVerifyDepositReponse,
  SwaggerWithdrawalRequest,
} from './dto';

import { AuthGuard } from 'src/identity/auth/auth.guard';
import { IAuthorizedRequest } from 'src/interfaces/authorized-request.interface';
import { WalletService } from './wallet.service';
import { FetchSalesReportRequest } from '../interfaces/wallet.pb';
import { SwaggerCommonResponse } from 'src/identity/dto';

@ApiTags('User Account APIs')
@Controller('user/wallet')
export class WalletController {
  constructor(private walletService: WalletService) {}

  @UseGuards(AuthGuard)
  @Get('/cashbook/branch/verify-transaction')
  @ApiOperation({
    summary: 'fetch last approved for branch',
    description: 'This endpoint to fetch last approved reports',
  })
  @ApiQuery({ type: SwaggerFetchLastApprovedRequest })
  @ApiOkResponse({ type: SwaggerCashbookReponse })
  CashbookVerifyFinalTransaction(
    @Query() body: FetchLastApprovedRequest,
    @Req() req: IAuthorizedRequest,
  ) {
    return this.walletService.CashbookVerifyFinalTransaction({
      ...body,
      branchId: req.user.id,
    });
  }

  @UseGuards(AuthGuard)
  @Get('/cashbook/branch/last-approved')
  @ApiOperation({
    summary: 'fetch last approved for branch',
    description: 'This endpoint to fetch last approved reports',
  })
  @ApiQuery({ type: SwaggerFetchLastApprovedRequest })
  @ApiOkResponse({ type: SwaggerCashbookReponse })
  CashbookFetchLastApproved(
    @Query() body: FetchLastApprovedRequest,
    @Req() req: IAuthorizedRequest,
  ) {
    return this.walletService.CashbookFetchLastApproved({
      ...body,
      branchId: req.user.id,
    });
  }

  @UseGuards(AuthGuard)
  @Get('/cashbook/branch/sales-report')
  @ApiOperation({
    summary: 'sales report for branch',
    description: 'This endpoint to fetch last approved reports',
  })
  @ApiQuery({ type: SwaggerFetchSalesReportRequest })
  @ApiOkResponse({ type: SwaggerCashbookReponse })
  CashbookFetchSalesReport(
    @Query() body: FetchSalesReportRequest,
    @Req() req: IAuthorizedRequest,
  ) {
    return this.walletService.CashbookFetchSalesReport({
      ...body,
      branchId: req.user.id,
    });
  }
  @UseGuards(AuthGuard)
  @Get('/cashbook/branch/current-report/:client')
  @ApiOperation({
    summary: 'current day report for branch',
    description: 'This endpoint to fetch current reports',
  })
  @ApiOkResponse({ type: SwaggerCashbookReponse })
  CurrentReport(
    @Param('clientId') clientId: number,
    @Req() req: IAuthorizedRequest,
  ) {
    return this.walletService.CurrentReport({
      clientId,
      userId: req.user.id,
      date: '',
    });
  }
  @UseGuards(AuthGuard)
  @Get('/cashbook/branch/monthly-report')
  @ApiOperation({
    summary: 'monthly report for branch',
    description: 'This endpoint to fetch monthly reports',
  })
  @ApiQuery({ type: SwaggerFetchSalesReportRequest })
  @ApiOkResponse({ type: SwaggerCashbookReponse })
  CashbookFetchMonthlyShopReport(
    @Query() body: FetchReportRequest,
    @Req() req: IAuthorizedRequest,
  ) {
    return this.walletService.CashbookFetchMonthlyShopReport({
      ...body,
      userId: req.user.id,
    });
  }

  @UseGuards(AuthGuard)
  @Get('/cashbook/fetch-report')
  @ApiOperation({
    summary: 'fetch reports for cashbook',
    description: 'This endpoint to fetch cashbook reports',
  })
  @ApiQuery({ type: SwaggerFetchReportsRequest })
  @ApiOkResponse({ type: SwaggerCashbookReponse })
  CashbookFetchReport(
    @Query() body: FetchReportRequest,
    @Req() req: IAuthorizedRequest,
  ) {
    return this.walletService.CashbookFetchReport({
      ...body,
      userId: req.user.id,
    });
  }

  @UseGuards(AuthGuard)
  @Post('/cashbook/handle-report/:clientId')
  @ApiOperation({
    summary: 'handle reports for cashbook',
    description: 'This endpoint to create/update cashbook reports',
  })
  @ApiBody({ type: SwaggerHandleReportsRequest })
  @ApiOkResponse({ type: SwaggerCashbookReponse })
  CashbookHandleReport(
    @Body() body: HandleReportRequest,
    @Param('clientId') clientId: number,
    @Req() req: IAuthorizedRequest,
  ) {
    return this.walletService.CashbookHandleReport({
      ...body,
      branchId: req.user.id,
      clientId,
    });
  }
  @UseGuards(AuthGuard)
  @Put('/cashbook/approve/cashin')
  @ApiOperation({
    summary: 'Approve cashin for cashbook',
    description: 'This endpoint is create a cashin',
  })
  @ApiBody({ type: SwaggerApproveCashInOutRequest })
  @ApiOkResponse({ type: SwaggerCashbookReponse })
  cashbookApproveCashin(
    @Body() body: CashbookApproveCashInOutRequest,
    @Req() req: IAuthorizedRequest,
  ) {
    return this.walletService.CashbookApproveCashIn({
      ...body,
      verifiedBy: req.user.id,
    });
  }

  @UseGuards(AuthGuard)
  @Post('/cashbook/cashin/:clientId')
  @ApiOperation({
    summary: 'Create cashin for cashbook',
    description: 'This endpoint is create a cashin',
  })
  @ApiBody({ type: SwaggerCreateCashInOutRequest })
  @ApiOkResponse({ type: SwaggerCashbookReponse })
  cashbookCashin(
    @Body() body: CashbookCreateCashInOutRequest,
    @Param('clientId') clientId: number,
    @Req() req: IAuthorizedRequest,
  ) {
    return this.walletService.CashbookCreateCashIn({
      ...body,
      userId: req.user.id,
      clientId,
    });
  }

  @UseGuards(AuthGuard)
  @Get('/cashbook/branch/cashin/:clientId')
  @ApiOperation({
    summary: 'create cashin',
    description: 'This endpoint is used to create cashin for cashbook',
  })
  @ApiOkResponse({ type: SwaggerCashbookReponse })
  cashbookFindAllBranchCashin(
    @Param('clientId') clientId: number,
    @Req() req: IAuthorizedRequest,
  ) {
    return this.walletService.CashbookFindAllBranchCashIn({
      branchId: req.user.id,
      clientId,
    });
  }
  @Get('/cashbook/cashin')
  @ApiOperation({
    summary: 'create cashin',
    description: 'This endpoint is used to create cashin for cashbook',
  })
  @ApiOkResponse({ type: SwaggerCashbookReponse })
  cashbookFindAllCashin() {
    return this.walletService.CashbookFindAllCashIn({});
  }
  @Delete('/cashbook/cashin/:cashin_id')
  @ApiOperation({
    summary: 'create cashin',
    description: 'This endpoint is used to create cashin for cashbook',
  })
  @ApiOkResponse({ type: SwaggerCashbookReponse })
  CashbookDeleteOneCashIn(@Param('cashin_id') cashin_id) {
    return this.walletService.CashbookDeleteOneCashIn({
      id: cashin_id,
      clientId: null,
    });
  }

  @Get('/cashbook/cashin/:cashin_id')
  @ApiOperation({
    summary: 'create cashin',
    description: 'This endpoint is used to create cashin for cashbook',
  })
  @ApiOkResponse({ type: SwaggerCashbookReponse })
  CashbookFindOneCashIn(@Param('cashin_id') cashin_id) {
    return this.walletService.CashbookFindOneCashIn({
      id: cashin_id,
      clientId: null,
    });
  }

  @UseGuards(AuthGuard)
  @Put('/cashbook/approve/cashout')
  @ApiBody({ type: SwaggerApproveCashInOutRequest })
  @ApiOkResponse({ type: SwaggerCashbookReponse })
  CashbookApproveCashOut(
    @Body() body: CashbookApproveCashInOutRequest,
    @Req() req: IAuthorizedRequest,
  ) {
    return this.walletService.CashbookApproveCashOut({
      ...body,
      verifiedBy: req.user.id,
    });
  }

  @UseGuards(AuthGuard)
  @Post('/cashbook/cashout/:clientId')
  @ApiBody({ type: SwaggerCreateCashInOutRequest })
  @ApiOkResponse({ type: SwaggerCashbookReponse })
  cashbookCashout(
    @Body() body: CashbookCreateCashInOutRequest,
    @Param('clientId') clientId: number,
    @Req() req: IAuthorizedRequest,
  ) {
    return this.walletService.CashbookCreateCashOut({
      ...body,
      userId: req.user.id,
      clientId,
    });
  }
  @UseGuards(AuthGuard)
  @Get('/cashbook/branch/cashout/:clientId')
  @ApiOkResponse({ type: SwaggerCashbookReponse })
  CashbookFindAllBranchCashOut(
    @Param('clientId') clientId: number,
    @Req() req: IAuthorizedRequest,
  ) {
    return this.walletService.CashbookFindAllBranchCashOut({
      branchId: req.user.id,
      clientId,
    });
  }
  @Get('/cashbook/cashout')
  @ApiOperation({
    summary: 'Initiate Deposit REquest',
    description: 'This endpoint is used to initiate a deposit',
  })
  @ApiOkResponse({ type: SwaggerCashbookReponse })
  cashbookFindAllCashout() {
    return this.walletService.CashbookFindAllCashOut({});
  }
  @Delete('/cashbook/cashout/:cashout_id')
  @ApiOperation({
    summary: 'create cashout',
    description: 'This endpoint is used to create cashin for cashbook',
  })
  @ApiOkResponse({ type: SwaggerCashbookReponse })
  CashbookDeleteOneCashOut(@Param('cashout_id') cashout_id) {
    return this.walletService.CashbookDeleteOneCashOut({
      id: cashout_id,
      clientId: null,
    });
  }
  @Get('/cashbook/cashout/:cashout_id/')
  @ApiOperation({
    summary: 'create cashout',
    description: 'This endpoint is used to create cashout  for cashbook',
  })
  @ApiOkResponse({ type: SwaggerCashbookReponse })
  CashbookFindOneCashOut(@Param('cashout_id') cashout_id) {
    return this.walletService.CashbookFindOneCashOut({
      id: cashout_id,
      clientId: null,
    });
  }

  @UseGuards(AuthGuard)
  @Post('/cashbook/expense/:clientId')
  @ApiOperation({
    summary: 'Create expense category for cashbook',
    description: 'This endpoint is create an expense category',
  })
  @ApiBody({ type: SwaggerCreateExpenseRequest })
  @ApiOkResponse({ type: SwaggerCashbookReponse })
  CashbookCreateExpense(
    @Param('clientId') clientId: number,

    @Body() body: CashbookCreateExpenseRequest,
    @Req() req: IAuthorizedRequest,
  ) {
    return this.walletService.CashbookCreateExpense({
      ...body,
      branchId: req.user.id,
      clientId,
    });
  }
  @UseGuards(AuthGuard)
  @Put('/cashbook/expense/:expense_id')
  @ApiOperation({
    summary: 'update expense category for branch cashbook',
    description: 'This endpoint is to update an expense category',
  })
  @ApiBody({ type: SwaggerCreateExpenseRequest })
  @ApiOkResponse({ type: SwaggerCashbookReponse })
  CashbookUpdateExpense(
    @Body() body: CashbookCreateExpenseRequest,
    @Param('expense_id') expense_id: number,
    @Req() req: IAuthorizedRequest,
  ) {
    return this.walletService.CashbookUpdateExpense({
      ...body,
      id: expense_id,
      branchId: req.user.id,
    });
  }

  @UseGuards(AuthGuard)
  @Put('/cashbook/approve/expense')
  @ApiOperation({
    summary: 'Create expense category for cashbook',
    description: 'This endpoint is create an expense category',
  })
  @ApiBody({ type: SwaggerApproveExpenseRequest })
  @ApiOkResponse({ type: SwaggerCashbookReponse })
  CashbookApproveExpense(
    @Body() body: CashbookApproveExpenseRequest,
    @Req() req: IAuthorizedRequest,
  ) {
    return this.walletService.CashbookApproveExpense({
      ...body,
      verifiedBy: req.user.id,
    });
  }
  @UseGuards(AuthGuard)
  @Get('/cashbook/branch/expense/:clientId')
  @ApiOperation({
    summary: 'Create expense category for cashbook',
    description: 'This endpoint is create an expense category',
  })
  @ApiOkResponse({ type: SwaggerCashbookReponse })
  CashbookFindAllBranchExpense(
    @Req() req: IAuthorizedRequest,
    @Param('clientId') clientId: number,
  ) {
    return this.walletService.CashbookFindAllBranchExpense({
      branchId: req.user.id,
      clientId,
    });
  }

  @Get('/cashbook/expense')
  @ApiOperation({
    summary: 'get all expenses',
    description: 'This endpoint is create an expense category',
  })
  @ApiOkResponse({ type: SwaggerCashbookReponse })
  CashbookFindAllExpense() {
    return this.walletService.CashbookFindAllExpense({});
  }

  @UseGuards(AuthGuard)
  @Delete('/cashbook/expense/:expense_id')
  @ApiOperation({
    summary: 'Create expense category for cashbook',
    description: 'This endpoint is create an expense category',
  })
  @ApiBody({ type: SwaggerCreateCashInOutRequest })
  @ApiOkResponse({ type: SwaggerCashbookReponse })
  CashbookDeleteOneExpense(@Param('expense_id') expense_id) {
    return this.walletService.CashbookDeleteOneExpense({
      id: expense_id,
      clientId: null,
    });
  }
  @Get('/cashbook/expense/:expense_id')
  @ApiOperation({
    summary: 'Create expense category for cashbook',
    description: 'This endpoint is create an expense category',
  })
  @ApiBody({ type: SwaggerCreateCashInOutRequest })
  @ApiOkResponse({ type: SwaggerCashbookReponse })
  CashbookFindOneExpense(@Param('expense_id') expense_id) {
    return this.walletService.CashbookFindOneExpense({
      id: expense_id,
      clientId: null,
    });
  }

  //  EXPENSE TYPE
  @UseGuards(AuthGuard)
  @Post('/cashbook/expense-type')
  @ApiOperation({
    summary: 'Create expense category for cashbook',
    description: 'This endpoint is create an expense category',
  })
  @ApiBody({ type: SwaggerCreateCashInOutRequest })
  @ApiOkResponse({ type: SwaggerCashbookReponse })
  CashbookCreateExpenseType(@Body() body: CashbookCreateExpenseTypeRequest) {
    return this.walletService.CashbookCreateExpenseType(body);
  }

  @Get('/cashbook/expense-type')
  @ApiOperation({
    summary: 'Create expense category for cashbook',
    description: 'This endpoint is create an expense category',
  })
  @ApiBody({ type: SwaggerCreateCashInOutRequest })
  @ApiOkResponse({ type: SwaggerCashbookReponse })
  CashbookFindAllExpenseType() {
    return this.walletService.CashbookFindAllExpenseType({});
  }

  @UseGuards(AuthGuard)
  @Post('/initiate-deposit')
  @ApiOperation({
    summary: 'Initiate Deposit REquest',
    description: 'This endpoint is used to initiate a deposit',
  })
  @ApiQuery({
    name: 'source',
    type: 'string',
    description: 'SBE platform used to initiate the request',
    example: 'mobile',
  })
  @ApiBody({ type: SwaggerInitiateDepositRequest })
  @ApiOkResponse({ type: SwaggerDepositReponse })
  inititateDeposit(
    @Body() body: InitiateDepositRequest,
    @Query() query: any,
    @Req() req: IAuthorizedRequest,
  ) {
    body.userId = req.user.id;
    body.source = query.source;
    return this.walletService.inititateDeposit(body);
  }

  @Get('/verify-payment')
  @ApiOperation({
    summary: 'Verify Deposit transaction',
    description:
      'This endpoint is used to check the status of a deposit transaction',
  })
  @ApiQuery({
    name: 'paymentChannel',
    type: 'string',
    description: 'name of the payment gateway',
    example: 'paystack',
  })
  @ApiQuery({
    name: 'clientId',
    type: 'number',
    description: 'SBE client ID',
    example: 1,
  })
  @ApiQuery({
    name: 'transactionRef',
    type: 'string',
    description: 'Transaction reference number',
    example: '',
  })
  @ApiBody({ type: SwaggerInitiateDepositRequest })
  @ApiOkResponse({ type: SwaggerVerifyDepositReponse })
  verifyPayment(@Query() query: VerifyDepositRequest) {
    return this.walletService.verifyDeposit(query);
  }

  @UseGuards(AuthGuard)
  @Post('/verify-bank-account')
  @ApiOperation({
    summary: 'Verify Bank Account',
    description:
      'This endpoint is used to verify a users banka account before withdrawal',
  })
  @ApiQuery({
    name: 'source',
    type: 'string',
    description: 'SBE platform used to initiate the request',
    example: 'mobile',
  })
  @ApiBody({ type: SwaggerVerifyBankAccountRequest })
  @ApiOkResponse({ type: SwaggerVerifyDepositReponse })
  verifyBankAccount(
    @Body() body: VerifyBankAccountRequest,
    @Query() query: any,
    @Req() req: IAuthorizedRequest,
  ) {
    body.userId = req.user.id;
    body.source = query.source;
    return this.walletService.verifyBankAccount(body);
  }

  @UseGuards(AuthGuard)
  @Post('/withdraw')
  @ApiOperation({
    summary: 'Withdrawal Request',
    description: 'This endpoint is used to make a withdrawal request',
  })
  @ApiQuery({
    name: 'source',
    type: 'string',
    description: 'SBE platform used to initiate the request',
    example: 'mobile',
  })
  @ApiBody({ type: SwaggerWithdrawalRequest })
  @ApiOkResponse({ type: SwaggerDepositReponse })
  requestWithdrawal(
    @Body() body: WithdrawRequest,
    @Query() query: any,
    @Req() req: IAuthorizedRequest,
  ) {
    body.userId = req.user.id;
    body.username = req.user.username;
    body.source = query.source;
    return this.walletService.requestWithdrawal(body);
  }

  @UseGuards(AuthGuard)
  @Post('/transactions')
  @ApiOperation({
    summary: 'List Transactions',
    description: 'This endpoint fetches authenticated user transactions',
  })
  @ApiQuery({
    name: 'source',
    type: 'string',
    description: 'SBE platform used to initiate the request',
    example: 'mobile',
  })
  @ApiQuery({
    name: 'limit',
    type: 'number',
    description: 'Page limit',
    example: 'mobile',
  })
  @ApiQuery({
    name: 'page',
    type: 'number',
    description: 'Current Page',
    example: 'mobile',
  })
  @ApiBody({ type: SwaggerListTransactions })
  @ApiOkResponse({ type: SwaggerListTransactionResponse })
  listTransactions(
    @Body() body: UserTransactionRequest,
    @Query('limit') limit: number,
    @Query('page') page: number,
    @Req() req: IAuthorizedRequest,
  ) {
    body.userId = req.user.id;
    body.limit = limit || 100;
    body.page = page || body.page;

    return this.walletService.getUserTransactions(body);
  }

  @UseGuards(AuthGuard)
  @Get('/bank-accounts')
  @ApiOperation({
    summary: 'Get User Bank Accounts',
    description: 'This endpoint fetches authenticated user saved bank accounts',
  })
  @ApiQuery({
    name: 'clientId',
    type: 'number',
    description: 'SBE Client ID',
  })
  getUserAccounts(
    @Query('clientId') clientId: number,
    @Req() req: IAuthorizedRequest,
  ) {
    const payload: GetBalanceRequest = {
      userId: req.user.id,
      clientId,
    };
    return this.walletService.getBankAccounts(payload);
  }

  @Get(':clientId/payment-methods')
  @ApiOperation({
    summary: 'Fetch Payment Methods',
    description:
      'This endpoint is used to fetch payment methods for a particular SBE client',
  })
  @ApiParam({
    name: 'clientId',
    type: 'number',
    description: ' Unique ID of the client',
  })
  @ApiOkResponse({ type: SwaggerGetPaymentMethodResponse })
  fetchRoles(@Param() param: any, @Query() query) {
    return this.walletService.getPaymentMethods({
      clientId: param.clientId,
      status: 1,
    });
  }
  @Get(':clientId/banks')
  @ApiOperation({
    summary: 'Fetch Banks',
    description: 'This endpoint is used to fetch all banks',
  })
  @ApiParam({
    name: 'clientId',
    type: 'number',
    description: ' Unique ID of the client',
  })
  @ApiOkResponse({ type: SwaggerGetPaymentMethodResponse })
  fetchBanks(@Param() param: any, @Query() query) {
    return this.walletService.listBanks({ clientId: param.client_id });
  }

  @UseGuards(AuthGuard)
  @Post('/pawapay-bulk-payout/:clientId')
  @ApiOperation({
    summary: 'handle bulk-payouts request for pawapay',
    description: 'This endpoint to handle pawaypay bulk-payouts requests',
  })
  @ApiParam({
    name: 'clientId',
    type: 'number',
    description: 'Unique ID of the client',
  })
  @ApiBody({ type: SwaggerCreateBulkPawaPayRequest })
  @ApiOkResponse({ type: SwaggerCommonResponseObj })
  HandleCreateBulkPawaPay(
    @Body() body: CreateBulkPawapayRequest,
    @Param('clientId') clientId: number,
    @Req() req: IAuthorizedRequest,
  ) {
    return this.walletService.HandleCreateBulkPawaPay({
      ...body,
      userId: req.user.id,
      clientId,
    });
  }

  @UseGuards(AuthGuard)
  @Post('/pawapay-create/:action/:clientId')
  @ApiOperation({
    summary:
      'handle deposit/payouts/refunds/cancel-payouts request for pawapay',
    description: 'This endpoint to handle pawaypay requests',
  })
  @ApiParam({
    name: 'clientId',
    type: 'number',
    description: 'Unique ID of the client',
  })
  @ApiParam({
    name: 'action',
    type: 'string',
    description: 'deposit | payouts | refunds | cancel-payouts',
  })
  @ApiBody({ type: SwaggerCreatePawaPayRequest })
  @ApiOkResponse({ type: SwaggerCommonResponseObj })
  HandleCreatePawaPay(
    @Body() body: CreatePawapayRequest,
    @Param('clientId') clientId: number,
    @Param('action') action: string,
    @Req() req: IAuthorizedRequest,
  ) {
    return this.walletService.HandleCreatePawaPay({
      ...body,
      userId: req.user.id,
      clientId,
      action,
      depositId: body.depositId ? body.depositId : null,
    });
  }

  @UseGuards(AuthGuard)
  @Get('/pawapay-fetch/:action/:actionId/:clientId')
  @ApiOperation({
    summary:
      'Get payouts/deposit/refund status and details by the actionId from your initial payout request',
    description: 'A list with at most one Payout/Deposit/Refund is returned',
  })
  @ApiParam({
    name: 'actionId',
    type: 'string',
    description: 'request action Id',
  })
  @ApiParam({
    name: 'action',
    type: 'string',
    description: 'deposit | payouts | refunds',
  })
  @ApiParam({
    name: 'clientId',
    type: 'number',
    description: 'Unique ID of the client',
  })
  @ApiOkResponse({ type: SwaggerCommonResponse })
  HandleFetchPawaPay(
    @Param('actionId') actionId: string,
    @Param('action') action: string,
    @Param('clientId') clientId: number,
  ) {
    return this.walletService.HandleFetchPawaPay({
      actionId,
      action,
      clientId,
    });
  }

  @UseGuards(AuthGuard)
  @Get('/pawapay-callback/:action/:actionId/:clientId')
  @ApiOperation({
    summary:
      'Resends the callback for a payout/deposit/refund to your configured callback UR',
    description:
      'The payout/deposit/refund must have reached a final state. The callback delivery has to have failed already.',
  })
  @ApiParam({
    name: 'actionId',
    type: 'string',
    description: 'request action Id',
  })
  @ApiParam({
    name: 'action',
    type: 'string',
    description: 'deposit | payouts | refunds',
  })
  @ApiParam({
    name: 'clientId',
    type: 'number',
    description: 'Unique ID of the client',
  })
  @ApiOkResponse({ type: SwaggerCommonResponseObj })
  HandlePawaPayResendCallback(
    @Param('actionId') actionId: string,
    @Param('action') action: string,
    @Param('clientId') clientId: number,
  ) {
    return this.walletService.HandlePawaPayResendCallback({
      actionId,
      action,
      clientId,
    });
  }

  @UseGuards(AuthGuard)
  @Get('/pawapay/balance/:clientId')
  @ApiOperation({
    summary: 'check balance',
    description:
      'Allows you to get the list of wallets and their balances configured for your account',
  })
  @ApiParam({
    name: 'clientId',
    type: 'number',
    description: 'Unique ID of the client',
  })
  @ApiOkResponse({ type: SwaggerCommonResponse })
  HandlePawaPayBalances(@Param('clientId') clientId: number) {
    return this.walletService.HandlePawaPayBalances({
      clientId,
      country: '',
    });
  }

  @UseGuards(AuthGuard)
  @Get('/pawapay/balance/:country/:clientId')
  @ApiOperation({
    summary: 'check country balance fror pawapay',
    description:
      'Allows you to get the wallet balances for a specific country configured for your account',
  })
  @ApiParam({
    name: 'clientId',
    type: 'number',
    description: 'Unique ID of the client',
  })
  @ApiParam({
    name: 'country',
    type: 'string',
    description: 'country 3-letter code NGN | GHC',
  })
  @ApiOkResponse({ type: SwaggerCommonResponse })
  HandlePawaPayCountryBalances(
    @Param('country') country: string,
    @Param('clientId') clientId: number,
  ) {
    console.log(345);
    return this.walletService.HandlePawaPayCountryBalances({
      country,
      clientId,
    });
  }

  @UseGuards(AuthGuard)
  @Get('/pawapay-toolkit/:action/:clientId')
  @ApiOperation({
    summary: 'fetch pawapay Toolkit',
    description: 'This endpoint to fetch toolkit information',
  })
  @ApiParam({
    name: 'action',
    type: 'string',
    description: 'availability | public-key',
  })
  @ApiOkResponse({ type: SwaggerCommonResponse })
  HandlePawaPayToolkit(
    @Param('action') action: string,
    @Param('clientId') clientId: number,
  ) {
    console.log(action);
    return this.walletService.HandlePawaPayToolkit({
      action,
      clientId,
    });
  }

  @UseGuards(AuthGuard)
  @Get('/pawapay-active-conf')
  @ApiOperation({
    summary: 'fetch active configuration',
    description: 'This endpoint to fetch active configuration',
  })
  @ApiOkResponse({ type: SwaggerCommonResponse })
  HandlePawaPayActiveConf(@Param('clientId') clientId: number) {
    return this.walletService.HandlePawaPayActiveConf({
      clientId,
      country: '',
    });
  }

  @UseGuards(AuthGuard)
  @Post('/pawapay-correspondent')
  @ApiOperation({
    summary: 'post requests for pawaypay correspondent',
    description: 'Phone number must e in the format of +260 763-456789',
  })
  @ApiBody({ type: SwaggerPawapayPredCorrRequest })
  @ApiOkResponse({ type: SwaggerCommonResponseObj })
  HandlePawaPayPredCorr(@Body() body: PawapayPredCorrRequest) {
    return this.walletService.HandlePawaPayPredCorr(body);
  }
  @UseGuards(AuthGuard)
  @Post('/virtual-account/:clientId')
  @ApiOperation({
    summary: 'post requests to create virtual account',
    description: 'This endpoint to handle creating a virtual account',
  })
  @ApiParam({
    name: 'clientId',
    type: 'number',
    description: '',
  })
  @ApiOkResponse({ type: SwaggerCommonResponseObj })
  HandleCreateVirtualAccount(
    @Param('clientId') clientId: number,
    @Req() req: IAuthorizedRequest,
  ) {
    return this.walletService.HandleCreateVirtualAccount({
      userId: req.user.id,
      clientId,
    });
  }
  @UseGuards(AuthGuard)
  @Get('/virtual-account/:clientId')
  @ApiOperation({
    summary: 'get requests to fetch virtual account',
    description: 'This endpoint to handle fetching a virtual account',
  })
  @ApiParam({
    name: 'clientId',
    type: 'number',
    description: '',
  })
  @ApiBody({ type: SwaggerPawapayPredCorrRequest })
  @ApiOkResponse({ type: SwaggerCommonResponseObj })
  WayabankAccountEnquiry(
    @Param('clientId') clientId: number,
    @Req() req: IAuthorizedRequest,
  ) {
    return this.walletService.WayabankAccountEnquiry({
      userId: req.user.id,
      clientId,
    });
  }

  @Post('/stk-register-url/:clientId/:action')
  @ApiOperation({
    summary: 'post request to register url for stk push notification',
    description: 'This endpoint to handle registration of required url for stk deposit/withdrawal push notifications',
  })
  @ApiParam({
    name: 'action',
    type: 'string',
    description: 'payment | withdrawal | stkstatus',
  })
  @ApiBody({ type: SwaggerPitch90RegisterUrlRequest })
  @ApiOkResponse({ type: SwaggerCommonResponseObj })
  stk90RegisterUrl(
    @Body() param,
    @Param('action') action: string,
    @Param('clientId') clientId: number
  ) {
    return this.walletService.Pitch90RegisterUrl({ url: param.url, action, clientId });
  }

  @Post('/stk-transaction/:clientId/:action')
  @ApiOperation({
    summary: 'post request to handle stk push request',
    description: 'This endpoint to handle stk deposit/withdrawal/stkStatus requests',
  })
  @ApiParam({
    name: 'action',
    type: 'string',
    description: 'deposit | withdrawal | stkstatus',
  })
  @ApiBody({ type: SwaggerPitch90RegisterUrlRequest })
  @ApiOkResponse({ type: SwaggerCommonResponseObj })
  async handleStkTransaction(
    @Body() param,
    @Param('action') action: string,
    @Param('clientId') clientId: number,
  ) {
    try {
    let res: any;
      const payload = {
        clientId,
        amount: param.amount,
        msisdn: param.msisdn,
        trxCode: param.trx_code,
        trxDate: param.trx_date,
        refId: param.ref_id
      }
      switch (action) {
        case 'deposit':
          res = await this.walletService.stkDepositnotification(payload);
          break;
        case 'withdrawal':
          res = await this.walletService.stkWithdrawNotification(payload)
        default:
          res = await this.walletService.stkStatusNotification(payload);
          break;
      }
      console.log(res);

      if (res.success) {
        return {
          status: 'Success',
          ref_id: res.data.refId
        }
      } else {
        return {
          status: 'Fail',
          ref_id: res.data.refId,
          error_no: res.data.error_no || '',
          error_desc: res.message || '',
        }
      }
    } catch (e) {
      console.log('stk transaction error', e.message);
    }
  }

  @UseGuards(AuthGuard)
  @Get('/withdraw-history/:clientId')
  @ApiOperation({
    summary: 'get request to fetch logged in users withdraw-history',
    description: 'This endpoint to fetch users withdrawal history information',
  })
  @ApiQuery({
    name: 'pending',
    type: 'string',
    description:
      'pending key to determine whether to return users pending requests',
    example: 'mobile',
  })
  @ApiParam({
    name: 'clientId',
    type: 'string',
    description: 'client id',
  })
  @ApiOkResponse({ type: SwaggerCommonResponse })
  FetchUsersWithdrawal(
    @Body() param: FetchUsersWithdrawalRequest,
    @Param('clientId') clientId: number,
    @Query('pending') pending?: string,
  ) {
    const isPending = pending === 'true';
    return this.walletService.FetchUsersWithdrawal({
      ...param,
      clientId,
      pending: isPending,
    });
  }
}
