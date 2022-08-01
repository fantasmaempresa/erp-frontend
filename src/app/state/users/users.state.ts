import { Pagination } from '../../core/interfaces/Pagination.model';
import { UserDto } from '../../data/dto/User.dto';

export interface UsersState {
  users: Pagination<UserDto> | null;
}

export const initialState: UsersState = {
  users: null,
};
