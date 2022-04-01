import { createAction, props } from '@ngrx/store';
import { Pagination } from '../../core/interfaces/Pagination.model';
import { User } from '../../data/models/User.model';

export enum UsersActions {
  LOAD_USERS = '[Users] Load users',
  LOAD_USERS_SUCCESS = '[Users] Load users success',
  LOAD_NEXT_PAGE = '[Users] Load next page',
  ADD_USER = '[Users] Add user',
  CHANGE_USER = '[Users] Change of user status',
  START_LISTEN_USERS = '[Users] Start to Listen for users',
  STOP_LISTEN_USERS = '[Users] Stop to listen for users',
  DO_NOTHING = '[Users] Return state',
  EMPTY_USER_LIST = '[Users] Empty user list',
}

export const loadUsers = createAction(UsersActions.LOAD_USERS);
export const loadUsersSuccess = createAction(
  UsersActions.LOAD_USERS_SUCCESS,
  props<{ users: Pagination<User> }>(),
);
export const changeUser = createAction(UsersActions.CHANGE_USER, props<{ user: User }>());

export const loadNextPageOfUsers = createAction(
  UsersActions.LOAD_NEXT_PAGE,
  props<{ page: number; size: number }>(),
);

export const emptyUsersList = createAction(UsersActions.EMPTY_USER_LIST);
export const startToListenUsers = createAction(UsersActions.START_LISTEN_USERS);
export const stopToListenUsers = createAction(UsersActions.STOP_LISTEN_USERS);
export const doNothing = createAction(UsersActions.DO_NOTHING);
