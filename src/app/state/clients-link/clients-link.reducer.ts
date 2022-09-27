import { createReducer, on } from '@ngrx/store';
import { ClientsLinkState, initialState } from './clients-link.state';
import * as ClientActions from './clients-link.actions';

export const clientsLinkReducer = createReducer(
  initialState,
  on(ClientActions.loadClientsLink, (state): ClientsLinkState => state),
  on(
    ClientActions.loadClientsLinkSuccess,
    (state, { clientsLink }): ClientsLinkState => {
      return {
        ...state,
        clientsLink,
      };
    },
  ),
  on(ClientActions.emptyClientLinkList, (): ClientsLinkState => {
    return initialState;
  }),
);
