/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import {
  AddGameToCategoriesDto,
  AddGameToTournamentDto,
  CreateGameDto,
  CreatePromotionDto,
  CreateProviderDto,
  CreateTournamentDto,
  FindOneCategoryDto,
  FindOneTournamentDto,
  SaveCategoryRequest,
  SyncGameDto,
  UpdateGameDto,
} from 'src/interfaces/gaming.pb';
import {
  AddGameCategoriesDto,
  AddTournamentGameDto,
  CreatePromotionRequestDto,
  CreateTournamentRequestDto,
  // CreatePromotionDto,
  FindCategoryDto,
  FindPromotionDto,
  SaveCategoryRequestDto,
  SwaggerCreateGameDto,
  SwaggerCreateProviderDto,
  SwaggerOKGameArrayResponse,
  SwaggerOKGameResponse,
  SwaggerOKPromotionResponse,
  SwaggerOKProviderArrayResponse,
  SwaggerOKProviderResponse,
  SwaggerSyncGameDto,
  UpdateGameRequestDto,
} from '../dto';
import { GamingService } from '../gaming.service';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('BackOffice APIs')
@Controller('admin/games')
export class GamingAdminController {
  constructor(private readonly gamingService: GamingService) {}

  @Get()
  @ApiOkResponse({ type: [SwaggerOKGameResponse] })
  findAll() {
    return this.gamingService.findAll();
  }

  @Get('get-games')
  @ApiOkResponse({ type: [SwaggerOKGameResponse] })
  async getGames() {
    const val = await this.gamingService.getGames();

    console.log('val', val);
    return val;
  }

