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