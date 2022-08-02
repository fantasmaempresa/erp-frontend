import { Pagination } from '../../core/interfaces/Pagination.model';
import { RoleDto } from '../../data/dto/Role.dto';

export interface RoleState {
  roles: Pagination<RoleDto> | null;
}

export const rolesInitialState: RoleState = {
  roles: null,
};
