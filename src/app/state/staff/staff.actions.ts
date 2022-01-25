import { createAction, props } from '@ngrx/store';
import { Pagination } from '../../core/interfaces/Pagination.model';
import { Staff } from '../../data/models/Staff.model';

export enum StaffActions {
  LOAD_STAFF = '[Staff] Load staff',
  LOAD_STAFF_SUCCESS = '[Staff] Load staff success',
  LOAD_NEXT_PAGE = '[Staff] Load next page',
}

export const loadStaff = createAction(StaffActions.LOAD_STAFF);
export const loadStaffSuccess = createAction(
  StaffActions.LOAD_STAFF_SUCCESS,
  props<{ staff: Pagination<Staff> }>(),
);

export const loadNextPageOfStaff = createAction(
  StaffActions.LOAD_NEXT_PAGE,
  props<{ page: number; size: number }>(),
);
