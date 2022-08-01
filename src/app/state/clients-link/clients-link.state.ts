import { Pagination } from '../../core/interfaces/Pagination.model';
import { ClientLinkDto } from '../../data/dto/ClientLink.dto';

export interface ClientsLinkState {
  clientsLink: Pagination<ClientLinkDto> | null;
}

export const initialState: ClientsLinkState = {
  clientsLink: null,
};
