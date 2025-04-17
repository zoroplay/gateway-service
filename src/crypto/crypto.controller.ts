import { DecryptDto } from './crypto.dto';
import { Controller, Post, Get, Body, Headers } from '@nestjs/common';
import { CryptoService } from './crypto.service';

@Controller('crypto')
export class CryptoController {
  constructor(private readonly cryptoService: CryptoService) {}

  @Post('encrypt')
  async encrypt(
    @Body() data: any,
    @Headers() headers: { 'client-code': string; 'client-id': number },
  ) {
    try {
      // const clientCode = headers['client-code'];
      // const clientId = headers['client-id'];
      // const key = await this.cryptoService.validateClientAndGenerateKey(
      //   clientCode,
      //   clientId,
      // );
      // return this.cryptoService.encrypt(data, key.toString('hex'));
      return data;
    } catch (error) {
      return { error: error.message };
    }
  }

  @Post('decrypt')
  async decrypt(
    @Body() body: { data: string },
    @Headers() headers: { 'client-code': string; 'client-id': number },
  ) {
    try {
      const clientCode = headers['client-code'];
      const clientId = headers['client-id'];
      const key = await this.cryptoService.validateClientAndGenerateKey(
        clientCode,
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
