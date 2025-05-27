/* eslint-disable prettier/prettier */
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
  GetUserDetailsRequest,
  GetUserDetailsResponse,
  CreateUserRequest,
  RegisterResponse,
  LoginRequest,
  LoginResponse,
  UpdateUserRequest,
  UpdateUserResponse,
  ChangePasswordRequest,
  ResetPasswordRequest,
  GetSettingsRequest,
  CommonResponseObj,
  HandlePinRequest,
  HandleTransferRequest,
  GetAllLogsRequest,
  GetAllLogsResponse,
  CreateLogRequest,
  CreateLogResponse,
  ValidateGroupCodeResponse,
} from 'src/interfaces/identity.pb';

@Injectable()
export class AuthService {
  private svc: IdentityServiceClient;

  @Inject(protobufPackage)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<IdentityServiceClient>(
      IDENTITY_SERVICE_NAME,
    );
  }

  public async handleTransfer(
    data: HandleTransferRequest,
  ): Promise<CommonResponseObj> {
    return firstValueFrom(this.svc.handleTransfer(data));
  }

  public async handlePin(data: HandlePinRequest): Promise<CommonResponseObj> {
    return firstValueFrom(this.svc.handlePin(data));
  }

  public async doRegister(data: CreateUserRequest): Promise<RegisterResponse> {
    return firstValueFrom(this.svc.register(data));
  }

  public async doLogin(data: LoginRequest): Promise<LoginResponse> {
    return firstValueFrom(this.svc.login(data));
  }

  public async updateUser(
    data: UpdateUserRequest,
  ): Promise<UpdateUserResponse> {
    return firstValueFrom(this.svc.updateUserDetails(data));
  }

  public async createUser(data: CreateUserRequest) {
    return firstValueFrom(this.svc.createRetailUser(data));
  }

  public async validate(token: string): Promise<ValidateResponse> {
    return firstValueFrom(this.svc.validate({ token }));
  }
  public async validateClient(token: string): Promise<ValidateClientResponse> {
    return firstValueFrom(this.svc.validateClient({ token }));
  }

  public async validateGroupCode(
    clientId: number,
  ): Promise<ValidateGroupCodeResponse> {
    return firstValueFrom(this.svc.validateGroupCode({ id: clientId }));
  }
  public async getUserDetails(
    data: GetUserDetailsRequest,
  ): Promise<GetUserDetailsResponse> {
    return firstValueFrom(this.svc.getUserDetails(data));
  }

  public async validateUser(
    data: GetUserByUsernameRequest,
  ): Promise<GetUserByUsernameResponse> {
    return firstValueFrom(this.svc.getUserByUsername(data));
  }

  public async changePassword(
    data: ChangePasswordRequest,
  ): Promise<UpdateUserResponse> {
    return firstValueFrom(this.svc.changePassword(data));
  }

  public async resetPassword(
    data: ResetPasswordRequest,
  ): Promise<UpdateUserResponse> {
    return firstValueFrom(this.svc.resetPassword(data));
  }

  public async getVariables(
    data: GetSettingsRequest,
  ): Promise<CommonResponseObj> {
    return firstValueFrom(this.svc.getGlobalVariables(data));
  }

  public async createLog(data: CreateLogRequest): Promise<CreateLogResponse> {
    return firstValueFrom(this.svc.createLog(data));
  }
  public async getAllLogs(
    data: GetAllLogsRequest,
  ): Promise<GetAllLogsResponse> {
    return firstValueFrom(this.svc.getAllLogs(data));
  }
}
