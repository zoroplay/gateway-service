import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {
  IDENTITY_SERVICE_NAME,
  IdentityServiceClient,
  OnlinePlayersRequest,
  RegistrationReportRequest,
  SearchPlayerRequest,
  UpdatePlayerDataRequest,
  protobufPackage,
} from 'src/interfaces/identity.pb';
import { ClientGrpc } from '@nestjs/microservices';
import {
  SwaggerAdminCommonResponse,
  SwaggerOnlinePlayersRequest,
  SwaggerOnlinePlayersResponse,
  SwaggerRegistrationReportRequest,
  SwaggerSearchPlayerRequest,
  SwaggerUpdatePlayerRequest,
} from '../dto/admin.dto';
import { SwaggerCommonResponse } from '../dto';
import { SwaggerListTransactionResponse } from 'src/wallet/dto';
import { WalletService } from 'src/wallet/wallet.service';
import { firstValueFrom } from 'rxjs';

@ApiTags('BackOffice APIs')
@Controller('admin/players')
export class PlayersController {
  private svc: IdentityServiceClient;

  constructor(
    @Inject(protobufPackage)
    private readonly client: ClientGrpc,

    private readonly walletService: WalletService,
  ) {}

  public onModuleInit(): void {
    this.svc = this.client.getService<IdentityServiceClient>(
      IDENTITY_SERVICE_NAME,
    );
  }

  @Post('/search')
  @ApiOperation({
    summary: 'Search for Players',
    description: 'This endpoint is used to save or update SBE client info',
  })
  @ApiBody({ type: SwaggerSearchPlayerRequest })
  @ApiOkResponse({ type: SwaggerCommonResponse })
  searchPlayer(@Body() body: SearchPlayerRequest) {
    return this.svc.searchPlayers(body);
  }

  @Post('/list')
  @ApiOperation({
    summary: 'List Online Players',
    description: 'This endpoint is used to fetch list of online players report',
  })
  @ApiBody({ type: SwaggerOnlinePlayersRequest })
  @ApiOkResponse({ type: SwaggerOnlinePlayersResponse })
  listPlayers(@Body() body: OnlinePlayersRequest) {
    return this.svc.onlinePlayersReport(body);
  }

  @Get('/:id/details')
  @ApiOperation({
    summary: 'Get Player Details',
    description: 'This endpoint is used to get a players gaming details',
  })
  @ApiParam({ name: 'id', description: 'Player ID', example: 3 })
  @ApiQuery({ name: 'clientId', description: 'SBE Client ID' })
  @ApiOkResponse({ type: SwaggerOnlinePlayersResponse })
  getPlayerData(@Param() param, @Query() req) {
    const payload = {
      userId: param.id,
      clientId: req.clientId,
    };
    return this.svc.getPlayerData(payload);
  }

  @Put('/:id/update-details')
  @ApiOperation({
    summary: 'Update Player Details',
    description: 'This endpoint is used to update players details',
  })
  @ApiParam({ name: 'id', description: 'Player ID', example: 3 })
  @ApiBody({ type: SwaggerUpdatePlayerRequest })
  @ApiOkResponse({ type: SwaggerAdminCommonResponse })
  updatePlayerData(@Param() param, @Body() body: UpdatePlayerDataRequest) {
    body.userId = param.id;

    return this.svc.updatePlayerData(body);
  }

  @Get(':id/transactions')
  @ApiOperation({
    summary: 'List User Transactions',
    description: 'This endpoint fetches user transactions',
  })
  @ApiParam({ name: 'id', description: 'Player ID', example: 3 })
  @ApiQuery({ name: 'clientId', description: 'SBE Client ID' })
  @ApiQuery({ name: 'page', description: 'Transaction Pagination' })
  @ApiQuery({ name: 'page', description: 'Transaction Pagination' })
  @ApiQuery({ name: 'startDate', description: 'Start Date' })
  @ApiQuery({ name: 'endDate', description: 'End Date' })
  @ApiOkResponse({ type: SwaggerListTransactionResponse })
  listTransactions(
    @Query() query: any, 
    @Param() param: any
  ) {
    const payload = {
      userId: param.id,
      clientId: query.clientId,
      startDate: query.startDate || '',
      endDate: query.endDate || '',
      page: query.page || 1
    };
    
    return this.walletService.getUserTransactions(payload);
  }

  @Post('/registration')
  @ApiOperation({
    summary: 'List Online Players',
    description: 'This endpoint is used to fetch list of online players report',
  })
  @ApiBody({ type: SwaggerRegistrationReportRequest })
  @ApiOkResponse({ type: SwaggerOnlinePlayersResponse })
  registrationReport(@Body() body: RegistrationReportRequest) {
    return this.svc.registrationReport(body);
  }

  @Get('/filter')
  @ApiOperation({
    summary: 'Get all registered players that are yet to make a deposit',
    description:
      'This endpoint retrieves all the registered players yet to make a deposit',
  })
  @ApiQuery({ name: 'clientId', description: 'SBE Client ID' })
  @ApiQuery({ name: 'startDate', description: 'Earliest Registration Date' })
  @ApiQuery({ name: 'endDate', description: 'Most Recent Registration Date' })
  @ApiQuery({ name: 'filterType', description: 'Type of filter' })
  @ApiQuery({ name: 'minAmount', description: 'Minimum deposit amount' })
  @ApiQuery({ name: 'maxAmount', description: 'Maximum deposit amount' })
  @ApiQuery({ name: 'depositCount', description: 'Number of Deposit made' })
  @ApiQuery({ name: 'page', description: 'Current page number' })
  async playerSegmentation(@Query() segmentFilteDto) {
    segmentFilteDto.page = segmentFilteDto.page || 1;
    return this.svc.fetchPlayerFilters(segmentFilteDto);
  }

  @Get('/get-select-dropdown')
  @ApiOperation({
    summary: 'Find users for select field',
    description:
      'This endpoint retrieves players id and username for select dropdown field',
  })
  @ApiQuery({ name: 'username', description: 'Search by username' })
  @ApiQuery({ name: 'clientId', description: 'SBE Client ID' })
  async findPlayersByUsername(
    @Query('username') username: string,
    @Query('clientId') clientId: number 
  ) {
    const res =  await firstValueFrom(this.svc.getUserIdandName({username, clientId}));
    return res.data;
  }

  @Get('/update-status/:id')
  @ApiOperation({
    summary: 'Update Player Status',
    description:
      'This endpoint is used to update a user status',
  })
  @ApiQuery({ name: 'status', description: 'Status name' })
  @ApiParam({ name: 'id', description: 'Player ID' })
  async updatePlayerStatus(
    @Query('status') status: number,
    @Param('id') id: number
  ) {
    return await firstValueFrom(this.svc.updatePlayerStatus({userId: id, status}));
  }
}
