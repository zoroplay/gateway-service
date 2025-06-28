import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
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
  SwaggerUserDetailsRequest,
} from '../../identity/dto';
import { IAuthorizedRequest } from 'src/interfaces/authorized-request.interface';

import {
  SwaggerAssignUserCommissionProfile,
  SwaggerCommissionProfileResponse,
  SwaggerCreateCommissionProfile,
  SwaggerUpdateCommissionProfile,
} from '../dto';
import { RetailService } from '../retail.service';
import { AuthService } from 'src/identity/auth/auth.service';
import {
  AssignUserCommissionProfile,
  CommissionProfile,
  CreateUserRequest,
  UpdateUserRequest,
  GetAgentUsersRequest,
  GetNetworkSalesRequest,
} from 'src/interfaces/identity.pb';
import {
  BetHistoryRequest,
  GetCommissionsRequest,
  GetVirtualBetsRequest,
} from 'src/interfaces/betting.pb';
import { BettingService } from 'src/betting/betting.service';
import {
  SwaggerBetHistoryRequest,
  SwaggerPayoutCommission,
} from 'src/betting/dto';
import {
  GetShopUserWalletSummaryRequest,
  ShopUsersSummaryRequest,
  SummaryRequest,
} from 'src/interfaces/wallet.pb';
import { WalletService } from 'src/wallet/wallet.service';

@ApiTags('BackOffice APIs')
@Controller('admin/retail')
export class RetailAdminController {
  constructor(
    private readonly retailService: RetailService,
    private readonly authService: AuthService,
    private readonly bettingService: BettingService,
    private readonly walletService: WalletService,
  ) {}

  @Post(':clientId/create-user')
  @ApiOperation({
    summary: 'Create User',
    description: 'This endpoint is used to create retail user',
  })
  @ApiParam({ name: 'clientId', description: 'SBE Client ID' })
  @ApiBody({ type: SwaggerUserDetailsRequest })
  @ApiOkResponse({ type: SwaggerCommonResponse })
  saveRole(
    @Body() body: CreateUserRequest,
    @Param('clientId') clientId: number,
  ) {
    body.clientId = clientId;
    return this.authService.createUser(body);
  }

  @Patch(':clientId/update-user')
  @ApiOperation({
    summary: 'Update User',
    description: 'This endpoint is used to update retail user info',
  })
  @ApiParam({ name: 'clientId', description: 'SBE Client ID' })
  @ApiBody({ type: SwaggerUserDetailsRequest })
  @ApiOkResponse({ type: SwaggerCommonResponse })
  updateRetailUser(
    @Body() body: UpdateUserRequest,
    @Param('clientId') clientId: number,
  ) {
    body.clientId = clientId;
    return this.authService.updateRetailUser(body);
  }

  @Post(':clientId/agents')
  @ApiOperation({
    summary: 'List Agent',
    description: 'This endpoint is used to fetch all top users',
  })
  @ApiParam({ name: 'clientId', description: 'SBE Client ID' })
  @ApiBody({ type: SwaggerUserDetailsRequest })
  @ApiOkResponse({ type: SwaggerCommonResponse })
  listAgents(
    @Body() body: GetAgentUsersRequest,
    @Param('clientId') clientId: number,
    @Req() req: IAuthorizedRequest,
  ) {
    body.clientId = clientId;
    return this.retailService.getAgents(body);
  }

  @Get(':clientId/agent-users')
  @ApiOperation({
    summary: 'List Agent Users',
    description: 'This users for an agent',
  })
  @ApiParam({ name: 'clientId', description: 'SBE Client ID' })
  @ApiQuery({ name: 'agentId', description: 'Agent ID' })
  @ApiOkResponse({ type: SwaggerCommonResponse })
  listAgentUsers(
    @Body() body: GetAgentUsersRequest,
    @Param('clientId') clientId: number,
    @Query('agentId') agentId: number,
    @Req() req: IAuthorizedRequest,
  ) {
    body.clientId = clientId;
    body.userId = agentId || req.user.id;
    console.log(body);
    const result = this.retailService.getAgentUsers(body);

    console.log(result);
    return result;
  }

  @Get(':clientId/commission-profile')
  @ApiOperation({
    summary: 'Get all Commission Profile',
    description:
      'These are Profiles with parameters used in calculating commissions when bet is placed',
  })
  @ApiParam({ name: 'clientId', description: 'SBE Client ID' })
  @ApiOkResponse({ type: [SwaggerCommissionProfileResponse] })
  getCommissionProfiles(@Param('clientId') clientId: number) {
    const data = { clientId };
    return this.retailService.getCommissionProfiles(data);
  }

