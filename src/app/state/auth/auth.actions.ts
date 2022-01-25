import { createAction, props } from '@ngrx/store';
import { AuthResponse } from '../../data/models/AuthResponse.model';

export enum AuthActions {
  LOGIN_START = '[Auth] Login start',
  LOGIN_SUCCESS = '[Auth] Login success',
  AUTO_LOGIN = '[Auth] Auto login',
  LOGIN_FAIL = '[Auth] Login Fail',
  LOGOUT = '[Auth] Logout',
}

export const loginStart = createAction(
  AuthActions.LOGIN_START,
  props<{ username: string; password: string }>(),
);
export const loginSuccess = createAction(
  AuthActions.LOGIN_SUCCESS,
  props<{ tokens: AuthResponse }>(),
);
export const autoLogin = createAction(AuthActions.AUTO_LOGIN);
export const loginFailure = createAction(
  AuthActions.LOGIN_FAIL,
  props<{ payload?: any; hasError?: boolean }>(),
);
export const logout = createAction(AuthActions.LOGOUT);
