import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import {
  protobufPackage,
  BonusServiceClient,
  BONUS_SERVICE_NAME,
  CreateCashbackBonusRequest,
  CreateFirstDepositBonusRequest,
  CreateFreebetBonusRequest,
  CreateReferralBonusRequest,
  CreateShareBetBonusRequest,
  GetBonusRequest,
  GetUserBonusRequest, AwardBonusRequest, UserBet, BonusStatusRequest, CreateBonusRequest, CreateNewBonusRequest,
} from './bonus.pb';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class BonusService implements OnModuleInit {
  private service: BonusServiceClient;

  constructor(@Inject(protobufPackage) private client: ClientGrpc) {}

  onModuleInit() {
    this.service =
      this.client.getService<BonusServiceClient>(BONUS_SERVICE_NAME);
  }

  CreateCashbackBonus(data: CreateCashbackBonusRequest) {

    console.log("CreateCashbackBonus ");
    return this.service.createCashbackBonus(data);

  }

  CreateBonus(data: CreateNewBonusRequest) {

    console.log("CreateBonus ");
    return this.service.createBonus(data);

  }

  UpdateCashbackBonus(data: CreateCashbackBonusRequest) {

    console.log("UpdateCashbackBonus ");
    return this.service.updateCashbackBonus(data);

  }

  CreateFirstDepositBonus(data: CreateFirstDepositBonusRequest) {

    console.log("CreateFirstDepositBonus ");
    return this.service.createFirstDepositBonus(data);

  }

  UpdateFirstDepositBonus(data: CreateFirstDepositBonusRequest) {

    console.log("UpdateFirstDepositBonus ");
    return this.service.updateFirstDepositBonus(data);

  }

  CreateFreebetBonus(data: CreateFreebetBonusRequest) {

    console.log("CreateFreebetBonus ");
    return this.service.createFreebetBonus(data);

  }

  UpdateFreebetBonus(data: CreateFreebetBonusRequest) {

    console.log("UpdateFreebetBonus ");
    return this.service.updateFreebetBonus(data);

  }

  CreateReferralBonus(data: CreateReferralBonusRequest) {

    console.log("CreateReferralBonus ");
    return this.service.createReferralBonus(data);

  }

  UpdateReferralBonus(data: CreateReferralBonusRequest) {

    console.log("UpdateReferralBonus ");
    return this.service.updateReferralBonus(data);

  }

  CreateShareBetBonus(data: CreateShareBetBonusRequest) {

    console.log("CreateShareBetBonus ");
    return this.service.createShareBetBonus(data);

  }

  UpdateShareBetBonus(data: CreateShareBetBonusRequest) {

    console.log("UpdateShareBetBonus ");
    return this.service.updateShareBetBonus(data);

  }

  GetBonus(data: GetBonusRequest) {

    console.log("GetBonus ");
    return this.service.getBonus(data);

  }

  GetUserBonus(data: GetUserBonusRequest) {

    console.log("GetUserBonus ");
    return this.service.getUserBonus(data);

  }

  AwardBonus(data: AwardBonusRequest) {

    console.log("AwardBonus ");
    return this.service.awardBonus(data);

  }

  HasBonusBet(data: UserBet) {

    console.log("HasBonusBet ");
    return this.service.HasBonusBet(data);

  }

  DebitBonusBet(data: UserBet) {

    console.log("DebitBonusBet ");
    return this.service.DebitBonusBet(data);

  }

  UpdateBonusStatus(data: BonusStatusRequest) {

    console.log("UpdateBonusStatus ");
    return this.service.updateBonusStatus(data);

  }
}