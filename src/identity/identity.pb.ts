/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "identity";

/** user */
export interface UserData {
  id: number;
  username: string;
  balance?: number | undefined;
  code?: string | undefined;
  firstName?: string | undefined;
  lastName?: string | undefined;
  email?: string | undefined;
  phone?: string | undefined;
  role?: string | undefined;
  roleId?: number | undefined;
  availableBalance?: number | undefined;
  sportBonusBalance?: number | undefined;
  casinoBonusBalance?: number | undefined;
  virtualBonusBalance?: number | undefined;
  trustBalance?: number | undefined;
  token: string;
  registered: string;
  authCode: string;
}

export interface CreateUserRequest {
  clientId: number;
  username: string;
  password: string;
  email?: string | undefined;
  roleId?: number | undefined;
  firstName?: string | undefined;
  lastName?: string | undefined;
  phoneNumber?: string | undefined;
  gender?: string | undefined;
  dateOfBirth?: string | undefined;
  country?: string | undefined;
  state?: string | undefined;
  city?: string | undefined;
  address?: string | undefined;
  language?: string | undefined;
  currency?: string | undefined;
  parent?: number | undefined;
  promoCode?: string | undefined;
}

/** user */
export interface User {
  userID: string;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  country: string;
  gender: string;
  currency: string;
  phone: string;
  roleId: string;
}

export interface RegisterResponse {
  status: number;
  success: boolean;
  data: UserData | undefined;
  error?: string | undefined;
}

/** Login */
export interface LoginRequest {
  clientId: number;
  username: string;
  password: string;
}

export interface LoginResponse {
  status: number;
  success: boolean;
  data: UserData | undefined;
  error?: string | undefined;
}

export interface GetUserDetailsRequest {
  clientId: number;
  userId: number;
}

export interface GetUserDetailsResponse {
  status: number;
  success: boolean;
  message: string;
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

export interface ClientRequest {
  name: string;
  country: string;
  currency: string;
  apiUrl: string;
  webUrl: string;
  mobileUrl: string;
  shopUrl: string;
  contactNumber: string;
  contactEmail: string;
  clientID: string;
}

export interface RemoveClientRequest {
  clientID: string;
}

export interface RemovePermissionRequest {
  permissionID: string;
}

export interface RoleRequest {
  name: string;
  description?: string | undefined;
  roleType: string;
  roleID?: string | undefined;
}

export interface SaveRoleResponse {
  status: boolean;
  message: string;
  data: Role | undefined;
  errors?: string | undefined;
}

export interface GetRolesResponse {
  status: boolean;
  message: string;
  data: Role[];
  errors?: string | undefined;
}

export interface RemoveRoleRequest {
  roleID: string;
}

export interface Role {
  id: number;
  name: string;
  description: string;
  roleType: string;
}

export interface PermissionRequest {
  name: string;
  description: string;
  permissionID: string;
}

export interface GetPaymentDataRequest {
  clientId: number;
  userId: number;
  source: string;
}

export interface GetPaymentDataResponse {
  username: string;
  email: string;
  callbackUrl: string;
}

export interface GetClientRequest {
  id: number;
}

export interface GetClientResponse {
  status: boolean;
  message: string;
  data: ClientData | undefined;
  errors?: string | undefined;
}

export interface CommonResponse {
  status: boolean;
  message: string;
  data: string[];
  errors?: string | undefined;
}

export interface DeleteResponse {
  status: boolean;
  message: string;
}

export interface GetUsersResponse {
  status: boolean;
  message: string;
}

export interface ClientData {
  name: string;
  country: string;
  currency: string;
  website: string;
  contactNumber: string;
  contactEmail: string;
}

export interface EmptyRequest {
}

export const IDENTITY_PACKAGE_NAME = "identity";

export interface IdentityServiceClient {
  register(request: CreateUserRequest): Observable<RegisterResponse>;

  login(request: LoginRequest): Observable<LoginResponse>;

  validate(request: ValidateRequest): Observable<ValidateResponse>;

  getUserDetails(request: GetUserDetailsRequest): Observable<GetUserDetailsResponse>;

  createClient(request: ClientRequest): Observable<CommonResponse>;

