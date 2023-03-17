import { UserDto } from './User.dto';
import { EntityDto } from 'o2c_core';

export interface ClientDto extends EntityDto {
  email: string;

  phone: string;

  nickname: string;

  address: string;

  rfc: string;

  extra_information: string;

  type: number;

  user?: UserDto;
}
