import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SegmentFilterDTO {
  @ApiProperty({
    description: 'Client ID',
    example: '63278-dkjhw7-kdhwe-32389',
  })
  @IsNotEmpty()
  clientId: string;
  @ApiProperty({
    description: 'Earliest date of registration',
    example: '2024-03-07T16:42:34+0000',
  })
  @IsNotEmpty()
  startDate: string;
  @ApiProperty({
    description: 'Earliest date of registration',
    example: '2024-03-07T16:42:34+0000',
  })
  @IsNotEmpty()
  endDate: string;
  @ApiProperty({
    description: 'Type of Filter',
    example: 1,
  })
  @IsNotEmpty()
  filterType: number;
  @ApiProperty({
    description: 'Minimum deposit amount',
    example: '100',
  })
  minAmount: number;
  @ApiProperty({
    description: 'Maximum deposit amount',
    example: '1000000',
  })
  maxAmount: number;
  @ApiProperty({
    description: 'Number of Deposit made',
    example: '10',
  })
  depositCount: number;
}
