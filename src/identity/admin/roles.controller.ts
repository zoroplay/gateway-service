import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { IDENTITY_SERVICE_NAME, IdentityServiceClient, protobufPackage } from '../identity.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { SaveRoleRequest } from '../dto/admin.dto';
import { SwaggerCommonResponse } from '../dto';

@ApiTags('BackOffice APIs')
@Controller('admin')
export class RolesController {
    private svc: IdentityServiceClient;

    @Inject(protobufPackage)
    private readonly client: ClientGrpc;

    public onModuleInit(): void {
        this.svc = this.client.getService<IdentityServiceClient>(IDENTITY_SERVICE_NAME);
    }

    @Post('/roles')
    @ApiOperation({
        summary: 'Save Roles',
        description: 'This endpoint is used to create or update roles',
    })
    @ApiBody({ type: SaveRoleRequest })
    @ApiOkResponse({ type: SwaggerCommonResponse })
    saveRole(@Body() body: SaveRoleRequest) {
        return this.svc.saveRole(body);
    }


    @Get('/roles')
    @ApiOperation({
        summary: 'Fetch all Roles',
        description: 'This endpoint is fetch all system roles',
    })
    @ApiOkResponse({ type: SwaggerCommonResponse })
    fetchRoles() {
        return this.svc.getRoles({});
    }

    
}
