import { createAction, props } from '@ngrx/store';
import { Pagination } from '../../core/interfaces/Pagination.model';
import { ClientLinkDto } from '../../data/dto/ClientLink.dto';

export enum ClientsLinkActions {
  LOAD_CLIENTS_LINK = '[ClientsLink] Load clients',
  LOAD_CLIENTS_LINK_SUCCESS = '[ClientsLink] Load clients success',
  LOAD_NEXT_PAGE = '[ClientsLink] Load next page',
  ADD_CLIENT_LINK = '[ClientsLink] Add client',
  EMPTY_CLIENT_LINK_LIST = '[ClientsLink] Empty client list',
}

export const loadClientsLink = createAction(
  ClientsLinkActions.LOAD_CLIENTS_LINK,
  props<{ clientId: number }>(),
);
export const loadClientsLinkSuccess = createAction(
  ClientsLinkActions.LOAD_CLIENTS_LINK_SUCCESS,
  props<{ clientsLink: Pagination<ClientLinkDto> }>(),
);

export const loadNextPageOfClientsLink = createAction(
  ClientsLinkActions.LOAD_NEXT_PAGE,
  props<{ page: number; size: number }>(),
);

export const emptyClientLinkList = createAction(ClientsLinkActions.EMPTY_CLIENT_LINK_LIST);
