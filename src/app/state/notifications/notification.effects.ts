import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';
import { loadNotifications, loadNotificationsSuccess } from './notification.actions';
import { NotificationsService } from '../../data/services/notifications.service';

@Injectable()
export class NotificationEffects {
  loadNotification$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadNotifications),
      mergeMap(() => {
        return this.notificationsService
          .getLast()
          .pipe(map((notifications) => loadNotificationsSuccess({ notifications })));
      }),
    );
  });

  // loadNextPageOfNotification$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(loadNextPageOfNotifications),
  //     mergeMap(({ page, size }) => {
  //       return this.notificationsService
  //         .changePage(page, size)
  //         .pipe(map((notifications) => loadNotificationSuccess({ notifications })));
  //     }),
  //   );
  // });

  constructor(private actions$: Actions, private notificationsService: NotificationsService) {}
}
