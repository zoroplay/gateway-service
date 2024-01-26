import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Post,
  Put,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  IdentityServiceClient,
  IDENTITY_SERVICE_NAME,
  LoginRequest,
  LoginResponse, protobufPackage,
} from '../identity.pb';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDTO, SwaggerCommonResponse, SwaggerUserRequest  } from '../dto';

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
  @ApiBody({ type: SwaggerUserRequest })
  @ApiOkResponse({ type: SwaggerCommonResponse })
  registerUser(@Body() body: SwaggerUserRequest) {
    // return this.svc.sportRegister(body);
  }

  @Post('/login')
  @ApiOperation({
    summary: 'login user',
    description: 'This endpoint logs in a user',
  })
  @ApiBody({ type: SwaggerUserRequest })
  @ApiOkResponse({ type: SwaggerCommonResponse })
  loginUser(@Body() createUserDto: LoginRequest) {
    return this.svc.login(createUserDto);
  }

  @Get('/details')
  @ApiOperation({
    summary: 'get user details',
    description: 'This endpoint retrieves authenticated user details',
  })
  @ApiOkResponse({ type: SwaggerCommonResponse })
  getAuthDetails() {
    // return this.svc.getDetails();
  }
}
