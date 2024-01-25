import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

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

  @ApiProperty({ description: 'Request status'})
  status: boolean
}


export class SwaggerSendOtpRequest {
  @ApiProperty({ description: 'SBE Client ID' })
  @IsNotEmpty()
  client: number;

  @ApiProperty({ description: 'Phone number' })
  @IsNotEmpty()
  phoneNumber: string;
}

export class SaveSMSSettingsRequest {
  @ApiProperty({ description: 'ID' })
  settingsID?: string;

  @ApiProperty({ description: 'SBE Client ID' })
  clientId: number;

  @ApiProperty({ description: 'Enable' })
  enable: boolean;

  @ApiProperty({ description: 'Display Name' })
  displayName: string;

  @ApiProperty({ description: 'Gateway Id' })
  gatewayName: string;

  @ApiProperty({ description: 'Sender Id' })
  senderID: string;

  @ApiProperty({ description: 'API KEY' })
  apiKey: string;

  @ApiProperty({ description: 'Username' })
  username: string;

  @ApiProperty({ description: 'Password' })
  password: string;
}

export class SaveSMSSettingsResponse {
  @ApiProperty({ description: 'Message' })
  message: string;

  @ApiProperty({ description: 'Request Status (true or false)' })
  status: boolean;

  data?: SMSSetting;
}

export class GettSmsSettingsRequest {
  @ApiProperty({ description: 'SBE Client ID to fetch settings for' })
  client_id: number;
}

export class GettSmsSettingsResponse {
  @ApiProperty({ description: 'Message' })
  message: string;

  @ApiProperty({ description: 'Request Status (true or false)' })
  status: boolean;

  data: SMSSetting[]
}

interface SMSSetting {
  id: number;
  status: boolean;
  displayName: string;
  gatewayName: string;
  senderID: string;
  apiKey: string;
  username: string;
  password: string;
}