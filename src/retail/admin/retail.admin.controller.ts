import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { SwaggerCommonResponse, SwaggerUserDetailsRequest } from '../../identity/dto';
import { IAuthorizedRequest } from 'src/interfaces/authorized-request.interface';

  import {
    SwaggerAssignUserCommissionProfile,
    SwaggerCommissionProfileResponse,
    SwaggerCreateCommissionProfile,
    SwaggerUpdateCommissionProfile,
  } from '../dto';
import { RetailService } from '../retail.service';
import { AuthService } from 'src/identity/auth/auth.service';
import { AssignUserCommissionProfile, CommissionProfile, CreateUserRequest, GetAgentUsersRequest } from 'src/interfaces/identity.pb';
import { BetHistoryRequest, GetVirtualBetsRequest } from 'src/interfaces/betting.pb';
import { BettingService } from 'src/betting/betting.service';

@ApiTags('BackOffice APIs')
@Controller('admin/retail')
export class RetailAdminController {

    constructor(
        private readonly retailService: RetailService,
        private readonly authService: AuthService,
        private readonly bettingService: BettingService
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


    @Get(':clientId/commission-profile')
    @ApiOperation({
        summary: 'Get all Commission Profile',
        description:
        'These are Profiles with parameters used in calculating commissions when bet is placed',
    })
    @ApiParam({name: 'clientId', description: 'SBE Client ID'})
    @ApiOkResponse({ type: [SwaggerCommissionProfileResponse] })
    getCommissionProfiles(
        @Param('clientId') clientId: number
    ) {
        const data = {clientId}
        return this.retailService.getCommissionProfiles(data);
    }

    @Get(':clientId/commission-profile/:id')
    @ApiOperation({
        summary: 'Get a Commission Profile',
        description: 'Get a single commission profile',
    })
    @ApiParam({name: 'clientId', description: 'SBE Client ID'})
    @ApiParam({name: 'id', description: 'Commission Profile ID'})
    @ApiOkResponse({ type: [SwaggerCommissionProfileResponse] })
    getCommissionProfile(
        @Param('clientId') clientId: number,
        @Param('id') id: number
    ) {
        const data = {itemId: id}
        return this.retailService.getCommissionProfile(data);
    }
    

    @Post(':clientId/commission-profile')
    @ApiOperation({
        summary: 'Create a Commission Profile',
        description:
        'These are Profiles with parameters used in calculating commissions when bet is placed',
    })
    @ApiParam({name: 'clientId', description: 'SBE Client ID'})
    @ApiBody({ type: SwaggerCreateCommissionProfile })
    @ApiOkResponse({ type: SwaggerCommissionProfileResponse })
    createCommissionProfile(
        @Body() data: CommissionProfile,
        @Param('clientId') clientId: number
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
    @ApiParam({name: 'clientId', description: 'SBE Client ID'})
    @ApiBody({ type: SwaggerUpdateCommissionProfile })
    @ApiOkResponse({ type: SwaggerCommissionProfileResponse })
    updateCommissionProfile(
        @Body() data: CommissionProfile,
        @Param('clientId') clientId: number
    ) {
        data.clientId = clientId;
        return this.retailService.updateCommissionProfile(data);
    }

    @Post(':clientId/commission-profile/assign-user')
    @ApiOperation({
        summary: 'Assign User a Commission Profile',
        description: 'These are Profiles links a Profile with a user',
    })
    @ApiParam({name: 'clientId', description: 'SBE Client ID'})
    @ApiBody({ type: SwaggerAssignUserCommissionProfile })
    @ApiOkResponse({ type: SwaggerCommissionProfileResponse })
    assignUserCommissionProfile(
        @Body() data: AssignUserCommissionProfile,
        @Param('clientId') clientId: number
    ) {
        return this.retailService.assignUserCommissionProfile(data);
    }

    @Post(':clientId/commission-profile/remove-profile')
    @ApiOperation({
        summary: 'Remove a User Commission Profile',
        description: 'These are Profiles removes linked Profile with a user',
    })
    @ApiParam({name: 'clientId', description: 'SBE Client ID'})
    @ApiBody({ type: SwaggerAssignUserCommissionProfile })
    @ApiOkResponse({ type: SwaggerCommissionProfileResponse })
    removeUserCommissionProfile(
        @Body() data: AssignUserCommissionProfile,
        @Param('clientId') clientId: number
    ) {
        return this.retailService.removeUserCommissionProfile(data);
    }

    @Get(':clientId/commission-profile/users/:id')
    @ApiOperation({
        summary: 'Get Commission Profiles',
        description: 'This endpoint returns all assigned profiles for a user',
    })
    @ApiParam({name: 'clientId', description: 'SBE Client ID'})
    @ApiParam({name: 'id', description: 'Agent ID'})
    @ApiOkResponse({ type: SwaggerCommissionProfileResponse })
    getUserCommissionProfiles(
        @Param('clientId') clientId: number,
        @Param('id') id: number,
    ) {
        return this.retailService.getUserCommissionProfiles({itemId: id});
    }

    @Delete(':clientId/commission-profile/:id')
    @ApiOperation({
        summary: 'Get a Commission Profile',
        description: 'Get a single commission profile',
    })
    @ApiParam({name: 'clientId', description: 'SBE Client ID'})
    @ApiParam({name: 'id', description: 'Commission Profile ID'})
    @ApiOkResponse({ type: [SwaggerCommissionProfileResponse] })
    deleteCommissionProfile(
        @Param('clientId') clientId: number,
        @Param('id') id: number
    ) {
        const data = {itemId: id}
        return this.retailService.deleteCommission(data);
    }

    @Get(':clientId/agent/:id')
    @ApiOperation({
        summary: 'Get Agent Profile',
        description: 'This endpoint returns details for an agent',
    })
    @ApiParam({name: 'clientId', description: 'SBE Client ID'})
    @ApiParam({name: 'id', description: 'Agent ID'})
    @ApiOkResponse({ type: SwaggerCommissionProfileResponse })
    getAgentProfile(
        @Param('clientId') clientId: number,
        @Param('id') id: number,
    ) {
        return this.authService.getUserDetails({clientId, userId: id});
    }

    @Post(':clientId/agent/:id/bet-list')
    @ApiOperation({
        summary: 'Get Agent Profile',
        description: 'This endpoint returns betlist for an agent',
    })
    @ApiParam({name: 'clientId', description: 'SBE Client ID'})
    @ApiParam({name: 'id', description: 'Agent ID'})
    @ApiQuery({name: 'page', description: 'Current Page'})
    @ApiQuery({name: 'limit', description: 'No of Records'})
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
        data.perPage = query.limit || 100

        return this.bettingService.getAgentBets(data);
    }

    @Post(':clientId/agent/:id/virtual-bets')
    @ApiOperation({
        summary: 'Get Agent Profile',
        description: 'This endpoint returns virtual bets for an agent',
    })
    @ApiParam({name: 'clientId', description: 'SBE Client ID'})
    @ApiParam({name: 'id', description: 'Agent ID'})
    @ApiQuery({name: 'page', description: 'Current Page'})
    @ApiQuery({name: 'limit', description: 'No of Records'})
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
        data.perPage = query.limit || 100

        return this.bettingService.getAgentVBets(data);
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
