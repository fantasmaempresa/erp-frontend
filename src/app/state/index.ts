import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from './auth/auth.reducer';

export interface AppState {
  auth: fromAuth.AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
};
