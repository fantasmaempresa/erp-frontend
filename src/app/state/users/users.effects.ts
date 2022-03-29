import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';
import { loadNextPageOfUsers, loadUsers, loadUsersSuccess } from './users.actions';
import { UserService } from '../../data/services/user.service';

@Injectable()
export class UsersEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadUsers),
      mergeMap(() => {
        return this.userService.fetchAll().pipe(map((users) => loadUsersSuccess({ users })));
      }),
    );
  });

  loadNextPageOfUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadNextPageOfUsers),
      mergeMap(({ page, size }) => {
        return this.userService
          .changePage(page, size)
          .pipe(map((users) => loadUsersSuccess({ users })));
      }),
    );
  });
}
