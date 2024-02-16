import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { GamingService } from './gaming.service';
import {
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

  @Post('/:game_id/start')
  @ApiParam({ name: 'game_id', type: 'string' })
  @ApiBody({ type: SwaggerStartGameDto })
  constructGameUrl(@Body() startGameDto: StartGameDto) {
    try {
      console.log(startGameDto);
      const resp = this.gamingService.startGame(startGameDto);
      return resp;
    } catch (error) {
      console.error(error);
    }
  }

  @Get('/:provider_id/callback')
  @ApiParam({ name: 'provider_id', type: 'string' })
  @ApiOkResponse({ type: SwaggerOKGameArrayResponse })
  handleCallbackGet(@Body() data: any) {
    try {
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }
  @Post('/:provider_id/callback')
  @ApiParam({ name: 'provider_id', type: 'string' })
  @ApiOkResponse({ type: SwaggerOKGameArrayResponse })
  handleCallbackPost(@Body() data: any) {
    try {
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }
}