  createPermission(request: PermissionRequest): Observable<CommonResponse>;

  saveRole(request: RoleRequest): Observable<SaveRoleResponse>;

  getRoles(request: EmptyRequest): Observable<GetRolesResponse>;

  removeRole(request: RemoveRoleRequest): Observable<DeleteResponse>;

  findAllPermissions(request: EmptyRequest): Observable<CommonResponse>;

  findAllClients(request: EmptyRequest): Observable<CommonResponse>;

  removeClient(request: RemoveClientRequest): Observable<CommonResponse>;

  removePermission(request: RemovePermissionRequest): Observable<CommonResponse>;

  updateDetails(request: User): Observable<CommonResponse>;

  createRetailUser(request: CreateUserRequest): Observable<CommonResponse>;

  createAdminUser(request: CreateUserRequest): Observable<CommonResponse>;

  getAdminUsers(request: EmptyRequest): Observable<GetUsersResponse>;

  getClient(request: GetClientRequest): Observable<GetClientResponse>;

  getPaymentData(request: GetPaymentDataRequest): Observable<GetPaymentDataResponse>;
}

export interface IdentityServiceController {
  register(request: CreateUserRequest): Promise<RegisterResponse> | Observable<RegisterResponse> | RegisterResponse;

  login(request: LoginRequest): Promise<LoginResponse> | Observable<LoginResponse> | LoginResponse;

  validate(request: ValidateRequest): Promise<ValidateResponse> | Observable<ValidateResponse> | ValidateResponse;

  getUserDetails(
    request: GetUserDetailsRequest,
  ): Promise<GetUserDetailsResponse> | Observable<GetUserDetailsResponse> | GetUserDetailsResponse;

  createClient(request: ClientRequest): Promise<CommonResponse> | Observable<CommonResponse> | CommonResponse;

  createPermission(request: PermissionRequest): Promise<CommonResponse> | Observable<CommonResponse> | CommonResponse;

  saveRole(request: RoleRequest): Promise<SaveRoleResponse> | Observable<SaveRoleResponse> | SaveRoleResponse;

  getRoles(request: EmptyRequest): Promise<GetRolesResponse> | Observable<GetRolesResponse> | GetRolesResponse;

  removeRole(request: RemoveRoleRequest): Promise<DeleteResponse> | Observable<DeleteResponse> | DeleteResponse;

  findAllPermissions(request: EmptyRequest): Promise<CommonResponse> | Observable<CommonResponse> | CommonResponse;

  findAllClients(request: EmptyRequest): Promise<CommonResponse> | Observable<CommonResponse> | CommonResponse;

  removeClient(request: RemoveClientRequest): Promise<CommonResponse> | Observable<CommonResponse> | CommonResponse;

  removePermission(
    request: RemovePermissionRequest,
  ): Promise<CommonResponse> | Observable<CommonResponse> | CommonResponse;

  updateDetails(request: User): Promise<CommonResponse> | Observable<CommonResponse> | CommonResponse;

  createRetailUser(request: CreateUserRequest): Promise<CommonResponse> | Observable<CommonResponse> | CommonResponse;

  createAdminUser(request: CreateUserRequest): Promise<CommonResponse> | Observable<CommonResponse> | CommonResponse;

  getAdminUsers(request: EmptyRequest): Promise<GetUsersResponse> | Observable<GetUsersResponse> | GetUsersResponse;

  getClient(request: GetClientRequest): Promise<GetClientResponse> | Observable<GetClientResponse> | GetClientResponse;

  getPaymentData(
    request: GetPaymentDataRequest,
  ): Promise<GetPaymentDataResponse> | Observable<GetPaymentDataResponse> | GetPaymentDataResponse;
}

export function IdentityServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "register",
      "login",
      "validate",
      "getUserDetails",
      "createClient",
      "createPermission",
      "saveRole",
      "getRoles",
      "removeRole",
      "findAllPermissions",
      "findAllClients",
      "removeClient",
      "removePermission",
      "updateDetails",
      "createRetailUser",
      "createAdminUser",
      "getAdminUsers",
      "getClient",
      "getPaymentData",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("IdentityService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("IdentityService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const IDENTITY_SERVICE_NAME = "IdentityService";
