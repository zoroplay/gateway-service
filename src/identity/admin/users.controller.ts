import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ClientRequest, IDENTITY_SERVICE_NAME, IdentityServiceClient, protobufPackage } from '../identity.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { SwaggerSaveClientRequest } from '../dto/admin.dto';
import { SwaggerCommonResponse } from '../dto';

@ApiTags('BackOffice APIs')
@Controller('admin')
export class UsersController {
    private svc: IdentityServiceClient;

    @Inject(protobufPackage)
    private readonly client: ClientGrpc;

    public onModuleInit(): void {
        this.svc = this.client.getService<IdentityServiceClient>(IDENTITY_SERVICE_NAME);
    }


    @Post('/clients')
    @ApiOperation({
        summary: 'Save SBE Client info',
        description: 'This endpoint is used to save or update SBE client info',
    })
    @ApiBody({ type: SwaggerSaveClientRequest })
    @ApiOkResponse({ type: SwaggerCommonResponse })
    saveClient(@Body() body: ClientRequest) {
        return this.svc.createClient(body);
    }

    @Get('clients')
    @ApiOperation({
        summary: 'Fetch SBE Clients',
        description: 'This endpoint is used to get lists  of all SBE clients',
    })
    @ApiOkResponse({ type: SwaggerCommonResponse })
    fetchClients() {
        // return this.svc.getClients({});
    }

    
}
