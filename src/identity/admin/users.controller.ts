import { Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, Patch, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AddToSegmentRequest, ClientRequest, DeleteItemRequest, FetchPlayerSegmentRequest, GrantBonusRequest, IDENTITY_SERVICE_NAME, IdentityServiceClient, ResetPasswordRequest, SaveSegmentRequest, protobufPackage } from 'src/interfaces/identity.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { SwaggerAddToSegmentRequest, SwaggerGrantBonusToSegment, SwaggerSaveClientRequest, SwaggerSaveSegmentRequest } from '../dto/admin.dto';
import { SwaggerChangePasswordRequest, SwaggerCommonResponse } from '../dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { PATH_DOWNLOADED_FILE, SUPPORTED_FILES, multerOptions } from 'src/uploads';
import * as Excel from 'exceljs';

const getCellValue = (row:  Excel.Row, cellIndex: number) => {
    const cell = row.getCell(cellIndex);

    return cell.value ? cell.value.toString() : '';
};

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

    @Put('/users/change-password')
    @ApiOperation({
      summary: 'Update User Password',
      description: 'This endpoint lets you update/change user password',
    })
    @ApiBody({ type: SwaggerChangePasswordRequest })
    @ApiOkResponse({ type: SwaggerCommonResponse })
    updatePassword(
      @Body() data: ResetPasswordRequest,
    ) {
        console.log(data);
      return this.svc.resetPassword(data);
    }

    @Get('player-management/segments')
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

    @Post('player-management/segments')
    @ApiOperation({
        summary: 'Save Player Segment',
        description: 'This endpoint is used to save or update player segment for a client',
    })
    @ApiBody({ type: SwaggerSaveSegmentRequest })
    @ApiOkResponse({ type: SwaggerCommonResponse })
    savePlayerSegment(@Body() body: SaveSegmentRequest) {
        return this.svc.savePlayerSegment(body);
    }

    @Patch('player-management/segments/add-user')
    @ApiOperation({
        summary: 'Add Player to Segment',
        description: 'This endpoint is used to add a user to a particular segment',
    })
    @ApiBody({ type: SwaggerAddToSegmentRequest })
    @ApiOkResponse({ type: SwaggerCommonResponse })
    addToSegment(@Body() body: AddToSegmentRequest) {
        return this.svc.addToSegment(body);
    }

    @Post("/player-management/segment/:id/upload-players")
    @UseInterceptors(FileInterceptor('file', multerOptions))
    async upload(
        @UploadedFile() file: Express.Multer.File, 
        @Body() body,
        @Param() param,
    ) {
        if (!file) {    
            throw new HttpException(
                `Please provide correct file name with extension ${JSON.stringify(SUPPORTED_FILES)}`,
                400
            );
        }

        const workbook = new Excel.Workbook();
        const content = await workbook.xlsx.readFile(`${PATH_DOWNLOADED_FILE}/${file.filename}`);

        const worksheet = content.worksheets[0];
        const rowStartIndex = 2;
        const numberOfRows = worksheet.rowCount - 1;

        const rows = worksheet.getRows(rowStartIndex, numberOfRows) ?? [];

        const players = [];

        rows.forEach((row) => players.push(getCellValue(row,1)))

        if (players.length) {

            return this.svc.uploadToSegment({
                clientId: body.clientId,
                segmentId: param.id,
                players
            })
            
        } else {
            return {
                status: HttpStatus.BAD_REQUEST, 
                success: false, 
                message: 'No user was found in the document', 
            }
        }
    }

    @Get('player-management/segment/:id/get-players')
    @ApiOperation({
        summary: 'Get Players for Segment',
        description: 'This endpoint is used to fetch all players for a particular segment',
    })
    @ApiParam({ name: 'id', description: 'Segment ID' })
    @ApiOkResponse({ type: SwaggerCommonResponse })
    getPlayers(@Param() param) {
        console.log(param.id)
        return this.svc.getSegmentPlayers({segmentId: param.id});
    }

    @Delete('player-management/segment/:id/delete')
    @ApiOperation({
        summary: 'Delete Player Segment',
        description: 'This endpoint is used to delete a particular segment',
    })
    @ApiParam({ name: 'id', description: 'ID to be deleted' })
    @ApiOkResponse({ type: SwaggerCommonResponse })
    deleteSegment(@Param() id: DeleteItemRequest) {
        return this.svc.deletePlayerSegment(id);
    }

    @Delete('player-management/segments/remove-player/:id')
    @ApiOperation({
        summary: 'Remove Player from a Segment',
        description: 'This endpoint is used to delete a particular segment',
    })
    @ApiParam({ name: 'id', description: 'ID to be deleted' })
    @ApiOkResponse({ type: SwaggerCommonResponse })
    removePlayerFromSegment(@Param() id: DeleteItemRequest) {
        return this.svc.removePlayerFromSegment(id);
    }


    @Post('player-management/segments/:id/grant-bonus')
    @ApiOperation({
        summary: 'Grant Segment Bonus',
        description: 'This endpoint is used to assing mass bonus to players under a segment',
    })
    @ApiParam({name: 'segmentId', description: 'Segment ID'})
    @ApiBody({ type: SwaggerGrantBonusToSegment })
    @ApiOkResponse({ type: SwaggerCommonResponse })
    grantBonusToSegment(
        @Body() body: GrantBonusRequest,
        @Param() param
    ) {
        body.segmentId = param.id
        return this.svc.grantBonusToSegment(body);
    }
}
