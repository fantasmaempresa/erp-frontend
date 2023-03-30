import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  exhaustMap,
  filter,
  map,
  mergeMap,
  of,
  switchMap,
} from 'rxjs';
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
import { NotificationsService } from '../../data/services';
import { NotificationSocketService } from '../../core/services/SocketChannels/notification-socket.service';
import { Store } from '@ngrx/store';
import {
  selectIncomingNotifications,
  selectUnreadNotifications,
} from './notification.selectors';
import { NotificationDto, NotificationPopUpDto } from '../../data/dto';

@Injectable()
export class NotificationEffects {
  loadNotification$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadNotifications),
      mergeMap(() => this.notificationsService.getLast()),
      map((notifications: any) => loadNotificationsSuccess({ notifications })),
    );
  });

  listenNotifications$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(startListenNotification),
      mergeMap(() => this.socketService.notifications$),
      map((notifications: NotificationPopUpDto[]) =>
        incomingNotification({ notifications }),
      ),
    );
  });

  addNotification$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(incomingNotification),
      mergeMap(() => this.store.select(selectIncomingNotifications)),
      map((notifications: any) => addIncomingNotification({ notifications })),
    );
  });

  readNotificationsServer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(readAllNotificationsServer),
      switchMap(() => this.store.select(selectUnreadNotifications)),
      filter((notifications: any) =>
        notifications.some(
          (notification: NotificationDto) => !notification.check,
        ),
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
