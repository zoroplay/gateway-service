import { Controller, Inject, Get } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('sports')
@ApiTags('Sports')
export class SportsController {
  constructor(
    @Inject('SPORTS_SERVICE')
    private readonly sportsService: ClientProxy,
  ) {}

  @Get('get-menu')
  @ApiOkResponse({
    description: 'Fetch sports menu',
  })
  public async getSettings(): Promise<any> {
    const settingResponse = await this.sportsService.send(
      { cmd: 'get_settings' },
      {},
    );

    return {
      message: settingResponse.message,
      data: settingResponse.data,
      errors: null,
      success: true,
    };
  }
}
