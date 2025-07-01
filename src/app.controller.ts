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
  Header,
  HttpStatus,
  HttpCode,
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
import {
  FidelityWebhookRequest,
  GlobusResponse,
  OpayResponse,
  PawapayResponse,
  ProvidusResponse,
  SmileAndPayResponse,
  TigoW2aRequest,
} from './interfaces/wallet.pb';
import * as xml2js from 'xml2js';
import { Response, Request } from 'express';
import buildTigoW2AResponse from './wallet/dto/utils';
import * as crypto from 'crypto';
import { raw } from 'body-parser';

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
  @HttpCode(200)
  @Post('webhook/:client/:provider')
  @ApiParam({ name: 'client', type: 'number', description: 'SBE Client ID' })
  @ApiParam({
    name: 'provider',
    type: 'string',
    description: 'Payment Gateway provider',
  })
  paymentWebhook(@Param() param, @Body() body, @Res() res, @Req() req) {
    if (!param.provider) return res.sendStatus(404);
    console.log('🔥 Webhook HIT');
    console.log('Headers:', req.headers);
    console.log('Params:', param);
    console.log('Body:', body);

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
        this.walletService.flutterWaveWebhook({
          clientId: param.client,
          txRef: body.data.tx_ref,
          event: body.event,
          body: JSON.stringify(body),
          flutterwaveKey: req.headers['x-flutterwave-signature'],
        });
        break;

      case 'korapay':
        this.walletService.flutterWaveWebhook({
          clientId: param.client,
          txRef: body.data.reference,
          event: body.event,
          body: JSON.stringify(body),
          flutterwaveKey: req.headers['x-korapay-signature'] as string,
        });
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
  @HttpCode(200)
  @Post('/webhook/:clientId/tigo/notify')
  async handleW2aWebhook(
    @Req() req: Request,
    @Res() res: Response,
    @Param() param,
  ) {
    console.log('TIGO-W2A-WEBHOOK');

    const rawXml = req.body.toString();

    const parsed = await new xml2js.Parser({
      explicitArray: false,
    }).parseStringPromise(rawXml);
    const command = parsed?.COMMAND;

    if (!command) {
      return res.status(400).send('Invalid XML format');
    }

    const { TXNID, MSISDN, AMOUNT, CUSTOMERREFERENCEID, SENDERNAME } = command;

    console.log(`📩 Received Tigo W2A for ${TXNID}, amount: ${AMOUNT}`);

    const payload: TigoW2aRequest = {
      txnId: command.TXNID,
      msisdn: command.MSISDN,
      amount: command.AMOUNT,
      customerReferenceId: command.CUSTOMERREFERENCEID,
      senderName: command.SENDERNAME,
      clientId: param.clientId,
      rawBody: command,
    };
    console.log(payload);

    // Process payment success
    try {
      await this.walletService.handleW2aWebhook(payload);

      const responseXml = buildTigoW2AResponse({
        txnId: TXNID,
        refId: `REF-${Date.now()}`,
        result: 'TS',
        errorCode: 'error000',
        errorDesc: 'Successful transaction',
        msisdn: MSISDN,
        content: 'Payment received successfully',
      });

      console.log(
        `🎉 User credited successfully: ${JSON.stringify(responseXml)}`,
      );

      return res.type('text/xml').send(responseXml);
    } catch (error) {
      console.error('❌ Failed to process payment:', error.message);

      const failXml = buildTigoW2AResponse({
        txnId: TXNID,
        refId: `REF-${Date.now()}`,
        result: 'TF',
        errorCode: 'error100',
        errorDesc: 'General Error',
        msisdn: MSISDN,
        content: 'Something went wrong on our side.',
      });
      console.error(`❌ Payment Failed: ${JSON.stringify(failXml)}`);

      return res.type('text/xml').send(failXml);
    }
  }

  @ApiTags('Webhooks')
  @Post('/webhook/checkout/:clientId/opay/callback')
  @HttpCode(200)
  async handleOpayCallback(
    @Body() webhookBody: any,
    @Param() param,
  ): Promise<OpayResponse> {
    console.log(webhookBody);
    const { payload, sha512 } = webhookBody;

    console.log('✅ Verified Webhook Payload:', payload);

    const data = {
      clientId: param.clientId,
      rawBody: webhookBody,
      sha512: sha512,
    };
    try {
      await this.walletService.OpayWebhook(data);
      console.log(`🎉 User credited successfully: `);

      return { statusCode: 200, success: true, message: 'OK' };
    } catch (error) {
      console.error(`❌ Error processing webhook: ${error.message}`);
      return {
        statusCode: 500,
        success: false,
        message: 'Internal server error',
      };
    }
  }

  @ApiTags('Webhooks')
  @HttpCode(200)
  @Post('/webhook/:clientId/:provider/callback')
  async handleAllWebhook(
    @Param() param,
    @Body() webhookBody: any,
    @Headers() headers,
  ) {
    console.log('🔥 Webhook HIT');
    console.log('Params:', param);
    console.log('Body:', webhookBody);
    console.log('All headers:', headers);
    switch (param.provider) {
      case 'globus':
        const authorization: string =
          headers['clientid'] || headers['ClientId'] || headers['CLIENTID'];
        console.log('AUTH::', authorization);

        await this.walletService.handleGlobusWebhook({
          clientId: param.clientId,
          callbackData: webhookBody,
          headers: authorization,
        });
        break;
      case 'providus':
        const proAuthorization: string = headers['x-auth-signature'];
        console.log('AUTH::', proAuthorization);

        if (webhookBody !== undefined) {
          const provi = await this.walletService.handleProvidusWebhook({
            accountNumber: webhookBody.accountNumber,
            clientId: param.clientId,
            sessionId: webhookBody.sessionId,
            headers: proAuthorization,
            settlementId: webhookBody.settlementId,
            rawBody: webhookBody,
          });
          return provi;
        }

        break;

      case 'fidelity':
        await this.walletService.FidelityWebhook({
          transactionReference: webhookBody.transactionReference,
          clientId: param.clientId,
          rawBody: webhookBody,
        });
        break;
      case 'smileandpay':
        const snpAuthorization: string = headers['x-auth-signature'];
        console.log('AUTH::', snpAuthorization);

        await this.walletService.handleSmileNPayWebhook({
          clientId: param.clientId,
          callbackData: webhookBody,
          //headers: '',
        });
        break;

      case 'coralpay':
        const coralpayHeaders = headers['authorization'];
        console.log('headers', coralpayHeaders);
        console.log('AUTH::', coralpayHeaders);
        await this.walletService.CorapayWebhook({
          clientId: param.clientId,
          authHeader: coralpayHeaders,
          callbackData: webhookBody,
        });
        break;

      case 'mtnmomo':
        console.log('ME');
        console.log(webhookBody.status);
        if (webhookBody.status === 'SUCCESSFUL') {
          const mtn = await this.walletService.mtnmomoWebhook({
            amount: webhookBody.amount,
            externalId: webhookBody.externalId,
            status: webhookBody.status,
            clientId: param.clientId,
            rawBody: webhookBody,
          });

          return mtn;
        }
        break;

      case 'pawapay':
        await this.walletService.pawapayCallback({
          clientId: param.clientId,
          depositId: webhookBody.depositId,
          status: webhookBody.status,
          rawBody: webhookBody,
        });

        break;
      case 'tigo':
        const isSuccess = webhookBody.Status === true;
        const rawReferenceId = webhookBody.ReferenceID;
        const amount = webhookBody.Amount || 0;

        // ✅ Safely Remove 'KML' Prefix
        const referenceId = rawReferenceId.startsWith('KML')
          ? rawReferenceId.replace(/^KML/, '')
          : rawReferenceId;

        if (isSuccess) {
          console.log(
            `✅ Payment Successful! Ref: ${referenceId}, Amount: ${amount}`,
          );

          await this.walletService.tigoWebhook({
            clientId: param.clientId,
            reference: referenceId,
            event: 'payment_success',
            body: JSON.stringify(webhookBody),
            Status: isSuccess,
            rawBody: webhookBody,
          });

          return {
            ResponseCode: webhookBody.ResponseCode || 'BILLER-18-0000-S',
            ResponseStatus: webhookBody.Status,
            ResponseDescription: webhookBody.Description,
            ReferenceID: webhookBody.ReferenceID,
          };
        } else {
          return {
            ResponseCode: webhookBody.ResponseCode || 'BILLER-18-0000-S',
            ResponseStatus: webhookBody.Status,
            ResponseDescription: webhookBody.Description,
            ReferenceID: webhookBody.ReferenceID,
          };
        }

      default:
        return {
          status: 400,
          message: 'Unsupported payment provider',
          success: true,
        };
    }
    return {
      statusCode: 200,
      success: true,
      message: 'Transaction successfully verified and processed',
    };
  }
}
