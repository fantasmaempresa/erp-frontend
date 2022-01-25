import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StaffState } from './staff.state';

const selectStaffState = createFeatureSelector<StaffState>('staff');

export const selectStaff = createSelector(selectStaffState, (state) => {
  return state.staff;
});
