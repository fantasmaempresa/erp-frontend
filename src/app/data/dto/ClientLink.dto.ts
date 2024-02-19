import { EntityDto } from 'o2c_core';

export interface ClientLinkDto extends EntityDto {
  name: string;

  last_name: string;

  mother_last_name: string;

  email: string;

  phone: string;

  nickname: string;

  address: string;

  rfc: string;

  profession: string;

  degree: string;

  client_id: number;

  active?: number;
}
