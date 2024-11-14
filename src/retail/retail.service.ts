import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AssignUserCommissionProfile, CommissionProfile, GetCommissionsRequest, GetNetworkSalesRequest, IDENTITY_SERVICE_NAME, IdentityServiceClient, PayoutCommissionRequest, SingleItemRequest, protobufPackage } from 'src/interfaces/identity.pb';

@Injectable()
export class RetailService implements OnModuleInit {
  private service: IdentityServiceClient;

  constructor(
    @Inject(protobufPackage) private client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.service =
      this.client.getService<IdentityServiceClient>(IDENTITY_SERVICE_NAME);
  }

  async getAgents(data) {
    return await firstValueFrom(this.service.listAgents(data))
  }

  async getAgentUsers(data) {
    return await firstValueFrom(this.service.listAgentUsers(data))
  }

  // Commission Profiles

  getCommissionProfiles(data: GetCommissionsRequest) {
    // console.log(data);
    return this.service.getCommissionProfiles(data);
  }

  getCommissionProfile(data: SingleItemRequest) {
    // console.log(data);
    return this.service.getCommissionProfile(data);
  }

  createCommissionProfile(data: CommissionProfile) {
    // console.log(data);
    return this.service.createCommissionProfile(data);
  }

  updateCommissionProfile(data: CommissionProfile) {
    // console.log(data);
    return this.service.updateCommissionProfile(data);
  }
  assignUserCommissionProfile(data: AssignUserCommissionProfile) {
    // console.log(data);
    return firstValueFrom(this.service.assignUserCommissionProfile(data));
  }

  removeUserCommissionProfile(data: AssignUserCommissionProfile) {
    // console.log(data);
    return firstValueFrom(this.service.removeUserCommissionProfile(data));
  }

  getUserCommissionProfiles(data: SingleItemRequest) {
    // console.log(data);
    return firstValueFrom(this.service.getUserCommissionProfiles(data));
  }

  deleteCommission(data: SingleItemRequest) {
    // console.log(data);
    return this.service.deleteCommissionProfile(data);
  }

  getSalesReport(data: GetNetworkSalesRequest) {
    return this.service.getNetworkSalesReport(data);
  }

  payoutCommission(data: PayoutCommissionRequest) {
    return this.service.payoutCommission(data);
  }
    // Bonus Groups
  // getBonusGroups(data: Empty) {
  //   console.log(data);
  //   return this.service.getBonusGroups(data);
  // }

  // createBonusGroups(data: BonusGroups) {
  //   console.log(data);
  //   return this.service.createBonusGroups(data);
  // }


  // Power Bonus
//   getPowerBonus(data: PowerRequest) {
//     console.log(data);
//     return this.service.getPowerBonus(data);
//   }
//   payOutPowerBonus(data: PayPowerRequest) {
//     console.log(data);
//     return this.service.payOutPowerBonus(data);
//   }
//   // Normal Bonus
//   getNormalBonus(data: GetNormalRequest) {
//     console.log(data);
//     return this.service.getNormalBonus(data);
//   }
//   payOutNormalBonus(data: PayNormalRequest) {
//     console.log(data);
//     return this.service.payOutNormalBonus(data);
//   }
}
