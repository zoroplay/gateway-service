import {Inject, Injectable, OnModuleInit} from '@nestjs/common';
import {GetOutrightsRequest, OUTRIGHTS_SERVICE_NAME, OutrightsServiceClient, protobufPackage,} from './outrights.pb';
import {ClientGrpc} from '@nestjs/microservices';

@Injectable()
export class OutrightsService implements OnModuleInit {
  private service: OutrightsServiceClient;

  constructor(@Inject(protobufPackage) private client: ClientGrpc) {}

  onModuleInit() {
    this.service =
      this.client.getService<OutrightsServiceClient>(OUTRIGHTS_SERVICE_NAME);
  }

  GetFixtures(data: GetOutrightsRequest) {
    return this.service.getFixtures(data);
  }
}
