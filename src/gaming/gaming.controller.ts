/* eslint-disable prettier/prettier */
import {
  Headers,
  Param,
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  HttpStatus,
  Query,
  RawBodyRequest,
  HttpCode,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBody,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { GamingService } from './gaming.service';
import {
  FindOneCategoryDto,
  QtechtransactionRequest,
  StartGameDto,
} from 'src/interfaces/gaming.pb';
import {
  SwaggerOKGameResponse,
  SwaggerStartGameDto,
  SwaggerStartGameResponseDto,
} from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiFile } from 'src/common/file-interceptor';

@ApiTags('Gaming APIs')
@Controller('games')
export class GamingController {
  constructor(private readonly gamingService: GamingService) {}

  @Get('/:clientId/list')
  @ApiOkResponse({ type: [SwaggerOKGameResponse] })
  @ApiQuery({
    name: 'categoryId',
    description: 'Gaming category ID',
    required: false,
  })
  @ApiQuery({
    name: 'providerId',
    description: 'Gaming provider ID',
    required: false,
  })
  findAll(
    @Query('categoryId') categoryId: number,
    @Query('providerId') providerId: number,
    @Param('clientId') clientId,
  ) {
    const payload = {
      categoryId,
      providerId,
      clientId,
    };
    return this.gamingService.fetchGames(payload);
  }

  @Get('/:clientId/game-list')
  @ApiOkResponse({ type: [SwaggerOKGameResponse] })
  @ApiQuery({
    name: 'gameName',
    description: 'Game title in the DB',
    required: false,
  })
  fetchGamesByName(
    @Query('gameName') gameName: string,
    @Param('clientId') clientId: number = 4,
  ) {
    const payload = {
      gameName,
      clientId,
    };
    return this.gamingService.fetchGamesByName(payload);
  }

  @Get('categories')
  @ApiOkResponse({ type: [SwaggerOKGameResponse] })
  getCategories() {
    return this.gamingService.listCategories();
  }

  @Post('/:clientId/start')
  @ApiBody({ type: SwaggerStartGameDto })
  @ApiOkResponse({ type: SwaggerStartGameResponseDto })
  @ApiParam({ name: 'clientId', description: 'SBE CLient ID' })
  constructGameUrl(
    @Body() startGameDto: StartGameDto,
    @Param('clientId') clientId,
  ) {
    startGameDto.clientId = parseInt(clientId);

    // Set default language if it is not provided
    if (!startGameDto.language) {
      startGameDto.language = 'en';
    }
    return this.gamingService.startGame(startGameDto);
  }

  @Get('/:clientId/:provider_id/callback')
  @ApiParam({ name: 'provider_id', type: 'string' })
  @ApiHeader({ name: 'X-Signature', description: 'Signature' })
  @ApiHeader({ name: 'X-SessionId', description: 'Session ID' })
  @ApiHeader({ name: 'X-UserName', description: 'User Name' })
  @ApiHeader({
    name: 'X-ClientExternalKey',
    description: 'Client External Key',
  })
  @ApiBody({ type: SwaggerStartGameDto })
  async handleCallbackGet(
    @Req() request,
    @Param('provider_id') provider,
    @Param('clientId') clientId,
    @Headers() headers,
    @Body() data,
    @Res() res: Response,
  ) {
    try {
      const response = await this.gamingService.handleGamesCallback({
        provider: provider,
        method: request.method,
        header: headers,
        body: JSON.stringify(data),
        clientId,
      });
      if (response.success === false) {
        return res
          .set({
            'X-ErrorMessage': response.message,
            'X-ErrorCode': `${HttpStatus.PROCESSING}`,
          })
          .send(response);
      }
      return res.json(response);
    } catch (error) {
      console.error(error);
      return res
        .set({
          'X-ErrorMessage': error.message,
          'X-ErrorCode': `${HttpStatus.INTERNAL_SERVER_ERROR}`,
        })
        .send({
          message: error.message,
          success: false,
        });
    }
  }

