import { Body, Controller, Get, Inject, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { InitiateDepositRequest, VerifyBankAccountRequest, VerifyDepositRequest, WALLET_SERVICE_NAME, WalletServiceClient, WithdrawRequest, protobufPackage } from './wallet.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { SwaggerDepositReponse, SwaggerInitiateDepositRequest, SwaggerVerifyBankAccountRequest, SwaggerVerifyDepositReponse, SwaggerWithdrawalRequest } from './dto';
import { AuthGuard } from 'src/identity/auth/auth.guard';
import { IAuthorizedRequest } from 'src/interfaces/authorized-request.interface';

@ApiTags('User Account APIs')
@Controller('user/wallet')
export class WalletController {
    private svc: WalletServiceClient;

    @Inject(protobufPackage)
    private readonly client: ClientGrpc;

    public onModuleInit(): void {
        this.svc = this.client.getService<WalletServiceClient>(WALLET_SERVICE_NAME);
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
        example: 'mobile'
    })
    @ApiBody({ type: SwaggerInitiateDepositRequest })
    @ApiOkResponse({ type: SwaggerDepositReponse })
    inititateDeposit(
        @Body() body: InitiateDepositRequest,
        @Query() query: any,
        @Req() req: IAuthorizedRequest
    ) {
        body.userId = req.user.id;
        body.source = query.source;
        return this.svc.inititateDeposit(body);
    }

    @Get('/verify-payment')
    @ApiOperation({
        summary: 'Verify Deposit transaction',
        description: 'This endpoint is used to check the status of a deposit transaction',
    })
    @ApiQuery({
        name: 'paymentChannel',
        type: 'string',
        description: 'name of the payment gateway',
        example: 'paystack'
    })
    @ApiQuery({
        name: 'clientId',
        type: 'number',
        description: 'SBE client ID',
        example: 1
    })
    @ApiQuery({
        name: 'transactionRef',
        type: 'string',
        description: 'Transaction reference number',
        example: ''
    })
    @ApiBody({ type: SwaggerInitiateDepositRequest })
    @ApiOkResponse({ type: SwaggerVerifyDepositReponse })
    verifyPayment(
        @Query() query: VerifyDepositRequest
    ) {
        return this.svc.verifyDeposit(query);
    }

    @UseGuards(AuthGuard)
    @Post('/verify-bank-account')
    @ApiOperation({
        summary: 'Verify Bank Account',
        description: 'This endpoint is used to verify a users banka account before withdrawal',
    })
    @ApiQuery({
        name: 'source',
        type: 'string',
        description: 'SBE platform used to initiate the request',
        example: 'mobile'
    })
    @ApiBody({ type: SwaggerVerifyBankAccountRequest })
    @ApiOkResponse({ type: SwaggerVerifyDepositReponse })
    verifyBankAccount(
        @Body() body: VerifyBankAccountRequest,
        @Query() query: any,
        @Req() req: IAuthorizedRequest
    ) {
        body.userId = req.user.id;
        body.source = query.source;
        return this.svc.verifyBankAccount(body);
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
        example: 'mobile'
    })
    @ApiBody({ type: SwaggerWithdrawalRequest })
    @ApiOkResponse({ type: SwaggerDepositReponse })
    requestWithdrawal(
        @Body() body: WithdrawRequest,
        @Query() query: any,
        @Req() req: IAuthorizedRequest
    ) {
        body.userId = req.user.id;
        body.username = req.user.username;
        body.source = query.source;
        return this.svc.requestWithdrawal(body);
    }
}
