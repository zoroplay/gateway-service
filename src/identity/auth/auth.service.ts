import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {
  IdentityServiceClient,
  IDENTITY_SERVICE_NAME,
  ValidateResponse,
  protobufPackage,
  GetUserByUsernameRequest,
  GetUserByUsernameResponse,
  ValidateClientResponse,
} from '../identity.pb';

@Injectable()
export class AuthService {
  private svc: IdentityServiceClient;

  @Inject(protobufPackage)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<IdentityServiceClient>(IDENTITY_SERVICE_NAME);
  }

  public async validate(token: string): Promise<ValidateResponse> {
    return firstValueFrom(this.svc.validate({ token }));
  }

  public async validateClient(token: string): Promise<ValidateClientResponse> {
    return firstValueFrom(this.svc.validateClient({ token }));
  }

  public async validateUser(data: GetUserByUsernameRequest): Promise<GetUserByUsernameResponse> {
    return firstValueFrom(this.svc.getUserByUsername(data));
  }
}
