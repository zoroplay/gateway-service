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
import { SwaggerSendSMSRequest, SwaggerSendSMSResponse } from './dto';
import { SendSmsRequest } from './noti.pb';

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
}
