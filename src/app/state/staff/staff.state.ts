import { Pagination } from '../../core/interfaces';
import { StaffDto } from '../../data/dto';

export interface StaffState {
  staff: Pagination<StaffDto> | null;
}

export const initialState: StaffState = {
  staff: null,
};
