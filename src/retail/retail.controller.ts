import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { RetailService } from './retail.service';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/identity/auth/auth.guard';


@ApiTags('Retail APIs')
@UseGuards(AuthGuard)
@Controller('retails')
export class RetailController {
  constructor(private readonly retailService: RetailService) {}

  
}
