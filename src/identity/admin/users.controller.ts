import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AddToSegmentRequest, ClientRequest, DeleteItemRequest, FetchPlayerSegmentRequest, IDENTITY_SERVICE_NAME, IdentityServiceClient, SaveSegmentRequest, protobufPackage } from '../identity.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { SwaggerAddToSegmentRequest, SwaggerSaveClientRequest, SwaggerSaveSegmentRequest } from '../dto/admin.dto';
import { SwaggerCommonResponse } from '../dto';

@ApiTags('BackOffice APIs')
@Controller('admin')
export class UsersController {
    private svc: IdentityServiceClient;

    @Inject(protobufPackage)
    private readonly client: ClientGrpc;

    public onModuleInit(): void {
        this.svc = this.client.getService<IdentityServiceClient>(IDENTITY_SERVICE_NAME);
    }

    @Post('/clients')
    @ApiOperation({
        summary: 'Save SBE Client info',
        description: 'This endpoint is used to save or update SBE client info',
    })
    @ApiBody({ type: SwaggerSaveClientRequest })
    @ApiOkResponse({ type: SwaggerCommonResponse })
    saveClient(@Body() body: ClientRequest) {
        return this.svc.createClient(body);
    }

    @Get('clients')
    @ApiOperation({
        summary: 'Fetch SBE Clients',
        description: 'This endpoint is used to get lists  of all SBE clients',
    })
    @ApiOkResponse({ type: SwaggerCommonResponse })
    fetchClients() {
        // return this.svc.getClients({});
    }


    @Get('users/player-segments')
    @ApiOperation({
        summary: 'Fetch all Player Segments',
        description: 'This endpoint is used to get lists  of all player segments for a clients',
    })
    @ApiOkResponse({ type: SwaggerCommonResponse })
    @ApiQuery({ name: 'clientId', description: 'SBE Client ID' })
    fetchPlayerSegments(
        @Query() clientId: FetchPlayerSegmentRequest
    ) {
        return this.svc.fetchPlayerSegment(clientId);
    }

    @Post('users/player-segments')
    @ApiOperation({
        summary: 'Save Player Segment',
        description: 'This endpoint is used to save or update player segment for a client',
    })
    @ApiBody({ type: SwaggerSaveSegmentRequest })
    @ApiOkResponse({ type: SwaggerCommonResponse })
    savePlayerSegment(@Body() body: SaveSegmentRequest) {
        return this.svc.savePlayerSegment(body);
    }

    @Patch('users/add-to-segments')
    @ApiOperation({
        summary: 'Add Player to Segment',
        description: 'This endpoint is used to add a user to a particular segment',
    })
    @ApiBody({ type: SwaggerAddToSegmentRequest })
    @ApiOkResponse({ type: SwaggerCommonResponse })
    addToSegment(@Body() body: AddToSegmentRequest) {
        return this.svc.addToSegment(body);
    }

    @Delete('users/delete-segment/:id')
    @ApiOperation({
        summary: 'Delete Player Segment',
        description: 'This endpoint is used to delete a particular segment',
    })
    @ApiParam({ name: 'id', description: 'ID to be deleted' })
    @ApiOkResponse({ type: SwaggerCommonResponse })
    deleteSegment(@Param() id: DeleteItemRequest) {
        return this.svc.deletePlayerSegment(id);
    }

    @Delete('users/segments/remove-player/:id')
    @ApiOperation({
        summary: 'Remove Player from a Segment',
        description: 'This endpoint is used to delete a particular segment',
    })
    @ApiParam({ name: 'id', description: 'ID to be deleted' })
    @ApiOkResponse({ type: SwaggerCommonResponse })
    removePlayerFromSegment(@Param() id: DeleteItemRequest) {
        return this.svc.removePlayerFromSegment(id);
    }
    

}
