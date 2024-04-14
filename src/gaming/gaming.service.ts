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
  XpressResponse,
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

  async xpressBalance(data: XpressRequest): Promise<XpressResponse> {
    console.log('xpress balance');
    const res = await firstValueFrom(this.service.xpressBalance(data));
    res.data.balance = parseFloat(res.data.balance.toFixed(2))
    return res;
  }

  async xpressCredit(data: XpressRequest) {
    console.log('xpress credit');
    const res = await firstValueFrom(this.service.xpressCredit(data));
    res.data.balance = parseFloat(res.data.balance.toFixed(2))
    res.data.oldBalance = parseFloat(res.data.oldBalance.toFixed(2))
    return res;
  }

  async xpressDebit(data: XpressRequest) {
    console.log('xpress debit');
    const res = await firstValueFrom(this.service.xpressDebit(data));
    res.data.balance = parseFloat(res.data.balance.toFixed(2))
    res.data.oldBalance = parseFloat(res.data.oldBalance.toFixed(2))
    return res;  }

  async xpressRollback(data: XpressRequest) {
    console.log('xpress rollback');
    const res = await firstValueFrom(this.service.xpressRollback(data));
    res.data.balance = parseFloat(res.data.balance.toFixed(2))
    res.data.oldBalance = parseFloat(res.data.oldBalance.toFixed(2))
    return res;
  }

  async xpressLogout(data: XpressRequest) {
    console.log('xpress logout');
    const res = await firstValueFrom(this.service.xpressLogout(data));
    res.data.balance = parseFloat(res.data.balance.toFixed(2))
    return res;
  }
}
