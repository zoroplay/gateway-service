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
  SaveCategoryRequest,
  FindOneCategoryDto,
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

  async fetchGamesByName(payload: FetchGamesRequest) {
    //('fetch games');
    return firstValueFrom(this.service.fetchGamesByName(payload));
  }

  async saveCategory(createCategoryDto: SaveCategoryRequest) {
    //(createGameDto);
    return firstValueFrom(this.service.saveCategory(createCategoryDto));
  }

  async findOneCategory(payload: FindOneCategoryDto) {
    console.log("payload", payload);
    //(createGameDto);
    return firstValueFrom(this.service.findOneCategory(payload));
  }

  async updateCategory(updateCategoryDto: SaveCategoryRequest) {
    //(createGameDto);
    return firstValueFrom(this.service.updateCategory(updateCategoryDto));
  }

  async deleteCategory(payload: FindOneCategoryDto) {
    console.log('Payload sent to gRPC client for deletion:', payload);
  
    const response = await firstValueFrom(this.service.deleteCategory(payload));
    console.log('Response from gRPC server:', response);
  
    return response;
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
    console.log("start-service")
    const resp = await firstValueFrom(this.service.startGame(request));

    return resp;
  }

  async handleGamesCallback(request: CallbackGameDto) {
    // //('service start');
    // //(request);
    const resp = await firstValueFrom(this.service.handleCallback(request));

    console.log("resp", resp);

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
    const res = await firstValueFrom(this.service.xpressLogin(data));
    const response: any = {...res};
    if (res.status) response.data.balance = parseFloat(res.data.balance);

    return response;
  }


  async xpressBalance(data: XpressRequest): Promise<XpressResponse> {
    //('xpress balance');
    const res = await firstValueFrom(this.service.xpressBalance(data));
    const response: any = {...res};
    if (res.status) response.data.balance = parseFloat(res.data.balance);

    return response;
  }

  async xpressCredit(data: XpressRequest) {
    //('xpress credit');
    const res = await firstValueFrom(this.service.xpressCredit(data));
    const response: any = {...res};
    if (res.status) {
      response.data.balance = parseFloat(res.data.balance);
      response.data.oldBalance = parseFloat(res.data.oldBalance);
    }
    return response;
  }

  async xpressDebit(data: XpressRequest) {
    //('xpress debit');
    const res = await firstValueFrom(this.service.xpressDebit(data));
    const response: any = {...res};
    if (res.status) {
      response.data.balance = parseFloat(res.data.balance);
      response.data.oldBalance = parseFloat(res.data.oldBalance);
    }
    return response;
  }

  async xpressRollback(data: XpressRequest) {
    const res = await firstValueFrom(this.service.xpressRollback(data));
    const response: any = {...res};
    if (res.status) {
      response.data.balance = parseFloat(res.data.balance);
      response.data.oldBalance = parseFloat(res.data.oldBalance);
    }
    return response;
  }

  async xpressLogout(data: XpressRequest) {
    //('xpress logout');
    const res = await firstValueFrom(this.service.xpressLogout(data));
    const response: any = {...res};
    if (res.status) response.data.balance = parseFloat(res.data.balance);

    return response;
  }

  formatNumber (num) {
    if (num > 0 && num % 1 === 0) {
      return parseFloat(num + ".00");
    } else {
      return parseFloat(num.toFixed(2))
    }
  };
}
