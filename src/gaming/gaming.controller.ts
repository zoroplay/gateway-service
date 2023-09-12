import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { GAMING_SERVICE_NAME, Games, GamingServiceClient } from './gaming.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Gaming APIs')
@Controller('gaming')
export class GamingController implements OnModuleInit {
  private service: GamingServiceClient;

  @Inject(GAMING_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.service =
      this.client.getService<GamingServiceClient>(GAMING_SERVICE_NAME);
  }

  @Get('list')
  private async findAll(): Promise<Observable<Games>> {
    return this.service.findAllGames({});
  }
}
