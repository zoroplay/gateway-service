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
  UseGuards,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  IdentityServiceClient,
  IDENTITY_SERVICE_NAME,
  LoginRequest,
  LoginResponse, protobufPackage, CreateUserRequest, UpdateUserRequest,
} from '../identity.pb';
import { ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { LoginDTO, SwaggerCommonResponse, SwaggerRegisterRequest, SwaggerUserDetailsRequest  } from '../dto';
import { AuthGuard } from './auth.guard';
import { IAuthorizedRequest } from 'src/interfaces/authorized-request.interface';

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
    description: 'This endpoint authenticates a user',
  })
  @ApiBody({ type: LoginDTO })
  @ApiOkResponse({ type: SwaggerCommonResponse })
  loginUser(@Body() data: LoginRequest) {
    return this.svc.login(data);
  }

  @UseGuards(AuthGuard)
  @Put('/update/details')
  @ApiOperation({
    summary: 'Update user',
    description: 'This endpoint logs in a user',
  })
  @ApiBody({ type: SwaggerUserDetailsRequest })
  @ApiOkResponse({ type: SwaggerCommonResponse })
  updateUser(
    @Body() data: UpdateUserRequest,
    @Req() req: IAuthorizedRequest
  ) {
    data.userId = req.user.id;
    return this.svc.updateUserDetails(data);
  }

  @UseGuards(AuthGuard)
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
    @Req() req: IAuthorizedRequest, 
    @Param() param
  ) {
    return this.svc.getUserDetails({clientId: param.client_id, userId: req.user.id});
  }
}
