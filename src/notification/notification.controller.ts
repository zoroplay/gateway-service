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
import {
  SaveSettingsRequest,
  SendOtpRequest,
  SendSmsRequest,
  VerifyOtpRequest,
} from './noti.pb';
import {
  SwaggerSendOtpRequest,
  SwaggerSendSMSRequest,
  SwaggerSendSMSResponse,
  SwaggerVerifyOtpRequest,
} from './dto';

@ApiTags('Notification Service APIs')
@Controller('notification')
export class NotificationController {
  constructor(private readonly notiService: NotificationService) {}

  @Post('/send-otp')
  @ApiOperation({
    summary: 'Send OTP ',
    description: 'This endpoint sends otp through the our SMS provders',
  })
  @ApiBody({ type: SwaggerSendOtpRequest })
  @ApiOkResponse({ type: SwaggerSendSMSResponse })
  SendOTP(@Body() data: SendOtpRequest) {
    try {
      return this.notiService.sendOTP(data);
    } catch (error) {
      console.error(error);
    }
  }

  @Post('/verify-otp')
  @ApiOperation({
    summary: 'Verify OTP ',
    description: 'This endpoint verifies otp through the our SMS provders',
  })
  @ApiBody({ type: SwaggerVerifyOtpRequest })
  @ApiOkResponse({ type: SwaggerSendSMSResponse })
  VerifyOTP(@Body() data: VerifyOtpRequest) {
    try {
      console.log(data);
      return this.notiService.verifyOTP(data);
    } catch (error) {
      console.error(error);
    }
  }

  @Post('/send-sms')
  @ApiOperation({
    summary: 'Send SMS ',
    description: 'This endpoint sends sms through the our SMS providers',
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
