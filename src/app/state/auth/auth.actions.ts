import { createAction, props } from '@ngrx/store';
import { UserAuthModel } from '../../data/models/UserAuth.model';
import { TokensModel } from '../../data/models/Tokens.model';

export enum AuthActions {
  LOGIN_START = '[Auth] Login start',
  LOGIN_LOADING = '[Auth] Login loading',
  LOGIN_SUCCESS = '[Auth] Login success',
  AUTO_LOGIN = '[Auth] Auto login',
  LOGIN_FAIL = '[Auth] Login Fail',
  LOGOUT = '[Auth] Logout',
  CLEAN_ERROR = '[Auth] Clean error',
  CLEAN_LOADING = '[Auth] Clean loading',
}

export const loginStart = createAction(
  AuthActions.LOGIN_START,
  props<{ username: string; password: string }>(),
);
export const loginLoading = createAction(AuthActions.LOGIN_LOADING, props<{ status: boolean }>());
export const loginSuccess = createAction(
  AuthActions.LOGIN_SUCCESS,
  props<{ tokens: TokensModel; user: UserAuthModel }>(),
);
export const autoLogin = createAction(AuthActions.AUTO_LOGIN);
export const loginFailure = createAction(
  AuthActions.LOGIN_FAIL,
  props<{ isLoading: boolean; errorMessage: string }>(),
);
export const logout = createAction(AuthActions.LOGOUT);
export const cleanError = createAction(AuthActions.CLEAN_ERROR);
export const cleanLoading = createAction(AuthActions.CLEAN_LOADING);
