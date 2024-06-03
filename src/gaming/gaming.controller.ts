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
} from '@nestjs/common';
import {
  ApiBody,
  ApiHeader,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { GamingService } from './gaming.service';
import {
  StartGameDto,
} from './gaming.pb';
import {
  SwaggerOKGameResponse,
  SwaggerStartGameDto,
  SwaggerStartGameResponseDto,
} from './dto';

@ApiTags('Gaming APIs')
@Controller('games')
export class GamingController {
  constructor(private readonly gamingService: GamingService) {}

  @Get('/:clientId/list')
  @ApiOkResponse({ type: [SwaggerOKGameResponse] })
  @ApiQuery({name: 'categoryId', description: 'Gaming category ID'})
  findAll(
    @Query('categoryId') categoryId: number,
    @Param('clientId') clientId,
  ) {
    const payload = {
      categoryId,
      clientId
    }
    return this.gamingService.fetchGames(payload);
  }

  @Get('categories')
  @ApiOkResponse({ type: [SwaggerOKGameResponse] })
  getCategories() {
    return this.gamingService.listCategories();
  }


  @Post('/:clientId/start')
  @ApiBody({ type: SwaggerStartGameDto })
  @ApiOkResponse({ type: SwaggerStartGameResponseDto })
  @ApiParam({name: 'clientId', description: 'SBE CLient ID'})
  constructGameUrl(
    @Body() startGameDto: StartGameDto,
    @Param('clientId') clientId,
  ) {
    startGameDto.clientId = parseInt(clientId);
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
          .json(response);
      }
      return res.json(response);
    } catch (error) {
      console.error(error);
      return res
        .set({
          'X-ErrorMessage': error.message,
          'X-ErrorCode': `${HttpStatus.INTERNAL_SERVER_ERROR}`,
        })
        .json({
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
        clientId
      });
      if (response.success === false) {
        return res
          .set({
            'X-ErrorMessage': response.message,
            'X-ErrorCode': `${HttpStatus.PROCESSING}`,
          })
          .json(response);
      }
      return res.json(response);
    } catch (error) {
      console.error(error);
      return res
        .set({
          'X-ErrorMessage': error.message,
          'X-ErrorCode': `${HttpStatus.INTERNAL_SERVER_ERROR}`,
        })
        .json({
          message: error.message,
          success: false,
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
        clientId
      });
      if (response.success === false) {
        return res
          .set({
            'X-ErrorMessage': response.message,
            'X-ErrorCode': `${response.status}`,
          })
          .json(response).status(HttpStatus.OK);
      }
      return res.json(response).status(HttpStatus.OK);
    } catch (error) {
      console.error(error);
      return res
        .set({
          'X-ErrorMessage': error.message,
          'X-ErrorCode': `${HttpStatus.INTERNAL_SERVER_ERROR}`,
        })
        .json({
          message: error.message,
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
        clientId
      });
      if (response.success === false) {
        return res
          .set({
            'X-ErrorMessage': response.message,
            'X-ErrorCode': `${response.status}`,
          })
          .status(response.status)
          .send(response)
      } else {
        return res.status(response.status).send(response);
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
        })
    }
  }
}
