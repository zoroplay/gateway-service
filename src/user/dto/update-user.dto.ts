import { PartialType } from '@nestjs/swagger';
import { SwaggerUserRequest } from './create-user.dto';

export class UpdateUserDto extends PartialType(SwaggerUserRequest) {}
