import { Inject, Injectable } from '@nestjs/common';
import { GetPaymentMethodRequest, GetPaymentMethodResponse, InitiateDepositRequest, InitiateDepositResponse, ListDepositRequests, ListWithdrawalRequestResponse, ListWithdrawalRequests, OpayWebhookRequest, OpayWebhookResponse, PaginationResponse, PaymentMethodRequest, PaymentMethodResponse, PaystackWebhookRequest, UpdateWithdrawalRequest, UpdateWithdrawalResponse, UserTransactionRequest, UserTransactionResponse, VerifyBankAccountRequest, VerifyBankAccountResponse, VerifyDepositRequest, VerifyDepositResponse, WALLET_SERVICE_NAME, WalletServiceClient, WebhookResponse, WithdrawRequest, WithdrawResponse, protobufPackage } from './wallet.pb';
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

    async listWithdrawals(request: ListWithdrawalRequests): Promise<ListWithdrawalRequestResponse> {
        console.log('list withdrawals', request);
        return await firstValueFrom(this.svc.listWithdrawals(request))
    }

    async listDeposits(request: ListDepositRequests): Promise<PaginationResponse> {
        console.log('list deposits', request);
        return await firstValueFrom(this.svc.listDeposits(request))
    }

    async updateWithdrawal(request: UpdateWithdrawalRequest): Promise<UpdateWithdrawalResponse> {
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

    async opayDeposit(data: OpayWebhookRequest): Promise<OpayWebhookResponse> {
        return await firstValueFrom(this.svc.opayDepositWebhook(data));
    }

    async opayVerification(data: OpayWebhookRequest): Promise<OpayWebhookResponse> {
        return await firstValueFrom(this.svc.opayLookUpWebhook(data));
    }

    async getUserTransactions(data: UserTransactionRequest): Promise<UserTransactionResponse> {
        return await firstValueFrom(this.svc.userTransactions(data));
    }
}
