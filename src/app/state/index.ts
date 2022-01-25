import { ActionReducerMap } from '@ngrx/store';
import { AuthState, initialState } from './auth/auth.state';
import { authReducer } from './auth/auth.reducer';
import { ClientsState, initialState as clientsInitialState } from './clients/clients.state';
import { clientReducer } from './clients/clients.reducer';
import { initialState as staffInitialState, StaffState } from './staff/staff.state';
import { staffReducer } from './staff/staff.reducer';

export interface AppState {
  auth: AuthState;
  clients: ClientsState;
  staff: StaffState;
}

export const initialAppState: AppState = {
  auth: initialState,
  clients: clientsInitialState,
  staff: staffInitialState,
};

export function getInitialAppState(): AppState {
  return initialAppState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  clients: clientReducer,
  staff: staffReducer,
};
