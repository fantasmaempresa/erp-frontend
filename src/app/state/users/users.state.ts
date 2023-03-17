import { Pagination } from '../../core/interfaces';
import { UserDto } from '../../data/dto';

export interface UsersState {
  users: Pagination<UserDto> | null;
}

export const initialState: UsersState = {
  users: null,
};
