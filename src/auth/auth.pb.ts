/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "auth";

/** user */
export interface UserData {
  id: number;
  username: string;
  email: string;
}

/** send otp */
export interface SendOtpRequest {
  username: string;
  type: string;
}

export interface SendOtpResponse {
  status: number;
  success: boolean;
  message: string;
  error: string;
}

/** Register */
export interface SportBookRegisterRequest {
  username: string;
  password: string;
  phone: string;
}

export interface SportBookRegisterResponse {
  status: number;
  error: string;
  data: UserData | undefined;
}

/** Login */
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  status: number;
  error: string;
  token: string;
  data: UserData | undefined;
}

/** Validate */
export interface ValidateRequest {
  token: string;
}

export interface ValidateResponse {
  status: number;
  error: string;
  userId: number;
}

export const AUTH_PACKAGE_NAME = "auth";

export interface AuthServiceClient {
  sportRegister(request: SportBookRegisterRequest): Observable<SportBookRegisterResponse>;

  login(request: LoginRequest): Observable<LoginResponse>;

  validate(request: ValidateRequest): Observable<ValidateResponse>;

  sendOtp(request: SendOtpRequest): Observable<SendOtpResponse>;
}

export interface AuthServiceController {
  sportRegister(
    request: SportBookRegisterRequest,
  ): Promise<SportBookRegisterResponse> | Observable<SportBookRegisterResponse> | SportBookRegisterResponse;

  login(request: LoginRequest): Promise<LoginResponse> | Observable<LoginResponse> | LoginResponse;

  validate(request: ValidateRequest): Promise<ValidateResponse> | Observable<ValidateResponse> | ValidateResponse;

  sendOtp(request: SendOtpRequest): Promise<SendOtpResponse> | Observable<SendOtpResponse> | SendOtpResponse;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["sportRegister", "login", "validate", "sendOtp"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const AUTH_SERVICE_NAME = "AuthService";
