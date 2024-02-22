import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ClientRequest, IDENTITY_SERVICE_NAME, IdentityServiceClient, SearchPlayerRequest, protobufPackage } from '../identity.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { SwaggerSaveClientRequest, SwaggerSearchPlayerRequest } from '../dto/admin.dto';
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
    saveClient(@Body() body: SearchPlayerRequest) {
        return this.svc.searchPlayer(body);
    }
}
