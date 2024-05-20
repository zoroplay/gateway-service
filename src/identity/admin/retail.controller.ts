import { Body, Controller, Get, Inject, Param, Post, Query, Req } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateUserRequest, GetAgentUsersRequest, IDENTITY_SERVICE_NAME, IdentityServiceClient, protobufPackage } from '../identity.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { SwaggerCommonResponse, SwaggerUserDetailsRequest } from '../dto';
import { IAuthorizedRequest } from 'src/interfaces/authorized-request.interface';

@ApiTags('BackOffice APIs')
@Controller('admin/retail')
export class RetailController {
    private svc: IdentityServiceClient;

    @Inject(protobufPackage)
    private readonly client: ClientGrpc;

    public onModuleInit(): void {
        this.svc = this.client.getService<IdentityServiceClient>(IDENTITY_SERVICE_NAME);
    }

    @Post(':clientId/create-user')
    @ApiOperation({
        summary: 'Create User',
        description: 'This endpoint is used to create retail user',
    })
    @ApiParam({name: 'clientId', description: 'SBE Client ID'})
    @ApiBody({ type: SwaggerUserDetailsRequest })
    @ApiOkResponse({ type: SwaggerCommonResponse })
    saveRole(
        @Body() body: CreateUserRequest,
        @Param('clientId') clientId: number,
    ) {
        body.clientId = clientId;
        return this.svc.createRetailUser(body);
    }

    @Post(':clientId/agents')
    @ApiOperation({
        summary: 'Create User',
        description: 'This endpoint is used to create retail user',
    })
    @ApiParam({name: 'clientId', description: 'SBE Client ID'})
    @ApiBody({ type: SwaggerUserDetailsRequest })
    @ApiOkResponse({ type: SwaggerCommonResponse })
    listAgents(
        @Body() body: GetAgentUsersRequest,
        @Param('clientId') clientId: number,
        @Req() req: IAuthorizedRequest,
    ) {
        body.clientId = clientId;
        return this.svc.listAgents(body);
    }

    @Get(':clientId/agent-users')
    @ApiOperation({
        summary: 'List Agent Users',
        description: 'This users for an agent',
    })
    @ApiParam({name: 'clientId', description: 'SBE Client ID'})
    @ApiQuery({name: 'agentId', description: 'Agent ID'})
    @ApiOkResponse({ type: SwaggerCommonResponse })
    listAgentUsers(
        @Body() body: GetAgentUsersRequest,
        @Param('clientId') clientId: number,
        @Query('agentId') agentId: number,
        @Req() req: IAuthorizedRequest,
    ) {
        body.clientId = clientId;
        body.userId = agentId || req.user.id;

        console.log(body);
        return this.svc.listAgentUsers(body);
    }

    
}
