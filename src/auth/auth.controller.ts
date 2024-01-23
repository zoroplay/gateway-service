import {
  Body,
  Controller,
  Inject,
  OnModuleInit,
  Post,
  Put,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  AuthServiceClient,
  AUTH_SERVICE_NAME,
  LoginRequest,
  LoginResponse, SportBookRegisterRequest, SportBookRegisterResponse, protobufPackage,
} from './auth.pb';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDTO } from './dto';

@ApiTags('Auth APIs')
@Controller('auth')
export class AuthController implements OnModuleInit {
  private svc: AuthServiceClient;

  @Inject(protobufPackage)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  @Post('register')
  register(
    @Body() body: SportBookRegisterRequest,
  ){
    return this.svc.sportRegister(body);
  }

  @Post('login')
  @ApiOperation({
    summary: 'Get client Gaming activity for a period',
    description:
        'This endpoints retrieves a summary of bets placed for either sports, virtual or casino',
  })
  @ApiBody({ type: LoginDTO })
  login(
    @Body() body: LoginRequest,
  ) {
    return this.svc.login(body);
  }
}
