import { Pagination } from '../../core/interfaces';
import { RoleDto } from '../../data/dto';

export interface RoleState {
  roles: Pagination<RoleDto> | null;
}

export const rolesInitialState: RoleState = {
  roles: null,
};
