import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GamingService } from './gaming.service';
import { CreateGameDto, SyncGameDto } from './gaming.pb';
import {
  SwaggerOKGameArrayResponse,
  SwaggerOKGameResponse,
  SwaggerSyncGameDto,
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
}
