import { Module, forwardRef } from '@nestjs/common';
import { RetailController } from './retail.controller';
import { RetailAdminController } from './admin/retail.admin.controller';
import { IdentityModule } from 'src/identity/identity.module';
import { WalletModule } from 'src/wallet/wallet.module';
import { BonusModule } from 'src/bonus/bonus.module';
import { BettingModule } from 'src/betting/betting.module';

@Module({
  imports: [
    forwardRef(() => IdentityModule),
    forwardRef(() => WalletModule),
    forwardRef(() => BonusModule),
    forwardRef(() => BettingModule),
  ],
  controllers: [RetailAdminController, RetailController],
})
export class RetailModule {}
