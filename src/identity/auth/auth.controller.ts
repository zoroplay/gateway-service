import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  LoginRequest, CreateUserRequest, UpdateUserRequest, ChangePasswordRequest, ResetPasswordRequest, GetUserByUsernameRequest,
} from 'src/interfaces/identity.pb';
import { ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { LoginDTO, SwaggerChangePasswordRequest, SwaggerCommonResponse, SwaggerRegisterRequest, SwaggerResetPasswordRequest, SwaggerUserDetailsRequest, VerifyUsernameDTO  } from '../dto';
import { AuthGuard } from './auth.guard';
import { IAuthorizedRequest } from 'src/interfaces/authorized-request.interface';
import { AuthService } from './auth.service';

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
  updateUser(
    @Body() data: UpdateUserRequest,
    @Req() req: IAuthorizedRequest
  ) {
    data.userId = req.user.id;
    return this.authService.updateUser(data);
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
    return this.authService.getUserDetails({clientId: param.client_id, userId: req.user.id});
  }

  @Get('/globalvariables/:client_id')
  @ApiOperation({
    summary: 'get client variables',
    description: 'This endpoint retrieves the global variables of the SBE client',
  })
  @ApiParam({
    name: 'client_id',
    type: 'number',
    description: ' Unique ID of the client',
  })
  @ApiOkResponse({ type: SwaggerCommonResponse })
  getGlobalVariables(
    @Param() param
  ) {
    return this.authService.getVariables({clientId: param.client_id, category: null});
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
    @Req() req: IAuthorizedRequest
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
  resetPassword(
    @Body() data: ResetPasswordRequest,
  ) {
    return this.authService.resetPassword(data);
  }
}
