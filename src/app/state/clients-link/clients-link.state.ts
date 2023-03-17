import { Pagination } from '../../core/interfaces';
import { ClientLinkDto } from '../../data/dto';

export interface ClientsLinkState {
  clientsLink: Pagination<ClientLinkDto> | null;
}

export const initialState: ClientsLinkState = {
  clientsLink: null,
};
