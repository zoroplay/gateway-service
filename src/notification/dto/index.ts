import { ApiProperty } from '@nestjs/swagger';

export class SwaggerSendSMSRequest {
  @ApiProperty({ description: 'ID' })
  msisdn: number;

  @ApiProperty({ description: 'ID of the sender' })
  senderID: number;

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
  lists: string[];

  @ApiProperty({ description: 'Text tp be sent' })
  schedule: number;

  @ApiProperty({ description: 'ID of the sender' })
  channel: number;

  @ApiProperty({ description: 'Text tp be sent' })
  campaignType: number;
}

export class SwaggerSendSMSResponse {
  @ApiProperty({ description: 'Message' })
  message: number;
}

export class SwaggerSaveSettingsRequest {
  @ApiProperty({ description: 'ID' })
  settingsID: string;

  @ApiProperty({ description: 'Enable' })
  enable: boolean;

  @ApiProperty({ description: 'Display Name' })
  displayName: string;

  @ApiProperty({ description: 'Gateway Id' })
  gatewayName: string;

  @ApiProperty({ description: 'Sender Id' })
  senderID: string;

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
