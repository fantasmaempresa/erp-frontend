import { createAction, props } from '@ngrx/store';
import { UserAuthDto } from '../../data/dto/UserAuth.dto';
import { TokensDto } from '../../data/dto/Tokens.dto';

export enum AuthActions {
  LOGIN_START = '[Auth] Login start',
  LOGIN_LOADING = '[Auth] Login loading',
  LOGIN_SUCCESS = '[Auth] Login success',
  LOGIN_FAIL = '[Auth] Login Fail',
  LOGOUT = '[Auth] Logout',
  CLEAN_ERROR = '[Auth] Clean error',
  CLEAN_LOADING = '[Auth] Clean loading',
}

export const loginStart = createAction(
  AuthActions.LOGIN_START,
  props<{ username: string; password: string }>(),
);
export const loginLoading = createAction(
  AuthActions.LOGIN_LOADING,
  props<{ status: boolean }>(),
);
export const loginSuccess = createAction(
  AuthActions.LOGIN_SUCCESS,
  props<{ tokens: TokensDto; user: UserAuthDto }>(),
);
export const loginFailure = createAction(
  AuthActions.LOGIN_FAIL,
  props<{ isLoading: boolean; errorMessage: string }>(),
);
export const logout = createAction(AuthActions.LOGOUT);
export const cleanError = createAction(AuthActions.CLEAN_ERROR);
export const cleanLoading = createAction(AuthActions.CLEAN_LOADING);
