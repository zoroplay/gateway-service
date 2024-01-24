import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { RetailService } from './retail.service';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {
  AssignUserCommissionProfile,
  BonusGroups,
  Empty,
  PayPowerRequest,
  PowerRequest,
  CommissionProfile,
  GetNormalRequest,
  PayNormalRequest,
  Meta,
} from './retail.pb';
import {
  SwaggerAssignUserCommissionProfile,
  SwaggerBonusGroupResponse,
  SwaggerBonusGroups,
  SwaggerCommissionProfileResponse,
  SwaggerCreateCommissionProfile,
  SwaggerMeta,
  SwaggerNormalDataResponse,
  SwaggerNormalRequest,
  SwaggerPayPowerRequest,
  SwaggerPowerBonusResponse,
  SwaggerPowerRequest,
  SwaggerPowerResponse,
  SwaggerUpdateCommissionProfile,
} from './dto';

@ApiTags('Retail APIs')
@Controller('retails')
export class RetailController {
  constructor(private readonly retailService: RetailService) {}

  @Get('/bonus-groups')
  @ApiOperation({
    summary: 'Get all retail bonus group',
    description:
      'Retail Bonus Group are parameters used to calculate power bonus commissions',
  })
  @ApiOkResponse({ type: [SwaggerBonusGroupResponse] })
  getBonusGroups(@Body() data: Empty) {
    console.log('here');
    try {
      const resp = this.retailService.getBonusGroups(data);
      return resp;
    } catch (error) {
      console.error(error);
    }
  }

  @Post('/bonus-groups')
  @ApiOperation({
    summary: 'Create retail bonus groups',
    description:
      'Set Retail Bonus Group parameters used to calculate power bonus commissions',
  })
  @ApiBody({ type: SwaggerBonusGroups })
  @ApiOkResponse({ type: [SwaggerBonusGroupResponse] })
  createBonusGroups(@Body() data: BonusGroups) {
    return this.retailService.createBonusGroups(data);
  }

  @Get('/commission-profile')
  @ApiOperation({
    summary: 'Get all Commission Profile',
    description:
      'These are Profiles with parameters used in calculating commissions when bet is placed',
  })
  @ApiBody({ type: SwaggerMeta })
  @ApiOkResponse({ type: [SwaggerCommissionProfileResponse] })
  getCommissionProfiles(@Body() data: Meta) {
    return this.retailService.getCommissionProfiles(data);
  }

  @Post('/commission-profile')
  @ApiOperation({
    summary: 'Create a Commission Profile',
    description:
      'These are Profiles with parameters used in calculating commissions when bet is placed',
  })
  @ApiBody({ type: SwaggerCreateCommissionProfile })
  @ApiOkResponse({ type: SwaggerCommissionProfileResponse })
  createCommissionProfile(@Body() data: CommissionProfile) {
    return this.retailService.createCommissionProfile(data);
  }

  @Patch('/commission-profile')
  @ApiOperation({
    summary: 'Update a Commission Profile',
    description:
      'These are Profiles with parameters used in calculating commissions when bet is placed',
  })
  @ApiBody({ type: SwaggerUpdateCommissionProfile })
  @ApiOkResponse({ type: SwaggerCommissionProfileResponse })
  updateCommissionProfile(@Body() data: CommissionProfile) {
    return this.retailService.updateCommissionProfile(data);
  }

  @Post('/commission-profile/assign-user')
  @ApiOperation({
    summary: 'Assign User a Commission Profile',
    description: 'These are Profiles links a Profile with a user',
  })
  @ApiBody({ type: SwaggerAssignUserCommissionProfile })
  @ApiOkResponse({ type: SwaggerCommissionProfileResponse })
  assignUserCommissionProfile(@Body() data: AssignUserCommissionProfile) {
    return this.retailService.assignUserCommissionProfile(data);
  }

  @Get('/power-bonus')
  @ApiOperation({
    summary: 'Get Agents Power Bonus List',
    description: 'These are monthly power bonus records per agent',
  })
  @ApiBody({ type: SwaggerPowerRequest })
  @ApiOkResponse({ type: SwaggerPowerBonusResponse })
  getPowerBonus(@Body() data: PowerRequest) {
    return this.retailService.getPowerBonus(data);
  }

  @Post('/power-bonus/pay')
  @ApiOperation({
    summary: 'Assign User a Commission Profile',
    description: 'These are Profiles links a Profile with a user',
  })
  @ApiBody({ type: SwaggerPayPowerRequest })
  @ApiOkResponse({ type: SwaggerPowerResponse })
  payOutPowerBonus(@Body() data: PayPowerRequest) {
    return this.retailService.payOutPowerBonus(data);
  }

  @Get('/normal-bonus')
  @ApiOperation({
    summary: 'Get Agents Power Bonus List',
    description: 'These are monthly power bonus records per agent',
  })
  @ApiBody({ type: SwaggerNormalRequest })
  @ApiOkResponse({ type: SwaggerNormalDataResponse })
  getNormalBonus(@Body() data: GetNormalRequest) {
    return this.retailService.getNormalBonus(data);
  }

  @Post('/normal-bonus/pay')
  @ApiOperation({
    summary: 'Assign User a Commission Profile',
    description: 'These are Profiles links a Profile with a user',
  })
  @ApiBody({ type: SwaggerNormalRequest })
  @ApiOkResponse({ type: SwaggerNormalDataResponse })
  payOutNormalBonus(@Body() data: PayNormalRequest) {
    return this.retailService.payOutNormalBonus(data);
  }
}
