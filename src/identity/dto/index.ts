/* eslint-disable prettier/prettier */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ValidateSelectionResponse_Data } from 'src/interfaces/fixture.pb';

export class LoginDTO {
  @ApiProperty({ description: 'SBE Platform Client ID' })
  clientId: number;

  @ApiProperty({ description: 'Unique username to sign in', example: 'admin' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'Unique password for provided username',
    example: 'password',
  })
  @IsNotEmpty()
  password: string;
}

export class VerifyUsernameDTO {
  @ApiProperty({ description: 'SBE Platform Client ID' })
  clientId: number;

  @ApiProperty({ description: 'Unique username to verify', example: 'admin' })
  @IsNotEmpty()
  username: string;
}

export class SwaggerRegisterRequest {
  @ApiProperty({ description: 'SBE Platform Client ID' })
  clientId: number;

  @ApiProperty({ description: 'Username' })
  username: string;

  @ApiProperty({ description: 'Password' })
  password: string;

  @ApiProperty({
    description: 'International phone number format +234123456789',
  })
  phone?: string;

  @ApiProperty({ description: 'Promo code for bonus' })
  promoCode?: string;

  @ApiProperty({ description: 'Trackier token' })
  trackingToken?: string;
}

export class SwaggerHandleTransferRequest {
  @ApiProperty({ description: 'pin' })
  pin: number;

  @ApiProperty({ description: 'To User Username' })
  toUsername: string;

  @ApiProperty({ description: '' })
  amount: number;
}

export class SwaggerHandlePinRequest {
  @ApiProperty({ description: 'pin' })
  pin: number;

  @ApiProperty({ description: 'confirmPin' })
  confirmPin?: string;

  @ApiProperty({ description: 'User ID' })
  userId: number;

  @ApiProperty({ description: "'create' | 'update'" })
  type: 'create' | 'update';
}

export class SwaggerUserDetailsRequest {
  @ApiProperty({ description: 'Client ID' })
  clientId?: string;

  @ApiProperty({ description: 'userID' })
  userId?: string;

  @ApiProperty({ description: 'User Name' })
  username?: string;

  @ApiProperty({ description: 'Password' })
  password?: string;

  @ApiProperty({ description: 'First Name' })
  firstName: string;

  @ApiProperty({ description: 'Last Name' })
  lastName: string;

  @ApiProperty({ description: 'Email' })
  email: string;

  @ApiProperty({ description: 'City' })
  city: string;

  @ApiProperty({ description: 'State' })
  state: string;

  @ApiProperty({ description: 'Country' })
  country: string;

  @ApiProperty({ description: 'Gender' })
  gender: string;

  @ApiProperty({ description: 'Date of Birth' })
  dateOfBirth: string;

  @ApiProperty({ description: 'Currency' })
  currency: string;

  @ApiProperty({ description: 'Phone' })
  phoneNumber: string;

  @ApiProperty({ description: 'Address' })
  address: string;

  @ApiProperty({ description: 'Language' })
  language: string;

  @ApiProperty({ description: 'Role ID' })
  roleId: string;
}

export class SwaggerCommonResponse {
  @ApiProperty({ description: 'Message' })
  message: string;
  @ApiProperty({ description: 'true || false' })
  status: boolean;
  @ApiProperty({ description: 'Array of users data' })
  data?: [];
  @ApiProperty({ description: 'error message' })
  error?: string;
}

export class SwaggerValidateSelectionResponse {
  @ApiProperty({ description: 'Message' })
  message: string;
  @ApiProperty({ description: 'true || false' })
  success: boolean;
  @ApiProperty({ description: 'Array of users data' })
  data?: ValidateSelectionResponse_Data

}

export class SwaggerChangePasswordRequest {
  @ApiProperty({ description: 'SBE Client ID' })
  clientId: number;
  @ApiProperty({ description: 'User current password' })
  oldPassword: string;
  @ApiProperty({ description: 'New password to be updated' })
  password: string;
}

export class SwaggerResetPasswordRequest {
  @ApiProperty({ description: 'SBE Client ID' })
  clientId: number;
  @ApiProperty({ description: 'User name' })
  username: string;
  @ApiProperty({ description: 'New password to be updated' })
  password: string;
}

