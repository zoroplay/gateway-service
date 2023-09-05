import { ApiProperty } from '@nestjs/swagger';

export class DeleteItemDto {
  @ApiProperty({ example: 'q3342342342342323' })
  id: string;
}
