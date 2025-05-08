import { DecryptDto } from './crypto.dto';
import { Controller, Post, Get, Body, Headers } from '@nestjs/common';
import { CryptoService } from './crypto.service';

@Controller('crypto')
export class CryptoController {
  constructor(private readonly cryptoService: CryptoService) {}

  @Get('encrypt')
  async encrypt(
    @Body() data: any,
    @Headers() headers: { 'sbe-api-signature': string; 'sbe-client-id': number },
  ) {
    try {
      const clientId = headers['sbe-client-id'];
      const signature = headers['sbe-api-signature'];
      const key = await this.cryptoService.validateClientAndGenerateKey(
        clientId,
      );
      return this.cryptoService.encrypt(key.toString('hex'), signature);
    } catch (error) {
      return { error: error.message };
    }
  }

  @Get('decrypt')
  async decrypt(
    @Body() body: { data: string },
    @Headers() headers: { 'client-code': string; 'client-id': number },
  ) {
    try {
      // const clientCode = headers['client-code'];
      const clientId = headers['sbe-client-id'];
      const key = await this.cryptoService.validateClientAndGenerateKey(
        clientId,
      );

      const decrypted = this.cryptoService.decrypt(
        body?.data,
        key.toString('hex'),
      );
      return decrypted;
    } catch (error) {
      return { error: error.message };
    }
  }
}
