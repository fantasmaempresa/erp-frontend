import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';
import {
  addIncomingNotification,
  currentNotifications,
  incomingNotification,
  loadNotifications,
  loadNotificationsSuccess,
  readAllNotifications,
  startListenNotification,
} from './notification.actions';
import { NotificationsService } from '../../data/services/notifications.service';
import { SocketService } from '../../core/services/socket.service';
import { Store } from '@ngrx/store';
import { selectIncomingNotifications, selectLastNotification } from './notification.selector';

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

  addNotification$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(incomingNotification),
      mergeMap(() => {
        return this.store.select(selectIncomingNotifications);
      }),
      map((notifications: any) => addIncomingNotification({ notifications })),
      // tap((data) => console.log(data)),
    );
  });

  readNotifications$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(readAllNotifications),
      mergeMap(() => this.store.select(selectLastNotification)),
      mergeMap((notifications: any) =>
        this.notificationsService.readAllNotifications(notifications),
      ),
      map(() => currentNotifications()),
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

    // this.testNotifications();
  }

  private testNotifications() {
    setTimeout(() => {
      this.socketService.subscribeToChannelTest();
    }, 19_000);

    setInterval(() => {
      console.log('Creando nuevas notificaciones');
      this.socketService.subscribeToChannelTest();
    }, 120_000);
  }
}
