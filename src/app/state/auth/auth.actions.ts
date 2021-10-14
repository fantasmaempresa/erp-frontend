import { createAction } from '@ngrx/store';

export enum AuthActionsTypes {
  Login = '[Auth] Login',
}

export const Login = createAction(AuthActionsTypes.Login);
