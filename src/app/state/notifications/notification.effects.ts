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
import { SocketService } from '../../core/services/socket.service';
import { Store } from '@ngrx/store';
import { selectIncomingNotifications, selectUnreadNotifications } from './notification.selector';
import { NotificationModel } from '../../data/models/Notification.model';

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
      mergeMap(() => {
        return this.socketService.notifications$;
      }),
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
        notifications.some((notification: NotificationModel) => !notification.check),
      ),
      exhaustMap((notifications: any) =>
        this.notificationsService.readAllNotifications(notifications),
      ),
      map(() => readAllNotifications()),
      catchError(() => of(currentNotifications)),
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
    private socketService: SocketService,
    private store: Store,
  ) {
    //setChanel
    this.socketService.subscribeToChannel('quotes', 'QuoteEvent');

    this.testNotifications();
  }

  private testNotifications() {
    setTimeout(() => {
      console.log('Creando primeras notificaciones');
      this.socketService.subscribeToChannelTest();
    }, 19_000);

    setInterval(() => {
      console.log('Creando nuevas notificaciones');
      this.socketService.subscribeToChannelTest();
    }, 120_000);
  }
}
