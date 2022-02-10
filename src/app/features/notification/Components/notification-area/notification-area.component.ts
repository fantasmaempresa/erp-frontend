import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  bufferCount,
  bufferTime,
  from,
  interval,
  map,
  merge,
  mergeMap,
  Observable,
  take,
  tap,
  zipWith,
} from 'rxjs';
import { selectIncomingNotifications } from '../../../../state/notifications/notification.selector';
import { NotificationPopUpModel } from '../../../../data/models/NotificationPopUp.model';
import { closeIncomingNotification } from '../../../../state/notifications/notification.actions';

@Component({
  selector: 'app-notification-area',
  templateUrl: './notification-area.component.html',
  styleUrls: ['./notification-area.component.scss'],
})
export class NotificationAreaComponent {
  notifications$: Observable<NotificationPopUpModel[]>;

  constructor(private store: Store) {
    const source$ = this.store
      .select(selectIncomingNotifications)
      .pipe(mergeMap((notifications) => from(notifications)));
    this.notifications$ = merge(
      source$.pipe(
        zipWith(interval(4000)),
        map(([n]) => n),
        bufferTime(12001),
      ),
      source$.pipe(take(3), bufferCount(3)),
    ).pipe(
      tap((data) => console.log(data)),
      // mapTo([]),
    );
  }

  trackById = (index: number, item: any) => item.id;

  checkIsClose(notification: NotificationPopUpModel) {
    console.log('Cerrando');
    this.store.dispatch(closeIncomingNotification({ id: notification.id }));
  }
}
