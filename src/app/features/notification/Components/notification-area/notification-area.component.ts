import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  closeIncomingNotification,
  selectIncomingNotifications,
} from '../../../../state/notifications';
import { NotificationPopUpDto } from '../../../../data/dto';

@Component({
  selector: 'app-notification-area',
  templateUrl: './notification-area.component.html',
  styleUrls: ['./notification-area.component.scss'],
})
export class NotificationAreaComponent {
  notifications$: Observable<NotificationPopUpDto[]>;

  constructor(private store: Store) {
    this.notifications$ = this.store.select(selectIncomingNotifications);
  }

  checkIsClose(notification: NotificationPopUpDto) {
    this.store.dispatch(closeIncomingNotification({ id: notification.id }));
  }
}
