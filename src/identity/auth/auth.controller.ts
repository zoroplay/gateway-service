import { of } from 'rxjs';
/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  Headers,
} from '@nestjs/common';
import {
  LoginRequest,
  CreateUserRequest,
  UpdateUserRequest,
  ChangePasswordRequest,
  ResetPasswordRequest,
  GetUserByUsernameRequest,
  HandlePinRequest,
  HandleTransferRequest,
  GetAllLogsRequest,
} from 'src/interfaces/identity.pb';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import {
  LoginDTO,
  SwaggerChangePasswordRequest,
  SwaggerCommonResponse,
  SwaggerHandlePinRequest,
  SwaggerHandleTransferRequest,
  SwaggerRegisterRequest,
  SwaggerResetPasswordRequest,
  SwaggerUserDetailsRequest,
  VerifyUsernameDTO,
} from '../dto';
import { AuthGuard } from './auth.guard';
import { IAuthorizedRequest } from 'src/interfaces/authorized-request.interface';
import { AuthService } from './auth.service';
import { NotificationService } from 'src/notification/notification.service';
import { GetAllLogsDTO, GetUserLogsDTO } from '../dto/audit.dto';
import { Ip } from '@nestjs/common';
import { UAParser } from 'ua-parser-js';
import { query } from 'express';

@ApiTags('Auth APIs')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @ApiOperation({
    summary: 'register user',
    description: 'This endpoint registers players from clients web portal',
  })
  @ApiBody({ type: SwaggerRegisterRequest })
  @ApiOkResponse({ type: SwaggerCommonResponse })
  registerUser(@Body() body: CreateUserRequest) {
    return this.authService.doRegister(body);
  }

  @Post('/login')
  @ApiOperation({
    summary: 'login user',
    description: 'This endpoint authenticates a user',
  })
  @ApiBody({ type: LoginDTO })
  @ApiOkResponse({ type: SwaggerCommonResponse })
  loginUser(@Body() data: LoginRequest) {
    return this.authService.doLogin(data);
  }

  @Get('/list-all-test-accounts')
  @ApiOperation({
    summary: 'List all test accounts',
    description: 'This endpoint retrieves a list of all test accounts',
  })
  @ApiBody({ type: SwaggerHandleTransferRequest })
  listTestAccounts(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Headers('sbe-client-id') clientId: number = 4,
  ) {
    const data = {
      page: page,
      perPage: limit,
      total: 0,
      clientId: clientId,
    };
    return this.authService.listTestAccounts(data);
  }

  @Get('/toggle-account/:accountId')
  @ApiOperation({
    summary: 'Validate Test Account',
    description: 'This endpoint validates a test account by its ID',
  })
  validateTestAccount(@Param() params) {
    const { accountId } = params;
    const data = {
      accountId,
    };
    return this.authService.ToggleTestAccount(data);
  }

  @Post('/verify-username')
  @ApiOperation({
    summary: 'Verify Username',
    description: 'This endpoint is use to verify a username',
  })
  @ApiBody({ type: VerifyUsernameDTO })
  @ApiOkResponse({ type: SwaggerCommonResponse })
  verifyUsername(@Body() data: GetUserByUsernameRequest) {
    return this.authService.validateUser(data);
  }

  @UseGuards(AuthGuard)
  @Put('/update/details')
  @ApiOperation({
    summary: 'Update user',
    description: 'This endpoint logs in a user',
  })
  @ApiBody({ type: SwaggerUserDetailsRequest })
  @ApiOkResponse({ type: SwaggerCommonResponse })
  updateUser(@Body() data: UpdateUserRequest, @Req() req: IAuthorizedRequest) {
    data.userId = req.user.id;
    return this.authService.updateUser(data);
  }

  @UseGuards(AuthGuard)
  @Put('/initiate-transfer/:client_id')
  @ApiOperation({
    summary: 'transfer amount to user',
    description: 'This endpoint logs in a user',
  })
  @ApiBody({ type: SwaggerHandleTransferRequest })
  @ApiParam({
    name: 'client_id',
    type: 'number',
    description: ' Unique ID of the client',
  })
  @ApiOkResponse({ type: SwaggerCommonResponse })
  handleTransfer(
    @Body() data: HandleTransferRequest,
    @Req() req: IAuthorizedRequest,
    @Param('client_id') param: number,
  ) {
    return this.authService.handleTransfer({
      ...data,
      fromUserId: req.user.id,
      clientId: param,
    });
  }

  @UseGuards(AuthGuard)
  @Put('/handle/pin/:action')
  @ApiOperation({
    summary: 'create/update user pin',
    description: 'This endpoint logs in a user',
  })
  @ApiBody({ type: SwaggerHandlePinRequest })
  @ApiOkResponse({ type: SwaggerCommonResponse })
  handlePin(
    @Body() data: HandlePinRequest,
    @Req() req: IAuthorizedRequest,
    @Param('action') param,
  ) {
    data.userId = req.user.id;
    return this.authService.handlePin({
      ...data,
      userId: req.user.id,
      type: param,
    });
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
  getAuthDetails(@Req() req: IAuthorizedRequest, @Param() param) {
    return this.authService.getUserDetails({
      clientId: param.client_id,
      userId: req.user.id,
    });
  }

  @Get('/globalvariables/:client_id')
  @ApiOperation({
    summary: 'get client variables',
    description:
      'This endpoint retrieves the global variables of the SBE client',
  })
  @ApiParam({
    name: 'client_id',
    type: 'number',
    description: ' Unique ID of the client',
  })
  @ApiOkResponse({ type: SwaggerCommonResponse })
  getGlobalVariables(@Param() param) {
    return this.authService.getVariables({
      clientId: param.client_id,
      category: null,
    });
  }

  @UseGuards(AuthGuard)
  @Put('/update/password')
  @ApiOperation({
    summary: 'Update User Password',
    description: 'This endpoint lets you update/change user password',
  })
  @ApiBody({ type: SwaggerChangePasswordRequest })
  @ApiOkResponse({ type: SwaggerCommonResponse })
  updatePassword(
    @Body() data: ChangePasswordRequest,
    @Req() req: IAuthorizedRequest,
  ) {
    data.userId = req.user.id;
    return this.authService.changePassword(data);
  }

  @Patch('/update/reset-password')
  @ApiOperation({
    summary: 'Reset User Password',
    description: 'This endpoint lets you reset user password',
  })
  @ApiBody({ type: SwaggerResetPasswordRequest })
  @ApiOkResponse({ type: SwaggerCommonResponse })
  resetPassword(@Body() data: ResetPasswordRequest) {
    return this.authService.resetPassword(data);
  }
}
