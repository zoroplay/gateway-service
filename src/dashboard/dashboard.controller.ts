import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/identity/auth/auth.guard';
import { OverallGamesRequest, StatisticsRequest } from 'src/interfaces/wallet.pb';
import { WalletService } from 'src/wallet/wallet.service';

@ApiTags('BackOffice APIs')
@UseGuards(AuthGuard)
@Controller('admin/dashboard')
export class DashBoardAdminController {
  constructor(private readonly walletService: WalletService) {}

  @Get('/sports-data/:clientId')
  OverallGamesSport(
    @Param('clientId') clientId: number,
    @Query('from') from?: string,
    @Query('to') to?: string,
    @Query('range') range?: string,
  ) {
    const payload: OverallGamesRequest = {
      clientId,
      rangeZ:
        (range as 'day' | 'week' | 'month' | 'year' | 'yesterday') || 'day',
      from: from || '',
      to: to || '',
    };
    return this.walletService.OverallGamesSport(payload);
  }

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
    @Query('from') from?: string,
    @Query('to') to?: string,
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

  @Get('statistics/:clientId')
  Statistics(@Param('clientId') clientId: number) {
    const year = new Date().getFullYear();
    console.log(year);
    const payload:StatisticsRequest  = {
      clientId,
      year: year.toString()
    };
    return this.walletService.Statistics(payload);
  }
}
