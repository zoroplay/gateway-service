import {
  Body,
  Controller,
  Get,
  Query,
  Ip,
  Req,
  Inject,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  CreateUserRequest,
  IDENTITY_SERVICE_NAME,
  IdentityServiceClient,
  protobufPackage,
} from 'src/interfaces/identity.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { SaveRoleRequest } from '../dto/admin.dto';
import { SwaggerCommonResponse } from '../dto';
import { GetAllLogsDTO, GetUserLogsDTO } from '../dto/audit.dto';
import { GetAllLogsRequest } from 'src/interfaces/identity.pb';
import { IAuthorizedRequest } from 'src/interfaces/authorized-request.interface';
import { UAParser } from 'ua-parser-js';

@ApiTags('BackOffice APIs')
@Controller('admin')
export class RolesController {
  private svc: IdentityServiceClient;

  @Inject(protobufPackage)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<IdentityServiceClient>(
      IDENTITY_SERVICE_NAME,
    );
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

  @Get('/roles/agency')
  @ApiOperation({
    summary: 'Fetch all Agency Roles',
    description: 'This endpoint is fetch all system roles',
  })
  @ApiOkResponse({ type: SwaggerCommonResponse })
  agencyRoles() {
    return this.svc.getAgencyRoles({});
  }

  @Post('/create-admin-user')
  @ApiOperation({
    summary: 'Create Admin User',
    description: 'This endpoint is used to create an admin user',
  })
  @ApiOkResponse({ type: SwaggerCommonResponse })
  createAdminUser(@Body() body: CreateUserRequest) {
    return this.svc.createAdminUser(body);
  }

  @Post('/get_all_logs')
  @ApiOperation({
    summary: 'get client variables',
    description: 'This endpoint retrieves all the audits',
  })
  @ApiBody({ type: GetAllLogsDTO })
  @ApiOkResponse({ type: SwaggerCommonResponse })
  getAllLogs(
    @Body() data: GetAllLogsRequest,
    @Req() req: IAuthorizedRequest,
    @Query() query: any,
    @Ip() ip: any,
  ) {
    try {
      const parser = new UAParser();
      const userAgent = req.headers['user-agent'] || 'unknown';
      const ua = parser.setUA(userAgent);

      data.ipAddress = ip;
      data.os = String(ua.getOS()) || 'unknown';
      data.browser = String(ua.getBrowser()) || 'unknown';
      data.platform = String(ua.getDevice()) || 'unknown';
      data.method = req.method;
      data.endpoint = req.url;
      data.auditQuery = query || {};

      return this.svc.getAllLogs(data);
    } catch (err) {
      console.log(err);
    }
  }
}
