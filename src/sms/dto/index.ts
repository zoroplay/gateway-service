import { ApiProperty } from '@nestjs/swagger';

export class SwaggerSendSMSRequest {
  @ApiProperty({ description: 'ID' })
  msisdn: number;

  @ApiProperty({ description: 'ID of the sender' })
  senderId: number;

  @ApiProperty({ description: 'Text tp be sent' })
  text: number;
}

export class SwaggerSendSMSResponse {

  @ApiProperty({ description: 'Message' })
  message: number;

}