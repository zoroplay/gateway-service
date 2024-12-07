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

    public async GetOddsStatus(param: GetOddsRequest) {
      return await firstValueFrom(this.svc.getOdds(param));
    }

    public async getProbability(param: GetOddsRequest) {
      return await firstValueFrom(this.svc.getProbability(param));
    }

    public async getProducerStatus(param: ProducerStatusRequest) {
      return await firstValueFrom(this.svc.getProducerStatus(param));
    }
}
