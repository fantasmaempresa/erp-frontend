import { Action, createReducer, on } from '@ngrx/store';
import { initialState, UsersState } from './users.state';
import * as ClientActions from './users.actions';

const UsersReducer = createReducer(
  initialState,
  on(ClientActions.loadUsers, (state) => state),
  on(ClientActions.loadUsersSuccess, (state: UsersState, { users }) => {
    return {
      ...state,
      users,
    };
  }),
  on(ClientActions.emptyUsersList, () => {
    return initialState;
  }),
);

export function userReducer(state = initialState, action: Action) {
  return UsersReducer(state, action);
}
