import { Body, Controller, Get, Param, Post, Put, Query, Req } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ListDepositRequests, ListWithdrawalRequests, PaymentMethodRequest, UpdateWithdrawalRequest } from '../wallet.pb';
import { SwaggerFundTransfer, SwaggerGetPaymentMethodResponse, SwaggerListDepositRequest, SwaggerListWithdrawalRequests, SwaggerPaymentMethodRequest, SwaggerPaymentMethodResponse, SwaggerUpdateWithdrawalRequest } from '../dto';
import { WalletService } from '../wallet.service';

@ApiTags('BackOffice APIs')
@Controller('admin/wallet')
export class WalletAdminController {

    constructor(private readonly walletService: WalletService) {}

    @Post('/payment-methods')
    @ApiOperation({
        summary: 'Save Payment Methods',
        description: 'This endpoint is used to save or update payment methods for client',
    })
    @ApiBody({ type: SwaggerPaymentMethodRequest })
    @ApiOkResponse({ type: SwaggerPaymentMethodResponse })
    savePaymentMethod(@Body() body: PaymentMethodRequest) {
        return this.walletService.savePaymentMethod(body);
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
        return this.walletService.getPaymentMethods({clientId: param.client_id, status: query.status});
    }


    @Post('withdrawals')
    @ApiOperation({
        summary: 'Fetch Withdrawal Requests',
        description: 'This endpoint is used to fetch all withdrawal requests',
    })
    @ApiBody({type: SwaggerListWithdrawalRequests})
    @ApiOkResponse({ type: SwaggerGetPaymentMethodResponse })
    withdrawals(
        @Body() param: ListWithdrawalRequests,
        @Query() query 
    ) {

        return this.walletService.listWithdrawals({
            clientId: param.clientId, 
            from: param.from,
            to: param.to,
            status: query.status,
            userId: param.userId
        });
    }

    @Post('deposits')
    @ApiOperation({
        summary: 'Fetch Deposit Transactions',
        description: 'This endpoint is used to fetch deposit transactions for a period',
    })
    @ApiBody({type: SwaggerListWithdrawalRequests})
    @ApiOkResponse({ type: SwaggerListDepositRequest })
    deposits(
        @Body() body: ListDepositRequests,
        @Query('page') page: number = 1
    ) {
        body.page = page;
        return this.walletService.listDeposits(body);
    }

    
    @Put('withdrawals/update')
    @ApiOperation({
        summary: 'Update Withdrawal Requests',
        description: 'This endpoint is used to update a withdrawal requests (approve|reject)',
    })
    @ApiBody({type: SwaggerUpdateWithdrawalRequest})
    @ApiOkResponse({ type: SwaggerPaymentMethodResponse })
    updateWithdrawals(
        @Body() body: UpdateWithdrawalRequest,
        @Query() query,
        @Req() req,
    ) {

        return this.walletService.updateWithdrawal({
            clientId: body.clientId, 
            withdrawalId: body.withdrawalId,
            action: body.action,
            comment: body.action,
            updatedBy: ''
        });
    }


    @Post('funds-transfer')
    @ApiOperation({
        summary: 'Credit or Debit user wallet',
        description: 'This endpoint is used to credit or debit a users wallet',
    })
    @ApiBody({type: SwaggerFundTransfer})
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
            channel: body.channel
        };

        if (body.action === 'deposit') {
            return this.walletService.creditUser(payload)
        } else {
            return this.walletService.debitUser(payload)
        }
       
    }



}
