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

@ApiTags('Bonus APIs')
@Controller('bonus-service')
export class SMSController {
  constructor(private readonly bonusService: SMSService) {}
}
