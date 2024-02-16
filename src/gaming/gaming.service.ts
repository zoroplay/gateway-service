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
  async createProvider(createDto: CreateProviderDto) {
    console.log(createDto);
    return await this.service.createProvider(createDto);
  }

  async findAllProvider() {
    console.log('finding all providers');
    return await this.service.findAllProviders({});
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
    const games = await this.service.syncGames(syncGameDto);
    return {
      games,
    };
  }

  async startGame(request: StartGameDto) {
    return await this.service.startGame(request);
  }

  async handleGamesCallback(request: CallbackGameDto) {
    switch (request.provider) {
      case 'tada':
        const tadaCallbackData: TadaCallback = request.body as any;
        return this.service.handleTadaCallback(tadaCallbackData);
        break;
      case 'shack-evolution':
        const shackEvolutionCallbackData: ShackEvolutionCallback =
          request.body as any;
        return this.service.handleShackEvolutionCallback(
          shackEvolutionCallbackData,
        );
        break;
      case 'evo-play':
        const evoplayCallbackData: EvoplayCallback = request.body as any;
        return this.service.handleEvoplayCallback(evoplayCallbackData);
        break;
      case 'evolution':
        const evolutionCallbackData: EvolutionCallback = request.body as any;
        return this.service.handleEvolutionCallback(evolutionCallbackData);
        break;
      case 'smart-soft':
        const smartSoftCallbackData: SmartSoftCallback = request.body as any;
        return this.service.handleSmartSoftCallback(smartSoftCallbackData);
        break;
      default:
        throw new Error('Invalid Provider');
        break;
    }
  }
}
