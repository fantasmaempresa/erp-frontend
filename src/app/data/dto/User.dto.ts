import { EntityDto } from 'o2c_core';
import { RoleDto } from './Role.dto';

export interface UserDto extends EntityDto {
  email: string;

  password?: string;

  config: object;

  role_id: number;

  online: number;

  role: RoleDto;
}
