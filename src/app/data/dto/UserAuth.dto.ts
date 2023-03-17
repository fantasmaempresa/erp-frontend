import { EntityDto } from 'o2c_core';
import { RoleDto } from './Role.dto';
import { StaffDto } from './Staff.dto';
import { ClientDto } from './Client.dto';

export interface UserAuthDto extends EntityDto {
  name: string;
  email: string;
  email_verified_at: Date;
  config: object;
  role_id: number;
  role: RoleDto;
  client?: ClientDto;
  staff: StaffDto;
}
