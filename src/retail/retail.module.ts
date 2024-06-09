import { Module, forwardRef } from '@nestjs/common';
import { RetailService } from './retail.service';
import { RetailController } from './retail.controller';
import { RetailAdminController } from './admin/retail.admin.controller';
import { IdentityModule } from 'src/identity/identity.module';

@Module({
  imports: [
    forwardRef(() => IdentityModule),
  ],
  controllers: [RetailAdminController, RetailController],
  providers: [RetailService],
  exports: [RetailService],
})
export class RetailModule {}
