import { createAction, props } from '@ngrx/store';
import { Pagination } from '../../core/interfaces/Pagination.model';
import { StaffDto } from '../../data/dto/Staff.dto';

export enum StaffActions {
  LOAD_STAFF = '[Staff] Load staff',
  LOAD_STAFF_SUCCESS = '[Staff] Load staff success',
  LOAD_NEXT_PAGE = '[Staff] Load next page',
  EMPTY_STAFF_LIST = '[Staff] Empty staff list',
}

export const loadStaff = createAction(StaffActions.LOAD_STAFF);
export const loadStaffSuccess = createAction(
  StaffActions.LOAD_STAFF_SUCCESS,
  props<{ staff: Pagination<StaffDto> }>(),
);

export const loadNextPageOfStaff = createAction(
  StaffActions.LOAD_NEXT_PAGE,
  props<{ page: number; size: number }>(),
);
export const emptyStaffList = createAction(StaffActions.EMPTY_STAFF_LIST);
