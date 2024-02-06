import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class LoginDTO {
    @ApiProperty({ description: 'Unique username to sign in', example: 'admin' })
    @IsNotEmpty()
    username: string;

    @ApiProperty({ description: 'Unique password for provided username', example: 'password' })
    @IsNotEmpty()
    password: string;
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
    @ApiProperty({ description: '[]' })
    data?: [];
    @ApiProperty({ description: 'error message' })
    error?: string;
  }
  
  