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
  GetUserBonusRequest, AwardBonusRequest, UserBet, BonusStatusRequest, CreateBonusRequest,
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
    return this.service.CreateCashbackBonus(data);

  }
  CreateBonus(data: CreateBonusRequest) {

    console.log("CreateBonus ");
    return this.service.CreateBonus(data);
``
  }

  UpdateCashbackBonus(data: CreateCashbackBonusRequest) {

    console.log("UpdateCashbackBonus ");
    return this.service.UpdateCashbackBonus(data);

  }

  CreateFirstDepositBonus(data: CreateFirstDepositBonusRequest) {

    console.log("CreateFirstDepositBonus ");
    return this.service.CreateFirstDepositBonus(data);

  }

  UpdateFirstDepositBonus(data: CreateFirstDepositBonusRequest) {

    console.log("UpdateFirstDepositBonus ");
    return this.service.UpdateFirstDepositBonus(data);

  }

  CreateFreebetBonus(data: CreateFreebetBonusRequest) {

    console.log("CreateFreebetBonus ");
    return this.service.CreateFreebetBonus(data);

  }

  UpdateFreebetBonus(data: CreateFreebetBonusRequest) {

    console.log("UpdateFreebetBonus ");
    return this.service.UpdateFreebetBonus(data);

  }

  CreateReferralBonus(data: CreateReferralBonusRequest) {

    console.log("CreateReferralBonus ");
    return this.service.CreateReferralBonus(data);

  }

  UpdateReferralBonus(data: CreateReferralBonusRequest) {

    console.log("UpdateReferralBonus ");
    return this.service.UpdateReferralBonus(data);

  }

  CreateShareBetBonus(data: CreateShareBetBonusRequest) {

    console.log("CreateShareBetBonus ");
    return this.service.CreateShareBetBonus(data);

  }

  UpdateShareBetBonus(data: CreateShareBetBonusRequest) {

    console.log("UpdateShareBetBonus ");
    return this.service.UpdateShareBetBonus(data);

  }

  GetBonus(data: GetBonusRequest) {

    console.log("GetBonus ");
    return this.service.GetBonus(data);

  }

  GetUserBonus(data: GetUserBonusRequest) {

    console.log("GetUserBonus ");
    return this.service.GetUserBonus(data);

  }

  AwardBonus(data: AwardBonusRequest) {

    console.log("AwardBonus ");
    return this.service.AwardBonus(data);

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
    return this.service.UpdateBonusStatus(data);

  }
}