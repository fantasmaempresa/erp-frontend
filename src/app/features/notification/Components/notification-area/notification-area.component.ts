import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectIncomingNotifications } from '../../../../state/notifications/notification.selector';
import { NotificationPopUpDto } from '../../../../data/dto/NotificationPopUp.dto';
import { closeIncomingNotification } from '../../../../state/notifications/notification.actions';

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

  trackById = (index: number, item: any) => item.id;

  checkIsClose(notification: NotificationPopUpDto) {
    this.store.dispatch(closeIncomingNotification({ id: notification.id }));
  }
}
