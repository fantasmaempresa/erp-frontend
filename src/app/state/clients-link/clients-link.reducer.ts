import { Action, createReducer, on } from '@ngrx/store';
import { ClientsLinkState, initialState } from './clients-link.state';
import * as ClientActions from './clients-link.actions';

const ClientsLinkReducer = createReducer(
  initialState,
  on(ClientActions.loadClientsLink, (state) => state),
  on(
    ClientActions.loadClientsLinkSuccess,
    (state: ClientsLinkState, { clientsLink }) => {
      return {
        ...state,
        clientsLink,
      };
    },
  ),
  on(ClientActions.emptyClientLinkList, (state) => {
    return initialState;
  }),
);

export function clientsLinkReducer(state = initialState, action: Action) {
  return ClientsLinkReducer(state, action);
}
