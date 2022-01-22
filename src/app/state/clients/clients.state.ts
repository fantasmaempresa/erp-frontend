import { Client } from '../../data/models/Client.model';
import { Pagination } from '../../core/interfaces/Pagination.model';

export interface ClientsState {
  clients: Pagination<Client> | null;
}

export const initialState: ClientsState = {
  clients: null,
};
