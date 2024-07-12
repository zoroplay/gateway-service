import { Inject, Injectable } from '@nestjs/common';
import { CommonResponseArray, CommonResponseObj, CreditUserRequest, DebitUserRequest, GetBalanceRequest, GetMoneyTransactionRequest, GetPaymentMethodRequest, GetPaymentMethodResponse, GetUserAccountsResponse, InitiateDepositRequest, InitiateDepositResponse, ListDepositRequests, ListWithdrawalRequestResponse, ListWithdrawalRequests, MonnifyWebhookRequest, OpayWebhookRequest, OpayWebhookResponse, PaginationResponse, PaymentMethodRequest, PaymentMethodResponse, PaystackWebhookRequest, ProcessRetailTransaction, UpdateWithdrawalRequest, UserTransactionRequest, UserTransactionResponse, ValidateTransactionRequest, VerifyBankAccountRequest, VerifyBankAccountResponse, VerifyDepositRequest, VerifyDepositResponse, WALLET_SERVICE_NAME, WalletResponse, WalletServiceClient, WalletTransferRequest, WebhookResponse, WithdrawRequest, WithdrawResponse, protobufPackage } from '../interfaces/wallet.pb';
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

    async savePaymentMethod(request: PaymentMethodRequest): Promise<PaymentMethodResponse> {
        return await firstValueFrom(this.svc.savePaymentMethod(request))
    }

    async getPaymentMethods(request: GetPaymentMethodRequest): Promise<GetPaymentMethodResponse> {
        return await firstValueFrom(this.svc.getPaymentMethods(request))
    }

    async listBanks(request): Promise<CommonResponseArray> {
        return await firstValueFrom(this.svc.listBanks(request))
    }

    async listWithdrawals(request: ListWithdrawalRequests): Promise<ListWithdrawalRequestResponse> {
        console.log('list withdrawals');
        return await firstValueFrom(this.svc.listWithdrawals(request))
    }

    async listDeposits(request: ListDepositRequests): Promise<PaginationResponse> {
        console.log('list deposits');
        return await firstValueFrom(this.svc.listDeposits(request))
    }

    async updateWithdrawal(request: UpdateWithdrawalRequest): Promise<CommonResponseObj> {
        return await firstValueFrom(this.svc.updateWithdrawal(request))
    }

    async inititateDeposit(data: InitiateDepositRequest): Promise<InitiateDepositResponse> {
        return await firstValueFrom(this.svc.inititateDeposit(data));
    }

    async verifyDeposit(data: VerifyDepositRequest): Promise<VerifyDepositResponse> {
        return await firstValueFrom(this.svc.verifyDeposit(data));
    }

    async verifyBankAccount(data: VerifyBankAccountRequest): Promise<VerifyBankAccountResponse> {
        return await firstValueFrom(this.svc.verifyBankAccount(data));
    }

    async requestWithdrawal(data: WithdrawRequest): Promise<WithdrawResponse> {
        return await firstValueFrom(this.svc.requestWithdrawal(data));
    }

    async paystackWebhook(data: PaystackWebhookRequest): Promise<WebhookResponse> {
        return await firstValueFrom(this.svc.paystackWebhook(data));
    }

    async monnifyWebhook(data: MonnifyWebhookRequest): Promise<WebhookResponse> {
        return await firstValueFrom(this.svc.monnifyWebhook(data));
    }

    async opayDeposit(data: OpayWebhookRequest): Promise<OpayWebhookResponse> {
        return await firstValueFrom(this.svc.opayDepositWebhook(data));
    }

    async opayVerification(data: OpayWebhookRequest): Promise<OpayWebhookResponse> {
        return await firstValueFrom(this.svc.opayLookUpWebhook(data));
    }

    async getUserTransactions(data: UserTransactionRequest): Promise<UserTransactionResponse> {
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

    async getBankAccounts(data: GetBalanceRequest): Promise<GetUserAccountsResponse> {
        return await firstValueFrom(this.svc.getUserAccounts(data));
    }

    async transferFunds(data: WalletTransferRequest): Promise<CommonResponseObj> {
        console.log('transfer data', data);
        return await firstValueFrom(this.svc.walletTransfer(data));
    }

    async validateDepositCode(data: ValidateTransactionRequest): Promise<CommonResponseObj> {
        return await firstValueFrom(this.svc.validateDepositCode(data));
    }

    async processShopDeposit(data: ProcessRetailTransaction): Promise<CommonResponseObj> {
        console.log('process shop deposit', data);
        return await firstValueFrom(this.svc.processShopDeposit(data));
    }

    async validateWithdrawalCode(data: ValidateTransactionRequest): Promise<CommonResponseObj> {
        console.log('validate withdrawal', data);
        return await firstValueFrom(this.svc.validateWithdrawalCode(data));
    }

    async processShopWithdrawal(data: ProcessRetailTransaction): Promise<CommonResponseObj> {
        console.log('process shop withdrawal', data);
        return await firstValueFrom(this.svc.processShopWithdrawal(data));
    }

    async getMoneyTransactions(data: GetMoneyTransactionRequest): Promise<CommonResponseObj> {
        console.log('get money transaction', data);
        return await firstValueFrom(this.svc.getMoneyTransaction(data));
    }
}
