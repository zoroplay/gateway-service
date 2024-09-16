import {
  Param,
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { GamingService } from './gaming.service';
import {
  XpressRequest,
  XpressResponse,
} from 'src/interfaces/gaming.pb';
import { SwaggerXpressResponse, XpressBalanceDto, XpressDebitCreditDto, XpressLoginDto, XpressLogoutDto, XpressRollbackDto } from './dto/virtuals';

@ApiTags('Gaming APIs')
@Controller('gaming')
export class VirtualController {
  constructor(private readonly gamingService: GamingService) {}

  @Post('/:clientId/xpress/login')
  @ApiBody({ type: XpressLoginDto })
  @ApiParam({ name: 'clientId', example: 1 })
  @ApiOkResponse({ type: SwaggerXpressResponse })
  login(
    @Body() data: XpressRequest,
    @Param('clientId') clientId
  ) {
    data.clientId = clientId;
    return this.gamingService.xpressLogin(data);
  }

  @Post('/:clientId/xpress/balance')
  @ApiParam({ name: 'clientId', example: 1 })
  @ApiBody({ type: XpressBalanceDto })
  @ApiOkResponse({ type: SwaggerXpressResponse })
  balance(
    @Body() data: XpressRequest,
    @Param() param
  ): Promise<XpressResponse> {
    data.clientId = param.clientId;
    return this.gamingService.xpressBalance(data);
  }

  @Post(':clientId/xpress/debit')
  @ApiParam({ name: 'Client ID', example: 1 })
  @ApiBody({ type: XpressDebitCreditDto })
  @ApiOkResponse({ type: SwaggerXpressResponse })
  debit(
    @Body() data: XpressRequest,
    @Param() param
  ): Promise<XpressResponse> {
    data.clientId = param.clientId;
    return this.gamingService.xpressDebit(data);
  }

  @Post(':clientId/xpress/credit')
  @ApiParam({ name: 'Client ID', example: 1 })
  @ApiBody({ type: XpressDebitCreditDto })
  @ApiOkResponse({ type: SwaggerXpressResponse })
  credit(
    @Body() data: XpressRequest,
    @Param() param
  ) {
    data.clientId = param.clientId;
    return this.gamingService.xpressCredit(data);
  }

  @Post(':clientId/xpress/rollback')
  @ApiParam({ name: 'Client ID', example: 1 })
  @ApiBody({ type: XpressRollbackDto })
  @ApiOkResponse({ type: SwaggerXpressResponse })
  rollback(
    @Body() data: XpressRequest,
    @Param() param
  ) {
    data.clientId = param.clientId;
    return this.gamingService.xpressRollback(data);
  }

  @Post(':clientId/xpress/logout')
  @ApiParam({ name: 'Client ID', example: 1 })
  @ApiBody({ type: XpressLogoutDto })
  @ApiOkResponse({ type: SwaggerXpressResponse })
  logout(
    @Body() data: XpressRequest,
    @Param() param
  ) {
    data.clientId = param.clientId;
    return this.gamingService.xpressLogout(data);
  }
}
