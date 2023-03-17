import { createAction, props } from '@ngrx/store';
import { Pagination } from '../../core/interfaces';
import { RoleDto } from '../../data/dto';

export enum RolesActions {
  LOAD_ROLES = '[Roles] Load roles',
  LOAD_ROLES_SUCCESS = '[Roles] Load roles success',
  LOAD_NEXT_PAGE = '[Roles] Load next page',
  EMPTY_ROLES_LIST = '[Roles] Empty roles list',
  ADD_ROLES = '[Roles] Add roles',
}

export const loadRoles = createAction(RolesActions.LOAD_ROLES);
export const loadRolesSuccess = createAction(
  RolesActions.LOAD_ROLES_SUCCESS,
  props<{ roles: Pagination<RoleDto> }>(),
);

export const loadNextPageOfRoles = createAction(
  RolesActions.LOAD_NEXT_PAGE,
  props<{ page: number; size: number }>(),
);
export const emptyRoleList = createAction(RolesActions.EMPTY_ROLES_LIST);
