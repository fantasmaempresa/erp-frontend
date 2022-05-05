import { Action, createReducer, on } from '@ngrx/store';
import * as RolesActions from './role.actions';
import { rolesInitialState, RoleState } from './role.state';

const RoleReducer = createReducer(
  rolesInitialState,
  on(RolesActions.loadRoles, (state) => state),
  on(RolesActions.loadRolesSuccess, (state: RoleState, { roles }) => {
    return {
      ...state,
      roles,
    };
  }),
  on(RolesActions.emptyRoleList, (state) => {
    return rolesInitialState;
  }),
);

export function roleReducer(state = rolesInitialState, action: Action) {
  return RoleReducer(state, action);
}
