import { Body, Controller, Get, Inject, Param, Post, Put, Query, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { GetRiskSettingRequest, GetSettingsRequest, IDENTITY_SERVICE_NAME, IdentityServiceClient, SettingsRequest, UserRiskSettingsRequest, protobufPackage } from 'src/interfaces/identity.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { ApiBody, ApiConsumes, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { SaveSettingsDto, SwaggerCommonResponse, SwaggerSettingsRequest } from '../dto';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { AppService } from 'src/app.service';
import { FirebaseService } from 'src/common/services/firebaseUpload';

@ApiTags('BackOffice APIs')
@Controller('admin/settings')
export class SettingsController {
    private svc: IdentityServiceClient;

    constructor(
        @Inject(protobufPackage)
        private readonly client: ClientGrpc,

        private readonly appService: AppService,
        private readonly firebaseService: FirebaseService,
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
        // console.log(files);
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

   

//     @Post(':clientId/save')
// @ApiConsumes('multipart/form-data')
// @ApiOperation({
//     summary: 'Save system settings',
//     description: 'This endpoint is used to save or update settings for a client',
// })
// @ApiBody({ type: SaveSettingsDto })
// @ApiOkResponse({ type: [SwaggerCommonResponse] })
// @UseInterceptors(FileFieldsInterceptor([
//     { name: 'logo', maxCount: 1 },
//     { name: 'print_logo', maxCount: 1 },
// ]))
// async saveSettings(
//     @Param('clientId') clientId: number, 
//     @Body() payload: SaveSettingsDto, 
//     @UploadedFiles() files: { logo?: Express.Multer.File[], print_logo?: Express.Multer.File[] }
// ) {
//     try {
//         console.log("Entered save settings");
        
//         // Handle file paths if files are uploaded
//         let logoPath = null;
//         let printLogoPath = null;
        
//         if (files.logo && files.logo.length > 0) {
//             logoPath = files.logo[0].path; // Or however you store file references
//             console.log('Logo file received:', files.logo[0].originalname);
//         }
        
//         if (files.print_logo && files.print_logo.length > 0) {
//             printLogoPath = files.print_logo[0].path;
//             console.log('Print logo file received:', files.print_logo[0].originalname);
//         }
        
//         // Create a clean payload object
//         const settingsData = {
//             ...payload,
//             logoPath,
//             printLogoPath
//         };
        
//         const payloadObject: SettingsRequest = {
//             clientId,
//             inputs: JSON.stringify(settingsData)
//         };
      
//         console.log('Processing payload with files');
//         const setting = await this.svc.saveSettings(payloadObject);
//         console.log('Settings saved successfully');
        
//         return setting;
//     } catch (error) {
//         console.error('Error saving settings:', error);
//     }
// }



    @Post(':clientId/risk-management/save')
    @ApiOperation({
        summary: 'Save Risk Management Settings',
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
        summary: 'Get Risk Management Settings',
        description: 'This endpoint is used to retreive risk management for a client',
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
