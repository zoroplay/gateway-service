import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { AuthService } from 'src/identity/auth/auth.service';

@Injectable()
export class CryptoService {
  private readonly algorithm = 'aes-256-cbc';
  private readonly ivLength = 16; // AES block size

  constructor(private readonly authService: AuthService) {}

  async validateClientAndGenerateKey(
    clientCode: string,
    passedClientId: number,
  ): Promise<Buffer> {
    if (!clientCode) throw new Error('Client code is required');
    if (!passedClientId) throw new Error('Client ID is required');

    const client = await this.authService.validateGroupCode(clientCode);
    const { groupName, clientId } = client;

    if (groupName !== clientCode && clientId !== Number(passedClientId)) {
      throw new Error('Invalid client code or group name');
    }

    return crypto
      .createHash('sha256')
      .update(`${clientId.toString()}:${groupName.toString()}`)
      .digest();
  }

  encrypt(data: any, key: string): any {
    try {
      if (!data){ 
        console.log("entered here ======================>")
        return;
      }
      const iv = crypto.randomBytes(this.ivLength);
      const cipher = crypto.createCipheriv(
        this.algorithm,
        Buffer.from(key, 'hex'),
        iv,
      );
      console.log(data, '====> data fron encrypt');

      let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'hex');
      encrypted += cipher.final('hex');

      return { data: `${iv.toString('hex')}:${encrypted}` };
    } catch (error) {
      console.error('Encryption failed:', error);
      throw new Error('Encryption failed');
    }
  }

  decrypt(encryptedData: string, key: string): any {
    try {
      if (typeof encryptedData !== 'string' || !encryptedData.includes(':')) {
        throw new Error('Invalid encrypted data format');
      }

      const [ivHex, encrypted] = encryptedData.split(':');
      if (!ivHex || !encrypted) {
        throw new Error('Invalid encrypted data format');
      }

      const iv = Buffer.from(ivHex, 'hex');
      const decipher = crypto.createDecipheriv(
        this.algorithm,
        Buffer.from(key, 'hex'),
        iv,
      );

      let decrypted = decipher.update(encrypted, 'hex', 'utf8');
      decrypted += decipher.final('utf8');

      return JSON.parse(decrypted);
    } catch (error) {
      console.error('Decryption failed:', error.message);
      throw new Error('Decryption failed');
    }
  }
}
