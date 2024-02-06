import { Body, Controller, Inject, Post, Query } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { InitiateDepositRequest, WALLET_SERVICE_NAME, WalletServiceClient, protobufPackage } from './wallet.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { SwaggerDepositReponse, SwaggerInitiateDepositRequest } from './dto';

@ApiTags('User Account APIs')
@Controller('user/wallet')
export class WalletController {
    private svc: WalletServiceClient;

    @Inject(protobufPackage)
    private readonly client: ClientGrpc;

    public onModuleInit(): void {
        this.svc = this.client.getService<WalletServiceClient>(WALLET_SERVICE_NAME);
    }

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
    ) {
        body.source = query.source;
        return this.svc.inititateDeposit(body);
    }
}
