import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class SaveRoleRequest {
    @ApiProperty({ description: 'Name of role', example: 'admin' })
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'Role type/category', example: 'admin|agency|player' })
    @IsNotEmpty()
    roleType: string;

    @ApiProperty({ description: 'Role description', example: '' })
    description?: string;

    roleID?: string;
}

export class SwaggerSaveClientRequest {
    @ApiProperty({ description: 'Name of client' })
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'Country of Client' })
    country: string;

    @ApiProperty({ description: 'Default Currency' })
    currency: string;

    @ApiProperty({ description: 'Client website URL' })
    website?: string;

    @ApiProperty({ description: 'Contact number',  })
    contactNumber?: string;

    @ApiProperty({ description: 'Contact email',  })
    contactEmail: string;

    @ApiProperty({ description: 'Client ID incase for editting',  })
    clientID?: number;
}