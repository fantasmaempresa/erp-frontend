import { createReducer, on } from '@ngrx/store';
import { ClientsState, initialState } from './clients.state';
import * as ClientActions from './clients.actions';

export const clientsReducer = createReducer(
  initialState,
  on(ClientActions.loadClients, (state): ClientsState => state),
  on(ClientActions.loadClientsSuccess, (state, { clients }): ClientsState => {
    return {
      ...state,
      clients,
    };
  }),
  on(ClientActions.emptyClientList, (): ClientsState => {
    return initialState;
  }),
);
