import { BaseModel, BaseModelSchema } from '../base';
import OAuthCredentials from './OAuthCredentials';

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum UserRole {
  ROOT = 'root',
  USER = 'user',
}

export interface UserSchema extends BaseModelSchema {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  role?: UserRole;
  status?: UserStatus;
  virtual?: boolean;
  credentials?: OAuthCredentials;
  createdAt?: Date;
  updatedAt?: Date;
}

export default class User extends BaseModel implements UserSchema {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  role?: UserRole;
  status?: UserStatus;
  virtual?: boolean = false;
  credentials?: OAuthCredentials;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(data: UserSchema) {
    super(data);
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
    this.role = data.role;
    this.status = data.status;
    this.virtual = (data.credentials && data.credentials.virtual) ?
      data.credentials.virtual :
      (data.virtual || this.virtual);

    // Relationship attributes enforcing
    this.credentials = (data.credentials ? (
      data.credentials instanceof OAuthCredentials ? data.credentials : new OAuthCredentials(data.credentials)
    ) : undefined);
  }
}
