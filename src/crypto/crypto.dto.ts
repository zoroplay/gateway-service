// decrypt.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DecryptDto {
  @ApiProperty({
    description: 'Encrypted data to be decrypted',
    example: 'kslkejikldkvd:elskmvle....',
  })
  @IsString()
  data: string;
}
