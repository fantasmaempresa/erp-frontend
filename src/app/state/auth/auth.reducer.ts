import { Action, createReducer, on } from '@ngrx/store';
import { loginFailure, loginStart, loginSuccess, logout } from './auth.actions';
import { AuthState, initialState } from './auth.state';

const AuthReducer = createReducer(
  initialState,
  on(loginStart, (state): AuthState => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(loginSuccess, (state, action) => {
    return {
      ...state,
      tokens: action.tokens,
      user: action.user,
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
// eslint-disable-next-line @typescript-eslint/default-param-last
export function authReducer(state = initialState, action: Action) {
  return AuthReducer(state, action);
}
