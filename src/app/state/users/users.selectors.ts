import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState } from './users.state';

const selectUsersState = createFeatureSelector<UsersState>('users');

export const selectUsers = createSelector(selectUsersState, (state) => {
  return state.users;
});
