import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { GetOddsRequest, ODDS_SERVICE_NAME, OddsClient, ProducerStatusRequest, protobufPackage } from './odds.pb';

@Injectable()
export class OddsService {
    private svc: OddsClient;

    @Inject(protobufPackage)
    private readonly client: ClientGrpc;

    public onModuleInit(): void {
        this.svc = this.client.getService<OddsClient>(ODDS_SERVICE_NAME);
    }

    public async GetOddsStatus(param: GetOddsRequest[]) {
      try {
        const accepted = [];
        const rejected = [];
        for(const selection of param) {
          const res = await firstValueFrom(this.svc.getOdds(selection));
          if (res.active) {
            accepted.push({
              ...selection, 
              odds: res.odds, 
              active: res.active, 
              status: res.status,
              statusName: res.statusName
            })
          } else {
            rejected.push({
              ...selection, 
              odds: res.odds, 
              status: res.status,
              statusName: res.statusName
            })
          }
        }
        return {success: true, message: 'Successful', data: {accepted, rejected} }
      } catch (e) {
        return {success: false, message: 'Error processing reques: ' + e.message, data: null};
      }
    }

    public async getProbability(param: GetOddsRequest) {
      return await firstValueFrom(this.svc.getProbability(param));
    }

    public async getProducerStatus(param: ProducerStatusRequest) {
      return await firstValueFrom(this.svc.getProducerStatus(param));
    }
}
