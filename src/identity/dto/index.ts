import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class LoginDTO {
    @ApiProperty({ description: 'SBE Platform Client ID' })
    clientId: number;

    @ApiProperty({ description: 'Unique username to sign in', example: 'admin' })
    @IsNotEmpty()
    username: string;

    @ApiProperty({ description: 'Unique password for provided username', example: 'password' })
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
  
    @ApiProperty({ description: 'International phone number format +234123456789'})
    phone?: string;

    @ApiProperty({ description: 'Promo code for bonus'})
    promoCode?: string;
  }
  
  export class SwaggerUserDetailsRequest {
    @ApiProperty({ description: 'userID' })
    userID!: string;
  
    @ApiProperty({ description: 'First Name' })
    firstName: string;
  
    @ApiProperty({ description: 'Last Name' })
    lastName: string;
  
    @ApiProperty({ description: 'Email' })
    email: string;
  
    @ApiProperty({ description: 'City' })
    city: string;
  
    @ApiProperty({ description: 'Country' })
    country: string;
  
    @ApiProperty({ description: 'Gender' })
    gender: string;
  
    @ApiProperty({ description: 'Currency' })
    currency: string;
  
    @ApiProperty({ description: 'Phone' })
    phone: string;
  
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
  
  