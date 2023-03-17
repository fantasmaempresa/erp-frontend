import { ClientDto } from '../../data/dto';
import { Pagination } from '../../core/interfaces';

export interface ClientsState {
  clients: Pagination<ClientDto> | null;
}

export const initialState: ClientsState = {
  clients: null,
};
