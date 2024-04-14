import {
  Headers,
  Param,
  Body,
  Controller,
  Get,
  Post,
  Req,
} from '@nestjs/common';
import {
  ApiBody,
  ApiHeader,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { GamingService } from './gaming.service';
import {
  CallbackGameDto,
  CreateGameDto,
  CreateProviderDto,
  StartGameDto,
  SyncGameDto,
} from './gaming.pb';
import {
  SwaggerOKGameArrayResponse,
  SwaggerOKGameResponse,
  SwaggerSyncGameDto,
  SwaggerCreateGameDto,
  SwaggerOKProviderArrayResponse,
  SwaggerCreateProviderDto,
  SwaggerOKProviderResponse,
  SwaggerStartGameDto,
  SwaggerStartGameResponseDto,
} from './dto';

@ApiTags('Gaming APIs')
@Controller('games')
export class GamingController {
  constructor(private readonly gamingService: GamingService) {}

  @Get()
  @ApiOkResponse({ type: [SwaggerOKGameResponse] })
  findAll() {
    try {
      const resp = this.gamingService.findAll();
      return resp;
    } catch (error) {
      console.error(error);
    }
  }

  @Post()
  @ApiBody({ type: SwaggerCreateGameDto })
  @ApiOkResponse({ type: SwaggerOKGameResponse })
  create(@Body() createGameDto: CreateGameDto) {
    return this.gamingService.create(createGameDto);
  }

  @Get('/provider')
  @ApiOkResponse({ type: [SwaggerOKProviderArrayResponse] })
  findAllProvider() {
    try {
      const resp = this.gamingService.findAllProvider();
      return resp;
    } catch (error) {
      console.error(error);
    }
  }

  @Post('/provider')
  @ApiBody({ type: SwaggerCreateProviderDto })
  @ApiOkResponse({ type: SwaggerOKProviderResponse })
  createProvider(@Body() createProviderDto: CreateProviderDto) {
    return this.gamingService.createProvider(createProviderDto);
  }

  @Post('/sync')
  @ApiBody({ type: SwaggerSyncGameDto })
  @ApiOkResponse({ type: SwaggerOKGameArrayResponse })
  syncGames(@Body() syncGameDto: SyncGameDto) {
    try {
      const resp = this.gamingService.sync(syncGameDto);
      return resp;
    } catch (error) {
      console.error(error);
    }
  }

  @Post('/start')
  @ApiBody({ type: SwaggerStartGameDto })
  @ApiOkResponse({ type: SwaggerStartGameResponseDto })
  constructGameUrl(@Body() startGameDto: StartGameDto) {
    try {
      const resp = this.gamingService.startGame(startGameDto);
      return resp;
    } catch (error) {
      console.error(error);
    }
  }

  @Get('/:provider_id/callback')
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
    @Headers() headers,
    @Body() data,
  ) {
    try {
      return await this.gamingService.handleGamesCallback({
        provider: provider,
        method: request.method,
        header: headers,
        body: data,
      });
    } catch (error) {
      console.error(error);
    }
  }

  @Post('/:provider_id/callback')
  @ApiParam({ name: 'provider_id', type: 'string' })
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
    @Headers() headers,
    @Body() data,
  ) {
    try {
      return await this.gamingService.handleGamesCallback({
        provider: provider,
        method: request.method,
        header: headers,
        body: data,
      });
    } catch (error) {
      console.error(error);
    }
  }

  @Get('/:provider_id/callback/:action')
  @ApiParam({ name: 'provider_id', type: 'string' })
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
    @Headers() headers,
    @Body() data,
  ) {
    try {
      return await this.gamingService.handleGamesCallback({
        provider: provider,
        action: action,
        method: request.method,
        header: headers,
        body: data,
      });
    } catch (error) {
      console.error(error);
    }
  }

  @Post('/:provider_id/callback/:action')
  @ApiParam({ name: 'provider_id', type: 'string' })
  @ApiParam({ name: 'action', type: 'string' })
  @ApiHeader({ name: 'X-Signature', description: 'Signature' })
  @ApiHeader({ name: 'X-SessionId', description: 'Session ID' })
  @ApiHeader({ name: 'X-UserName', description: 'User Name' })
  @ApiHeader({
    name: 'X-ClientExternalKey',
    description: 'Client External Key',
  })
  @ApiBody({ type: SwaggerStartGameDto })
  async handleCallbackWithActionPost(
    @Req() request,
    @Param('action') action,
    @Param('provider_id') provider,
    @Headers() headers,
    @Body() data,
  ) {
    try {
      return await this.gamingService.handleGamesCallback({
        provider: provider,
        action: action,
        method: request.method,
        header: headers,
        body: data,
      });
    } catch (error) {
      console.error(error);
    }
  }
}
