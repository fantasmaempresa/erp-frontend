import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RoleState } from './role.state';

const selectRolesState = createFeatureSelector<RoleState>('roles');

export const selectRoles = createSelector(selectRolesState, (state) => {
  return state.roles;
});
