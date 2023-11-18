import { ApiProperty } from '@nestjs/swagger';

export class SwaggerFilterBySportID {
  @ApiProperty({ description: 'ID of the Sport' })
  sportID: number;
}

export class SwaggerCreateBonusRequest {
  @ApiProperty({ description: 'ID of the client' })
  clientId: number;

  @ApiProperty({ description: 'Bonus amount to award' })
  bonusAmount: number;

  @ApiProperty({ description: 'Bonus value' })
  maxValue: number;
}
