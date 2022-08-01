import { Pagination } from '../../core/interfaces/Pagination.model';
import { StaffDto } from '../../data/dto/Staff.dto';

export interface StaffState {
  staff: Pagination<StaffDto> | null;
}

export const initialState: StaffState = {
  staff: null,
};
