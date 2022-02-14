import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectLastNotification } from '../../../../state/notifications/notification.selector';
import { loadNotifications } from '../../../../state/notifications/notification.actions';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent {
  isOpened = false;

  notifications$!: Observable<any>;

  constructor(private store: Store) {
    this.notifications$ = this.store.select(selectLastNotification);
    this.store.dispatch(loadNotifications());
  }

  toggleContainer($event: MouseEvent) {
    $event.stopPropagation();
    this.isOpened = !this.isOpened;
  }

  toggleClose = () => {
    this.isOpened = false;
  };
}
