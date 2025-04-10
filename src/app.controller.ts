import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  Headers,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './identity/auth/auth.service';
import { WalletService } from './wallet/wallet.service';
import { SwaggerGetUserByUsernmae } from './identity/dto';
import { OddsService } from './odds/odds.service';
import { TigoWebhookRequest, WebhookResponse } from './wallet/dto';
import { PawapayResponse } from './interfaces/wallet.pb';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly walletService: WalletService,
    private readonly oddsService: OddsService,
  ) {}

  @ApiTags('Webhooks')
  // @UseGuards(ClientAuthGuard)
  @Post('webhook/:client/opay/:action')
  @ApiParam({ name: 'client', type: 'number', description: 'SBE Client ID' })
  @ApiParam({
    name: 'action',
    type: 'string',
    description: 'Opay request action type',
  })
  @ApiBody({ type: SwaggerGetUserByUsernmae })
  opayActionHandler(@Param() param, @Body() body, @Headers() headers) {
    const authorization: string = headers['authorization'];
    if (!authorization) {
      return {
        responseCode: '10967',
        responseMessage: 'Invalid Key',
        data: null,
      };
    }

    const bearer: string[] = authorization.split(' ');

    if (!bearer || bearer.length < 2) {
      return {
        responseCode: '10967',
        responseMessage: 'Invalid Key',
        data: null,
      };
    }

    const token: string = bearer[1];
    const liveKey = process.env[`OPAY_${param.client}_COLLECTION_PUBLIC_KEY`];

    if (token !== liveKey)
      return {
        responseCode: '10967',
        responseMessage: 'Invalid Key',
        data: null,
      };

    const payload = {
      clientId: param.client,
      amount: body.TransAmount,
      username: body.UserID,
      orderNo: body.OrderNo,
      token,
    };
    switch (param.action) {
      case 'user-lookup':
        return this.authService.validateUser(payload);
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
  @ApiParam({
    name: 'provider',
    type: 'string',
    description: 'Payment Gateway provider',
  })
  paymentWebhook(@Param() param, @Body() body, @Res() res, @Req() req) {
    if (!param.provider) return res.sendStatus(404);

    switch (param.provider) {
      case 'paystack':
        const paystackKey = req.headers['x-paystack-signature'];
        this.walletService.paystackWebhook({
          clientId: param.client,
          body: JSON.stringify(body),
          paystackKey,
          reference: body.data.reference,
          event: body.event,
        });
        break;
      case 'monnify':
        this.walletService.monnifyWebhook({
          clientId: param.client,
          body: JSON.stringify(body),
          reference: body.eventData.paymentReference,
          event: body.eventType,
        });
        break;
      case 'flutterwave':
        break;

      default:
        break;
    }

    return res.sendStatus(200);
  }

  @ApiTags('Webhooks')
  @Post('webhook/validate-odds')
  validateOdds(@Body() body) {
    return this.oddsService.GetOddsStatus(body);
  }
  @ApiTags('Webhooks')
  @Post('/webhook/4/tigo/callback')
  @ApiOperation({
    summary: 'Handle Tigo Payment Webhook',
    description: 'Receives payment notifications from Tigo and processes them',
  })
  @ApiBody({
    type: TigoWebhookRequest,
    description: 'The webhook payload sent by Tigo',
  })
  @ApiOkResponse({
    type: WebhookResponse,
    description: 'Response confirming webhook processing',
  })
  async handleTigoCallback(@Body() webhookBody: any): Promise<WebhookResponse> {
    console.log('TIGO-WEBHOOK')
    console.log(`📩 Received Tigo Webhook: ${JSON.stringify(webhookBody)}`);

    // ✅ Validate Webhook Data
    if (!webhookBody || Object.keys(webhookBody).length === 0) {
      console.error('❌ Received an empty webhook request');
      return { success: false, message: 'Empty webhook data' };
    }

    if (!webhookBody.ReferenceID) {
      console.error('❌ Missing ReferenceID in webhook data');
      return {
        success: false,
        message: 'Invalid webhook data: Missing ReferenceID',
      };
    }

    console.log('TIGO-WEBHOOK')

    const isSuccess = webhookBody.Status === true;
    const rawReferenceId = webhookBody.ReferenceID || ''; // ✅ Ensure it's always a string
    const amount = webhookBody.Amount || 0;

    // ✅ Safely Remove 'KML' Prefix
    const referenceId = rawReferenceId.startsWith('KML')
      ? rawReferenceId.replace(/^KML/, '')
      : rawReferenceId;

    try {
      if (isSuccess) {
        console.log(
          `✅ Payment Successful! Ref: ${referenceId}, Amount: ${amount}`,
        );

        // ✅ Call Wallet Service to Credit User
        const response = await this.walletService.tigoWebhook({
          clientId: 4,
          reference: referenceId,
          event: 'payment_success',
          body: JSON.stringify(webhookBody),
          Status: isSuccess,
        });

        console.log(
          `🎉 User credited successfully: ${JSON.stringify(response)}`,
        );
      } else {
        console.error(`❌ Payment Failed: ${JSON.stringify(webhookBody)}`);
      }

      return { success: true, message: 'Webhook processed' };
    } catch (error) {
      console.error(`❌ Error processing webhook: ${error.message}`);
      return { success: false, message: 'Internal server error' };
    }
  }

  @ApiTags('Webhooks')
  @Post('/webhook/4/pawapay/callback')
  async handlePawapayCallback(
    @Body() webhookBody: any,
  ): Promise<PawapayResponse> {
    console.log(`📩 Received Pawapay Webhook: ${JSON.stringify(webhookBody)}`);

    // ✅ Validate Webhook Data
    if (!webhookBody || Object.keys(webhookBody).length === 0) {
      console.error('❌ Received an empty webhook request');
      return { success: false, message: 'Empty webhook data' };
    }

    if (!webhookBody.depositId) {
      console.error('❌ Missing DepositId in webhook data');
      return {
        success: false,
        message: 'Invalid webhook data: Missing ReferenceID',
      };
    }

    const isSuccess = webhookBody.status === 'COMPLETED';

    try {
      if (isSuccess) {
        const response = await this.walletService.pawapayCallback({
          clientId: 4,
          depositId: webhookBody.depositId,
          status: '',
        });
        console.log(
          `🎉 User credited successfully: ${JSON.stringify(response)}`,
        );
      } else {
        console.error(`❌ Payment Failed: ${JSON.stringify(webhookBody)}`);
      }

      return { success: true, message: 'Webhook processed' };
    } catch (error) {
      console.error(`❌ Error processing webhook: ${error.message}`);
      return { success: false, message: 'Internal server error' };
    }
  }

  @ApiTags('Webhooks')
  @Get('/webhook/4/pawapay/callback')
  async handlePawapayCallback1(
    @Query('depositId') depositId: string,
  ): Promise<PawapayResponse> {
    console.log(`📩 Received Pawapay Webhook - depositId: ${depositId}`);

    // ✅ Validate depositId
    if (!depositId) {
      console.error('❌ Missing depositId in query parameters');
      return {
        success: false,
        message: 'Invalid webhook: Missing depositId',
      };
    }

    try {
      const response = await this.walletService.pawapayCallback({
        clientId: 4,
        depositId,
        status: 'COMPLETED',
      });

      console.log(`🎉 User credited successfully: ${JSON.stringify(response)}`);
      return { success: true, message: 'Webhook processed' };
    } catch (error) {
      console.error(`❌ Error processing webhook: ${error.message}`);
      return { success: false, message: 'Internal server error' };
    }
  }
}
