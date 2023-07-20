import { UserDto } from './User.dto';
import { EntityDto } from 'o2c_core';

export interface StaffDto extends EntityDto {
  name: string;
  last_name: string;
  mother_last_name: string;
  email: string;
  phone: string;
  nickname: string;
  extra_information: string;
  user?: UserDto;
}
