/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';

import {
  CashbookIdRequest,
  CashInOutRepeatedResponse,
  CashInOutSingleResponse,
  CashbookApproveCashInOutRequest,
  CashbookCreateCashInOutRequest,
  CashbookCreateExpenseRequest,
  CashbookCreateExpenseTypeRequest,
  CashbookApproveExpenseRequest,
  EmptyRequest,
  BranchRequest,
  IdRequest,
  ExpenseSingleResponse,
  ExpenseRepeatedResponse,
  ExpenseTypeSingleResponse,
  ExpenseTypeRepeatedResponse,
  CommonResponseArray,
  CommonResponseObj,
  CreditUserRequest,
  DebitUserRequest,
  GetBalanceRequest,
  GetPaymentMethodRequest,
  GetPaymentMethodResponse,
  GetUserAccountsResponse,
  InitiateDepositRequest,
  InitiateDepositResponse,
  ListDepositRequests,
  ListWithdrawalRequestResponse,
  ListWithdrawalRequests,
  MonnifyWebhookRequest,
  OpayWebhookRequest,
  OpayWebhookResponse,
  PaginationResponse,
  PaymentMethodRequest,
  PaymentMethodResponse,
  PaystackWebhookRequest,
  ProcessRetailTransaction,
  UpdateWithdrawalRequest,
  UserTransactionRequest,
  UserTransactionResponse,
  ValidateTransactionRequest,
  VerifyBankAccountRequest,
  VerifyBankAccountResponse,
  VerifyDepositRequest,
  VerifyDepositResponse,
  WALLET_SERVICE_NAME,
  WalletResponse,
  WalletServiceClient,
  WalletTransferRequest,
  WebhookResponse,
  WithdrawRequest,
  WithdrawResponse,
  protobufPackage,
  FetchReportRequest,
  FetchReportResponse,
  HandleReportRequest,
  FetchLastApprovedRequest,
  FetchSalesReportRequest,
  SalesReportResponseArray,
  LastApprovedResponse,
  CreatePawapayRequest,
  FetchPawapayRequest,
  PawapayCountryRequest,
  PawapayToolkitRequest,
  PawapayPredCorrRequest,
  CreateBulkPawapayRequest,
  WayaBankRequest,
  GetTransactionsRequest,
  FetchUsersWithdrawalRequest,
  StkTransactionRequest,
  StkRegisterUrlRequest,
  FlutterwaveWebhookRequest,
  KoraPayWebhookRequest,
  TigoWebhookRequest,
  PawapayRequest,
  PawapayResponse,
  TigoW2aRequest,
  TigoW2aResponse,
  MtnmomoRequest,
  SummaryRequest,
  TrxSummaryRequest,
  SummaryResponse,
  GetShopUserWalletSummaryRequest,
  GetShopUserWalletSummaryResponse,
  ShopUsersSummaryRequest,
  ShopUsersSummaryResponse,
  OpayResponse,
  OpayRequest,
  CorapayResponse,
  CorapayWebhookRequest,
  DeletePaymentMethodRequest,
  DeletePaymentMethodResponse,
  FidelityResponse,
  FidelityWebhookRequest,
  ProvidusRequest,
  ProvidusResponse,
  GlobusRequest,
  GlobusResponse,
  SmileAndPayRequest,
  SmileAndPayResponse,
  VerifySmile,
  VerifySmileRes,
  ClientRequest,
  FinancialPerformanceResponse,
  PlayerBalanceResponse,
} from '../interfaces/wallet.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WalletService {
  private svc: WalletServiceClient;

  @Inject(protobufPackage)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<WalletServiceClient>(WALLET_SERVICE_NAME);
  }


  async FinancialPerformanceResponse(
    request: ClientRequest,
  ): Promise<FinancialPerformanceResponse> {
    return await firstValueFrom(this.svc.financialPerformance(request));
  }


  async Balances(
    request: ClientRequest,
  ): Promise<PlayerBalanceResponse> {
    return await firstValueFrom(this.svc.playerBalances(request));
  }


  async savePaymentMethod(
    request: PaymentMethodRequest,
  ): Promise<PaymentMethodResponse> {
    return await firstValueFrom(this.svc.savePaymentMethod(request));
  }

  async getSummeryMethod(request: SummaryRequest): Promise<SummaryResponse> {
    return await firstValueFrom(this.svc.getTransactionSummary(request));
  }

  async AgentUsersSummaryRequestMethod(
    request: GetShopUserWalletSummaryRequest,
  ): Promise<GetShopUserWalletSummaryResponse> {
    return await firstValueFrom(this.svc.shopTransactionSummary(request));
  }

  async getNetCashFlow(
    payload: ShopUsersSummaryRequest,
  ): Promise<ShopUsersSummaryResponse> {
    return await firstValueFrom(this.svc.shopUsersSummary(payload));
  }

  async getPaymentMethods(
    request: GetPaymentMethodRequest,
  ): Promise<GetPaymentMethodResponse> {
    return await firstValueFrom(this.svc.getPaymentMethods(request));
  }

  async listBanks(request): Promise<CommonResponseArray> {
    return await firstValueFrom(this.svc.listBanks(request));
  }

  async listWithdrawals(
    request: ListWithdrawalRequests,
  ): Promise<ListWithdrawalRequestResponse> {
    //('list withdrawals');
    return await firstValueFrom(this.svc.listWithdrawals(request));
  }

  async listDeposits(
    request: ListDepositRequests,
  ): Promise<PaginationResponse> {
    //('list deposits');
    return await firstValueFrom(this.svc.listDeposits(request));
  }

  async UpdatePaymentMethod(
    request: PaymentMethodRequest,
  ): Promise<GetPaymentMethodResponse> {
    return await firstValueFrom(this.svc.updatePaymentMethod(request));
  }

  async DeletePaymentMethod(
    request: DeletePaymentMethodRequest,
  ): Promise<DeletePaymentMethodResponse> {
    return await firstValueFrom(this.svc.deletePaymentMethod(request));
  }

  async updateWithdrawal(
    request: UpdateWithdrawalRequest,
  ): Promise<CommonResponseObj> {
    return await firstValueFrom(this.svc.updateWithdrawal(request));
  }

  async inititateDeposit(
    data: InitiateDepositRequest,
  ): Promise<InitiateDepositResponse> {
    return await firstValueFrom(this.svc.inititateDeposit(data));
  }

  async flutterWaveWebhook(
    data: FlutterwaveWebhookRequest,
  ): Promise<WebhookResponse> {
    return await firstValueFrom(this.svc.flutterWaveWebhook(data));
  }
  async tigoWebhook(data: TigoWebhookRequest): Promise<WebhookResponse> {
    console.log('check44');
    return await firstValueFrom(this.svc.tigoWebhook(data));
  }

  async OpayWebhook(data: OpayRequest): Promise<OpayResponse> {
    console.log('check44');
    return await firstValueFrom(this.svc.opayCallback(data));
  }

  async FidelityWebhook(
    data: FidelityWebhookRequest,
  ): Promise<FidelityResponse> {
    console.log('fidelity');
    return await firstValueFrom(this.svc.fidelityWebhook(data));
  }

  async CorapayWebhook(data: CorapayWebhookRequest): Promise<CorapayResponse> {
    console.log('check555');
    return await firstValueFrom(this.svc.corapayWebhook(data));
  }

  async mtnmomoWebhook(data: MtnmomoRequest): Promise<WebhookResponse> {
    console.log('checkMtnMomo');
    return await firstValueFrom(this.svc.mtnmomoCallback(data));
  }

  async handleW2aWebhook(data: TigoW2aRequest): Promise<TigoW2aResponse> {
    console.log('check555');
    return await firstValueFrom(this.svc.tigoW2A(data));
  }

  async handleProvidusWebhook(
    data: ProvidusRequest,
  ): Promise<ProvidusResponse> {
    console.log('Providus-service');
    return await firstValueFrom(this.svc.providusWebhook(data));
  }

  async handleGlobusWebhook(data: GlobusRequest): Promise<GlobusResponse> {
    console.log('Globus-service');
    return await firstValueFrom(this.svc.globusWebhook(data));
  }

  async handleSmileNPayWebhook(
    data: SmileAndPayRequest,
  ): Promise<SmileAndPayResponse> {
    console.log('Globus-service');
    return await firstValueFrom(this.svc.smileAndPayWebhook(data));
  }

  async handleSmileNPayVerify(
    data: VerifySmile,
  ): Promise<VerifySmileRes> {
    console.log('Smile And Pay');
    return await firstValueFrom(this.svc.verifySmileAndPay(data));
  }

  async pawapayCallback(data: PawapayRequest): Promise<PawapayResponse> {
    console.log('check44');
    return await firstValueFrom(this.svc.pawapayCallback(data));
  }
  async korapayWaveWebhook(
    data: KoraPayWebhookRequest,
  ): Promise<WebhookResponse> {
    return await firstValueFrom(this.svc.korapayWebhook(data));
  }

  async verifyDeposit(
    data: VerifyDepositRequest,
  ): Promise<VerifyDepositResponse> {
    return await firstValueFrom(this.svc.verifyDeposit(data));
  }

  async verifyBankAccount(
    data: VerifyBankAccountRequest,
  ): Promise<VerifyBankAccountResponse> {
    return await firstValueFrom(this.svc.verifyBankAccount(data));
  }

  async requestWithdrawal(data: WithdrawRequest): Promise<WithdrawResponse> {
    return await firstValueFrom(this.svc.requestWithdrawal(data));
  }

  async paystackWebhook(
    data: PaystackWebhookRequest,
  ): Promise<WebhookResponse> {
    return await firstValueFrom(this.svc.paystackWebhook(data));
  }

  async monnifyWebhook(data: MonnifyWebhookRequest): Promise<WebhookResponse> {
    return await firstValueFrom(this.svc.monnifyWebhook(data));
  }

  async opayDeposit(data: OpayWebhookRequest): Promise<OpayWebhookResponse> {
    return await firstValueFrom(this.svc.opayDepositWebhook(data));
  }

  async opayVerification(
    data: OpayWebhookRequest,
  ): Promise<OpayWebhookResponse> {
    return await firstValueFrom(this.svc.opayLookUpWebhook(data));
  }

  async getUserTransactions(
    data: UserTransactionRequest,
  ): Promise<UserTransactionResponse> {
    //(data);
    return await firstValueFrom(this.svc.userTransactions(data));
  }

  async creditUser(data: CreditUserRequest): Promise<WalletResponse> {
    // //(data);
    return await firstValueFrom(this.svc.creditUser(data));
  }

  async debitUser(data: DebitUserRequest): Promise<WalletResponse> {
    return await firstValueFrom(this.svc.debitUser(data));
  }

  async getBankAccounts(
    data: GetBalanceRequest,
  ): Promise<GetUserAccountsResponse> {
    return await firstValueFrom(this.svc.getUserAccounts(data));
  }

  async transferFunds(data: WalletTransferRequest): Promise<CommonResponseObj> {
    //('transfer data', data);
    return await firstValueFrom(this.svc.walletTransfer(data));
  }

  async validateDepositCode(
    data: ValidateTransactionRequest,
  ): Promise<CommonResponseObj> {
    return await firstValueFrom(this.svc.validateDepositCode(data));
  }

  async processShopDeposit(
    data: ProcessRetailTransaction,
  ): Promise<CommonResponseObj> {
    //('process shop deposit', data);
    return await firstValueFrom(this.svc.processShopDeposit(data));
  }

  async validateWithdrawalCode(
    data: ValidateTransactionRequest,
  ): Promise<CommonResponseObj> {
    //('validate withdrawal', data);
    return await firstValueFrom(this.svc.validateWithdrawalCode(data));
  }

  async processShopWithdrawal(
    data: ProcessRetailTransaction,
  ): Promise<CommonResponseObj> {
    //('process shop withdrawal', data);
    return await firstValueFrom(this.svc.processShopWithdrawal(data));
  }

  async getMoneyTransactions(
    data: GetTransactionsRequest,
  ): Promise<CommonResponseObj> {
    //("get money transaction", data);
    return await firstValueFrom(this.svc.getMoneyTransaction(data));
  }
  // EXPENSES
  async CashbookApproveExpense(
    data: CashbookApproveExpenseRequest,
  ): Promise<ExpenseSingleResponse> {
    return await firstValueFrom(this.svc.cashbookApproveExpense(data));
  }
  async CashbookCreateExpense(
    data: CashbookCreateExpenseRequest,
  ): Promise<ExpenseSingleResponse> {
    return await firstValueFrom(this.svc.cashbookCreateExpense(data));
  }
  async CashbookUpdateExpense(
    data: CashbookCreateExpenseRequest,
  ): Promise<ExpenseSingleResponse> {
    return await firstValueFrom(this.svc.cashbookUpdateOneExpense(data));
  }
  async CashbookFindAllExpense(
    data: EmptyRequest,
  ): Promise<ExpenseRepeatedResponse> {
    return await firstValueFrom(this.svc.cashbookFindAllExpense(data));
  }
  async CashbookFindAllBranchExpense(
    data: BranchRequest,
  ): Promise<ExpenseRepeatedResponse> {
    return await firstValueFrom(this.svc.cashbookFindAllBranchExpense(data));
  }
  async CashbookFindOneExpense(
    data: CashbookIdRequest,
  ): Promise<ExpenseSingleResponse> {
    return await firstValueFrom(this.svc.cashbookFindOneExpense(data));
  }

  async CashbookDeleteOneExpense(
    data: CashbookIdRequest,
  ): Promise<ExpenseSingleResponse> {
    return await firstValueFrom(this.svc.cashbookDeleteOneExpense(data));
  }
  //   EXPENSE TYPE
  async CashbookCreateExpenseType(
    data: CashbookCreateExpenseTypeRequest,
  ): Promise<ExpenseTypeSingleResponse> {
    return await firstValueFrom(this.svc.cashbookCreateExpenseType(data));
  }
  async CashbookFindAllExpenseType(
    data: EmptyRequest,
  ): Promise<ExpenseTypeRepeatedResponse> {
    return await firstValueFrom(this.svc.cashbookFindAllExpenseType(data));
  }

  //   CASH IN
  async CashbookApproveCashIn(
    data: CashbookApproveCashInOutRequest,
  ): Promise<CashInOutSingleResponse> {
    return await firstValueFrom(this.svc.cashbookApproveCashIn(data));
  }
  async CashbookCreateCashIn(
    data: CashbookCreateCashInOutRequest,
  ): Promise<CashInOutSingleResponse> {
    return await firstValueFrom(this.svc.cashbookCreateCashIn(data));
  }
  async CashbookDeleteOneCashIn(
    data: CashbookIdRequest,
  ): Promise<CashInOutSingleResponse> {
    return await firstValueFrom(this.svc.cashbookDeleteOneCashIn(data));
  }
  async CashbookFindOneCashIn(
    data: CashbookIdRequest,
  ): Promise<CashInOutSingleResponse> {
    return await firstValueFrom(this.svc.cashbookFindOneCashIn(data));
  }
  async CashbookFindAllCashIn(
    data: EmptyRequest,
  ): Promise<CashInOutRepeatedResponse> {
    return await firstValueFrom(this.svc.cashbookFindAllCashIn(data));
  }
  async CashbookFindAllBranchCashIn(
    data: BranchRequest,
  ): Promise<CashInOutRepeatedResponse> {
    return await firstValueFrom(this.svc.cashbookFindAllBranchCashIn(data));
  }
  //   CASH OUT
  async CashbookApproveCashOut(
    data: CashbookApproveCashInOutRequest,
  ): Promise<CashInOutSingleResponse> {
    return await firstValueFrom(this.svc.cashbookApproveCashOut(data));
  }
  async CashbookCreateCashOut(
    data: CashbookCreateCashInOutRequest,
  ): Promise<CashInOutSingleResponse> {
    return await firstValueFrom(this.svc.cashbookCreateCashOut(data));
  }
  async CashbookDeleteOneCashOut(
    data: CashbookIdRequest,
  ): Promise<CashInOutSingleResponse> {
    return await firstValueFrom(this.svc.cashbookDeleteOneCashOut(data));
  }
  async CashbookFindOneCashOut(
    data: CashbookIdRequest,
  ): Promise<CashInOutSingleResponse> {
    return await firstValueFrom(this.svc.cashbookFindOneCashOut(data));
  }
  async CashbookFindAllCashOut(
    data: EmptyRequest,
  ): Promise<CashInOutRepeatedResponse> {
    return await firstValueFrom(this.svc.cashbookFindAllCashOut(data));
  }
  async CashbookFindAllBranchCashOut(
    data: BranchRequest,
  ): Promise<CashInOutRepeatedResponse> {
    return await firstValueFrom(this.svc.cashbookFindAllBranchCashOut(data));
  }
  async CurrentReport(data: FetchReportRequest): Promise<CommonResponseObj> {
    return await firstValueFrom(this.svc.currentReport(data));
  }
  async CashbookFetchReport(
    data: FetchReportRequest,
  ): Promise<FetchReportResponse> {
    return await firstValueFrom(this.svc.cashbookFetchReport(data));
  }
  async CashbookHandleReport(
    data: HandleReportRequest,
  ): Promise<FetchReportResponse> {
    return await firstValueFrom(this.svc.cashbookHandleReport(data));
  }
  async CashbookFetchLastApproved(
    data: FetchLastApprovedRequest,
  ): Promise<LastApprovedResponse> {
    return await firstValueFrom(this.svc.cashbookFetchLastApproved(data));
  }

  async CashbookVerifyFinalTransaction(
    data: FetchLastApprovedRequest,
  ): Promise<CommonResponseObj> {
    return await firstValueFrom(this.svc.cashbookVerifyFinalTransaction(data));
  }

  async CashbookFetchSalesReport(
    data: FetchSalesReportRequest,
  ): Promise<SalesReportResponseArray> {
    return await firstValueFrom(this.svc.cashbookFetchSalesReport(data));
  }
  async CashbookFetchMonthlyShopReport(
    data: FetchReportRequest,
  ): Promise<CommonResponseObj> {
    return await firstValueFrom(this.svc.cashbookFetchMonthlyShopReport(data));
  }

  async HandleCreatePawaPay(
    data: CreatePawapayRequest,
  ): Promise<CommonResponseObj> {
    return await firstValueFrom(this.svc.handleCreatePawaPay(data));
  }
  async HandleCreateBulkPawaPay(
    data: CreateBulkPawapayRequest,
  ): Promise<CommonResponseObj> {
    return await firstValueFrom(this.svc.handleCreateBulkPawaPay(data));
  }

  async HandleFetchPawaPay(
    data: FetchPawapayRequest,
  ): Promise<CommonResponseArray> {
    return await firstValueFrom(this.svc.handleFetchPawaPay(data));
  }
  async HandlePawaPayResendCallback(
    data: FetchPawapayRequest,
  ): Promise<CommonResponseObj> {
    return await firstValueFrom(this.svc.handlePawaPayResendCallback(data));
  }
  async HandlePawaPayBalances(
    data: PawapayCountryRequest,
  ): Promise<CommonResponseArray> {
    return await firstValueFrom(this.svc.handlePawaPayBalances(data));
  }
  async HandlePawaPayCountryBalances(
    data: PawapayCountryRequest,
  ): Promise<CommonResponseArray> {
    return await firstValueFrom(this.svc.handlePawaPayCountryBalances(data));
  }
  async HandlePawaPayToolkit(
    data: PawapayToolkitRequest,
  ): Promise<CommonResponseArray> {
    return await firstValueFrom(this.svc.handlePawaPayToolkit(data));
  }
  async HandlePawaPayActiveConf(
    data: PawapayCountryRequest,
  ): Promise<CommonResponseObj> {
    return await firstValueFrom(this.svc.handlePawaPayActiveConf(data));
  }
  async HandlePawaPayPredCorr(
    data: PawapayPredCorrRequest,
  ): Promise<CommonResponseObj> {
    return await firstValueFrom(this.svc.handlePawaPayPredCorr(data));
  }
  async HandleCreateVirtualAccount(
    data: WayaBankRequest,
  ): Promise<CommonResponseObj> {
    return await firstValueFrom(this.svc.createVirtualAccount(data));
  }
  async WayabankAccountEnquiry(
    data: WayaBankRequest,
  ): Promise<CommonResponseObj> {
    return await firstValueFrom(this.svc.wayabankAccountEnquiry(data));
  }
  async Pitch90RegisterUrl(
    data: StkRegisterUrlRequest,
  ): Promise<CommonResponseObj> {
    console.log('register url data', data);
    return await firstValueFrom(this.svc.stkRegisterUrl(data));
  }
  async stkDepositnotification(
    data: StkTransactionRequest,
  ): Promise<CommonResponseObj> {
    return await firstValueFrom(this.svc.stkDepositNotification(data));
  }
  async stkWithdrawNotification(
    data: StkTransactionRequest,
  ): Promise<CommonResponseObj> {
    return await firstValueFrom(this.svc.stkWithdrawNotification(data));
  }
  async stkStatusNotification(
    data: StkTransactionRequest,
  ): Promise<CommonResponseObj> {
    return await firstValueFrom(this.svc.stkStatusNotification(data));
  }

  async FetchUsersWithdrawal(
    data: FetchUsersWithdrawalRequest,
  ): Promise<CommonResponseArray> {
    return await firstValueFrom(this.svc.fetchUsersWithdrawal(data));
  }
}
