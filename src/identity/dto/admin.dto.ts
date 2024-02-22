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

    @ApiProperty({ description: 'Client api URL' })
    apiUrl?: string;

    @ApiProperty({ description: 'Client website URL' })
    webUrl?: string;

    @ApiProperty({ description: 'Client mobile site URL' })
    mobileUrl?: string;

    @ApiProperty({ description: 'Client retail site URL' })
    shopUrl?: string;

    @ApiProperty({ description: 'Contact number',  })
    contactNumber?: string;

    @ApiProperty({ description: 'Contact email',  })
    contactEmail: string;

    @ApiProperty({ description: 'Client ID incase for editting',  })
    clientID?: number;
}


export class SwaggerSearchPlayerRequest {
    @ApiProperty({ description: 'Search Key', example: '079323023' })
    @IsNotEmpty()
    searchKey: string;

    @ApiProperty({ description: 'SBE Client ID', example: 1 })
    @IsNotEmpty()
    clientId: number;
}