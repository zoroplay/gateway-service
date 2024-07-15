/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import {
  CashInOutRepeatedResponse,
  CashInOutSingleResponse,
  CashbookApproveCashInOutRequest,
  CashbookCreateCashInOutRequest,
  CashbookCreateExpenseRequest,
  CashbookCreateExpenseTypeRequest,
  CreditUserRequest,
  DebitUserRequest,
  EmptyRequest,
  ExpenseTypeRepeatedResponse,
  ExpenseTypeSingleResponse,
  GetBalanceRequest,
  GetPaymentMethodRequest,
  GetPaymentMethodResponse,
  GetUserAccountsResponse,
  IdRequest,
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
  UpdateWithdrawalRequest,
  UserTransactionRequest,
  UserTransactionResponse,
  VerifyBankAccountRequest,
  VerifyBankAccountResponse,
  VerifyDepositRequest,
  VerifyDepositResponse,
  WALLET_SERVICE_NAME,
  WalletResponse,
  WalletServiceClient,
  WebhookResponse,
  WithdrawRequest,
  WithdrawResponse,
  protobufPackage,
} from '../interfaces/wallet.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CommonResponseObj } from 'src/interfaces/retail.pb';
import {
  BranchRequest,
  CashbookApproveExpenseRequest,
  ExpenseRepeatedResponse,
  ExpenseSingleResponse,
} from 'src/interfaces/cashbook.pb';

@Injectable()
export class WalletService {
  private svc: WalletServiceClient;

  @Inject(protobufPackage)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<WalletServiceClient>(WALLET_SERVICE_NAME);
  }

  async savePaymentMethod(
    request: PaymentMethodRequest,
  ): Promise<PaymentMethodResponse> {
    return await firstValueFrom(this.svc.savePaymentMethod(request));
  }

  async getPaymentMethods(
    request: GetPaymentMethodRequest,
  ): Promise<GetPaymentMethodResponse> {
    return await firstValueFrom(this.svc.getPaymentMethods(request));
  }

  async listWithdrawals(
    request: ListWithdrawalRequests,
  ): Promise<ListWithdrawalRequestResponse> {
    console.log('list withdrawals');
    return await firstValueFrom(this.svc.listWithdrawals(request));
  }

  async listDeposits(
    request: ListDepositRequests,
  ): Promise<PaginationResponse> {
    console.log('list deposits');
    return await firstValueFrom(this.svc.listDeposits(request));
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
    // console.log(data);
    return await firstValueFrom(this.svc.userTransactions(data));
  }

  async creditUser(data: CreditUserRequest): Promise<WalletResponse> {
    // console.log(data);
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
    data: IdRequest,
  ): Promise<ExpenseSingleResponse> {
    return await firstValueFrom(this.svc.cashbookFindOneExpense(data));
  }

  async CashbookDeleteOneExpense(
    data: IdRequest,
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
    data: IdRequest,
  ): Promise<CashInOutSingleResponse> {
    return await firstValueFrom(this.svc.cashbookDeleteOneCashIn(data));
  }
  async CashbookFindOneCashIn(
    data: IdRequest,
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
    data: IdRequest,
  ): Promise<CashInOutSingleResponse> {
    return await firstValueFrom(this.svc.cashbookDeleteOneCashOut(data));
  }
  async CashbookFindOneCashOut(
    data: IdRequest,
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
}
