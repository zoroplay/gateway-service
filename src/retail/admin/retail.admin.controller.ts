import { Body, Controller, Get, Inject, Param, Patch, Post, Query, Req } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { SwaggerCommonResponse, SwaggerUserDetailsRequest } from '../../identity/dto';
import { IAuthorizedRequest } from 'src/interfaces/authorized-request.interface';

  import {
    SwaggerAssignUserCommissionProfile,
    SwaggerBonusGroupResponse,
    SwaggerBonusGroups,
    SwaggerCommissionProfileResponse,
    SwaggerCreateCommissionProfile,
    SwaggerNormalDataResponse,
    SwaggerNormalRequest,
    SwaggerNormalResponse,
    SwaggerPayPowerRequest,
    SwaggerPowerBonusResponse,
    SwaggerPowerRequest,
    SwaggerPowerResponse,
    SwaggerUpdateCommissionProfile,
  } from '../dto';
import { RetailService } from '../retail.service';
import { AuthService } from 'src/identity/auth/auth.service';
import { CreateUserRequest, GetAgentUsersRequest } from 'src/interfaces/identity.pb';

@ApiTags('BackOffice APIs')
@Controller('admin/retail')
export class RetailAdminController {

    constructor(
        private readonly retailService: RetailService,
        private readonly authService: AuthService
    ) {}
    
    @Post(':clientId/create-user')
    @ApiOperation({
        summary: 'Create User',
        description: 'This endpoint is used to create retail user',
    })
    @ApiParam({name: 'clientId', description: 'SBE Client ID'})
    @ApiBody({ type: SwaggerUserDetailsRequest })
    @ApiOkResponse({ type: SwaggerCommonResponse })
    saveRole(
        @Body() body: CreateUserRequest,
        @Param('clientId') clientId: number,
    ) {
        body.clientId = clientId;
        return this.authService.createUser(body);
    }

    @Post(':clientId/agents')
    @ApiOperation({
        summary: 'List Agent',
        description: 'This endpoint is used to fetch all top users',
    })
    @ApiParam({name: 'clientId', description: 'SBE Client ID'})
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
    @ApiParam({name: 'clientId', description: 'SBE Client ID'})
    @ApiQuery({name: 'agentId', description: 'Agent ID'})
    @ApiOkResponse({ type: SwaggerCommonResponse })
    listAgentUsers(
        @Body() body: GetAgentUsersRequest,
        @Param('clientId') clientId: number,
        @Query('agentId') agentId: number,
        @Req() req: IAuthorizedRequest,
    ) {
        body.clientId = clientId;
        body.userId = agentId || req.user.id;

        // console.log(body);
        return this.retailService.getAgentUsers(body);
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

  // @Get('/commission-profile')
  // @ApiOperation({
  //   summary: 'Get all Commission Profile',
  //   description:
  //     'These are Profiles with parameters used in calculating commissions when bet is placed',
  // })
  // @ApiOkResponse({ type: [SwaggerCommissionProfileResponse] })
  // getCommissionProfiles(@Body() data: Empty) {
  //   return this.retailService.getCommissionProfiles(data);
  // }

  // @Post('/commission-profile')
  // @ApiOperation({
  //   summary: 'Create a Commission Profile',
  //   description:
  //     'These are Profiles with parameters used in calculating commissions when bet is placed',
  // })
  // @ApiBody({ type: SwaggerCreateCommissionProfile })
  // @ApiOkResponse({ type: SwaggerCommissionProfileResponse })
  // createCommissionProfile(@Body() data: CommissionProfile) {
  //   return this.retailService.createCommissionProfile(data);
  // }

  // @Patch('/commission-profile')
  // @ApiOperation({
  //   summary: 'Update a Commission Profile',
  //   description:
  //     'These are Profiles with parameters used in calculating commissions when bet is placed',
  // })
  // @ApiBody({ type: SwaggerUpdateCommissionProfile })
  // @ApiOkResponse({ type: SwaggerCommissionProfileResponse })
  // updateCommissionProfile(@Body() data: CommissionProfile) {
  //   return this.retailService.updateCommissionProfile(data);
  // }

  // @Post('/commission-profile/assign-user')
  // @ApiOperation({
  //   summary: 'Assign User a Commission Profile',
  //   description: 'These are Profiles links a Profile with a user',
  // })
  // @ApiBody({ type: SwaggerAssignUserCommissionProfile })
  // @ApiOkResponse({ type: SwaggerCommissionProfileResponse })
  // assignUserCommissionProfile(@Body() data: AssignUserCommissionProfile) {
  //   return this.retailService.assignUserCommissionProfile(data);
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
