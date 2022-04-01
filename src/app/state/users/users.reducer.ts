import { Action, createReducer, on } from '@ngrx/store';
import { initialState, UsersState } from './users.state';
import * as ClientActions from './users.actions';

const UsersReducer = createReducer(
  initialState,
  on(ClientActions.loadUsers, (state) => state),
  on(ClientActions.doNothing, (state) => state),
  on(ClientActions.startToListenUsers, (state) => state),
  on(ClientActions.stopToListenUsers, (state) => state),
  on(ClientActions.loadUsersSuccess, (state: UsersState, { users }) => {
    return {
      ...state,
      users,
    };
  }),
  // @ts-ignore
  on(ClientActions.changeUser, (state: UsersState, { user }) => {
    return {
      ...state,
      users: {
        ...state.users,
        data: state.users?.data.map((userItem) => {
          if (userItem.id === user.id) {
            return {
              ...user,
            };
          } else {
            return userItem;
          }
        }),
      },
    };
  }),
  on(ClientActions.emptyUsersList, () => {
    return initialState;
  }),
);

export function userReducer(state = initialState, action: Action) {
  return UsersReducer(state, action);
}
