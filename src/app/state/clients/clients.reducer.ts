import { Action, createReducer, on } from '@ngrx/store';
import { ClientsState, initialState } from './clients.state';
import * as ClientActions from './clients.actions';

const ClientsReducer = createReducer(
  initialState,
  on(ClientActions.loadClients, (state) => state),
  on(ClientActions.loadClientsSuccess, (state: ClientsState, { clients }) => {
    return {
      ...state,
      clients,
    };
  }),
  on(ClientActions.emptyClientList, (state) => {
    return initialState;
  }),
);

export function clientReducer(state = initialState, action: Action) {
  return ClientsReducer(state, action);
}
