import {Body, Controller, Post} from '@nestjs/common';
import {ApiBody, ApiOkResponse, ApiTags} from '@nestjs/swagger';
import {BonusService} from './bonus.service';

import {
  AwardBonusRequest,
  BonusStatusRequest,
  CreateCashbackBonusRequest,
  CreateFirstDepositBonusRequest,
  CreateFreebetBonusRequest,
  CreateReferralBonusRequest,
  CreateShareBetBonusRequest,
  GetBonusRequest,
  GetUserBonusRequest,
  UserBet
} from "./bonus.pb";
import {
  SwaggerAwardBonusRequest,
  SwaggerBonusResponse,
  SwaggerBonusStatusRequest,
  SwaggerCreateBonusResponse,
  SwaggerCreateCashbackBonusRequest,
  SwaggerCreateFirstDepositBonusRequest,
  SwaggerCreateFreebetBonusRequest,
  SwaggerCreateReferralBonusRequest,
  SwaggerCreateShareBetBonusRequest,
  SwaggerGetBonusRequest,
  SwaggerGetUserBonusRequest,
  SwaggerGetUserBonusResponse,
  SwaggerHasBonusBetResponse,
  SwaggerUserBet
} from "./dto";

@ApiTags('Bonus APIs')
@Controller('bonus-service')
export class BonusController {

  constructor(private readonly bonusService: BonusService) {}

  @Post('/cashback/create')
  @ApiBody({ type: SwaggerCreateCashbackBonusRequest })
  @ApiOkResponse({ type: SwaggerCreateBonusResponse })
  CreateCashbackBonus(@Body() data: CreateCashbackBonusRequest) {

    try {

      return this.bonusService.CreateCashbackBonus(data);

    } catch (error) {

      console.error(error);

    }

  }

  @Post('/cashback/update')
  @ApiBody({ type: SwaggerCreateCashbackBonusRequest })
  @ApiOkResponse({ type: SwaggerCreateBonusResponse })
  UpdateCashbackBonus(@Body() data: CreateCashbackBonusRequest) {

    try {

      return this.bonusService.UpdateCashbackBonus(data);

    } catch (error) {

      console.error(error);

    }

  }


  @Post('/first-deposit/create')
  @ApiBody({ type: SwaggerCreateFirstDepositBonusRequest })
  @ApiOkResponse({ type: SwaggerCreateBonusResponse })
  CreateFirstDepositBonus(@Body() data: CreateFirstDepositBonusRequest) {

    try {

      return this.bonusService.CreateFirstDepositBonus(data);

    } catch (error) {

      console.error(error);

    }

  }

  @Post('/first-deposit/update')
  @ApiBody({ type: SwaggerCreateCashbackBonusRequest })
  @ApiOkResponse({ type: SwaggerCreateBonusResponse })
  UpdateFirstDepositBonus(@Body() data: CreateFirstDepositBonusRequest) {

    try {

      return this.bonusService.UpdateFirstDepositBonus(data);

    } catch (error) {

      console.error(error);

    }

  }



  @Post('/freebet/create')
  @ApiBody({ type: SwaggerCreateFreebetBonusRequest })
  @ApiOkResponse({ type: SwaggerCreateBonusResponse })
  CreateFreebetBonus(@Body() data: CreateFreebetBonusRequest) {

    try {

      return this.bonusService.CreateFreebetBonus(data);

    } catch (error) {

      console.error(error);

    }

  }


  @Post('/freebet/update')
  @ApiBody({ type: SwaggerCreateFreebetBonusRequest })
  @ApiOkResponse({ type: SwaggerCreateBonusResponse })
  UpdateFreebetBonus(@Body() data: CreateFreebetBonusRequest) {

    try {

      return this.bonusService.UpdateFreebetBonus(data);

    } catch (error) {

      console.error(error);

    }

  }

  @Post('/referral/create')
  @ApiBody({ type: SwaggerCreateReferralBonusRequest })
  @ApiOkResponse({ type: SwaggerCreateBonusResponse })
  CreateReferralBonus(@Body() data: CreateReferralBonusRequest) {

    try {

      return this.bonusService.CreateReferralBonus(data);

    } catch (error) {

      console.error(error);

    }

  }


  @Post('/referral/update')
  @ApiBody({ type: SwaggerCreateReferralBonusRequest })
  @ApiOkResponse({ type: SwaggerCreateBonusResponse })
  UpdateReferralBonus(@Body() data: CreateReferralBonusRequest) {

    try {

      return this.bonusService.UpdateReferralBonus(data);

    } catch (error) {

      console.error(error);

    }

  }


  @Post('/sharebet/create')
  @ApiBody({ type: SwaggerCreateShareBetBonusRequest })
  @ApiOkResponse({ type: SwaggerCreateBonusResponse })
  CreateShareBetBonus(@Body() data: CreateShareBetBonusRequest) {

    try {

      return this.bonusService.CreateShareBetBonus(data);

    } catch (error) {

      console.error(error);

    }

  }


  @Post('/sharebet/update')
  @ApiBody({ type: SwaggerCreateShareBetBonusRequest })
  @ApiOkResponse({ type: SwaggerCreateBonusResponse })
  UpdateShareBetBonus(@Body() data: CreateShareBetBonusRequest) {

    try {

      return this.bonusService.UpdateShareBetBonus(data);

    } catch (error) {

      console.error(error);

    }

  }


  @Post('/client/bonus/view')
  @ApiBody({ type: SwaggerGetBonusRequest })
  @ApiOkResponse({ type: SwaggerBonusResponse })
  GetBonus(@Body() data: GetBonusRequest) {

    try {

      return this.bonusService.GetBonus(data);

    } catch (error) {

      console.error(error);

    }

  }

  @Post('/user/bonus/view')
  @ApiBody({ type: SwaggerGetUserBonusRequest })
  @ApiOkResponse({ type: SwaggerGetUserBonusResponse })
  GetUserBonus(@Body() data: GetUserBonusRequest) {

    try {

      return this.bonusService.GetUserBonus(data);

    } catch (error) {

      console.error(error);

    }

  }

  @Post('/user/bonus/award')
  @ApiBody({ type: SwaggerAwardBonusRequest })
  @ApiOkResponse({ type: SwaggerGetUserBonusResponse })
  AwardBonus(@Body() data: AwardBonusRequest) {

    try {

      return this.bonusService.AwardBonus(data);

    } catch (error) {

      console.error(error);

    }

  }

  @Post('/user/bonus/check')
  @ApiBody({ type: SwaggerUserBet })
  @ApiOkResponse({ type: SwaggerHasBonusBetResponse })
  HasBonusBet(@Body() data: UserBet) {

    try {

      return this.bonusService.HasBonusBet(data);

    } catch (error) {

      console.error(error);

    }

  }


  @Post('/user/bonus/redeem')
  @ApiBody({ type: SwaggerUserBet })
  @ApiOkResponse({ type: SwaggerHasBonusBetResponse })
  DebitBonusBet(@Body() data: UserBet) {

    try {

      return this.bonusService.DebitBonusBet(data);

    } catch (error) {

      console.error(error);

    }

  }

  @Post('/bonus/status/update')
  @ApiBody({ type: SwaggerBonusStatusRequest })
  @ApiOkResponse({ type: SwaggerCreateBonusResponse })
  UpdateBonusStatus(@Body() data: BonusStatusRequest) {

    try {

      return this.bonusService.UpdateBonusStatus(data);

    } catch (error) {

      console.error(error);

    }

  }
}