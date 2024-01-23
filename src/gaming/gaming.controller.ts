import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { GamingService } from './gaming.service';
import { CreateGameDto, SyncGameDto } from './gaming.pb';
import {
  SwaggerOKGameArrayResponse,
  SwaggerOKGameResponse,
  SwaggerSyncGameDto,
  SwaggerCreateGameDto,
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

  @Post('')
  @ApiBody({ type: SwaggerCreateGameDto })
  @ApiOkResponse({ type: SwaggerOKGameResponse })
  create(@Body() createGameDto: CreateGameDto) {
    return this.gamingService.create(createGameDto);
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

  @Post('/start-game/:game_id')
  // @ApiOperation({
  //   summary: 'Start a game',
  //   description:
  //     'This starts a bet request with all the required detailed, upon successful bet placement, unique betID is returned',
  // })
  @ApiParam({ name: 'game_id', type: 'string' })
  @ApiBody({ type: SwaggerSyncGameDto })
  @ApiOkResponse({ type: SwaggerOKGameArrayResponse })
  constructGameUrl(@Body() syncGameDto: SyncGameDto) {
    try {
      //TODO: Get Logged in  User and Client Id from Identity Service to use in Constructing a game url
      const resp = this.gamingService.sync(syncGameDto);
      return resp;
    } catch (error) {
      console.error(error);
    }
  }
}
