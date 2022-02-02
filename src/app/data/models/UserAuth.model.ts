import { EntityModel } from '../../core/interfaces/EntityModel';
import { Role } from './Role.model';
import { Staff } from './Staff.model';

export interface UserAuthModel extends EntityModel {
  name: string;
  email: string;
  email_verified_at: null;
  config: null;
  role_id: number;
  role: Role;
  client: null;
  staff: Staff;
}
