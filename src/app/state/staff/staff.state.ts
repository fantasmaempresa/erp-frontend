import { Pagination } from '../../core/interfaces/Pagination.model';
import { Staff } from '../../data/models/Staff.model';

export interface StaffState {
  staff: Pagination<Staff> | null;
}

export const initialState: StaffState = {
  staff: null,
};
