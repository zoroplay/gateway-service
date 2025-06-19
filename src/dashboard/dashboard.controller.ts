import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OverallGamesRequest } from 'src/interfaces/wallet.pb';
import { WalletService } from 'src/wallet/wallet.service';

@ApiTags('BackOffice APIs')
@Controller('admin/dashboard')
export class DashBoardAdminController {
  constructor(private readonly walletService: WalletService) {}

  @Get('financial-performance/:clientId')
  FinancialPerformanceResponse(@Param('clientId') clientId: number) {
    return this.walletService.FinancialPerformanceResponse({ clientId });
  }

  @Get('player-balance/:clientId')
  Balances(@Param('clientId') clientId: number) {
    return this.walletService.Balances({ clientId });
  }

  @Get('overall-gamin/:clientId')
  OverallGames(
    @Param('clientId') clientId: number,
    @Query('range') range?: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    const payload: OverallGamesRequest = {
      clientId,
      rangeZ: range || '',
      from: from || '',
      to: to || '',
    };
    return this.walletService.OverallGames(payload);
  }

  @Get('online-data/:clientId')
  OverallGamesOnline(
    @Param('clientId') clientId: number,
    @Query('range') range?: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    const payload: OverallGamesRequest = {
      clientId,
      rangeZ: range || '',
      from: from || '',
      to: to || '',
    };
    return this.walletService.OverallGamesOnline(payload);
  }

  @Get('shop-data/:clientId')
  OverallGamesRetail(
    @Param('clientId') clientId: number,
    @Query('start') from?: string,
    @Query('end') to?: string,
    @Query('range') range?: string,
  ) {
    const payload: OverallGamesRequest = {
      clientId,
      rangeZ: range || '',
      from: from || '',
      to: to || '',
    };
    return this.walletService.OverallGamesRetail(payload);
  }
}