  @Get(':clientId/commission-profile/:id')
  @ApiOperation({
    summary: 'Get a Commission Profile',
    description: 'Get a single commission profile',
  })
  @ApiParam({ name: 'clientId', description: 'SBE Client ID' })
  @ApiParam({ name: 'id', description: 'Commission Profile ID' })
  @ApiOkResponse({ type: [SwaggerCommissionProfileResponse] })
  getCommissionProfile(
    @Param('clientId') clientId: number,
    @Param('id') id: number,
  ) {
    const data = { itemId: id };
    return this.retailService.getCommissionProfile(data);
  }

  @Post(':clientId/commission-profile')
  @ApiOperation({
    summary: 'Create a Commission Profile',
    description:
      'These are Profiles with parameters used in calculating commissions when bet is placed',
  })
  @ApiParam({ name: 'clientId', description: 'SBE Client ID' })
  @ApiBody({ type: SwaggerCreateCommissionProfile })
  @ApiOkResponse({ type: SwaggerCommissionProfileResponse })
  createCommissionProfile(
    @Body() data: CommissionProfile,
    @Param('clientId') clientId: number,
  ) {
    data.clientId = clientId;
    return this.retailService.createCommissionProfile(data);
  }

  @Patch(':clientId/commission-profile')
  @ApiOperation({
    summary: 'Update a Commission Profile',
    description:
      'These are Profiles with parameters used in calculating commissions when bet is placed',
  })
  @ApiParam({ name: 'clientId', description: 'SBE Client ID' })
  @ApiBody({ type: SwaggerUpdateCommissionProfile })
  @ApiOkResponse({ type: SwaggerCommissionProfileResponse })
  updateCommissionProfile(
    @Body() data: CommissionProfile,
    @Param('clientId') clientId: number,
  ) {
    data.clientId = clientId;
    return this.retailService.updateCommissionProfile(data);
  }

  @Post(':clientId/commission-profile/assign-user')
  @ApiOperation({
    summary: 'Assign User a Commission Profile',
    description: 'These are Profiles links a Profile with a user',
  })
  @ApiParam({ name: 'clientId', description: 'SBE Client ID' })
  @ApiBody({ type: SwaggerAssignUserCommissionProfile })
  @ApiOkResponse({ type: SwaggerCommissionProfileResponse })
  assignUserCommissionProfile(
    @Body() data: AssignUserCommissionProfile,
    @Param('clientId') clientId: number,
  ) {
    return this.retailService.assignUserCommissionProfile(data);
  }

  @Post(':clientId/commission-profile/remove-profile')
  @ApiOperation({
    summary: 'Remove a User Commission Profile',
    description: 'These are Profiles removes linked Profile with a user',
  })
  @ApiParam({ name: 'clientId', description: 'SBE Client ID' })
  @ApiBody({ type: SwaggerAssignUserCommissionProfile })
  @ApiOkResponse({ type: SwaggerCommissionProfileResponse })
  removeUserCommissionProfile(
    @Body() data: AssignUserCommissionProfile,
    @Param('clientId') clientId: number,
  ) {
    return this.retailService.removeUserCommissionProfile(data);
  }

  @Get(':clientId/commission-profile/users/:id')
  @ApiOperation({
    summary: 'Get Commission Profiles',
    description: 'This endpoint returns all assigned profiles for a user',
  })
  @ApiParam({ name: 'clientId', description: 'SBE Client ID' })
  @ApiParam({ name: 'id', description: 'Agent ID' })
  @ApiOkResponse({ type: SwaggerCommissionProfileResponse })
  getUserCommissionProfiles(
    @Param('clientId') clientId: number,
    @Param('id') id: number,
  ) {
    return this.retailService.getUserCommissionProfiles({ itemId: id });
  }

  @Delete(':clientId/commission-profile/:id')
  @ApiOperation({
    summary: 'Get a Commission Profile',
    description: 'Get a single commission profile',
  })
  @ApiParam({ name: 'clientId', description: 'SBE Client ID' })
  @ApiParam({ name: 'id', description: 'Commission Profile ID' })
  @ApiOkResponse({ type: [SwaggerCommissionProfileResponse] })
  deleteCommissionProfile(
    @Param('clientId') clientId: number,
    @Param('id') id: number,
  ) {
    const data = { itemId: id };
    return this.retailService.deleteCommission(data);
  }

