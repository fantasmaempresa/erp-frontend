import { UserDto } from './User.dto';
import { EntityDto } from 'o2c_core';
import { DocumentDto } from "./Document.dto";

export interface ClientDto extends EntityDto {
  name: string;

  last_name: string;

  mother_last_name: string;

  email: string;

  phone: string;

  nickname: string;

  address: string;

  rfc: string;

  extra_information: string;

  type: number;

  user?: UserDto;

  documents?: DocumentDto[];
}
