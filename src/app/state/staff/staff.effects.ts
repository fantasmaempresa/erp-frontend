import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { StaffService } from '../../data/services/staff.service';
import {
  loadNextPageOfStaff,
  loadStaff,
  loadStaffSuccess,
} from './staff.actions';
import { map, mergeMap } from 'rxjs';

@Injectable()
export class StaffEffects {
  loadStaff$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadStaff),
      mergeMap(() => {
        return this.staffService
          .fetchAll()
          .pipe(map((staff) => loadStaffSuccess({ staff })));
      }),
    );
  });

  loadNextPageOfStaff$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadNextPageOfStaff),
      mergeMap(({ page, size }) => {
        return this.staffService
          .changePage(page, size)
          .pipe(map((staff) => loadStaffSuccess({ staff })));
      }),
    );
  });

  constructor(private actions$: Actions, private staffService: StaffService) {}
}
