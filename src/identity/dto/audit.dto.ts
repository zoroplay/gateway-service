import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GetAllLogsDTO {
  @ApiProperty({
    description: 'Client ID',
    example: '63278-dkjhw7-kdhwe-32389',
  })
  clientId: string;

  @ApiProperty({
    description: 'user ID',
    example: '2389',
  })
  userId: string;
}

export class GetUserLogsDTO {
  @ApiProperty({
    description: 'Client ID',
    example: '63278-dkjhw7-kdhwe-32389',
  })
  @IsNotEmpty()
  clientId: string;

  @ApiProperty({
    description: 'User ID',
    example: '32',
  })
  @IsNotEmpty()
  userId: string;
}
