import { User } from './User.model';
import { EntityModel } from '../../core/interfaces/EntityModel';

export interface Client extends EntityModel {
  name: string;
  email: string;
  phone: string;
  nickname: string;
  address: string;
  rfc: string;
  extra_information: string;
  type: number;
  user?: User;
}