export class SwaggerSettingsRequest {
  @ApiProperty({ description: 'SBE Client ID' })
  clientId: number;
  @ApiProperty({ description: 'Settings Category' })
  category?: string;
  @ApiProperty({ description: 'Period for betting parameters' })
  period?: string;
}

export class SwaggerGetUserByUsernmae {
  @ApiProperty({ description: 'UseID from OPay' })
  UserID: string;
}


export class SaveSettingsDto {
  @ApiPropertyOptional({ example: "1000" })
  @IsString()
  max_withdrawal: string;

  @ApiPropertyOptional({ example: "1000" })
  @IsString()
  min_withdrawal: string;

  @ApiPropertyOptional({ example: "" })
  @IsString()
  slider_speed: string;

  @ApiPropertyOptional({ example: "" })
  @IsString()
  allow_registration: string;

  @ApiPropertyOptional({ example: "" })
  @IsString()
  weekly_bonus: string;

  @ApiPropertyOptional({ example: "" })
  @IsString()
  announcement: string;

  @ApiPropertyOptional({ example: "" })
  @IsString()
  booking_duration: string;

  @ApiPropertyOptional({ example: "" })
  @IsString()
  max_event_weeks: string;

  @ApiPropertyOptional({ example: "" })
  @IsString()
  min_tipster_length: string;

  @ApiPropertyOptional({ example: "" })
  @IsString()
  currency_symbol: string;

  @ApiPropertyOptional({ example: "" })
  @IsString()
  min_deposit: string;

  @ApiPropertyOptional({ example: "" })
  @IsString()
  payment_day: string;

  @ApiPropertyOptional({ example: 1 })
  @IsNumber()
  ticket_type: number;

  @ApiPropertyOptional({ example: 1 })
  @IsNumber()
  enable_bank_account: number;

  @ApiPropertyOptional({ example: 1 })
  @IsNumber()
  auto_disbursement: number;

  @ApiPropertyOptional({ example: 1 })
  @IsNumber()
  auto_disbursement_min: number;

  @ApiPropertyOptional({ example: 1 })
  @IsNumber()
  auto_disbursement_max: number;

  @ApiPropertyOptional({ example: 1 })
  @IsNumber()
  auto_disbursement_per_day: number;

  @ApiPropertyOptional({ example: 1 })
  @IsNumber()
  uses_accts: number;

  @ApiPropertyOptional({ example: 1 })
  @IsNumber()
  liability_threshold: number;

  @ApiPropertyOptional({ example: 1 })
  @IsNumber()
  enable_elbet_user: number;

  @ApiPropertyOptional({ example: 1 })
  @IsNumber()
  allow_deposit_commission: number;

  @ApiPropertyOptional({ example: 1 })
  @IsNumber()
  allow_withdrawal_commission: number;

  @ApiPropertyOptional({ example: 1 })
  @IsNumber()
  deposit_commission_percent: number;

  @ApiPropertyOptional({ example: 1 })
  @IsNumber()
  withdrawal_commission_percent: number;

  @ApiPropertyOptional({ example: "Nigeria" })
  @IsString()
  country: string;

  @ApiPropertyOptional({ example: "NGN" })
  @IsString()
  currency_code: string;

  @ApiPropertyOptional({ example: "NGN" })
  @IsString()
  dial_code: string;

  @ApiPropertyOptional({ example: 1 })
  @IsNumber()
  enable_power_bonus: number;

  @ApiPropertyOptional({ example: "tuesday" })
  @IsString()
  power_bonus_start_day: string;

  @ApiPropertyOptional({ example: "" })
  @IsString()
  trackier_api_key: string;

  @ApiPropertyOptional({ example: "" })
  @IsString()
  trackier_auth_code: string;

  @ApiPropertyOptional({ example: 1 })
  @IsNumber()
  enable_tax: number;

  @ApiPropertyOptional({
    description: 'File to be uploaded with the settings',
    type: 'string',
    format: 'binary',
  })
  logo: any;

  @ApiPropertyOptional({
    description: 'File to be uploaded with the settings',
    type: 'string',
    format: 'binary',
  })
  print_logo: any;
}