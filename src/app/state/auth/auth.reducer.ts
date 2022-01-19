import { Action, createReducer, on } from '@ngrx/store';
import { loginSuccess, logout } from './auth.actions';
import { initialState } from './auth.state';

const AuthReducer = createReducer(
  initialState,
  on(loginSuccess, (state, action) => {
    return {
      ...state,
      tokens: action.tokens,
    };
  }),
  on(logout, (state, action) => {
    return {
      ...state,
      tokens: null,
    };
  }),
);
export function authReducer(state = initialState, action: Action) {
  return AuthReducer(state, action);
}
