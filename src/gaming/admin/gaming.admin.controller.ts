/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiQuery,
  ApiTags
} from '@nestjs/swagger';
import {
  AddGameToCategoriesDto,
  CreateGameDto,
  CreateProviderDto,
  FindOneCategoryDto,
  SaveCategoryRequest,
  SyncGameDto,
} from 'src/interfaces/gaming.pb';
import {
  AddGameCategoriesDto,
  FindCategoryDto,
  SaveCategoryRequestDto,
  SwaggerCreateGameDto,
  SwaggerCreateProviderDto,
  SwaggerOKGameArrayResponse,
  SwaggerOKGameResponse,
  SwaggerOKProviderArrayResponse,
  SwaggerOKProviderResponse,
  SwaggerSyncGameDto
} from '../dto';
import { GamingService } from '../gaming.service';

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

  @Get('get-games')
  // @ApiOkResponse({ type: [SwaggerOKGameResponse] })
  getGames(
  ) {
    return this.gamingService.getGames();
  }

  @Get('categories')
  @ApiOkResponse({ type: [SwaggerOKGameResponse] })
  getCategories() {
    return this.gamingService.listCategories();
  }

  @Get('category')
  @ApiQuery({ name: 'id', type: String })
  @ApiOkResponse({ type: [SwaggerOKGameResponse] })
  findOneCategory(@Query('id') id: string) {
  const payload: FindOneCategoryDto = { id: parseInt(id, 10) }; // Ensure it matches the expected structure
  return this.gamingService.findOneCategory(payload);
}

@Post('/add-game-category')
@ApiBody({ type: AddGameCategoriesDto })
@ApiOkResponse({ type: [SwaggerOKGameResponse] })
addGameToCategories(@Body() payload: AddGameToCategoriesDto) {
  return this.gamingService.addGameToCategories(payload);
}

@Delete('/delete-game-category')
@ApiBody({ type: AddGameCategoriesDto })
@ApiOkResponse({ type: [SwaggerOKGameResponse] })
removeGameToCategories(@Body() payload: AddGameToCategoriesDto) {
  return this.gamingService.removeGameToCategories(payload);
}
  
  @Post('/add-category')
  @ApiBody({ type: SaveCategoryRequestDto })
  @ApiOkResponse({ type: [SwaggerOKGameResponse] })
  saveCategory(@Body() payload: SaveCategoryRequest) {
    return this.gamingService.saveCategory(payload);
  }


  @Put('/update-category')
  @ApiBody({ type: SaveCategoryRequestDto })
  @ApiOkResponse({ type: [SwaggerOKGameResponse] })
  updateCategory(@Body() payload: SaveCategoryRequest) {
    return this.gamingService.updateCategory(payload);
  }


  @Delete('category')
  @ApiQuery({ name: 'id', type: String, description: 'ID of the category to delete' })
  @ApiOkResponse({ description: 'Category deleted successfully' })
  deleteCategory(@Query('id') id: string) {
    console.log('Received ID for deletion:', id);
    const payload: FindOneCategoryDto = { id: parseInt(id, 10) }; // Wrap id in DTO
    return this.gamingService.deleteCategory(payload);
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