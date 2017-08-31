import { Resource } from '../resource';

export class User extends Resource {
  public email: string;
  public firstName: string;
  public lastName: string;
  public newPassword: string;
  public newPasswordCheck: string;
}
