import { User } from './User.model';
import { EntityModel } from '../../core/interfaces/EntityModel';

export interface Staff extends EntityModel {
  id: number;
  name: string;
  email: string;
  phone: string;
  nickname: string;
  extra_information: string;
  user?: User;
}
