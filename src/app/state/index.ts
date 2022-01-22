import { ActionReducerMap } from '@ngrx/store';
import { AuthState } from './auth/auth.state';
import { authReducer } from './auth/auth.reducer';
import { ClientsState } from './clients/clients.state';
import { clientReducer } from './clients/clients.reducer';

export interface AppState {
  auth: AuthState;
  clients: ClientsState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  clients: clientReducer,
};
