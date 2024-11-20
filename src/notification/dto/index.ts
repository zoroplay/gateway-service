import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class SwaggerSendSMSRequest {
  @ApiProperty({ description: 'ID' })
  msisdn: string;

  @ApiProperty({ description: 'ID of the sender' })
  senderID: string;

  @ApiProperty({ description: 'Text tp be sent' })
  text: string;

  @ApiProperty({ description: 'ID' })
  mode: string;

  @ApiProperty({ description: 'ID of the sender' })
  name: string;

  @ApiProperty({ description: 'Text tp be sent' })
  from: string;

  @ApiProperty({ description: 'ID' })
  status: number;

  @ApiProperty({ description: 'Phone numbers of the receiver' })
  phoneNumbers: string[];

  @ApiProperty({ description: 'ID of the sender' })
  lists: string[];

  @ApiProperty({ description: 'Text tp be sent' })
  schedule: string;

  @ApiProperty({ description: 'ID of the sender' })
  channel: string;

  @ApiProperty({ description: 'operator of the reciever' })
  operator: string;

  @ApiProperty({ description: 'Text tp be sent' })
  campaignType: string;

  @ApiProperty({ description: 'SBE Client ID' })
  clientID: number;
}

export class SwaggerSendSMSResponse {
  @ApiProperty({ description: 'Message' })
  message: number;

  @ApiProperty({ description: 'Request status' })
  status: boolean;
}

export class SwaggerSendOtpRequest {
  @ApiProperty({ description: 'SBE Client ID' })
  @IsNotEmpty()
  clientID: number;

  @ApiProperty({ description: 'Phone number' })
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({ description: 'Operator', example: 'VODACOM'})
  @IsOptional()
  operator: string;
}

export class SwaggerVerifyOtpRequest {
  @ApiProperty({ description: 'SBE Client ID' })
  @IsNotEmpty()
  clientID: number;

  @ApiProperty({ description: 'Phone number' })
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({ description: 'OTP' })
  @IsNotEmpty()
  code: string;
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

  data: SMSSetting[];
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
