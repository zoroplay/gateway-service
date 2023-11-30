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

export class SwaggerSaveSettingsRequest {
  @ApiProperty({ description: 'ID' })
  settings_id: string;

  @ApiProperty({ description: 'Enable' })
  enable: boolean;

  @ApiProperty({ description: 'Display Name' })
  display_name: string;

  @ApiProperty({ description: 'Gateway Id' })
  gateway_name: string;

  @ApiProperty({ description: 'Sender Id' })
  sender_id: string;

  @ApiProperty({ description: 'API KEY' })
  api_key: string;

  @ApiProperty({ description: 'Username' })
  username: string;

  @ApiProperty({ description: 'Password' })
  password: string;
}

export class SwaggerSaveSettingsResponse {
  @ApiProperty({ description: 'Message' })
  message: number;
}
