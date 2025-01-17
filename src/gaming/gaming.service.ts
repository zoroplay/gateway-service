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
  AddGameToCategoriesDto,
  CreatePromotionDto,
  FindOnePromotionDto,
  UpdateGameDto,
  CreateTournamentDto,
  FindOneTournamentDto,
  QtechCallbackRequest,
  CreatePromotionRequest,
  Promotion,
  QtechtransactionRequest,
} from 'src/interfaces/gaming.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom, of } from 'rxjs';

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

  async updateGame(updateGameDto: UpdateGameDto) {
    //(createGameDto);
    return firstValueFrom(this.service.updateGame(updateGameDto));
  }

  async findAll() {
    //('finding all games');
    return firstValueFrom(this.service.findAllGames({}));
  }

  async getGames() {
    //('finding all games');
    const val = await firstValueFrom(this.service.getGames({}));
    return val;
  }

  async fetchGames(payload: FetchGamesRequest) {
    //('fetch games');
    return firstValueFrom(this.service.fetchGames(payload));
  }

  async fetchGamesByName(payload: FetchGamesRequest) {
    //('fetch games');
    return firstValueFrom(this.service.fetchGamesByName(payload));
  }

  async addGameToCategories(addgameCategoryDto: AddGameToCategoriesDto) {
    console.log('addGameToCategories');
    return firstValueFrom(this.service.addGameToCategories(addgameCategoryDto));
  }

  async removeGameToCategories(removegameCategoryDto: AddGameToCategoriesDto) {
    console.log('removeGameToCategories');
    return firstValueFrom(
      this.service.removeGameToCategories(removegameCategoryDto),
    );
  }

  async saveCategory(createCategoryDto: SaveCategoryRequest) {
    //(createGameDto);
    return firstValueFrom(this.service.saveCategory(createCategoryDto));
  }

  async findOneCategory(payload: FindOneCategoryDto) {
    console.log('payload', payload);
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
 

  // async createPromotion(
  //   createPromotionDto: CreatePromotionDto, // Use CreatePromotionDto here
  //   file?: Express.Multer.File, // Optional base64 string of the file
  // ): Promise<Promotion> {
  //   console.log('createPromotionDto:', createPromotionDto);
  //   console.log('fileBase64:', file);

  //   let fileBase64: string | undefined;

  //   // if (file) {238791
  //   //   fileBase64 = file.buffer.toString('base64');
  //   // }

  //   // if (fileBase64.startsWith("data:image/png;base64,")) {
  //   //   fileBase64.replace("data:image/png;base64,", "");
  //   // }

  //   // If fileBase64 is provided, send the base64 encoded string to gRPC
  //   const createPromotionRequest: CreatePromotionRequest = {
  //     metadata: createPromotionDto, // Pass CreatePromotionDto as metadata
  //     file: fileBase64, // Send the base64 string of the file
  //   };

  //   console.log('createPromotionRequest:', createPromotionRequest);

  //   try {
  //     // Forward the request to the gRPC service
  //     const promotion = await firstValueFrom(
  //       this.service.createPromotion(createPromotionRequest), // Make sure this matches the expected gRPC service method signature
  //     );

  //     console.log('promotion:', promotion);
  //     return promotion;
  //   } catch (error) {
  //     console.error('Error in createPromotion:', error);
  //     throw new Error('Failed to create promotion. Please try again later.');
  //   }
  // }

  async createPromotion(
    createPromotionDto: CreatePromotionDto,
    file?: Express.Multer.File, // Optional file input
  ): Promise<Promotion> {
    console.log('createPromotionDto:', createPromotionDto);
    console.log('file:', file);
  
    let fileBase64: string | undefined;
    let fileString: string | undefined = file.toString();
  
    if (file.buffer) {
      // Convert the file buffer to a Base64 string
      fileBase64 = file.buffer.toString('base64');
    } else if (fileString.startsWith("data:image/")) {
        fileBase64 = fileString.replace(/^data:image\/\w+;base64,/, '');
    } else {
      fileBase64; // Assume it's already a clean Base64 string
    }
  
    // Construct the gRPC request payload
    const createPromotionRequest: CreatePromotionRequest = {
      metadata: createPromotionDto, // Metadata from DTO
      file: fileBase64, // Base64 file string or undefined
    };
  
    console.log('createPromotionRequest:', createPromotionRequest);
  
    try {
      // Send the request to the gRPC service
      const promotion = await firstValueFrom(
        this.service.createPromotion(createPromotionRequest),
      );
  
      console.log('promotion:', promotion);
      return promotion;
    } catch (error) {
      console.error('Error in createPromotion:', error);
      throw new Error('Failed to create promotion. Please try again later.');
    }
  }
  

  async findPromotions() {
    return firstValueFrom(this.service.findPromotions({}));
  }

  async findOnePromotion(payload: FindOnePromotionDto) {
    console.log('payload', payload);
    //(createGameDto);
    return firstValueFrom(this.service.findOnePromotion(payload));
  }

  async updatePromotion(request: CreatePromotionDto) {
    //(createGameDto);
    return firstValueFrom(this.service.updatePromotion(request));
  }

  async removePromotion(request: FindOnePromotionDto) {
    console.log('Payload sent to gRPC client for deletion:', request);
    const response = await firstValueFrom(
      this.service.removePromotion(request),
    );
    console.log('Response from gRPC server:', response);

    return response;
  }

  async listCategories() {
    //('fetch categories');
    return firstValueFrom(this.service.fetchCategories({}));
  }

  async sync(syncGameDto: SyncGameDto) {
    console.log('syncing games');
    const games = await firstValueFrom(this.service.syncGames(syncGameDto));
    console.log('QTECH-LOG', games);
    return {
      games,
    };
  }
  async startGame(request: StartGameDto) {
    // //('start game', request);
    console.log('start-service', request);
    const resp = await firstValueFrom(this.service.startGame(request));
    console.log('resp', resp);

    return resp;
  }

  async handleGamesCallback(request: CallbackGameDto) {
    console.log('start-service', request);
    // //(request);
    const resp = await firstValueFrom(this.service.handleCallback(request));

    console.log('resp', resp);

    return resp;
  }

  async handleQtechPlayerBalance(request: QtechCallbackRequest) {
    console.log('start-service', request);
    // //(request);
    const resp = await firstValueFrom(
      this.service.handleQtechGetBalance(request),
    );
    console.log('resp', resp);

    return resp;
  }

  async handleQtechGamesCallback(request: QtechCallbackRequest) {
    console.log('Q-tech service start');
    // //(request);
    const resp = await firstValueFrom(
      this.service.handleQtechCallback(request),
    );

    console.log('resp', resp);

    return resp;
  }

  async handleQtechBet(request: QtechtransactionRequest) {
    console.log('Q-tech Bet Func');
    // //(request);
    const resp = await firstValueFrom(
      this.service.handleQtechTransaction(request),
    );

    console.log('resp', resp);

    return resp;
  }

  async handleQtechWin(request: QtechtransactionRequest) {
    console.log('Q-tech Bet Func');
    // //(request);
    const resp = await firstValueFrom(
      this.service.handleQtechTransaction(request),
    );

    console.log('resp', resp);

    return resp;
  }

  async xpressLogin(data: XpressRequest) {
    //('xpress login');
    const res = await firstValueFrom(this.service.xpressLogin(data));
    const response: any = { ...res };
    if (res.status) response.data.balance = parseFloat(res.data.balance);

    return response;
  }

  async xpressBalance(data: XpressRequest): Promise<XpressResponse> {
    //('xpress balance');
    const res = await firstValueFrom(this.service.xpressBalance(data));
    const response: any = { ...res };
    if (res.status) response.data.balance = parseFloat(res.data.balance);

    return response;
  }

  async xpressCredit(data: XpressRequest) {
    //('xpress credit');
    const res = await firstValueFrom(this.service.xpressCredit(data));
    const response: any = { ...res };
    if (res.status) {
      response.data.balance = parseFloat(res.data.balance);
      response.data.oldBalance = parseFloat(res.data.oldBalance);
    }
    return response;
  }

  async xpressDebit(data: XpressRequest) {
    //('xpress debit');
    const res = await firstValueFrom(this.service.xpressDebit(data));
    const response: any = { ...res };
    if (res.status) {
      response.data.balance = parseFloat(res.data.balance);
      response.data.oldBalance = parseFloat(res.data.oldBalance);
    }
    return response;
  }

  async xpressRollback(data: XpressRequest) {
    const res = await firstValueFrom(this.service.xpressRollback(data));
    const response: any = { ...res };
    if (res.status) {
      response.data.balance = parseFloat(res.data.balance);
      response.data.oldBalance = parseFloat(res.data.oldBalance);
    }
    return response;
  }

  async xpressLogout(data: XpressRequest) {
    //('xpress logout');
    const res = await firstValueFrom(this.service.xpressLogout(data));
    const response: any = { ...res };
    if (res.status) response.data.balance = parseFloat(res.data.balance);

    return response;
  }

  async createTournament(createTournamentDto: CreateTournamentDto) {
    console.log('createTournamentDto', createTournamentDto);
    const tournament = await firstValueFrom(
      this.service.createTournament(createTournamentDto),
    );
    console.log('tournament', tournament);
    return tournament;
  }

  async findAllTournaments() {
    return firstValueFrom(this.service.findAllTournaments({}));
  }

  async findOneTournament(payload: FindOneTournamentDto) {
    console.log('payload', payload);
    //(createGameDto);
    return firstValueFrom(this.service.findOneTournament(payload));
  }

  async updateTournament(request: CreateTournamentDto) {
    //(createGameDto);
    return firstValueFrom(this.service.updateTournament(request));
  }

  async deleteTournament(request: FindOneTournamentDto) {
    console.log('Payload sent to gRPC client for deletion:', request);

    const response = await firstValueFrom(
      this.service.deleteTournament(request),
    );
    console.log('Response from gRPC server:', response);

    return response;
  }

  formatNumber(num) {
    if (num > 0 && num % 1 === 0) {
      return parseFloat(num + '.00');
    } else {
      return parseFloat(num.toFixed(2));
    }
  }
}
