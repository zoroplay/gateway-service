import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { NotificationService } from './notification.service';
import { SaveSettingsRequest, SendSmsRequest } from './noti.pb';
import {
  SwaggerSaveSettingsRequest,
  SwaggerSaveSettingsResponse,
  SwaggerSendSMSRequest,
  SwaggerSendSMSResponse,
} from './dto';

@ApiTags('Notification Service APIs')
@Controller('notification')
export class NotificationController {
  constructor(private readonly notiService: NotificationService) {}

  @Post('/send-sms')
  @ApiOperation({
    summary: 'Send SMS ',
    description: 'This endpoint sends sms through the Mtech API',
  })
  @ApiBody({ type: SwaggerSendSMSRequest })
  @ApiOkResponse({ type: SwaggerSendSMSResponse })
  SendSMS(@Body() data: SendSmsRequest) {
    try {
      return this.notiService.sendSMS(data);
    } catch (error) {
      console.error(error);
    }
  }

  @Put('/save-settings')
  @ApiOperation({
    summary: 'Save Settings',
    description: 'This endpoint saves/edits settings for SMS providers',
  })
  @ApiBody({ type: SwaggerSaveSettingsRequest })
  @ApiOkResponse({ type: SwaggerSaveSettingsResponse })
  SaveSettings(@Body() data: SaveSettingsRequest) {
    try {
      return this.notiService.saveSettings(data);
    } catch (error) {
      console.error(error);
    }
  }
}
