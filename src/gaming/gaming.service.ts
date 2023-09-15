import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import {
  GAMING_SERVICE_NAME,
  CreateGameDto,
  GamingServiceClient,
  protobufPackage,
} from './gaming.pb';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class GamingService implements OnModuleInit {
  private service: GamingServiceClient;

  constructor(@Inject(protobufPackage) private client: ClientGrpc) {}

  onModuleInit() {
    this.service =
      this.client.getService<GamingServiceClient>(GAMING_SERVICE_NAME);
  }
  create(createGameDto: CreateGameDto) {
    console.log(createGameDto);
    return this.service.createGame(createGameDto);
  }

  findAll() {
    console.log('finding all games');
    return this.service.findAllGames({});
  }
}
