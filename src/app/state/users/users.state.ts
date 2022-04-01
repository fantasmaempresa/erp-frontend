import { Pagination } from '../../core/interfaces/Pagination.model';
import { User } from '../../data/models/User.model';

export interface UsersState {
  users: Pagination<User> | null;
}

export const initialState: UsersState = {
  users: null,
};
