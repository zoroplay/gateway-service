import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ClientGrpc } from '@nestjs/microservices';
import {
  ListWithdrawalRequests,
  PaymentMethodRequest,
  UpdateWithdrawalRequest,
  WALLET_SERVICE_NAME,
  WalletServiceClient,
  protobufPackage,
} from '../wallet.pb';
import {
  SwaggerGetPaymentMethodResponse,
  SwaggerListWithdrawalRequests,
  SwaggerPaymentMethodRequest,
  SwaggerPaymentMethodResponse,
  SwaggerUpdateWithdrawalRequest,
} from '../dto';

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
    description:
      'This endpoint is used to save or update payment methods for client',
  })
  @ApiBody({ type: SwaggerPaymentMethodRequest })
  @ApiOkResponse({ type: SwaggerPaymentMethodResponse })
  savePaymentMethod(@Body() body: PaymentMethodRequest) {
    return this.svc.savePaymentMethod(body);
  }

  @Get('bonus')
  @ApiOperation({
    summary: 'Fetch user bonus',
    description:
      'This endpoint is used to fetch user-bonus for a particular SBE client',
  })
  @ApiQuery({
    name: 'bonusType',
    type: 'string',
    description: 'bonus type',
  })
  @ApiQuery({
    name: 'from',
    type: 'string',
    description: 'Date-From',
  })
  @ApiQuery({
    name: 'to',
    type: 'string',
    description: 'Date-to',
  })
  @ApiOkResponse({ type: SwaggerGetPaymentMethodResponse })
  fetchBonus(@Param() param: any, @Query() query) {
    return this.svc.fetchBonusReport({
      bonusType: param.bonusType,
      from: param.from,
      to: param.to,
    });
  }
  @Get('payment-methods/:client_id')
  @ApiOperation({
    summary: 'Fetch SMS Settings',
    description:
      'This endpoint is used to fetch sms settings for a particular SBE client',
  })
  @ApiParam({
    name: 'client_id',
    type: 'number',
    description: ' Unique ID of the client',
  })
  @ApiOkResponse({ type: SwaggerGetPaymentMethodResponse })
  fetchRoles(@Param() param: any, @Query() query) {
    return this.svc.getPaymentMethods({
      clientId: param.client_id,
      status: query.status,
    });
  }

  @Post('/payment-methods')
  @ApiOperation({
    summary: 'Save Payment Methods',
    description:
      'This endpoint is used to save or update payment methods for client',
  })
  @ApiBody({ type: SwaggerPaymentMethodRequest })
  @ApiOkResponse({ type: SwaggerPaymentMethodResponse })
  saveRole(@Body() body: PaymentMethodRequest) {
    return this.svc.savePaymentMethod(body);
  }

  @Post('withdrawals')
  @ApiOperation({
    summary: 'Fetch Withdrawal Requests',
    description: 'This endpoint is used to fetch all withdrawal requests',
  })
  @ApiBody({ type: SwaggerListWithdrawalRequests })
  @ApiOkResponse({ type: SwaggerGetPaymentMethodResponse })
  withdrawals(@Body() param: ListWithdrawalRequests, @Query() query) {
    return this.svc.listWithdrawals({
      clientId: param.clientId,
      from: param.from,
      to: param.to,
      status: query.status,
      userId: param.userId,
    });
  }

  @Put('withdrawals/update')
  @ApiOperation({
    summary: 'Update Withdrawal Requests',
    description:
      'This endpoint is used to update a withdrawal requests (approve|reject)',
  })
  @ApiBody({ type: SwaggerUpdateWithdrawalRequest })
  @ApiOkResponse({ type: SwaggerPaymentMethodResponse })
  updateWithdrawals(
    @Body() body: UpdateWithdrawalRequest,
    @Query() query,
    @Req() req,
  ) {
    return this.svc.updateWithdrawal({
      clientId: body.clientId,
      withdrawalId: body.withdrawalId,
      action: body.action,
      comment: body.action,
      updatedBy: '',
    });
  }
}
