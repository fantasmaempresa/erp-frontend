import { initialState, StaffState } from './staff.state';
import { Action, createReducer, on } from '@ngrx/store';
import * as StaffActions from './staff.actions';

const StaffReducer = createReducer(
  initialState,
  on(StaffActions.loadStaff, (state) => state),
  on(StaffActions.loadStaffSuccess, (state: StaffState, { staff }) => {
    return {
      ...state,
      staff,
    };
  }),
);

export function staffReducer(state = initialState, action: Action) {
  return StaffReducer(state, action);
}