  @Get(':clientId/agent/:id')
  @ApiOperation({
    summary: 'Get Agent Profile',
    description: 'This endpoint returns details for an agent',
  })
  @ApiParam({ name: 'clientId', description: 'SBE Client ID' })
  @ApiParam({ name: 'id', description: 'Agent ID' })
  @ApiOkResponse({ type: SwaggerCommissionProfileResponse })
  getAgentProfile(
    @Param('clientId') clientId: number,
    @Param('id') id: number,
  ) {
    return this.authService.getUserDetails({ clientId, userId: id });
  }

  @Post(':clientId/agent/:id/bet-list')
  @ApiOperation({
    summary: 'Get Agent Profile',
    description: 'This endpoint returns betlist for an agent',
  })
  @ApiParam({ name: 'clientId', description: 'SBE Client ID' })
  @ApiParam({ name: 'id', description: 'Agent ID' })
  @ApiQuery({ name: 'page', description: 'Current Page' })
  @ApiQuery({ name: 'limit', description: 'No of Records' })
  @ApiOkResponse({ type: SwaggerCommissionProfileResponse })
  getAgentBets(
    @Param('clientId') clientId: number,
    @Param('id') id: number,
    @Query() query,
    @Body() data: BetHistoryRequest,
  ) {
    data.userId = id;
    data.clientId = clientId;
    data.page = query.page || 1;
    data.perPage = query.limit || 100;

    return this.bettingService.getAgentBets(data);
  }

  @Post(':clientId/agent/:id/virtual-bets')
  @ApiOperation({
    summary: 'Get Agent Profile',
    description: 'This endpoint returns virtual bets for an agent',
  })
  @ApiParam({ name: 'clientId', description: 'SBE Client ID' })
  @ApiParam({ name: 'id', description: 'Agent ID' })
  @ApiQuery({ name: 'page', description: 'Current Page' })
  @ApiQuery({ name: 'limit', description: 'No of Records' })
  @ApiOkResponse({ type: SwaggerCommissionProfileResponse })
  getAgentVBets(
    @Param('clientId') clientId: number,
    @Param('id') id: number,
    @Query() query,
    @Body() data: GetVirtualBetsRequest,
  ) {
    data.userId = id;
    data.clientId = clientId;
    data.page = query.page || 1;
    data.perPage = query.limit || 100;

    return this.bettingService.getAgentVBets(data);
  }

  @Post(':clientId/get-commissions')
  @ApiOperation({
    summary: 'Get Agent Profile',
    description: 'This endpoint returns virtual bets for an agent',
  })
  @ApiParam({ name: 'clientId', description: 'SBE Client ID' })
  @ApiQuery({ name: 'page', description: 'Current Page' })
  @ApiQuery({ name: 'limit', description: 'No of Records' })
  @ApiOkResponse({ type: SwaggerCommissionProfileResponse })
  getCommissions(
    @Param('clientId') clientId: number,
    @Query() query,
    @Body() data: GetCommissionsRequest,
  ) {
    data.clientId = clientId;
    // data.page = query.page || 1;
    // data.perPage = query.limit || 100
    return this.bettingService.getCommissions(data);
  }

  @Post(':clientId/get-network-sales')
  @ApiOperation({
    summary: 'Get Network Sales',
    description: 'This endpoint returns virtual bets for an agent',
  })
  @ApiParam({ name: 'clientId', description: 'SBE Client ID' })
  @ApiQuery({ name: 'page', description: 'Current Page' })
  @ApiQuery({ name: 'limit', description: 'No of Records' })
  @ApiOkResponse({ type: SwaggerCommissionProfileResponse })
  getNetworkSales(
    @Param('clientId') clientId: number,
    @Query() query,
    @Body() data: GetNetworkSalesRequest,
  ) {
    data.clientId = clientId;
    // data.page = query.page || 1;
    // data.perPage = query.limit || 100
    return this.retailService.getSalesReport(data);
  }

  @Post(':clientId/commissions/pay')
  @ApiOperation({
    summary: 'Payout Commissions',
    description: 'This endpoints submits commissions to be paid out',
  })
  @ApiBody({ type: SwaggerBetHistoryRequest })
  @ApiOkResponse({ type: SwaggerPayoutCommission })
  PayoutCommission(@Param('clientId') clientId: number, @Body() data) {
    try {
      // data.userId = req.user.id;
      data.clientId = clientId;
      return this.retailService.payoutCommission(data);
    } catch (error) {
      console.error(error);
    }
  }

