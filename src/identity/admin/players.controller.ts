import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ClientRequest, IDENTITY_SERVICE_NAME, IdentityServiceClient, OnlinePlayersRequest, RegistrationReportRequest, SearchPlayerRequest, protobufPackage } from '../identity.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { SwaggerOnlinePlayersRequest, SwaggerOnlinePlayersResponse, SwaggerRegistrationReportRequest, SwaggerSaveClientRequest, SwaggerSearchPlayerRequest } from '../dto/admin.dto';
import { SwaggerCommonResponse } from '../dto';

@ApiTags('BackOffice APIs')
@Controller('admin/players')
export class PlayersController {
    private svc: IdentityServiceClient;

    @Inject(protobufPackage)
    private readonly client: ClientGrpc;

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
        return this.svc.searchPlayer(body);
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
