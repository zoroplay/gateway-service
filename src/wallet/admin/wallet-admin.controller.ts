import { Body, Controller, Get, Inject, Param, Post, Query } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ClientGrpc } from '@nestjs/microservices';
import { PaymentMethodRequest, WALLET_SERVICE_NAME, WalletServiceClient, protobufPackage } from '../wallet.pb';
import { SwaggerGetPaymentMethodResponse, SwaggerPaymentMethodRequest, SwaggerPaymentMethodResponse } from '../dto';

@ApiTags('BackOffice APIs')
@Controller('admin/wallet')
export class WalletAdminController {
    private svc: WalletServiceClient;

    @Inject(protobufPackage)
    private readonly client: ClientGrpc;

    public onModuleInit(): void {
        this.svc = this.client.getService<WalletServiceClient>(WALLET_SERVICE_NAME);
    }

    @Post('/payment-methods')
    @ApiOperation({
        summary: 'Save Payment Methods',
        description: 'This endpoint is used to save or update payment methods for client',
    })
    @ApiBody({ type: SwaggerPaymentMethodRequest })
    @ApiOkResponse({ type: SwaggerPaymentMethodResponse })
    saveRole(@Body() body: PaymentMethodRequest) {
        return this.svc.savePaymentMethod(body);
    }

    @Get('payment-methods/:client_id')
    @ApiOperation({
        summary: 'Fetch SMS Settings',
        description: 'This endpoint is used to fetch sms settings for a particular SBE client',
    })
    @ApiParam({
        name: 'client_id',
        type: 'number',
        description: ' Unique ID of the client',
      })
    @ApiOkResponse({ type: SwaggerGetPaymentMethodResponse })
    fetchRoles(
        @Param() param: any,
        @Query() query 
    ) {
        return this.svc.getPaymentMethods({clientId: param.client_id, status: query.status});
    }

}
