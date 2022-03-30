import { Pagination } from '../../core/interfaces/Pagination.model';
import { ClientLink } from '../../data/models/ClientLink.model';

export interface ClientsLinkState {
  clientsLink: Pagination<ClientLink> | null;
}

export const initialState: ClientsLinkState = {
  clientsLink: null,
};
