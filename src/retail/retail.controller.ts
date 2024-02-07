import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { RetailService } from './retail.service';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {
  AssignUserCommissionProfile,
  BonusGroups,
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
  SwaggerNormalDataResponse,
  SwaggerNormalRequest,
  SwaggerPayNormalRequest,
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
  getBonusGroups() {
    console.log('get bonus groups');
    try {
      return this.retailService.getBonusGroups();
    } catch (error) {
      console.error(error.message);
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
    try {
      return this.retailService.createBonusGroups(data);
    } catch (error) {
      console.error(error);
    }
  }

  @Get('/commission-profile')
  @ApiOperation({
    summary: 'Get all Commission Profile',
    description:
      'These are Profiles with parameters used in calculating commissions when bet is placed',
  })
  @ApiQuery({ name: 'itemsPerPage', type: 'number' })
  @ApiQuery({ name: 'currentPage', type: 'number' })
  @ApiOkResponse({ type: [SwaggerCommissionProfileResponse] })
  getCommissionProfiles(@Query() query: Meta) {
    try {
      console.log(query);
      return this.retailService.getCommissionProfiles({
        total: undefined,
        totalPages: undefined,
        currentPage: Number(query.currentPage) || 1,
        itemsPerPage: Number(query.itemsPerPage) || 10,
      });
    } catch (error) {
      console.error(error);
    }
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
    try {
      return this.retailService.createCommissionProfile(data);
    } catch (error) {
      console.error(error);
    }
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
    try {
      return this.retailService.updateCommissionProfile(data);
    } catch (error) {
      console.error(error);
    }
  }

  @Post('/commission-profile/assign-user')
  @ApiOperation({
    summary: 'Assign User a Commission Profile',
    description: 'These are Profiles links a Profile with a user',
  })
  @ApiBody({ type: SwaggerAssignUserCommissionProfile })
  @ApiOkResponse({ type: SwaggerCommissionProfileResponse })
  assignUserCommissionProfile(@Body() data: AssignUserCommissionProfile) {
    try {
      return this.retailService.assignUserCommissionProfile(data);
    } catch (error) {
      console.error(error);
    }
  }

  @Get('/power-bonus')
  @ApiOperation({
    summary: 'Get Agents Power Bonus List',
    description: 'These are monthly power bonus records per agent',
  })
  @ApiBody({ type: SwaggerPowerRequest })
  @ApiOkResponse({ type: SwaggerPowerBonusResponse })
  getPowerBonus(@Body() data: PowerRequest) {
    try {
      return this.retailService.getPowerBonus(data);
    } catch (error) {
      console.error(error);
    }
  }

  @Post('/power-bonus/pay')
  @ApiOperation({
    summary: 'Assign User a Commission Profile',
    description: 'These are Profiles links a Profile with a user',
  })
  @ApiBody({ type: SwaggerPayPowerRequest })
  @ApiOkResponse({ type: SwaggerPowerResponse })
  payOutPowerBonus(@Body() data: PayPowerRequest) {
    try {
      return this.retailService.payOutPowerBonus(data);
    } catch (error) {
      console.error(error);
    }
  }

  @Get('/normal-bonus')
  @ApiOperation({
    summary: 'Get Agents Normal Bonus List',
    description: 'These are monthly normal bonus records per agent',
  })
  @ApiBody({ type: SwaggerNormalRequest })
  @ApiOkResponse({ type: SwaggerNormalDataResponse })
  getNormalBonus(@Body() data: GetNormalRequest) {
    try {
      return this.retailService.getNormalBonus(data);
    } catch (error) {
      console.error(error);
    }
  }

  @Post('/normal-bonus/pay')
  @ApiOperation({
    summary: 'Payout User Normal Commission Bonus',
    description:
      'These endpoints initiates the commission bonus to be paid out to the cashier',
  })
  @ApiBody({ type: SwaggerPayNormalRequest })
  @ApiOkResponse({ type: SwaggerNormalDataResponse })
  payOutNormalBonus(@Body() data: PayNormalRequest) {
    try {
      return this.retailService.payOutNormalBonus(data);
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  }

  @Post('/test')
  @ApiOperation({
    summary: 'Test Endpoint',
    description: 'These endpoints calculates the commission',
  })
  @ApiBody({ type: SwaggerPayNormalRequest })
  @ApiOkResponse({ type: SwaggerNormalDataResponse })
  test(@Body() data: PayNormalRequest) {
    try {
      return this.retailService.test(data);
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  }
}
