import { ClientDto } from '../../data/dto/Client.dto';
import { Pagination } from '../../core/interfaces/Pagination.model';

export interface ClientsState {
  clients: Pagination<ClientDto> | null;
}

export const initialState: ClientsState = {
  clients: null,
};
