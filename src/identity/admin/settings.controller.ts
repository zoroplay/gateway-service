import { Body, Controller, Get, Inject, Param, Post, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { GetSettingsRequest, IDENTITY_SERVICE_NAME, IdentityServiceClient, SettingsRequest, protobufPackage } from '../identity.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { SwaggerCommonResponse, SwaggerSettingsRequest } from '../dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { PATH_DOWNLOADED_FILE, multerOptions } from 'src/uploads';
import { AppService } from 'src/app.service';

@ApiTags('BackOffice APIs')
@Controller('admin/settings')
export class SettingsController {
    private svc: IdentityServiceClient;

    constructor(
        @Inject(protobufPackage)
        private readonly client: ClientGrpc,

        private readonly appService: AppService,
    ) {}

    public onModuleInit(): void {
        this.svc = this.client.getService<IdentityServiceClient>(
            IDENTITY_SERVICE_NAME,
        );
    }

    @Post(':clientId/save')
    @ApiOperation({
        summary: 'Save system settings',
        description: 'This endpoint is used to save or update settings for a client',
    })
    @ApiParam({ name: 'client', type: 'number', description: 'SBE Client ID' })
    @ApiBody({ type: SwaggerSettingsRequest })
    @ApiOkResponse({ type: SwaggerCommonResponse })
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'logo', maxCount: 1 },
        { name: 'print_logo', maxCount: 1 },
    ]))
    saveSettings(
        @Param('clientId') clientId: number,
        @Body() body,
        @UploadedFiles() files: { logo?: Express.Multer.File, printLogo?: Express.Multer.File }
    ) {
        console.log(files);
        // if (files.logo)
        //     body.logo = `${PATH_DOWNLOADED_FILE}/${files.logo.filename}`

        // if (files.printLogo)
        //     body.print_logo = `${PATH_DOWNLOADED_FILE}/${files.printLogo.filename}`
        
        const payload: SettingsRequest = {
            clientId,
            inputs: JSON.stringify(body)
        }
        return this.svc.saveSettings(payload);
    }

    @Post(':clientId/risk-management/save')
    @ApiOperation({
        summary: 'Save Rist Management Settings',
        description: 'This endpoint is used to save or update risk management for a client',
    })
    @ApiParam({ name: 'client', type: 'number', description: 'SBE Client ID' })
    @ApiBody({ type: SwaggerSettingsRequest })
    @ApiOkResponse({ type: SwaggerCommonResponse })
    saveRiskSettings(
        @Param('clientId') clientId: number,
        @Body() body,
    ) {
        
        const payload: SettingsRequest = {
            clientId,
            category: body.category,
            inputs: JSON.stringify(body)
        }
        return this.svc.saveRiskSettings(payload);
    }

    @Get(':clientId/risk-management')
    @ApiOperation({
        summary: 'Save Rist Management Settings',
        description: 'This endpoint is used to save or update risk management for a client',
    })
    @ApiParam({ name: 'client', type: 'number', description: 'SBE Client ID' })
    @ApiQuery({ name: 'category', type: 'string', description: 'Settings category (general, online or retail)' })
    @ApiOkResponse({ type: SwaggerCommonResponse })
    getSettings(
        @Param('clientId') clientId: number,
        @Query('category') category: string,
    ) {
        
        const payload: GetSettingsRequest = {
            clientId,
            category,
        }
        return this.svc.getSettings(payload);
    }
}
