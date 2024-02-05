import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  IdentityServiceClient,
  IDENTITY_SERVICE_NAME,
  LoginRequest,
  LoginResponse, protobufPackage, CreateUserRequest,
} from '../identity.pb';
import { ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { LoginDTO, SwaggerCommonResponse, SwaggerRegisterRequest  } from '../dto';

@ApiTags('Auth APIs')
@Controller('auth')
export class AuthController implements OnModuleInit {
  private svc: IdentityServiceClient;

  @Inject(protobufPackage)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<IdentityServiceClient>(IDENTITY_SERVICE_NAME);
  }

  @Post('/register')
  @ApiOperation({
    summary: 'register user',
    description: 'This endpoint registers players from clients web portal',
  })
  @ApiBody({ type: SwaggerRegisterRequest })
  @ApiOkResponse({ type: SwaggerCommonResponse })
  registerUser(@Body() body: CreateUserRequest) {
    return this.svc.register(body);
  }

  @Post('/login')
  @ApiOperation({
    summary: 'login user',
    description: 'This endpoint logs in a user',
  })
  @ApiBody({ type: LoginDTO })
  @ApiOkResponse({ type: SwaggerCommonResponse })
  loginUser(@Body() data: LoginRequest) {
    return this.svc.login(data);
  }

  @Get('/details/:client_id')
  @ApiOperation({
    summary: 'get user details',
    description: 'This endpoint retrieves authenticated user details',
  })
  @ApiParam({
    name: 'client_id',
    type: 'number',
    description: ' Unique ID of the client',
  })
  @ApiOkResponse({ type: SwaggerCommonResponse })
  getAuthDetails(
    @Req() req, 
    @Param() param
  ) {
    return this.svc.getUserDetails({clientId: param.client_id, userId: 0});
  }
}
