import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GamingService } from './gaming.service';

@ApiTags('Gaming APIs')
@Controller('games')
export class GamingController {
  constructor(private readonly gamingService: GamingService) {}

  @Get()
  findAll() {
    try {
      const resp = this.gamingService.findAll();
      return resp;
    } catch (error) {
      console.error(error);
    }
  }
}
