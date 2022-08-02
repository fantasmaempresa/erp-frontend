import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, filter, map, mergeMap, of, switchMap, take } from 'rxjs';
import {
  addIncomingNotification,
  currentNotifications,
  incomingNotification,
  loadNotifications,
  loadNotificationsSuccess,
  readAllNotifications,
  readAllNotificationsServer,
  startListenNotification,
} from './notification.actions';
import { NotificationsService } from '../../data/services/notifications.service';
import { NotificationSocketService } from '../../core/services/SocketChannels/notification-socket.service';
import { Store } from '@ngrx/store';
import { selectIncomingNotifications, selectUnreadNotifications } from './notification.selector';
import { NotificationDto } from '../../data/dto/Notification.dto';

@Injectable()
export class NotificationEffects {
  loadNotification$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadNotifications),
      mergeMap(() => {
        return this.notificationsService.getLast();
      }),
      map((notifications) => loadNotificationsSuccess({ notifications })),
    );
  });

  listenNotifications$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(startListenNotification),
      mergeMap(() => this.socketService.notifications$),
      map((notifications: any) => {
        return incomingNotification({ notifications });
      }),
      // tap((data) => console.log(data)),
    );
  });

  addNotification$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(incomingNotification),
      mergeMap(() => {
        return this.store.select(selectIncomingNotifications).pipe(take(1));
      }),
      map((notifications: any) => addIncomingNotification({ notifications })),
    );
  });

  readNotificationsServer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(readAllNotificationsServer),
      switchMap(() => this.store.select(selectUnreadNotifications).pipe(take(1))),
      filter((notifications: any) =>
        notifications.some((notification: NotificationDto) => !notification.check),
      ),
      exhaustMap((notifications: any) =>
        this.notificationsService.readAllNotifications(notifications),
      ),
      map(() => readAllNotifications()),
      catchError(() => of(currentNotifications())),
    );
  });

  // loadNextPageOfNotification$ = createEffect(() => {
  //   return this.actions$.pipes(
  //     ofType(loadNextPageOfNotifications),
  //     mergeMap(({ page, size }) => {
  //       return this.notificationsService
  //         .changePage(page, size)
  //         .pipes(map((notifications) => loadNotificationSuccess({ notifications })));
  //     }),
  //   );
  // });

  constructor(
    private actions$: Actions,
    private notificationsService: NotificationsService,
    private socketService: NotificationSocketService,
    private store: Store,
  ) {}
}
