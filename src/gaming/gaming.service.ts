/* eslint-disable prettier/prettier */
import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import {
  GAMING_SERVICE_NAME,
  CreateGameDto,
  GamingServiceClient,
  protobufPackage,
  SyncGameDto,
  StartGameDto,
  CallbackGameDto,
  CreateProviderDto,
  XpressRequest,
  XpressResponse,
  FetchGamesRequest,
} from 'src/interfaces/gaming.pb';
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
    //(createDto);
    return firstValueFrom(this.service.createProvider(createDto));
  }

  async findAllProvider() {
    //('finding all providers');
    return firstValueFrom(this.service.findAllProviders({}));
  }

  async create(createGameDto: CreateGameDto) {
    //(createGameDto);
    return firstValueFrom(this.service.createGame(createGameDto));
  }

  async findAll() {
    //('finding all games');
    return firstValueFrom(this.service.findAllGames({}));
  }

  async fetchGames(payload: FetchGamesRequest) {
    //('fetch games');
    return firstValueFrom(this.service.fetchGames(payload));
  }

  async listCategories() {
    //('fetch categories');
    return firstValueFrom(this.service.fetchCategories({}));
  }

  async sync(syncGameDto: SyncGameDto) {
    //('syncing games');
    const games = await firstValueFrom(this.service.syncGames(syncGameDto));

    return {
      games,
    };
  }


  async startGame(request: StartGameDto) {
    // //('start game', request);
    const resp = await firstValueFrom(this.service.startGame(request));

    return resp;
  }

  async handleGamesCallback(request: CallbackGameDto) {
    // //('service start');
    // //(request);
    const resp = await firstValueFrom(this.service.handleCallback(request));

    if (resp.success) {
      //('service ended in success');
    } else {
      //('service ended in failure');
    }
    //(resp);
    return resp;
  }

  async xpressLogin(data: XpressRequest) {
    //('xpress login');
    return firstValueFrom(this.service.xpressLogin(data));
  }


  async xpressBalance(data: XpressRequest): Promise<XpressResponse> {
    ('xpress balance');
    const res = await firstValueFrom(this.service.xpressBalance(data));
    console.log(res.data.balance)
    if (res.status && !this.isPrecise(res.data.balance)) res.data.balance = parseFloat(res.data.balance.toFixed(2));

    return res;
  }

  async xpressCredit(data: XpressRequest) {
    //('xpress credit');
    const res = await firstValueFrom(this.service.xpressCredit(data));
    if (res.status) {
      if(!this.isPrecise(res.data.balance)) res.data.balance = parseFloat(res.data.balance.toFixed(2))
      if(!this.isPrecise(res.data.oldBalance)) res.data.oldBalance =  parseFloat(res.data.oldBalance.toFixed(2))
    }
    return res;
  }

  async xpressDebit(data: XpressRequest) {
    //('xpress debit');
    const res = await firstValueFrom(this.service.xpressDebit(data));
    if (res.status) {
      if(!this.isPrecise(res.data.balance)) res.data.balance = parseFloat(res.data.balance.toFixed(2))
      if(!this.isPrecise(res.data.oldBalance)) res.data.oldBalance =  parseFloat(res.data.oldBalance.toFixed(2))
    }
    return res;
  }

  async xpressRollback(data: XpressRequest) {
    const res = await firstValueFrom(this.service.xpressRollback(data));
    //('xpress rollback', res);
    if (res.status) {
      if(!this.isPrecise(res.data.balance)) res.data.balance = parseFloat(res.data.balance.toFixed(2))
      if(!this.isPrecise(res.data.oldBalance)) res.data.oldBalance =  parseFloat(res.data.oldBalance.toFixed(2))
    }
    return res;
  }

  async xpressLogout(data: XpressRequest) {
    //('xpress logout');
    const res = await firstValueFrom(this.service.xpressLogout(data));
    if (res.status && !this.isPrecise(res.data.balance)) res.data.balance = parseFloat(res.data.balance.toFixed(2));
    return res;
  }

  isPrecise(num){
    const res = String(num).split(".")[1]?.length == 2;
    return res;
  }

  formatNumber (num) {
    if (num > 0 && num % 1 === 0) {
      return parseFloat(num + ".00");
    } else {
      return parseFloat(num.toFixed(2))
    }
  };
}
