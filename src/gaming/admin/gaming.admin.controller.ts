/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { GamingService } from '../gaming.service';
import {
  CreateGameDto,
  CreateProviderDto,
  SyncGameDto,
} from '../gaming.pb';
import {
  SwaggerOKGameArrayResponse,
  SwaggerOKGameResponse,
  SwaggerSyncGameDto,
  SwaggerCreateGameDto,
  SwaggerOKProviderArrayResponse,
  SwaggerCreateProviderDto,
  SwaggerOKProviderResponse,
} from '../dto';

@ApiTags('BackOffice APIs')
@Controller('admin/games')
export class GamingAdminController {
  constructor(private readonly gamingService: GamingService) {}

  @Get()
  @ApiOkResponse({ type: [SwaggerOKGameResponse] })
  findAll(
  ) {
    return this.gamingService.findAll();
  }

  @Get('categories')
  @ApiOkResponse({ type: [SwaggerOKGameResponse] })
  getCategories() {
    return this.gamingService.listCategories();
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
    return this.gamingService.findAllProvider();
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
    return this.gamingService.sync(syncGameDto);
  }
}
