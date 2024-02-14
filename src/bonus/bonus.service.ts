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
  GetUserBonusRequest,
  AwardBonusRequest,
  UserBet,
  BonusStatusRequest,
  CreateBonusRequest,
  CreateCampaignBonusDto,
  UpdateCampaignBonusDto,
  DeleteCampaignBonusDto,
  RedeemCampaignBonusDto,
  GetBonusByClientID,
  GetCampaignRequest,
} from './bonus.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { UserBetWithBonus } from './bet.interface';

@Injectable()
export class BonusService implements OnModuleInit {
  private service: BonusServiceClient;

  constructor(@Inject(protobufPackage) private client: ClientGrpc) {}

  onModuleInit() {
    this.service =
      this.client.getService<BonusServiceClient>(BONUS_SERVICE_NAME);
  }

  // CreateCashbackBonus(data: CreateBonusRequest) {
  //   console.log('CreateCashbackBonus ');
  //   // return this.service.createCashbackBonus(data);
  // }

  CreateBonus(data: CreateBonusRequest) {
    console.log('CreateBonus ');
    return this.service.createBonus(data);
    // return this.service.createCashbackBonus(data);

  }

  UpdateBonus(data: CreateBonusRequest) {
    console.log('UpdateCashbackBonus ');
    return this.service.updateBonus(data);
  }

  // CreateFirstDepositBonus(data: CreateFirstDepositBonusRequest) {
  //   console.log('CreateFirstDepositBonus ');
  //   // return this.service.createFirstDepositBonus(data);
  // }

  // UpdateFirstDepositBonus(data: CreateFirstDepositBonusRequest) {
  //   console.log('UpdateFirstDepositBonus ');
  //   // return this.service.updateFirstDepositBonus(data);
  // }

  // CreateFreebetBonus(data: CreateFreebetBonusRequest) {
  //   console.log('CreateFreebetBonus ');
  //   // return this.service.createFreebetBonus(data);
  // }

  // UpdateFreebetBonus(data: CreateFreebetBonusRequest) {
  //   console.log('UpdateFreebetBonus ');
  //   // return this.service.updateFreebetBonus(data);
  // }

  // CreateReferralBonus(data: CreateReferralBonusRequest) {
  //   console.log('CreateReferralBonus ');
  //   // return this.service.createReferralBonus(data);
  // }

  // UpdateReferralBonus(data: CreateReferralBonusRequest) {
  //   console.log('UpdateReferralBonus ');
  //   // return this.service.updateReferralBonus(data);
  // }

  // CreateShareBetBonus(data: CreateShareBetBonusRequest) {
  //   console.log('CreateShareBetBonus ');
  //   // return this.service.createShareBetBonus(data);
  // }

  // UpdateShareBetBonus(data: CreateShareBetBonusRequest) {
  //   console.log('UpdateShareBetBonus ');
  //   // return this.service.updateShareBetBonus(data);
  // }

  GetBonus(data: GetBonusRequest) {
    console.log('GetBonus ');
    return this.service.getBonus(data);
  }

  GetUserBonus(data: GetUserBonusRequest) {
    console.log('GetUserBonus ');
    return this.service.getUserBonus(data);
  }

  AwardBonus(data: AwardBonusRequest) {
    console.log('AwardBonus ');
    return this.service.awardBonus(data);
  }

  // PlaceBonusBet(data: UserBetWithBonus) {
  //   console.log('PlaceBonusBet ');
  //   return this.service.placeBonusBet(data);
  // }

  UpdateBonusStatus(data: BonusStatusRequest) {
    console.log('UpdateBonusStatus ');
    return this.service.updateBonusStatus(data);
  }

  CreateCampaignBonus(data: CreateCampaignBonusDto) {
    console.log('UpdateBonusStatus ');
    return this.service.createCampaignBonus(data);
  }

  UpdateCampaignBonus(data: UpdateCampaignBonusDto) {
    console.log('UpdateCampaignBonus ');
    return this.service.updateCampaignBonus(data);
  }

  DeleteCampaignBonus(data: DeleteCampaignBonusDto) {
    console.log('DeleteCampaignBonus ');
    return this.service.deleteCampaignBonus(data);
  }

  RedeemCampaignBonus(data: RedeemCampaignBonusDto) {
    console.log('RedeemCampaignBonus ');
    return this.service.redeemCampaignBonus(data);
  }

  GetCampaignBonus(data: GetBonusByClientID) {
    console.log('GetCampaignBonus ');
    return this.service.getCampaignBonus(data);
  }

  GetCampaign(data: GetCampaignRequest) {
    console.log('GetCampaign ');
    return this.service.getCampaign(data);
  }
}
