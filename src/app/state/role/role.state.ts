import { Pagination } from '../../core/interfaces/Pagination.model';
import { Role } from '../../data/models/Role.model';

export interface RoleState {
  roles: Pagination<Role> | null;
}

export const rolesInitialState: RoleState = {
  roles: null,
};
