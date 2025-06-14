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
  OpayResponse,
  PawapayResponse,
  ProvidusResponse,
  TigoW2aRequest,
} from './interfaces/wallet.pb';
import * as xml2js from 'xml2js';
import { Response, Request } from 'express';
import buildTigoW2AResponse from './wallet/dto/utils';
import * as crypto from 'crypto';

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
        // case 'flutterwave':
        // this.walletService.flutterWaveWebhook({
        //   clientId: param.client,
        //   txRef: body.data.tx_ref,
        //   event: body.event,
        //   body: JSON.stringify(body),
        //   flutterwaveKey: req.headers['x-flutterwave-signature'],
        // });
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
    console.log('TIGO-WEBHOOK');
    console.log(`📩 Received Tigo Webhook: ${JSON.stringify(webhookBody)}`);

    // ✅ Validate Webhook Data
    if (!webhookBody || Object.keys(webhookBody).length === 0) {
      console.error('❌ Received an empty webhook request');
    }

    if (!webhookBody.ReferenceID) {
      console.error('❌ Missing ReferenceID in webhook data');
    }

    console.log('TIGO-WEBHOOK');

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

      return {
        ResponseCode: webhookBody.ResponseCode || 'BILLER-18-0000-S',
        ResponseStatus: webhookBody.Status,
        ResponseDescription: webhookBody.Description,
        ReferenceID: webhookBody.ReferenceID,
      };
    } catch (error) {
      console.error(`❌ Error processing webhook: ${error.message}`);
      return {
        ResponseCode: webhookBody.ResponseCode || 'BILLER-18-0000-S',
        ResponseStatus: webhookBody.Status,
        ResponseDescription: webhookBody.Description,
        ReferenceID: webhookBody.ReferenceID,
      };
    }
  }

  @ApiTags('Webhooks')
  @Post('/webhook/4/tigo/notify')
  async handleW2aWebhook(@Req() req: Request, @Res() res: Response) {
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
      clientId: 4,
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
  @Post('/webhook/7/pawapay/callback')
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
          clientId: 7,
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
  @Post('/webhook/4/pawapay/callback')
  async handlePawapayCallback4(
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
  @Post('/webhook/4/mtnmomo/callback')
  async handleMtnmomoCallback(@Body() webhookBody: any) {
    console.log(`📩 Received MTN MoMo Webhook: ${JSON.stringify(webhookBody)}`);

    // ✅ Validate required fields
    if (!webhookBody || Object.keys(webhookBody).length === 0) {
      console.error('❌ Received an empty webhook request');
      return { success: false };
    }

    const isSuccess = webhookBody.status === 'SUCCESSFUL';

    if (!webhookBody.externalId) {
      console.error('❌ Missing externalId in webhook data');
      return {
        success: false,
      };
    }

    try {
      if (isSuccess) {
        const response = await this.walletService.mtnmomoWebhook({
          amount: webhookBody.amount,
          externalId: webhookBody.externalId,
          status: webhookBody.status,
          clientId: 4, // hardcoded clientId for now
        });

        console.log(
          `🎉 User credited successfully: ${JSON.stringify(response)}`,
        );
      } else {
        console.warn(
          `⚠️ Payment Failed or Pending: ${JSON.stringify(webhookBody)}`,
        );
        // You might want to update transaction status to FAILED here too
      }

      return { success: true, message: 'Webhook processed' };
    } catch (error) {
      console.error(`❌ Error processing webhook: ${error.message}`, error);
      return { success: false, message: 'Internal server error' };
    }
  }

  @ApiTags('Webhooks')
  @Post('/webhook/checkout/4/opay/callback')
  async handleOpayCallback(@Body() webhookBody: any): Promise<OpayResponse> {
    console.log(webhookBody);
    const { payload, sha512 } = webhookBody;

    console.log('✅ Verified Webhook Payload:', payload);

    if (!payload?.reference) {
      return {
        statusCode: 400,
        success: false,
        message: 'Missing reference ID in webhook payload.',
      };
    }

    const data = {
      clientId: 4,
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
  @Post('/webhook/checkout/13/opay/callback')
  async handleProdOpayCallback(
    @Body() webhookBody: any,
  ): Promise<OpayResponse> {
    console.log(webhookBody);
    const { payload, sha512 } = webhookBody;

    console.log('✅ Verified Webhook Payload:', payload);

    if (!payload?.reference) {
      return {
        statusCode: 400,
        success: false,
        message: 'Missing reference ID in webhook payload.',
      };
    }

    const data = {
      clientId: 4,
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
  @Post('/webhook/12/coralpay/callback')
  @HttpCode(200)
  async handleCorapayWebhook(
    @Headers('authorization') authHeader: string,
    @Body() callbackData: any,
  ): Promise<OpayResponse> {
    console.log('✅ Verified Webhook Payload:', callbackData);
    console.log('THE HEADERS', authHeader);
    const clientId = 4;
    try {
      const result = await this.walletService.CorapayWebhook({
        clientId,
        authHeader,
        callbackData,
      });

      console.log(`🎉 User credited successfully: `);

      return result;
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
  @Post('webhook/check-out/:clientId/flutterwave')
  @ApiParam({ name: 'clientId', type: 'number', description: 'SBE Client ID' })
  async handleFlutterwaveWebhook(
    @Param('clientId') clientId: number,
    @Body() body: any,
    @Req() req,
    @Res() res,
  ) {
    console.log('THE MAIN F-FUNC');
    console.log('THE BODY', body);
    if (!clientId) return res.sendStatus(400);

    const signature = req.headers['x-flutterwave-signature'] as string;

    console.log('THE SIGNATURE', signature);
    console.log('Headers:', req.headers);

    // Option 2: Embed client ID in tx_ref or custom field
    const txRef = body?.data?.tx_ref;

    const client = clientId;

    if (!client) {
      console.warn('❌ Client ID missing from webhook');
      return res.status(400).json({ message: 'Client ID missing' });
    }

    await this.walletService.flutterWaveWebhook({
      clientId: client,
      txRef,
      event: body.event,
      body: JSON.stringify(body),
      flutterwaveKey: signature,
    });

    return res.status(200).json({ message: 'Received' });
  }

  @ApiTags('Webhooks')
  @Post('webhook/checkout/:clientId/korapay')
  @ApiParam({ name: 'clientId', type: 'number', description: 'SBE Client ID' })
  async handleKorapayWebhook(
    @Param('clientId') clientId: number,
    @Body() body: any,
    @Req() req,
    @Res() res,
  ) {
    if (!clientId) return res.sendStatus(400);

    console.log('THE-BODY:::', body);

    console.log('REF:::', body.reference);

    const signature = req.headers['x-korapay-signature'] as string;

    // Option 2: Embed client ID in tx_ref or custom field
    const reference = body?.data?.reference;

    const client = clientId;

    if (!client) {
      console.warn('❌ Client ID missing from webhook');
      return res.status(400).json({ message: 'Client ID missing' });
    }

    await this.walletService.korapayWaveWebhook({
      clientId: client,
      reference,
      event: body.event,
      body: JSON.stringify(body),
      korapayKey: signature,
    });

    return res.status(200).json({ message: 'Received' });
  }

  @ApiTags('Webhooks')
  @Post('/webhook/4/fidelity/callback')
  async handleWebhook(@Body() webhookBody: any) {
    try {
      console.log(webhookBody);

      const {
        type,
        status,
        data: { transactionReference, statusOk },
      } = webhookBody;
      const clientId = 4;

      if (type === 'success' && statusOk === true && status === 201) {
        const data = {
          transactionReference,
          clientId,
        };
        // Credit user's wallet
        await this.walletService.FidelityWebhook(data);

        return { statusCode: 200, success: true, message: 'OK' };
      }
    } catch (error) {
      return { statusCode: 400, success: true, message: 'OK' };
    }
  }

  @ApiTags('Webhooks')
  @HttpCode(200)
  @Post('/webhook/:clientId/providus/callback')
  async handleProvidusWebhook(
    @Param() param,
    @Body() webhookBody: any,
    @Headers() headers,
  ): Promise<ProvidusResponse> {
    try {
      console.log('🔥 Webhook HIT');
      console.log('Headers:', headers);
      console.log('Params:', param);
      console.log('Body:', webhookBody);

      const authorization: string = headers['x-auth-signature'];

      console.log(authorization);
      // if (!authorization) {
      //   return {
      //     requestSuccessful: true,
      //     sessionId: webhookBody.sessionId,
      //     responseMessage: 'rejected transaction',
      //     responseCode: '02',
      //   };
      // }

      const data = {
        accountNumber: webhookBody.accountNumber,
        clientId: param.clientId,
        sessionId: webhookBody.sessionId,
      };

      const result = await this.walletService.handleProvidusWebhook(data);
      return result;
    } catch (error) {
      return {
        requestSuccessful: true,
        sessionId: webhookBody.sessionId,
        responseMessage: 'rejected transaction',
        responseCode: '02',
      };
    }
  }
}
