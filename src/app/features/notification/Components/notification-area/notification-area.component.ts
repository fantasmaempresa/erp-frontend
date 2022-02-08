import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
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
    this.notifications$ = this.store.select(selectIncomingNotifications);
  }

  checkIsClose(notification: NotificationPopUpModel) {
    this.store.dispatch(closeIncomingNotification({ id: notification.id }));
  }
}
