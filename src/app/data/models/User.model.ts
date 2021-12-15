import { EntityModel } from '../../core/interfaces/EntityModel';

export interface User extends EntityModel {
  name: string;
  email: string;
  password?: string;
  config: object;
  role_id: number;
}
