import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ClientsLinkState } from './clients-link.state';

const selectClientLink = createFeatureSelector<ClientsLinkState>('clientsLink');

export const selectClientsLink = createSelector(selectClientLink, (state) => {
  return state.clientsLink;
});
