import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';
import {
  loadNextPageOfRoles,
  loadRoles,
  loadRolesSuccess,
} from './role.actions';
import { RoleServiceOld } from '../../data/services';

@Injectable()
export class RoleEffects {
  loadRoles$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadRoles),
      mergeMap(() => {
        return this.roleService
          .fetchAll()
          .pipe(map((roles) => loadRolesSuccess({ roles })));
      }),
    );
  });

  loadNextPageOfRoles = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadNextPageOfRoles),
      mergeMap(({ page, size }) => {
        return this.roleService
          .changePage(page, size)
          .pipe(map((roles) => loadRolesSuccess({ roles })));
      }),
    );
  });

  constructor(private actions$: Actions, private roleService: RoleServiceOld) {}
}
