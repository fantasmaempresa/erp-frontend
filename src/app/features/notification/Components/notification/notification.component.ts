import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  loadNotifications,
  readAllNotificationsServer,
  selectLastNotification,
  selectNumberOfNotifications,
} from '../../../../state/notifications';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent {
  isOpened = false;

  notifications$!: Observable<any>;

  numberNotification$!: Observable<any>;

  constructor(private store: Store) {
    this.notifications$ = this.store.select(selectLastNotification);
    this.numberNotification$ = this.store.select(selectNumberOfNotifications);
    this.store.dispatch(loadNotifications());
  }

  toggleContainer() {
    this.isOpened = !this.isOpened;

    if (!this.isOpened) {
      this.store.dispatch(readAllNotificationsServer());
    }
  }

  toggleClose = () => {
    if (this.isOpened) {
      this.isOpened = false;
      this.store.dispatch(readAllNotificationsServer());
    }
  };
}
