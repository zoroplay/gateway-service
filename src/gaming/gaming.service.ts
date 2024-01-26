import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import {
  GAMING_SERVICE_NAME,
  CreateGameDto,
  GamingServiceClient,
  protobufPackage,
  SyncGameDto,
  StartGameDto,
  CallbackGameDto,
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

  async create(createGameDto: CreateGameDto) {
    console.log(createGameDto);
    return await this.service.createGame(createGameDto);
  }

  async findAll() {
    console.log('finding all games');
    return await this.service.findAllGames({});
  }

  async sync(syncGameDto: SyncGameDto) {
    console.log('syncing games');
    return await this.service.syncGames(syncGameDto);
  }

  async startGame(request: StartGameDto) {
    return await this.service.startGame(request);
  }

  async handleGamesCallback(request: CallbackGameDto) {
    return await this.service.handleGamesCallback(request);
  }
}
