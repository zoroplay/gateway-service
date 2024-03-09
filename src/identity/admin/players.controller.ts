import { Body, Controller, Get, Inject, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { IDENTITY_SERVICE_NAME, IdentityServiceClient, OnlinePlayersRequest, RegistrationReportRequest, SearchPlayerRequest, UpdatePlayerDataRequest, protobufPackage } from '../identity.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { SwaggerAdminCommonResponse, SwaggerOnlinePlayersRequest, SwaggerOnlinePlayersResponse, SwaggerRegistrationReportRequest, SwaggerSaveClientRequest, SwaggerSearchPlayerRequest, SwaggerUpdatePlayerRequest } from '../dto/admin.dto';
import { SwaggerCommonResponse } from '../dto';
import { SwaggerListTransactionResponse } from 'src/wallet/dto';
import { WalletService } from 'src/wallet/wallet.service';

@ApiTags('BackOffice APIs')
@Controller('admin/players')
export class PlayersController {
    private svc: IdentityServiceClient;

    
    constructor(
        @Inject(protobufPackage)
        private readonly client: ClientGrpc,
        
        private readonly walletService: WalletService
    ){}

    public onModuleInit(): void {
        this.svc = this.client.getService<IdentityServiceClient>(IDENTITY_SERVICE_NAME);
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
    @ApiParam({ name: 'id', 'description': 'Player ID', example: 3, })
    @ApiQuery({name: 'clientId', description: 'SBE Client ID'})
    @ApiOkResponse({ type: SwaggerOnlinePlayersResponse })
    getPlayerData(
        @Param() param,
        @Query() req,
    ) {
        const payload = {
            userId: param.id,
            clientId: req.clientId
        }
        return this.svc.getPlayerData(payload);
    }

    @Put('/:id/update-details')
    @ApiOperation({
        summary: 'Update Player Details',
        description: 'This endpoint is used to update players details',
    })
    @ApiParam({ name: 'id', 'description': 'Player ID', example: 3, })
    @ApiBody({ type:  SwaggerUpdatePlayerRequest })
    @ApiOkResponse({ type: SwaggerAdminCommonResponse })
    updatePlayerData(
        @Param() param,
        @Body() body: UpdatePlayerDataRequest,
    ) {
        
        body.userId = param.id;

        return this.svc.updatePlayerData(body);
    }

    @Get(':id/transactions')
    @ApiOperation({
        summary: 'List User Transactions',
        description: 'This endpoint fetches user transactions',
    })
    @ApiParam({ name: 'id', 'description': 'Player ID', example: 3, })
    @ApiQuery({name: 'clientId', description: 'SBE Client ID'})
    @ApiOkResponse({ type: SwaggerListTransactionResponse })
    listTransactions(
        @Query() query: any,
        @Param() param: any,
    ) {
        const payload = {
            userId: param.id,
            clientId: query.clientId,
            startDate: '',
            endDate: '' 
        }
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
}
