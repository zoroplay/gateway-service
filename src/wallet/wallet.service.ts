import { Inject, Injectable } from '@nestjs/common';
import { InitiateDepositRequest, InitiateDepositResponse, OpayWebhookRequest, OpayWebhookResponse, PaystackWebhookRequest, VerifyBankAccountRequest, VerifyBankAccountResponse, VerifyDepositRequest, VerifyDepositResponse, WALLET_SERVICE_NAME, WalletServiceClient, WebhookResponse, WithdrawRequest, WithdrawResponse, protobufPackage } from './wallet.pb';
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

    inititateDeposit(data: InitiateDepositRequest): Promise<InitiateDepositResponse> {
        return firstValueFrom(this.svc.inititateDeposit(data));
    }

    verifyDeposit(data: VerifyDepositRequest): Promise<VerifyDepositResponse> {
        return firstValueFrom(this.svc.verifyDeposit(data));
    }

    verifyBankAccount(data: VerifyBankAccountRequest): Promise<VerifyBankAccountResponse> {
        return firstValueFrom(this.svc.verifyBankAccount(data));
    }

    requestWithdrawal(data: WithdrawRequest): Promise<WithdrawResponse> {
        return firstValueFrom(this.svc.requestWithdrawal(data));
    }

    paystackWebhook(data: PaystackWebhookRequest): Promise<WebhookResponse> {
        return firstValueFrom(this.svc.paystackWebhook(data));
    }

    opayDeposit(data: OpayWebhookRequest): Promise<OpayWebhookResponse> {
        return firstValueFrom(this.svc.opayDepositWebhook(data));
    }

    opayVerification(data: OpayWebhookRequest): Promise<OpayWebhookResponse> {
        return firstValueFrom(this.svc.opayLookUpWebhook(data));
    }
}
