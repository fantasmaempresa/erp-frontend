import { User } from './User.model';

export interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  nickname: string;
  address: string;
  rfc: string;
  extra_information: string;
  user?: User;
}
