import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ClientsState } from './clients.state';

const selectClientsState = createFeatureSelector<ClientsState>('clients');

export const selectClients = createSelector(selectClientsState, (state) => {
  return state.clients;
});
