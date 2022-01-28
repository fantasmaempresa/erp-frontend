import { Action, createReducer, on } from '@ngrx/store';
import { loginFailure, loginStart, loginSuccess, logout } from './auth.actions';
import { initialState } from './auth.state';

const AuthReducer = createReducer(
  initialState,
  on(loginStart, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(loginSuccess, (state, action) => {
    return {
      ...state,
      tokens: action.tokens,
      isLoading: false,
      errorMessage: null,
    };
  }),
  on(loginFailure, (state, { isLoading, errorMessage }) => {
    return {
      ...state,
      isLoading,
      errorMessage,
    };
  }),
  on(logout, (state) => {
    return {
      ...state,
      tokens: null,
    };
  }),
);
export function authReducer(state = initialState, action: Action) {
  return AuthReducer(state, action);
}
