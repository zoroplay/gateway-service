import { Body, Controller, Get, Inject, Param, Post, Put, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { GetRiskSettingRequest, GetSettingsRequest, IDENTITY_SERVICE_NAME, IdentityServiceClient, SettingsRequest, UserRiskSettingsRequest, protobufPackage } from 'src/interfaces/identity.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { ApiBody, ApiConsumes, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { SwaggerCommonResponse, SwaggerSettingsRequest } from '../dto';
import { FileFieldsInterceptor, FilesInterceptor } from '@nestjs/platform-express';
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

//     @Post(':clientId/save')
//     @ApiOperation({
//         summary: 'Save system settings',
//         description: 'This endpoint is used to save or update settings for a client',
//     })
//     @ApiParam({ name: 'client', type: 'number', description: 'SBE Client ID' })
//     @ApiBody({ type: SwaggerSettingsRequest })
//     @ApiOkResponse({ type: SwaggerCommonResponse })
//     @UseInterceptors(FileFieldsInterceptor([
//         { name: 'logo', maxCount: 1 },
//         { name: 'print_logo', maxCount: 1 },
//     ]))
//     saveSettings(
//         @Param('clientId') clientId: number,
//         @Body() body,
//         @UploadedFiles() files: { logo?: Express.Multer.File, printLogo?: Express.Multer.File }
//     ) {
//         // console.log(files);
//         // if (files.logo)
//         //     body.logo = `${PATH_DOWNLOADED_FILE}/${files.logo.filename}`

//         // if (files.printLogo)
//         //     body.print_logo = `${PATH_DOWNLOADED_FILE}/${files.printLogo.filename}`
//         const payload: SettingsRequest = {
//             clientId,
//             inputs: JSON.stringify(body)
//         }
//         return this.svc.saveSettings(payload);
//     }

@Post(':clientId/save')
@ApiConsumes('multipart/form-data')
@ApiBody({
  schema: {
    type: 'object',
    properties: {
      clientId: { type: 'number' },
      logo: { type: 'string', format: 'binary' }, // File upload
      printLogo: { type: 'string', format: 'binary' }, // File upload
      // Add other metadata fields here
      metadata: { type: 'object', additionalProperties: true }, // Example dynamic metadata
    },
  },
})
@UseInterceptors(FilesInterceptor('files'))
async saveSettings(
  @Param('clientId') clientId: number,
  @Body() body,
  @UploadedFiles() files: { logo?: Express.Multer.File[]; printLogo?: Express.Multer.File[] },
) {
  try {
    // Firebase file upload utility
    const firebaseFileUpload = async (file: Express.Multer.File): Promise<string> => {
      const folderName = 'settings'; // Folder for storing files
      const fileName = `${Date.now()}_${file.originalname}`;
      const fileBase64 = file.buffer.toString('base64'); // Convert file to Base64
      return this.firebaseService.uploadFileToFirebase(folderName, fileName, fileBase64); // Upload to Firebase
    };

    // Handle logo upload if provided
    if (files.logo && files.logo[0]) {
      body.logo = await firebaseFileUpload(files.logo[0]);
    }

    // Handle printLogo upload if provided
    if (files.printLogo && files.printLogo[0]) {
      body.print_logo = await firebaseFileUpload(files.printLogo[0]);
    }

    // Prepare payload for saving settings
    const payload: SettingsRequest = {
      clientId,
      inputs: JSON.stringify(body), // Include updated metadata and file URLs
    };

    console.log("payload", payload);

    return await this.svc.saveSettings(payload);
  } catch (error) {
    return {
      success: false,
      message: `Failed to save settings: ${error.message}`,
    };
  }
}



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

    @Get(':clientId/betting-parameters/:userId')
    @ApiOperation({
        summary: 'Get User Betting Parameters',
        description: 'This endpoint is used retrieve betting parameters for a user',
    })
    @ApiParam({ name: 'client', type: 'number', description: 'SBE Client ID' })
    @ApiParam({ name: 'user', type: 'number', description: 'User ID' })
    @ApiOkResponse({ type: SwaggerCommonResponse })
    getUserSettings(
        @Param('clientId') clientId: number,
        @Param('userId') userId: number,
    ) {
        
        const payload: GetRiskSettingRequest = {
            clientId,
            userId,
        }

        return this.svc.getUserRiskSettings(payload);
    }

    @Put(':userId/betting-parameters/save')
    @ApiOperation({
        summary: 'Save User Betting Parameters',
        description: 'This endpoint is used to save or update betting parameters for a user',
    })
    @ApiParam({ name: 'user', type: 'number', description: 'User ID' })
    @ApiBody({ type: SwaggerSettingsRequest })
    @ApiOkResponse({ type: SwaggerCommonResponse })
    saveUserBettingParameters(
        @Param('userId') userId: number,
        @Body() body,
    ) {
        
        const payload: UserRiskSettingsRequest = {
            userId,
            period: body.period,
            inputs: JSON.stringify(body)
        }
        return this.svc.saveUserRiskSettings(payload);
    }
}
