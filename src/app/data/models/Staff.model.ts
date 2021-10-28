import { User } from './User.model';

export interface Staff {
  id: number;
  name: string;
  email: string;
  phone: string;
  nickname: string;
  extra_information: string;
  user?: User;
}
