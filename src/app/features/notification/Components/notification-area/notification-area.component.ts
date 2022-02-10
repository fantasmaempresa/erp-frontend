import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectShowNotifications } from '../../../../state/notifications/notification.selector';
import { NotificationPopUpModel } from '../../../../data/models/NotificationPopUp.model';
import { closeShowNotification } from '../../../../state/notifications/notification.actions';

@Component({
  selector: 'app-notification-area',
  templateUrl: './notification-area.component.html',
  styleUrls: ['./notification-area.component.scss'],
})
export class NotificationAreaComponent {
  notifications$: Observable<NotificationPopUpModel[]>;

  constructor(private store: Store) {
    this.notifications$ = this.store.select(selectShowNotifications);
  }

  trackById = (index: number, item: any) => item.id;

  checkIsClose(notification: NotificationPopUpModel) {
    console.log('Cerrando');
    this.store.dispatch(closeShowNotification({ id: notification.id }));
  }
}
