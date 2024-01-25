import { PartialType } from '@nestjs/swagger';
import { SwaggerUserDetailsRequest } from './create-user.dto';

export class UpdateUserDto extends PartialType(SwaggerUserDetailsRequest) {}
