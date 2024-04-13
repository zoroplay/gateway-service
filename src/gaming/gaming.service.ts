import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import {
  GAMING_SERVICE_NAME,
  CreateGameDto,
  GamingServiceClient,
  protobufPackage,
  SyncGameDto,
  StartGameDto,
  CallbackGameDto,
  EvoplayCallback,
  EvolutionCallback,
  TadaCallback,
  ShackEvolutionCallback,
  SmartSoftCallback,
  CreateProviderDto,
  XpressRequest,
} from './gaming.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GamingService implements OnModuleInit {
  private service: GamingServiceClient;

  constructor(@Inject(protobufPackage) private client: ClientGrpc) {}

  onModuleInit() {
    this.service =
      this.client.getService<GamingServiceClient>(GAMING_SERVICE_NAME);
  }

  async createProvider(createDto: CreateProviderDto) {
    console.log(createDto);
    return firstValueFrom(this.service.createProvider(createDto));
  }

  async findAllProvider() {
    console.log('finding all providers');
    return firstValueFrom(this.service.findAllProviders({}));
  }

  async create(createGameDto: CreateGameDto) {
    console.log(createGameDto);
    return firstValueFrom(this.service.createGame(createGameDto));
  }

  async findAll() {
    console.log('finding all games');
    return firstValueFrom(this.service.findAllGames({}));
  }

  async sync(syncGameDto: SyncGameDto) {
    console.log('syncing games');
    const games = await firstValueFrom(this.service.syncGames(syncGameDto));
    return {
      games,
    };
  }

  async startGame(request: StartGameDto) {
    const resp = await firstValueFrom(this.service.startGame(request));
    return resp;
  }

  async handleGamesCallback(request: CallbackGameDto) {
    console.log('service start');
    console.log(request);
    const resp = await firstValueFrom(this.service.handleCallback(request));
    console.log(resp);
    if (resp.success) {
      console.log('service ended in success');
      return resp.data;
    } else {
      console.log('service ended in failure');
      return resp;
    }
  }

  async xpressLogin(data: XpressRequest) {
    console.log('xpress login');
    return firstValueFrom(this.service.xpressLogin(data));
  }

  async xpressBalance(data: XpressRequest) {
    console.log('xpress balance');
    return firstValueFrom(this.service.xpressBalance(data));
  }

  async xpressCredit(data: XpressRequest) {
    console.log('xpress credit');
    return firstValueFrom(this.service.xpressCredit(data));
  }

  async xpressDebit(data: XpressRequest) {
    console.log('xpress debit');
    return firstValueFrom(this.service.xpressDebit(data));
  }

  async xpressRollback(data: XpressRequest) {
    console.log('xpress rollback');
    return firstValueFrom(this.service.xpressRollback(data));
  }

  async xpressLogout(data: XpressRequest) {
    console.log('xpress logout');
    return firstValueFrom(this.service.xpressLogout(data));
  }
}
