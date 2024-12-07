import { Body, Controller, Get, Param, Post, Req, Res, Headers } from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthService } from './identity/auth/auth.service';
import { WalletService } from './wallet/wallet.service';
import { SwaggerGetUserByUsernmae } from './identity/dto';
import { OddsService } from './odds/odds.service';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly walletService: WalletService,
    private readonly oddsService: OddsService
  ) {}

  @ApiTags('Webhooks')
  // @UseGuards(ClientAuthGuard)
  @Post('webhook/:client/opay/:action')
  @ApiParam({ name: 'client', type: 'number', description: 'SBE Client ID' })
  @ApiParam({ name: 'action', type: 'string', description: 'Opay request action type' })
  @ApiBody({ type: SwaggerGetUserByUsernmae  })
  opayActionHandler(
    @Param() param,
    @Body() body,
    @Headers() headers,
  ) {
    const authorization: string = headers['authorization'];
    if (!authorization) {
      return {
        responseCode: "10967",
        responseMessage: "Invalid Key",
        data: null
      }
    }

    const bearer: string[] = authorization.split(' ');

    if (!bearer || bearer.length < 2) {
      return {
        responseCode: "10967",
        responseMessage: "Invalid Key",
        data: null
      }
    }

    const token: string = bearer[1];
    const liveKey = process.env[`OPAY_${param.client}_COLLECTION_PUBLIC_KEY`];

    if (token !== liveKey) 
      return {
        responseCode: "10967",
        responseMessage: "Invalid Key",
        data: null
      }

    const payload = {
      clientId: param.client,
      amount: body.TransAmount,
      username: body.UserID,
      orderNo: body.OrderNo,
      token,
    }
    switch (param.action) {
      case 'user-lookup':
        return this.authService.validateUser(payload)
      case 'payment-update':
        return this.walletService.opayDeposit(payload);
      case 'transaction-lookup':
        return this.walletService.opayVerification(payload);
      default:
        break;
    }
  }

  @ApiTags('Webhooks')
  @Post('webhook/:client/:provider')
  @ApiParam({ name: 'client', type: 'number', description: 'SBE Client ID' })
  @ApiParam({ name: 'provider', type: 'string', description: 'Payment Gateway provider' })
  paymentWebhook(
    @Param() param,
    @Body() body,
    @Res() res,
    @Req() req
  ) {
    if (!param.provider) return res.sendStatus(404);

    switch (param.provider) {
      case 'paystack':
        const paystackKey = req.headers['x-paystack-signature'];
        this.walletService.paystackWebhook({
          clientId: param.client,
          body: JSON.stringify(body),
          paystackKey,
          reference: body.data.reference,
          event: body.event
        })
        break;
      case 'monnify':
        this.walletService.monnifyWebhook({
          clientId: param.client,
          body: JSON.stringify(body),
          reference: body.eventData.paymentReference,
          event: body.eventType
        })
        break;
      case 'flutterwave':
        break;
      default:
        break;
    }

    return res.sendStatus(200);
  }

  @Post('webhook/validate-odds')
  validateOdds(
    @Body() body,
  ) {
    return this.oddsService.GetOddsStatus(body)
  }


}
