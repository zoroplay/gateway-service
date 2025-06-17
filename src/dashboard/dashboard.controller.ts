import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
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
}
