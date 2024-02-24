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

export class SwaggerOnlinePlayersRequest {

    @ApiProperty({ description: 'SBE Client ID', example: 1 })
    @IsNotEmpty()
    clientId: number;

    @ApiProperty({ description: 'Username', example: '079323023' })
    username?: string;

    @ApiProperty({ description: 'Country to list players', example: 'Nigeria' })
    country?: string;

    @ApiProperty({ description: 'State to list players', example: 'Lagos' })
    state?: string;

    @ApiProperty({ description: 'SBE client platform (Web/Mobile/Retail', example: 'mobile' })
    source?: string;

    @ApiProperty({ description: 'Current Page', example: 1 })
    page?: number;

    @ApiProperty({ description: 'No. of rows per page', example: 100 })
    limit?: number;
}

export class SwaggerRegistrationReportRequest {

    @ApiProperty({ description: 'SBE Client ID', example: 1 })
    @IsNotEmpty()
    clientId: number;

    @ApiProperty({ description: 'Start date', example: '2024-02-01 00:00' })
    from?: string;

    @ApiProperty({ description: 'End Date', example: '2024-02-01 23:59' })
    to?: string;

    @ApiProperty({ description: 'SBE client platform (Web/Mobile/Retail', example: 'mobile' })
    source?: string;

    @ApiProperty({ description: 'Current Page', example: 1 })
    page?: number;

    @ApiProperty({ description: 'No. of rows per page', example: 100 })
    limit?: number;
}


export class SwaggerOnlinePlayersResponse {
    @ApiProperty({ description: 'Current start page', example: 1 })
    from: number;

    @ApiProperty({ description: 'Current end row number', example: 100 })
    to: number;

    @ApiProperty({ description: 'Total number of records', example: 245 })
    total: number;

    @ApiProperty({ description: 'Current page', example: 1 })
    currentPage: number;

    @ApiProperty({ description: 'No. of records per page', example: 100 })
    perPage: number;

    @ApiProperty({ description: 'Current start page', example: [] })
    data: Player [];
}

interface Player {
    id: number;
    code: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    registered: string;
    country: string;
    currency: string;
    status: number;
    verified: number;
    balance: number;
    bonus: number;
    lifeTimeDeposit: number;
    lifeTimeWithdrawal: number;
    openBets: number;
    role: string;
  }