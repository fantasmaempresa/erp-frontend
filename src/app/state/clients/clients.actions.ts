import { createAction, props } from '@ngrx/store';
import { Pagination } from '../../core/interfaces';
import { ClientDto } from '../../data/dto';

export enum ClientsActions {
  LOAD_CLIENTS = '[Clients] Load clients',
  LOAD_CLIENTS_SUCCESS = '[Clients] Load clients success',
  LOAD_NEXT_PAGE = '[Clients] Load next page',
  ADD_CLIENT = '[Clients] Add client',
  EMPTY_CLIENT_LIST = '[Clients] Empty client list',
}

export const loadClients = createAction(ClientsActions.LOAD_CLIENTS);
export const loadClientsSuccess = createAction(
  ClientsActions.LOAD_CLIENTS_SUCCESS,
  props<{ clients: Pagination<ClientDto> }>(),
);

export const loadNextPageOfClients = createAction(
  ClientsActions.LOAD_NEXT_PAGE,
  props<{ page: number; size: number }>(),
);

export const emptyClientList = createAction(ClientsActions.EMPTY_CLIENT_LIST);
