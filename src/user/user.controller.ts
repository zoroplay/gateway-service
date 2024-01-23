import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  SwaggerCommonResponse,
  SwaggerUserDetailsRequest,
  SwaggerUserRequest,
} from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiBody, ApiOkResponse } from '@nestjs/swagger';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @Post('/register')
  @ApiOperation({
    summary: 'register user',
    description: 'This endpoint registers a user',
  })
  @ApiBody({ type: SwaggerUserRequest })
  @ApiOkResponse({ type: SwaggerCommonResponse })
  registerUser(@Body() createUserDto: SwaggerUserRequest) {
    return this.usersService.registerUser(createUserDto);
  }

  @Post('/login')
  @ApiOperation({
    summary: 'login user',
    description: 'This endpoint logs in a user',
  })
  @ApiBody({ type: SwaggerUserRequest })
  @ApiOkResponse({ type: SwaggerCommonResponse })
  loginUser(@Body() createUserDto: SwaggerUserRequest) {
    return this.usersService.loginUser(createUserDto);
  }

  @Put('/details')
  @ApiOperation({
    summary: 'update details',
    description: 'This endpoint creates the user_details of a user',
  })
  @ApiBody({ type: SwaggerUserDetailsRequest })
  @ApiOkResponse({ type: SwaggerCommonResponse })
  updateUserDetails(@Body() createUserDto: SwaggerUserDetailsRequest) {
    return this.usersService.updateUserDetails(createUserDto);
  }

  @Post('/shop')
  @ApiOperation({
    summary: 'create shop user',
    description: 'This endpoint creates a shop user',
  })
  @ApiBody({ type: SwaggerUserRequest as any & SwaggerUserDetailsRequest })
  @ApiOkResponse({ type: SwaggerCommonResponse })
  createShopUser(
    @Body() createUserDto: SwaggerUserRequest & SwaggerUserDetailsRequest,
  ) {
    return this.usersService.createShopUser(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
