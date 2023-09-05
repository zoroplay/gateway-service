import { IUser } from './user.interface';

export interface IAuthorizedRequest extends Request {
  user?: IUser;
}
