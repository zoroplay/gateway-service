import { ApiProperty } from '@nestjs/swagger';

export class SwaggerSendSMSRequest {
  @ApiProperty({ description: 'ID' })
  msisdn: number;

  @ApiProperty({ description: 'ID of the sender' })
  senderId: number;

  @ApiProperty({ description: 'Text tp be sent' })
  text: number;

  @ApiProperty({ description: 'ID' })
  mode: number;

  @ApiProperty({ description: 'ID of the sender' })
  name: number;

  @ApiProperty({ description: 'Text tp be sent' })
  from: number;

  @ApiProperty({ description: 'ID' })
  status: number;

  @ApiProperty({ description: 'ID of the sender' })
  list: number;

  @ApiProperty({ description: 'Text tp be sent' })
  schedule: number;

  @ApiProperty({ description: 'ID of the sender' })
  channel: number;

  @ApiProperty({ description: 'Text tp be sent' })
  campaign_type: number;
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
