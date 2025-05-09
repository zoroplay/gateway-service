import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as dayjs from 'dayjs';
import { AuthService } from 'src/identity/auth/auth.service';

@Injectable()
export class CryptoService {
  private readonly algorithm = 'aes-256-cbc';
  private readonly ivLength = 16; // AES block size

  constructor(private readonly authService: AuthService) {}

  async validateClientAndGenerateKey(
    passedClientId: number
  ): Promise<Buffer> {
    // if (!clientCode) throw new Error('Client code is required');
    if (!passedClientId) throw new HttpException('Client ID is required', HttpStatus.BAD_REQUEST);

    const client = await this.authService.validateGroupCode(passedClientId);
    const { groupName, clientId } = client;

    if (clientId !== Number(passedClientId)) {
      throw new HttpException('Invalid client code or group name', HttpStatus.BAD_REQUEST);
    }

    return crypto
      .createHash('sha256')
      .update(`${clientId.toString()}:${groupName.toString()}`)
      .digest();
  }

  compareKeys(key: string, signature: string) {
    // Get the UNIX timestamp for 2 seconds ago for start time
    let start = dayjs().subtract(2, 'seconds').unix()//;
    // Get the current UNIX timestamp as a string
    const timestamp = dayjs().unix().toString();
    // Get the UNIX timestamp for 2 seconds ahead for end time
    const end = dayjs().add(2, 'seconds').unix().toString();

    console.log('timestamp is', timestamp);

    // loop through start and endtime to decrypt and get encrypted value
    for (let index = start; index <= parseInt(end); index++) {
      
      const encryptedTimeStamp = this.decrypt(signature, key);
      console.log('encrypted timestamp', encryptedTimeStamp)
      if (encryptedTimeStamp && encryptedTimeStamp === index.toString())
        return true
    }
    return false
  }

  encrypt(encryptData, hexKey) {
    try {
      // Get the current UNIX timestamp as a string
      // const timestamp = Math.floor(Date.now() / 1000).toString();
      console.log('encrypt data', encryptData);
  
      // Generate a random 16-byte IV
      const iv = crypto.randomBytes(this.ivLength);
  
      // Convert keyBuffer from hex to a Buffer
      const key = Buffer.from(hexKey, 'hex');
      // Create cipher instance
      const cipher = crypto.createCipheriv(this.algorithm, key, iv);
      cipher.setAutoPadding(true); // PKCS7 padding (enabled by default)
  
      // Encrypt the data
      let encrypted = cipher.update(encryptData, 'utf8', 'hex');
      encrypted += cipher.final('hex');
  
      // Combine IV and ciphertext
      const ivAndData = Buffer.concat([iv, Buffer.from(encrypted, 'hex')]);
      
      const signature =  ivAndData.toString('hex');

      console.log(`encrypted value`, signature);
      
      return signature;
    } catch (error) {
      console.error('Encryption failed:', error);
      // throw new Error('Encryption failed');
      return null
    }
  }

  // encrypt(key: string, signature): any {
  //   try {
  //     let start = dayjs().subtract(2, 'seconds').unix().toString();
  //     const timestamp = dayjs().unix().toString();
  //     const end = dayjs().add(2, 'seconds').unix().toString();
  //     console.log('timestamp is', timestamp);

      
      

  //     for (let index = parseInt(start); index <= parseInt(end); index++) {
        
  //       console.log('current timestamp', index);
  //       const iv = crypto.randomBytes(this.ivLength);
  //       const cipher = crypto.createCipheriv(
  //         this.algorithm,
  //         Buffer.from(key, 'hex'),
  //         iv,
  //       );
  //       // use current timestamp as encryption data
  //       let encrypted = cipher.update(index.toString(), 'utf8', 'hex');

  //       encrypted += cipher.final('hex');

  //       const ivAndData = Buffer.concat([iv, Buffer.from(encrypted, 'hex')]);
      
  //       const generatedKey =  ivAndData.toString('hex');

  //       console.log(`encrypted value`, generatedKey, signature);

  //       if (signature === generatedKey)
  //         return true;

  //     }

  //     return false;
  
  //   } catch (error) {
  //     console.error('Encryption failed:', error);
  //     throw new Error('Encryption failed');
  //   }
  // }

  decrypt(signature: string, hexKey: string): any {
    try {
      // Convert APP_KEY to buffer
        const key = Buffer.from(hexKey, 'hex');

        // Extract IV and ciphertext from signature
        const ivHex = signature.substring(0, 32); // 16 bytes = 32 hex chars
        const encryptedHex = signature.substring(32);

        const iv = Buffer.from(ivHex, 'hex');
        const encrypted = Buffer.from(encryptedHex, 'hex');

        // Create decipher
        const decipher = crypto.createDecipheriv(this.algorithm, key, iv);
        decipher.setAutoPadding(true); // PKCS7 padding

        // Decrypt the message
        let decrypted = decipher.update(encrypted, undefined, 'utf8');
        decrypted += decipher.final('utf8');

        console.log('Decrypted timestamp:', decrypted);
        return decrypted;
    } catch (error) {
      console.error('Decryption failed:', error.message);
      return null
    }
  }
}
