import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';
import {
  incomingNotification,
  loadNotifications,
  loadNotificationsSuccess,
  startListenNotification,
} from './notification.actions';
import { NotificationsService } from '../../data/services/notifications.service';
import { SocketService } from '../../core/services/socket.service';

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
      map((notifications: any) => incomingNotification({ notifications })),
      // tap((data) => console.log(data)),
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

  constructor(
    private actions$: Actions,
    private notificationsService: NotificationsService,
    private socketService: SocketService,
  ) {
    //setChanel
    this.socketService.subscribeToChannel('quotes', 'QuoteEvent');
    this.socketService.subscribeToChannelTest();

    let interval = Math.round(180_000 * Math.random());
    console.log('Tiempo de siguiente notificación ', Math.round(180_000 * Math.random()));

    setInterval(() => {
      console.log('Creando nuevas notificaciones');
      this.socketService.subscribeToChannelTest();

      interval = Math.round(180_000 * Math.random());
      console.log('Tiempo de siguiente notificación ', Math.round(180_000 * Math.random()));
    }, interval);
  }
}
