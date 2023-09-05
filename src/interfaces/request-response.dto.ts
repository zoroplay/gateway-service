import { ApiProperty } from '@nestjs/swagger';

export class IRequestResponse {
  @ApiProperty({ example: 'success message' })
  message: string;

  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({
    example: {
      name: 'test task',
      email: 'user@email.com',
      created_at: +new Date(),
      updated_at: +new Date(),
      id: '5d987c3bfb881ec86b476bcc',
    },
    nullable: true,
  }) // eslint-disable-next-line @typescript-eslint/ban-types
  data: object;

  @ApiProperty({ example: 'null' })
  errors: { [key: string]: any };
}
