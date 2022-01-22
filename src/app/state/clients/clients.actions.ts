import { createAction, props } from '@ngrx/store';
import { Pagination } from '../../core/interfaces/Pagination.model';
import { Client } from '../../data/models/Client.model';

export enum ClientsActions {
  LOAD_CLIENTS = '[Clients] Load clients',
  LOAD_CLIENTS_SUCCESS = '[Clients] Load clients success',
  LOAD_NEXT_PAGE = '[Clients] Load next page',
  ADD_CLIENT = '[Clients] Add client',
}

export const loadClients = createAction(ClientsActions.LOAD_CLIENTS);
export const loadClientsSuccess = createAction(
  ClientsActions.LOAD_CLIENTS_SUCCESS,
  props<{ clients: Pagination<Client> }>(),
);

export const loadNextPageOfClients = createAction(
  ClientsActions.LOAD_NEXT_PAGE,
  props<{ page: number; size: number }>(),
);
