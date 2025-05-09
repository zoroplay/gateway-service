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
  StartDto,
  StartGameDto,
  SyncGameDto,
} from 'src/interfaces/gaming.pb';
import {
  SwaggerOKGameResponse,
  SwaggerOKProviderArrayResponse,
  SwaggerStartGameDto,
  SwaggerStartGameResponseDto,
  SwaggerStartSmatGameDto,
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
  @ApiParam({
    name: 'clientId',
    description: 'Gaming client ID',
    required: true,
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


  // @Get('get-games')
  // @ApiOkResponse({ type: [SwaggerOKGameResponse] })
  // @ApiQuery({ name: 'providerId', required: false, type: Number })
  // @ApiQuery({ name: 'categoryId', required: false, type: Number })
  // async getGames(
  //   @Query('providerId') providerId?: string,
  //   @Query('categoryId') categoryId?: string
  // ): Promise<any> {
  //   const request: GetGamesRequest = {
  //     providerId: providerId ? Number(providerId) : undefined,
  //     categoryId: categoryId ? Number(categoryId) : undefined,
  //   };
  
  //   const val = await this.gamingService.getGames(request);
  //   return val;
  // }

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
    console.log("got here")
    startGameDto.clientId = parseInt(clientId);

    // Set default language if it is not provided
    if (!startGameDto.language) {
      startGameDto.language = 'en';
    }
    return this.gamingService.startGame(startGameDto);
  }

  @Post('/:clientId/start-url')
  @ApiBody({ type: SwaggerStartSmatGameDto })
  @ApiOkResponse({ type: SwaggerStartGameResponseDto })
  @ApiParam({ name: 'clientId', description: 'SBE CLient ID' })
  constructSmatGameUrl(
    @Body() startGameDto: StartDto,
    @Param('clientId') clientId,
  ) {
    startGameDto.clientId = parseInt(clientId);

    // Set default language if it is not provided
    // if (!startGameDto.language) {
    //   startGameDto.language = 'en';
    // }
    return this.gamingService.startSmatGame(startGameDto);
  }


  @Get('/provider')
  @ApiOkResponse({ type: [SwaggerOKProviderArrayResponse] })
  findAllProvider() {
    return this.gamingService.findAllProvider();
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
          .send(balanceResponse.data);
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

  @Post(':clientId/transactions')
  @ApiParam({ name: 'clientId', type: 'string' })
  @ApiHeader({
    name: 'Wallet-Session',
    description: 'Session signature for validation',
  })
  @ApiHeader({
    name: 'Pass-Key',
    description: 'Pass Key for authentication',
  })
  async QtechTransaction(
    @Headers() headers: Record<string, string>,
    @Res() res: Response,
    @Param('clientId') clientId: number,
    @Body() data: Record<string, any>,
  ) {

    try {

      console.log('Hit Transaction');

      const response = await this.gamingService.handleQtechGamesCallback({
        playerId: data.playerId,
        gameId: data.gameId,
        walletSessionId: headers['wallet-session'],
        passkey: headers['pass-key'],
        body: Object.keys(data).length === 0 ? '' : JSON.stringify(data),
        clientId,
        action: data.txnType,
      });

      if (!response.success) {
        return res
          .status(response.status)
          .send(response.data);
      }

      return res.status(response.status).send(response.data);
      
    } catch (error) {
      console.error('Error in QtechBet:', error);
      return res.status(500).json({
        code: "UNKNOWN_ERROR",
        message:
          'An unexpected error occurred while processing the transaction.',
      });
    }
  }

  @Post(':clientId/transactions/rollback')
  @ApiHeader({ name: 'Wallet-Session', description: 'Signature' })
  @ApiHeader({ name: 'Pass-Key', description: 'Pass Key' })
  async QtechRollBack(
    @Headers() headers: Record<string, string>,
    @Res() res: Response,
    @Body() data: Record<string, any>,
    @Param('clientId') clientId: number,
  ) {

    try {
      console.log('ROLLBACK Transaction');

      const response = await this.gamingService.handleQtechGamesCallback({
        playerId: data.playerId,
        gameId: data.gameId,
        walletSessionId: headers['wallet-session'],
        passkey: headers['pass-key'],
        body: Object.keys(data).length === 0 ? '' : JSON.stringify(data),
        clientId,
        action: 'ROLLBACK',
      });

      if (!response.success) {
        return res
          .status(response.status)
          .send(response.data);
      }

      return res.status(response.status).send(response.data);

    } catch (error) {
      console.error('Error in QtechBet:', error);
      return res.status(500).json({
        code: "UNKNOWN_ERROR",
        message:
          'An unexpected error occurred while processing the transaction.',
      });
    }
  }

  @Post(':clientId/bonus/reward')
  @ApiHeader({ name: 'Wallet-Session', description: 'Signature' })
  @ApiHeader({ name: 'Pass-Key', description: 'Pass Key' })
  async QtechBonusReward(
    @Headers() headers: Record<string, string>,
    @Res() res: Response,
    @Body() data: Record<string, any>,
    @Param('clientId') clientId: number,
  ) {

    try {
      console.log('Bonus Reward');

      const response = await this.gamingService.handleQtechGamesCallback({
        playerId: data.playerId,
        gameId: data.gameId,
        walletSessionId: headers['wallet-session'],
        passkey: headers['pass-key'],
        body: Object.keys(data).length === 0 ? '' : JSON.stringify(data),
        clientId,
        action: 'BONUS-REWARD',
      });

      if (!response.success) {
        return res
          .status(response.status)
          .send(response.data);
      }

      return res.status(response.status).send(response.data);

    } catch (error) {
      console.error('Error in QtechBet:', error);
      return res.status(500).json({
        code: "UNKNOWN_ERROR",
        message:
          'An unexpected error occurred while processing the transaction.',
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
 
    const rawBody = req.rawBody;
    let body = rawBody.toString().replace(/\r?\n|\r/g, "");
    body = body.replace(/\s/g, "");

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

  @Get('active-jackpot')
  @ApiOkResponse({ type: [SwaggerOKGameResponse] })
  @ApiQuery({ name: 'provider', type: String, required: true }) // Documenting query parameters
  @ApiQuery({ name: 'clientId', type: Number, required: false }) 
  handleCasinoJackpot(@Query() query: SyncGameDto) {
    return this.gamingService.handleCasinoJackpot(query);
  }



  @Get('jackpot-winners')
  @ApiOkResponse({ type: [SwaggerOKGameResponse] })
  @ApiQuery({ name: 'provider', type: String, required: true }) // Documenting query parameters
  @ApiQuery({ name: 'clientId', type: Number, required: false }) 
  handleCasinoJackpotWinners(@Query() query: SyncGameDto) {
    return this.gamingService.handleCasinoJackpotWinners(query);
  }

  @Get(':clientId/callback/player-information')
  @ApiParam({ name: 'clientId', type: 'string' })
  @ApiQuery({ name: 'playerId', type: 'string' })
  @ApiParam({ name: 'action', type: 'string' })
  @ApiQuery({ name: 'sessionId', type: 'string' })
  async authenticatePlayer(
    @Res() res: Response,
    @Body() data: Record<string, any>,
    @Query('playerId') playerId: string,
    @Query('sessionId') sessionId: string,
    @Param('clientId') clientId: number,

  ) {

    try {
      console.log("data", playerId, sessionId);
      // Fetch the player's balance
      const response = await this.gamingService.handleSmatVirtualGamesCallback(
        {
          playerId: playerId,
          body: Object.keys(data).length === 0 ? '' : JSON.stringify(data),
          clientId,
          sessionId,
          action: 'player-information',
        },
      );

      if (!response.success) {
        return res
          .status(response.status)
          .send(response);
      }

      return res.status(response.status).send(response);

    } catch (error) {
      console.error('Error in handleSmatVirtualGamesCallback:', error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({
          message: 'Unexpected error',
          code: "UNKNOWN_ERROR",
        });
    }
  }

  // https://staging.api.sportsbookengine.com/api/v2/games/4/spribe/callback

  @Post(':clientId/:provider_id/callback/:action')
  @ApiParam({ name: 'clientId', type: 'string' })
  @ApiParam({ name: 'action', type: 'string' })
  @ApiParam({ name: 'provider_id', type: 'string' })
  @ApiHeader({ name: 'X-Spribe-Client-ID', description: 'clientId' })
  @ApiHeader({ name: 'X-Spribe-Client-TS', description: 'timestamp' })
  @ApiHeader({ name: 'X-Spribe-Client-Signature', description: 'signature' })
  async handleCallbackWithSpribehActionPost(

    @Param('clientId') clientId: number,
    @Param('action') action,
    @Param('provider_id') provider,
    @Headers() headers: Record<string, string>,
    @Req() req: RawBodyRequest<Request>,
    @Res() res: Response,
    @Body() data: Record<string, any>,
  ) {

    console.log("spribe-gateway");

    // Validate required headers
    // const walletSessionId = headers['wallet-session'];
    const signature = headers['X-Spribe-Client-Signature'];

    try {
      // Handle the response if session is valid
      console.log("req", req);
      const response = await this.gamingService.handleSpribeGamesCallback({
        provider: provider,
        signature,
        body: Object.keys(data).length === 0 ? '' : JSON.stringify(data),
        clientId,
        action: action ? action : 'auth'
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
}
