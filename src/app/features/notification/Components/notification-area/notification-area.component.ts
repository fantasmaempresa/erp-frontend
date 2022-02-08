import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NotificationModel } from '../../../../data/models/Notification.model';
import { selectIncomingNotifications } from '../../../../state/notifications/notification.selector';

@Component({
  selector: 'app-notification-area',
  templateUrl: './notification-area.component.html',
  styleUrls: ['./notification-area.component.scss'],
})
export class NotificationAreaComponent {
  notifications$: Observable<NotificationModel[]>;

  constructor(private store: Store) {
    this.notifications$ = this.store.select(selectIncomingNotifications);
  }
}