  @Put('/update-game')
  @ApiBody({ type: UpdateGameRequestDto })
  @ApiOkResponse({ type: [SwaggerOKGameResponse] })
  updateGame(@Body() payload: UpdateGameDto) {
    return this.gamingService.updateGame(payload);
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
  @ApiQuery({
    name: 'id',
    type: String,
    description: 'ID of the category to delete',
  })
  @ApiOkResponse({ description: 'Category deleted successfully' })
  deleteCategory(@Query('id') id: string) {
    console.log('Received ID for deletion:', id);
    const payload: FindOneCategoryDto = { id: parseInt(id, 10) }; // Wrap id in DTO
    return this.gamingService.deleteCategory(payload);
  }

// @Post('/add-promotion')
// @ApiBody({ type: CreatePromotionRequestDto })
// @ApiOkResponse({ type: [SwaggerOKPromotionResponse] })
// async createPromotion(@Body() payload: CreatePromotionDto ) {
//   console.log('payload', payload);
//   const promotion = await this.gamingService.createPromotion(payload);
//   console.log('promotion', promotion);
//   return promotion;
// }

@Post('/add-promotion')
@ApiConsumes('multipart/form-data') // Indicate multipart/form-data for file uploads
@ApiBody({
  schema: {
    type: 'object',
    properties: {
      title: { type: 'string', example: 'Promotion Title' },
      imageUrl: { type: 'string', example: 'http://example.com/image.png' },
      content: { type: 'string', example: 'This is the promotion content.' },
      startDate: { type: 'string', format: 'date-time', example: '2025-01-15T00:00:00Z' },
      endDate: { type: 'string', format: 'date-time', example: '2025-01-20T00:00:00Z' },
      type: { type: 'string', example: 'Promotion Type' },
      targetUrl: { type: 'string', example: 'http://example.com' },
      file: {
        type: 'string',
        format: 'binary', // Specifies that this is a file upload field
      },
    },
    required: ['title', 'content', 'startDate', 'endDate', 'type', 'file'], // Specify required fields
  },
})
@ApiOkResponse({ type: [SwaggerOKPromotionResponse] })
@UseInterceptors(FileInterceptor('file'))
async createPromotion(@Body() payload: CreatePromotionDto, @UploadedFile() file: Express.Multer.File) {
  console.log('payload', payload);
  const promotion = await this.gamingService.createPromotion(payload, file);
  console.log('promotion', promotion);
  return promotion;
}



@Post('/update-promotion')
@ApiConsumes('multipart/form-data') // Indicate multipart/form-data for file uploads
@ApiBody({
  schema: {
    type: 'object',
    properties: {
      id: { type: 'number', example: 1 },
      title: { type: 'string', example: 'Promotion Title' },
      imageUrl: { type: 'string', example: 'http://example.com/image.png' },
      content: { type: 'string', example: 'This is the promotion content.' },
      startDate: { type: 'string', format: 'date-time', example: '2025-01-15T00:00:00Z' },
      endDate: { type: 'string', format: 'date-time', example: '2025-01-20T00:00:00Z' },
      type: { type: 'string', example: 'Promotion Type' },
      targetUrl: { type: 'string', example: 'http://example.com' },
      file: {
        type: 'string',
        format: 'binary', // Specifies that this is a file upload field
      },
    },
    required: ['title', 'content', 'startDate', 'endDate', 'type', 'id'], // Specify required fields
  },
})
@ApiOkResponse({ type: [SwaggerOKPromotionResponse] })
@UseInterceptors(FileInterceptor('file'))
async updatePromotion(@Body() payload: CreatePromotionDto, @UploadedFile() file?: Express.Multer.File) {
  console.log('payload', payload);
  const promotion = await this.gamingService.updatePromotion(payload, file);
  console.log('promotion', promotion);
  return promotion;
}


// @Post('/update-promotion')
// @ApiBody({ type: CreatePromotionRequestDto })
// @ApiOkResponse({ type: [SwaggerOKPromotionResponse] })
// @UseInterceptors(FileInterceptor('file'))
// async updatePromotion(@Body() payload: CreatePromotionDto) {
//   console.log('payload', payload);
//   const promotion = await this.gamingService.updatePromotion(payload);
//   console.log('promotion', promotion);
//   return promotion;
// }


  @Delete('promotion')
  @ApiQuery({
    name: 'id',
    type: String,
    description: 'ID of the category to delete',
  })
  @ApiOkResponse({ description: 'Category deleted successfully' })
  removePromotion(@Query('id') id: string) {
    console.log('Received ID for deletion:', id);
    const payload: FindPromotionDto = { id: parseInt(id, 10) }; // Wrap id in DTO
    return this.gamingService.removePromotion(payload);
  }

  @Get('promotions')
  findPromotions() {
    console.log('here');
    return this.gamingService.findPromotions();
  }

  @Get('promotion')
  @ApiQuery({ name: 'id', type: String })
  findOnePromotion(@Query('id') id: string) {
    const payload: FindOneCategoryDto = { id: parseInt(id, 10) }; // Ensure it matches the expected structure
    return this.gamingService.findOnePromotion(payload);
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
    console.log('CONTROLLER CHECK');
    return this.gamingService.sync(syncGameDto);
  }

  @Post('/add-tournament')
  @ApiBody({ type: CreateTournamentRequestDto })
  @ApiOkResponse({ type: [SwaggerOKPromotionResponse] })
  async createTournament(@Body() payload: CreateTournamentDto) {
    console.log('payload', payload);
    const tournament = await this.gamingService.createTournament(payload);
    console.log('tournament', tournament);
    return tournament;
  }

  @Put('/update-tournament')
  @ApiBody({ type: CreateTournamentRequestDto })
  updateTournament(@Body() payload: CreateTournamentDto) {
    return this.gamingService.updateTournament(payload);
  }

  @Delete('tournament')
  @ApiQuery({
    name: 'id',
    type: String,
    description: 'ID of the category to delete',
  })
  @ApiOkResponse({ description: 'Tournament deleted successfully' })
  deleteTournament(@Query('id') id: string) {
    console.log('Received ID for deletion:', id);
    const payload: FindOneTournamentDto = { id: parseInt(id, 10) }; // Wrap id in DTO
    return this.gamingService.deleteTournament(payload);
  }

  @Get('tournaments')
  findAllTournaments() {
    console.log('here');
    return this.gamingService.findAllTournaments();
  }

  @Get('tournament')
  @ApiQuery({ name: 'id', type: String })
  findOneTournament(@Query('id') id: string) {
    const payload: FindOneTournamentDto = { id: parseInt(id, 10) }; // Ensure it matches the expected structure
    return this.gamingService.findOneTournament(payload);
  }

  @Post('/add-tournament-game')
  @ApiBody({ type: AddTournamentGameDto })
  @ApiOkResponse({ type: [SwaggerOKGameResponse] })
  addTournamentGame(@Body() payload: AddGameToTournamentDto) {
    console.log('here');
    console.log('payload', payload);
    return this.gamingService.addTournamentGame(payload);
  }

  @Delete('/delete-tournament-game')
  @ApiBody({ type: AddTournamentGameDto })
  @ApiOkResponse({ type: [SwaggerOKGameResponse] })
  removeTournamentGame(@Body() payload: AddGameToTournamentDto) {
    return this.gamingService.removeTournamentGame(payload);
  }
}