  @Post('/:clientId/:provider_id/callback')
  @ApiParam({ name: 'provider_id', type: 'string' })
  @ApiParam({ name: 'clientId', type: 'string' })
  @ApiHeader({ name: 'X-Signature', description: 'Signature' })
  @ApiHeader({ name: 'X-SessionId', description: 'Session ID' })
  @ApiHeader({ name: 'X-UserName', description: 'User Name' })
  @ApiHeader({
    name: 'X-ClientExternalKey',
    description: 'Client External Key',
  })
  @ApiBody({ type: SwaggerStartGameDto })
  @ApiHeader({
    name: 'X-ClientExternalKey',
    description: 'Client External Key',
  })
  async handleCallbackPost(
    @Req() req: RawBodyRequest<Request>,
    @Param('provider_id') provider,
    @Param('clientId') clientId,
    @Headers() headers,
    @Body() body,
    @Res() res,
  ) {
    // console.log(body);

    try {
      const response = await this.gamingService.handleGamesCallback({
        provider: provider,
        method: req.method,
        header: headers,
        body: JSON.stringify(body),
        clientId,
      });

      return res.status(response.status).send(response.data);
    } catch (error) {
      console.error(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        status: 'error',
        error: {
          scope: 'internal',
          no_refund: '1',
          message: 'Internal server error',
        },
      });
    }
  }

  @Get('/:clientId/:provider_id/callback/:action')
  @ApiParam({ name: 'provider_id', type: 'string' })
  @ApiParam({ name: 'clientId', type: 'string' })
  @ApiParam({ name: 'action', type: 'string' })
  @ApiHeader({ name: 'X-Signature', description: 'Signature' })
  @ApiHeader({ name: 'X-SessionId', description: 'Session ID' })
  @ApiHeader({ name: 'X-UserName', description: 'User Name' })
  @ApiHeader({
    name: 'X-ClientExternalKey',
    description: 'Client External Key',
  })
  @ApiBody({ type: SwaggerStartGameDto })
  async handleCallbackWithActionGet(
    @Req() request,
    @Param('action') action,
    @Param('provider_id') provider,
    @Param('clientId') clientId,
    @Headers() headers,
    @Body() data,
    @Res() res: Response,
  ) {
    // console.log({
    //   provider: provider,
    //   action: action,
    //   method: request.method,
    //   header: headers,
    //   body: data,
    // });
    try {
      const response = await this.gamingService.handleGamesCallback({
        provider: provider,
        action: action,
        method: request.method,
        header: headers,
        body: Object.keys(data).length === 0 ? null : JSON.stringify(data),
        clientId,
      });

      if (response.success === false) {
        return res
          .set({
            'X-ErrorMessage': response.message,
            'X-ErrorCode': `${response.status}`,
          })
          .send(response)
          .status(HttpStatus.OK);
      }

      return res.send(response.data).status(HttpStatus.OK);
    } catch (error) {
      console.error(error);
      return res
        .set({
          'X-ErrorMessage': error.message,
          'X-ErrorCode': `${HttpStatus.INTERNAL_SERVER_ERROR}`,
        })
        .send({
          message: error.message,
          success: false,
        });
    }
  }

  @Get(':clientId/accounts/:playerId/session')
  @ApiParam({ name: 'clientId', type: 'string' })
  @ApiParam({ name: 'playerId', type: 'string' })
  @ApiQuery({ name: 'gameId', type: 'string' })
  @ApiHeader({ name: 'Wallet-Session', description: 'Signature' })
  @ApiHeader({ name: 'Pass-Key', description: 'Pass Key' })
  async handleCallbackWithQtechActionGet(
    @Param('playerId') playerId: string,
    @Param('clientId') clientId: number,
    @Query('gameId') gameId: string,
    @Headers() headers: Record<string, string>,
    @Res() res: Response,
    @Body() data: Record<string, any>,
  ) {

    // Validate required headers
    const walletSessionId = headers['wallet-session'];
    const passkey = headers['pass-key'];

    try {
      // Handle the response if session is valid
      const response = await this.gamingService.handleQtechGamesCallback({
        playerId: playerId,
        gameId: gameId,
        walletSessionId,
        passkey,
        body: Object.keys(data).length === 0 ? '' : JSON.stringify(data),
        clientId,
        action: 'verifySession',
      });

      console.log('Game Callback Response:', response);

      // Send appropriate response back
      if (!response.success) {
        return res
          .status(response.status)
          .send(response.data);
      }

      return res.status(response.status).send(response.data);

    } catch (error) {
      console.error('Error in handleCallbackWithQtechActionGet:', error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({
          message: 'Unexpected error',
          code: "UNKNOWN_ERROR",
        });
    }
  }

  @Get(':clientId/accounts/:playerId/balance')
  @ApiParam({ name: 'clientId', type: 'string' })
  @ApiParam({ name: 'playerId', type: 'string' })
  @ApiQuery({ name: 'gameId', type: 'string' })
  @ApiHeader({ name: 'Wallet-Session', description: 'Signature' })
  @ApiHeader({ name: 'Pass-Key', description: 'Pass Key' })
  async getQtechBalance(
    @Headers() headers: Record<string, string>,
    @Res() res: Response,
    @Body() data: Record<string, any>,
    @Param('playerId') playerId: string,
    @Param('clientId') clientId: number,
    @Query('gameId') gameId?: string,
  ) {

    try {
      // Fetch the player's balance
      const balanceResponse = await this.gamingService.handleQtechGamesCallback(
        {
          playerId: playerId,
          gameId: gameId,
          walletSessionId: headers['wallet-session'],
          passkey: headers['pass-key'],
          body: Object.keys(data).length === 0 ? '' : JSON.stringify(data),
          clientId,
          action: 'getBalance',
        },
      );

      if (!balanceResponse.success) {
        return res
          .status(balanceResponse.status)
          .send(balanceResponse);
      }

      return res.status(balanceResponse.status).send(balanceResponse.data);

    } catch (error) {
      console.error('Error in handleCallbackWithQtechActionGet:', error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({
          message: 'Unexpected error',
          code: "UNKNOWN_ERROR",
        });
    }
  }

  @Post('/transactions/rollback')
  @ApiHeader({ name: 'Wallet-Session', description: 'Signature' })
  @ApiHeader({ name: 'Pass-Key', description: 'Pass Key' })
  async QtechRollBack(
    @Headers() headers: Record<string, string>,
    @Res() res: Response,
    @Req() request: Request,
    @Body() data: Record<string, any>,
  ) {


    const walletSessionId = headers['wallet-session'];
    const passkey = headers['pass-key'];

    try {
      console.log('ROLLBACK Transaction');

      const result = {
        walletSessionId,
        passKey: passkey,
        playerId: data.playerId.toString(),
        betId: data.txnType,
        txnId: data.txnId,
        roundId: data.roundId,
        amount: data.amount,
        currency: data.currency,
        gameId: data.gameId,
        clientId: data.clientId || 4,
      };

      const request = await this.gamingService.handleQtechRollback(result);

      return res.status(HttpStatus.OK).send(request.data);
    } catch (error) {
      console.error('Error in QtechBet:', error);
      return res
        .set({
          'X-ErrorMessage': error.message || 'Internal Server Error',
          'X-ErrorCode': `${HttpStatus.INTERNAL_SERVER_ERROR}`,
        })
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({
          message: error.message || 'Internal Server Error',
          success: false,
        });
    }
  }

  @Post('/:clientId/:provider_id/callback/:action')
  @ApiParam({ name: 'clientId', type: 'string' })
  @ApiParam({ name: 'provider_id', type: 'string' })
  @ApiParam({ name: 'action', type: 'string' })
  @ApiHeader({ name: 'X-Signature', description: 'Signature' })
  @ApiHeader({ name: 'X-SessionId', description: 'Session ID' })
  @ApiHeader({ name: 'X-UserName', description: 'User Name' })
  @ApiHeader({
    name: 'X-ClientExternalKey',
    description: 'Client External Key',
  })
  // @ApiBody({ type: SwaggerStartGameDto })
  async handleCallbackWithActionPost(
    @Param('action') action,
    @Param('provider_id') provider,
    @Param('clientId') clientId,
    @Headers() headers,
    @Req() req: RawBodyRequest<Request>,
    @Res() res: Response,
  ) {
    // console.log(req.rawBody)
    // const rawBody = req.rawBody;
    // let body = rawBody.toString().replace(/\r?\n|\r/g, "");
    // body = body.replace(/\s/g, "");

    const body =
      'reference=acc2e13bc3b8401ca2a6ca47&amount=100.25&campaignType=T&providerId=PragmaticPlay&campaignId=68&currency=NGN&userId=214993&hash=b0b8ebd17bbfa89bbf3cccbdec0813e9&timestamp=1733827646440';

    // const body = 'reference=cf694b66c6044264a6a3f076&gameId=vs25wolfjpt&jackpotDetails=%7B%22progressive%22%3A200.25%2C%22non-progressive%22%3A0.0%7D&amount=200.25&jackpotId=162&providerId=PragmaticPlay&userId=214993&roundId=14398923&hash=e7fe70d40e521dd5a8deda065b1e69bf&timestamp=1734026932633&token=HO8QBS6I6R15CC6YQKFE4OYXYULGAI6WEZ1S05BV'

    try {
      const response = await this.gamingService.handleGamesCallback({
        provider: provider,
        action: action,
        method: req.method,
        header: headers,
        body,
        clientId,
      });
      if (response.success === false) {
        return res
          .set({
            'X-ErrorMessage': response.message,
            'X-ErrorCode': `${response.status}`,
          })
          .status(response.status)
          .send(response);
      } else {
        // console.log('response status is', response.status);
        return res.status(response.status).send(response.data);
      }
    } catch (error) {
      console.error(error);
      return res
        .set({
          'X-ErrorMessage': error.message,
          'X-ErrorCode': `${HttpStatus.INTERNAL_SERVER_ERROR}`,
        })
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({
          message: error.message,
          success: false,
        });
    }
  }

  @Post('upload')
  @ApiOperation({ summary: 'Upload a single file' })
  @UseInterceptors(FileInterceptor('file'))
  async handleFileUpload(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log("file", file);
    const value = await this.gamingService.uploadFile(file);

    console.log("value", value);

    return value;
  }
}
