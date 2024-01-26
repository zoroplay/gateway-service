import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { IDENTITY_SERVICE_NAME, IdentityServiceClient, protobufPackage } from '../identity.pb';
import { ClientGrpc } from '@nestjs/microservices';

@ApiTags('BackOffice')
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
    @ApiBody({ type: SaveSMSSettingsRequest })
    @ApiOkResponse({ type: SaveSMSSettingsResponse })
    saveClient(@Body() body: SaveSettingsRequest) {
        return this.svc.createClient(body);
    }


    @Get('clients')
    @ApiOperation({
        summary: 'Fetch SMS Settings',
        description: 'This endpoint is used to fetch sms settings for a particular SBE client',
    })
    @ApiOkResponse({ type: GettSmsSettingsResponse })
    fetchClients() {
        return this.svc.getClients({});
    }

    
}
