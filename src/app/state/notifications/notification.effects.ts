import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  bufferTime,
  delay,
  from,
  interval,
  map,
  mergeMap,
  switchMap,
  tap,
  timer,
  zipWith,
} from 'rxjs';
import {
  addIncomingNotification,
  deleteShowNotifications,
  loadNotifications,
  loadNotificationsSuccess,
  nothingNotification,
  showIncomingNotification,
  startListenNotification,
} from './notification.actions';
import { NotificationsService } from '../../data/services/notifications.service';
import { SocketService } from '../../core/services/socket.service';
import { Store } from '@ngrx/store';
import { selectIncomingNotifications, selectShowNotifications } from './notification.selector';

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
        return this.socketService.echo$;
      }),
      map(({ notification }: any) => addIncomingNotification({ notification })),
      tap((data) => console.log(data)),
    );
  });

  clearShowNotifications$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(showIncomingNotification),
      mergeMap(() => {
        return this.store.select(selectShowNotifications);
      }),
      delay(14_001),
      map(() => deleteShowNotifications()),
    );
  });

  //interval for exit from animation
  private readonly _animationTime = 14_000;

  private readonly _bufferTimeSpan = 500;

  private readonly _chunkSize = 3;

  private readonly _timeForEmit = this._bufferTimeSpan / this._chunkSize + 1;

  // @ts-ignore
  notificationIncoming$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addIncomingNotification),
      mergeMap(() => {
        return this.store.select(selectIncomingNotifications);
      }),
      tap((data) => console.log(data)),
      switchMap((notifications) => from(notifications)),
      zipWith(interval(this._timeForEmit)),
      map(([n]) => n),
      bufferTime(this._bufferTimeSpan),
      zipWith(timer(0, this._animationTime)),
      map(([n]) => n),
      tap((data) => console.log(data)),
      map((notifications: any[]) => {
        // console.log(notifications);
        if (!!notifications && notifications.length > 0) {
          return showIncomingNotification({ notifications });
        } else {
          return nothingNotification();
        }
      }),
      tap((data) => console.log(data)),
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
    private store: Store,
  ) {
    //setChanel
    this.socketService.subscribeToChannel('quotes', 'QuoteEvent');
  }
}
