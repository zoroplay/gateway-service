import {
  Body,
  Controller,
  Get,
  Query,
  Ip,
  Req,
  Inject,
  Post,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import {
  ClientIdRequest,
  CreateBannerRequest,
  CreateMenuRequest,
  CreatePageRequest,
  FindOneRequest,
  IDENTITY_SERVICE_NAME,
  IdentityServiceClient,
  protobufPackage,
} from 'src/interfaces/identity.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { CreateBannerDto, CreateMenuDto, CreatePageDto, SaveRoleRequest } from '../dto/admin.dto';
import { SwaggerCommonResponse } from '../dto';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('BackOffice APIs')
@UseGuards(AuthGuard)
@Controller('admin/content-management')
export class ContentManagementController {
  private svc: IdentityServiceClient;

  @Inject(protobufPackage)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<IdentityServiceClient>(
      IDENTITY_SERVICE_NAME,
    );
  }

  @Post('/create-banner')
  @ApiOperation({
    summary: 'Save Banner',
    description: 'This endpoint is used to create banner',
  })
  @ApiBody({ type: CreateBannerDto })
  @ApiOkResponse({ type: SwaggerCommonResponse })
  createBanner(@Body() body: CreateBannerRequest) {
    return this.svc.createBanner(body);
  }

  @Get('/banners')
  @ApiOperation({
    summary: 'Fetch all Banners',
    description: 'This endpoint is fetch all system banners',
  })
  @ApiQuery({ name: 'clientId', description: 'SBE Client ID' })
  @ApiOkResponse({ type: SwaggerCommonResponse })
  findAllBanners(@Query() payload: ClientIdRequest) {
    return this.svc.findAllBanners(payload);
  }

  @Get('/banner/:id')
  @ApiOperation({
    summary: 'Fetch all Banners',
    description: 'This endpoint is fetch all system banners',
  })
  @ApiParam({ name: 'id', description: 'bannerId' })
  @ApiQuery({ name: 'clientId', description: 'SBE Client ID' })
  @ApiOkResponse({ type: SwaggerCommonResponse })
  findOneBanner(@Param('id') id: string, @Query('clientId') clientId: string) {
    const payload: FindOneRequest = {
    id: parseInt(id, 10),
    clientId: parseInt(clientId, 10)
  };
    return this.svc.findOneBanner(payload);
  }

  @Put('/banner')
  @ApiOperation({
    summary: 'Update banner',
    description: 'This endpoint is fetch all system banners',
  })
  @ApiBody({ type: CreateBannerDto })
  @ApiOkResponse({ type: SwaggerCommonResponse })
  updateBanner(@Body() body: CreateBannerRequest) {
    return this.svc.updateBanner(body);
  }

  @Delete('/banner/:id')
  @ApiOperation({
    summary: 'Fetch all Banners',
    description: 'This endpoint is fetch all system banners',
  })
  @ApiParam({ name: 'id', description: 'bannerId' })
  @ApiQuery({ name: 'clientId', description: 'SBE Client ID' })
  @ApiOkResponse({ type: SwaggerCommonResponse })
  deleteBanner(@Param('id') id: string, @Query('clientId') clientId: string) {
    const payload: FindOneRequest = {
    id: parseInt(id, 10),
    clientId: parseInt(clientId, 10)
  };
    return this.svc.deleteBanner(payload);
  }


  //PAGES

  @Post('/create-page')
  @ApiOperation({
    summary: 'Save Banner',
    description: 'This endpoint is used to create banner',
  })
  @ApiBody({ type: CreatePageDto })
  @ApiOkResponse({ type: SwaggerCommonResponse })
  createPage(@Body() body: CreatePageRequest) {
    return this.svc.createPage(body);
  }

  @Get('/pages')
  @ApiOperation({
    summary: 'Fetch all Banners',
    description: 'This endpoint is fetch all system banners',
  })
  @ApiQuery({ name: 'clientId', description: 'SBE Client ID' })
  @ApiOkResponse({ type: SwaggerCommonResponse })
  findAllPages(@Query() payload: ClientIdRequest) {
    return this.svc.findAllPages(payload);
  }

  @Get('/page/:id')
  @ApiOperation({
    summary: 'Fetch all Banners',
    description: 'This endpoint is fetch all system banners',
  })
  @ApiParam({ name: 'id', description: 'bannerId' })
  @ApiQuery({ name: 'clientId', description: 'SBE Client ID' })
  @ApiOkResponse({ type: SwaggerCommonResponse })
  findOnePage(@Param('id') id: string, @Query('clientId') clientId: string) {
    const payload: FindOneRequest = {
    id: parseInt(id, 10),
    clientId: parseInt(clientId, 10)
  };
    return this.svc.findOnePage(payload);
  }

  @Put('/page')
  @ApiOperation({
    summary: 'Update banner',
    description: 'This endpoint is fetch all system banners',
  })
  @ApiBody({ type: CreatePageDto })
  @ApiOkResponse({ type: SwaggerCommonResponse })
  updatePage(@Body() body: CreatePageRequest) {
    return this.svc.updatePage(body);
  }

  @Delete('/page/:id')
  @ApiOperation({
    summary: 'Fetch all Banners',
    description: 'This endpoint is fetch all system banners',
  })
  @ApiParam({ name: 'id', description: 'bannerId' })
  @ApiQuery({ name: 'clientId', description: 'SBE Client ID' })
  @ApiOkResponse({ type: SwaggerCommonResponse })
  deletePage(@Param('id') id: string, @Query('clientId') clientId: string) {
    const payload: FindOneRequest = {
    id: parseInt(id, 10),
    clientId: parseInt(clientId, 10)
  };
    return this.svc.deletePage(payload);
  }


   //SITE-MENU

  @Post('/create-menu')
  @ApiOperation({
    summary: 'Save Banner',
    description: 'This endpoint is used to create banner',
  })
  @ApiBody({ type: CreateMenuDto })
  @ApiOkResponse({ type: SwaggerCommonResponse })
  createMenu(@Body() body: CreateMenuRequest) {
    return this.svc.createMenu(body);
  }

  @Get('/menus')
  @ApiOperation({
    summary: 'Fetch all Banners',
    description: 'This endpoint is fetch all system banners',
  })
  @ApiQuery({ name: 'clientId', description: 'SBE Client ID' })
  @ApiOkResponse({ type: SwaggerCommonResponse })
  findAllMenu(@Query() payload: ClientIdRequest) {
    return this.svc.findAllMenu(payload);
  }

  @Get('/menu/:id')
  @ApiOperation({
    summary: 'Fetch all Banners',
    description: 'This endpoint is fetch all system banners',
  })
  @ApiParam({ name: 'id', description: 'bannerId' })
  @ApiQuery({ name: 'clientId', description: 'SBE Client ID' })
  @ApiOkResponse({ type: SwaggerCommonResponse })
  findOneMenu(@Param('id') id: string, @Query('clientId') clientId: string) {
    const payload: FindOneRequest = {
    id: parseInt(id, 10),
    clientId: parseInt(clientId, 10)
  };
    return this.svc.findOneMenu(payload);
  }

  @Put('/menu')
  @ApiOperation({
    summary: 'Update banner',
    description: 'This endpoint is fetch all system banners',
  })
  @ApiBody({ type: CreateMenuDto })
  @ApiOkResponse({ type: SwaggerCommonResponse })
  updateMenu(@Body() body: CreateMenuRequest) {
    return this.svc.updateMenu(body);
  }

  @Delete('/menu/:id')
  @ApiOperation({
    summary: 'Fetch all Banners',
    description: 'This endpoint is fetch all system banners',
  })
  @ApiParam({ name: 'id', description: 'bannerId' })
  @ApiQuery({ name: 'clientId', description: 'SBE Client ID' })
  @ApiOkResponse({ type: SwaggerCommonResponse })
  deleteMenu(@Param('id') id: string, @Query('clientId') clientId: string) {
    const payload: FindOneRequest = {
    id: parseInt(id, 10),
    clientId: parseInt(clientId, 10)
  };
    return this.svc.deleteMenu(payload);
  }

  
}
