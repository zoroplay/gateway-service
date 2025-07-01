import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  GetSettingsRequest,
  IDENTITY_SERVICE_NAME,
  IdentityServiceClient,
  SettingsRequest,
  protobufPackage,
} from 'src/interfaces/identity.pb';
import { ClientGrpc } from '@nestjs/microservices';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {
  SwaggerCommonResponse,
  SwaggerSettingsRequest,
} from '../dto';
import {
  FileFieldsInterceptor,
} from '@nestjs/platform-express';
import { AppService } from 'src/app.service';
import { FirebaseService } from 'src/common/services/firebaseUpload';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('BackOffice APIs')
@UseGuards(AuthGuard)
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
    description:
      'This endpoint is used to save or update settings for a client',
  })
  @ApiParam({ name: 'clientId', type: 'number', description: 'SBE Client ID' })
  @ApiBody({ type: SwaggerSettingsRequest })
  @ApiOkResponse({ type: SwaggerCommonResponse })
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'logo', maxCount: 1 },
      { name: 'print_logo', maxCount: 1 },
    ]),
  )
  saveSettings(
    @Param('clientId') clientId: number,
    @Body() body,
    @UploadedFiles()
    files: {
      logo?: Express.Multer.File[];
      print_logo?: Express.Multer.File[];
    },
  ) {
    if (files.logo?.[0]) {
      body.logo = `${files.logo[0]}`;
    }

    if (files.print_logo?.[0]) {
      body.print_logo = `${files.print_logo[0]}`;
    }

    const payload: SettingsRequest = {
      clientId,
      inputs: JSON.stringify(body),
    };

    return this.svc.saveSettings(payload);
  }

  @Post(':clientId/risk-management/save')
  @ApiOperation({
    summary: 'Save Risk Management Settings',
    description:
      'This endpoint is used to save or update risk management for a client',
  })
  @ApiParam({ name: 'client', type: 'number', description: 'SBE Client ID' })
  @ApiBody({ type: SwaggerSettingsRequest })
  @ApiOkResponse({ type: SwaggerCommonResponse })
  saveRiskSettings(@Param('clientId') clientId: number, @Body() body) {
    const payload: SettingsRequest = {
      clientId,
      category: body.category,
      inputs: JSON.stringify(body),
    };
    return this.svc.saveRiskSettings(payload);
  }

  @Get(':clientId/risk-management')
  @ApiOperation({
    summary: 'Get Risk Management Settings',
    description:
      'This endpoint is used to retreive risk management for a client',
  })
  @ApiParam({ name: 'client', type: 'number', description: 'SBE Client ID' })
  @ApiQuery({
    name: 'category',
    type: 'string',
    description: 'Settings category (general, online or retail)',
  })
  @ApiOkResponse({ type: SwaggerCommonResponse })
  getSettings(
    @Param('clientId') clientId: number,
    @Query('category') category: string,
  ) {
    const payload: GetSettingsRequest = {
      clientId,
      category,
    };

    return this.svc.getSettings(payload);
  }
}
