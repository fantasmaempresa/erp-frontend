import { EntityDto } from '../../core/interfaces/Entity.dto';

export interface ClientLinkDto extends EntityDto {
  email: string;

  phone: string;

  nickname: string;

  address: string;

  rfc: string;

  profession: string;

  degree: string;

  client_id: number;
}
