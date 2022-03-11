import { EntityModel } from '../../core/interfaces/EntityModel';

export interface ClientLink extends EntityModel {
  name: string;
  email: string;
  phone: string;
  nickname: string;
  address: string;
  rfc: string;
  profession: string;
  degree: string;
  client_id: number;
}
