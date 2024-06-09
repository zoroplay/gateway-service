import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ClientGrpc } from '@nestjs/microservices';
import { NOTIFICATION_SERVICE_NAME, NotificationServiceClient, SaveSettingsRequest, protobufPackage } from 'src/interfaces/noti.pb';
import { GettSmsSettingsRequest, GettSmsSettingsResponse, SaveSMSSettingsRequest, SaveSMSSettingsResponse } from '../dto';

@ApiTags('BackOffice APIs')
@Controller('admin')
export class AdminController {
    private svc: NotificationServiceClient;

    @Inject(protobufPackage)
    private readonly client: ClientGrpc;

    public onModuleInit(): void {
        this.svc = this.client.getService<NotificationServiceClient>(NOTIFICATION_SERVICE_NAME);
    }

    @Post('/sms/settings')
    @ApiOperation({
        summary: 'Save SMS Settings',
        description: 'This endpoint is used to save or update sms settings',
    })
    @ApiBody({ type: SaveSMSSettingsRequest })
    @ApiOkResponse({ type: SaveSMSSettingsResponse })
    saveRole(@Body() body: SaveSettingsRequest) {
        return this.svc.saveSettings(body);
    }

    @Get('sms/settings')
    @ApiOperation({
        summary: 'Fetch SMS Settings',
        description: 'This endpoint is used to fetch sms settings for a particular SBE client',
    })
    @ApiOkResponse({ type: GettSmsSettingsResponse })
    fetchRoles(@Query() query: GettSmsSettingsRequest) {
        return this.svc.getSettings({clientId: query.client_id});
    }

}
