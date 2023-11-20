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
import { SMSService } from './sms.service';
import { SwaggerSendSMSRequest, SwaggerSendSMSResponse } from './dto';
import { SendSMSRequest } from './sms.pb';

@ApiTags('Sms Service APIs')
@Controller('sms-service')
export class SMSController {
  constructor(private readonly smsService: SMSService) {}

  @Post('/cashback/create')
  @ApiOperation({
    summary: 'Create Cashback Bonus ',
    description:
      'This endpoint creates a new cashback bonus for a particular client, it enables you to create cashback bonus with different settings/terms',
  })
  @ApiBody({ type: SwaggerSendSMSRequest })
  @ApiOkResponse({ type: SwaggerSendSMSResponse })
  SendSMS(@Body() data: SendSMSRequest) {
    try {
      return this.smsService.SendSMS(data);
    } catch (error) {
      console.error(error);
    }
  }
}
