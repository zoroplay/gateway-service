import { Injectable } from '@nestjs/common';
import {
  SwaggerUserDetailsRequest,
  SwaggerUserRequest,
} from '../identity/dto';

@Injectable()
export class UserService {
  loginUser(createUserDto: SwaggerUserRequest) {
    return 'This action adds a new user';
  }

  registerUser(createUserDto: SwaggerUserRequest) {
    return 'This action adds a new user';
  }

  updateUserDetails(createUserDto: SwaggerUserDetailsRequest) {
    return 'This action adds a new user';
  }

  createShopUser(
    createUserDto: SwaggerUserRequest & SwaggerUserDetailsRequest,
  ) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