  @Get('transaction-summary/:clientId')
  @ApiOperation({ summary: 'Get client transaction summary' })
  @ApiQuery({ name: 'range', required: false, type: String })
  @ApiQuery({ name: 'from', required: false, type: String })
  @ApiQuery({ name: 'to', required: false, type: String })
  async getTransactionSummary(
    @Param('clientId') clientId: number,
    @Query('range') range?: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    const payload: SummaryRequest = {
      clientId,
      range: range || '',
      from: from || '',
      to: to || '',
    };

    return this.walletService.getSummeryMethod(payload);
  }

  @Get('agent-users/:clientId')
  @ApiOperation({ summary: 'Get wallet summary for agent users' })
  @ApiQuery({ name: 'dateRange', required: false, type: String })
  async getAllClientsSummary(
    @Param('clientId') clientId: number,
    @Query('dateRange') dateRange?: string,
  ) {
    const payload: GetShopUserWalletSummaryRequest = { clientId, dateRange };

    return this.walletService.AgentUsersSummaryRequestMethod(payload);
  }

  @Get('net-cash/:clientId')
  @ApiOperation({ summary: 'Get net cash flow summary for shop users' })
  @ApiParam({ name: 'clientId', type: Number, description: 'Client ID' })
  @ApiQuery({ name: 'range', required: false, type: String })
  @ApiQuery({ name: 'from', required: false, type: String })
  @ApiQuery({
    name: 'to',
    required: false,
    type: String,
    description: 'Range (day, week, month, yesterday, etc.)',
  })
  async getNetCash(
    @Param('clientId') clientId: number,
    @Query('range') range?: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    const payload: ShopUsersSummaryRequest = {
      clientId,
      rangeZ: range || '',
      from: from || '',
      to: to || '',
    };
    return this.walletService.getNetCashFlow(payload);
  }

  // @Get('/bonus-groups')
  // @ApiOperation({
  //   summary: 'Get all retail bonus group',
  //   description:
  //     'Retail Bonus Group are parameters used to calculate power bonus commissions',
  // })
  // @ApiOkResponse({ type: [SwaggerBonusGroupResponse] })
  // getBonusGroups(@Body() data: Empty) {
  //   return this.retailService.getBonusGroups(data);
  // }

  // @Post('/bonus-groups')
  // @ApiOperation({
  //   summary: 'Create retail bonus groups',
  //   description:
  //     'Set Retail Bonus Group parameters used to calculate power bonus commissions',
  // })
  // @ApiBody({ type: SwaggerBonusGroups })
  // @ApiOkResponse({ type: [SwaggerBonusGroupResponse] })
  // createBonusGroups(@Body() data: BonusGroups) {
  //   return this.retailService.createBonusGroups(data);
  // }

  // @Get('/power-bonus')
  // @ApiOperation({
  //   summary: 'Get Agents Power Bonus List',
  //   description: 'These are monthly power bonus records per agent',
  // })
  // @ApiBody({ type: SwaggerPowerRequest })
  // @ApiOkResponse({ type: SwaggerPowerBonusResponse })
  // getPowerBonus(@Body() data: PowerRequest) {
  //   return this.retailService.getPowerBonus(data);
  // }

  // @Post('/power-bonus/pay')
  // @ApiOperation({
  //   summary: 'Assign User a Commission Profile',
  //   description: 'These are Profiles links a Profile with a user',
  // })
  // @ApiBody({ type: SwaggerPayPowerRequest })
  // @ApiOkResponse({ type: SwaggerPowerResponse })
  // payOutPowerBonus(@Body() data: PayPowerRequest) {
  //   return this.retailService.payOutPowerBonus(data);
  // }

  // @Get('/normal-bonus')
  // @ApiOperation({
  //   summary: 'Get Agents Power Bonus List',
  //   description: 'These are monthly power bonus records per agent',
  // })
  // @ApiBody({ type: SwaggerNormalRequest })
  // @ApiOkResponse({ type: SwaggerNormalDataResponse })
  // getNormalBonus(@Body() data: GetNormalRequest) {
  //   return this.retailService.getNormalBonus(data);
  // }

  // @Post('/normal-bonus/pay')
  // @ApiOperation({
  //   summary: 'Assign User a Commission Profile',
  //   description: 'These are Profiles links a Profile with a user',
  // })
  // @ApiBody({ type: SwaggerNormalRequest })
  // @ApiOkResponse({ type: SwaggerNormalDataResponse })
  // payOutNormalBonus(@Body() data: PayNormalRequest) {
  //   return this.retailService.payOutNormalBonus(data);
  // }
}
