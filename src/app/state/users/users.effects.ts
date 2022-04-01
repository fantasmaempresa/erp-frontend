import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';
import {
  changeUser,
  loadNextPageOfUsers,
  loadUsers,
  loadUsersSuccess,
  startToListenUsers,
} from './users.actions';
import { UserService } from '../../data/services/user.service';
import { RefreshDataSocketService } from '../../core/services/SocketChannels/refresh-data-socket.service';

@Injectable()
export class UsersEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private userSocket: RefreshDataSocketService,
  ) {}

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

  startToListen$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(startToListenUsers),
      mergeMap(() => this.userSocket.userStatus$),
      map((user) => changeUser({ user })),
    );
  });
}
