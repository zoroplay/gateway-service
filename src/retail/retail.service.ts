import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  AssignUserCommissionProfile,
  BonusGroups,
  Empty,
  PayPowerRequest,
  PowerRequest,
  protobufPackage,
  RETAIL_SERVICE_NAME,
  RetailServiceClient,
  CommissionProfile,
  GetNormalRequest,
  PayNormalRequest,
  Meta,
} from './retail.pb';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class RetailService implements OnModuleInit {
  private service: RetailServiceClient;

  constructor(@Inject(protobufPackage) private client: ClientGrpc) {}

  onModuleInit() {
    this.service =
      this.client.getService<RetailServiceClient>(RETAIL_SERVICE_NAME);
  }

  // Bonus Groups
  getBonusGroups() {
    console.log('Service here');
    return this.service.getBonusGroups({});
  }

  createBonusGroups(data: BonusGroups) {
    console.log(data);
    return this.service.createBonusGroups(data);
  }

  // Commission Profiles
  getCommissionProfiles(data: Meta) {
    console.log(data);
    return this.service.getCommissionProfiles(data);
  }

  createCommissionProfile(data: CommissionProfile) {
    console.log(data);
    return this.service.createCommissionProfile(data);
  }
  updateCommissionProfile(data: CommissionProfile) {
    console.log(data);
    return this.service.updateCommissionProfile(data);
  }
  assignUserCommissionProfile(data: AssignUserCommissionProfile) {
    console.log(data);
    return this.service.assignUserCommissionProfile(data);
  }

  // Power Bonus
  getPowerBonus(data: PowerRequest) {
    console.log(data);
    return this.service.getPowerBonus(data);
  }
  payOutPowerBonus(data: PayPowerRequest) {
    console.log(data);
    return this.service.payOutPowerBonus(data);
  }
  // Normal Bonus
  getNormalBonus(data: GetNormalRequest) {
    console.log(data);
    return this.service.getNormalBonus(data);
  }
  payOutNormalBonus(data: PayNormalRequest) {
    console.log(data);
    return this.service.payOutNormalBonus(data);
  }

  async test(data: PayNormalRequest) {
    console.log(data);
    // const resp = this.service.onBetPlaced({
    //   betId: 1,
    //   userId: 1,
    //   clientId: 1,
    //   selectionCount: 15,
    //   stake: 500,
    //   commission: 30,
    //   winnings: 0,
    //   weightedStake: 500 * 15,
    //   odds: 12,
    // });
    // const resp = this.service.onBetSettled({
    //   betId: 1,
    //   userId: 1,
    //   clientId: 1,
    //   selectionCount: 15,
    //   stake: 500,
    //   commission: 30,
    //   winnings: 6000,
    //   settledDate: new Date(),
    //   weightedStake: 500 * 15,
    //   odds: 12,
    // });
    const resp = await this.service.createPowerBonus({
      agentIds: [1],
      clientId: 1,
      fromDate: new Date('01-01-2024'),
      toDate: new Date(),
    });
    return resp;
  }
}
