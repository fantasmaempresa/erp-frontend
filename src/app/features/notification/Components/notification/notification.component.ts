import { Component } from '@angular/core';
import { NotificationsService } from '../../../../data/services/notifications.service';
import { Observable, pluck } from 'rxjs';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent {
  isOpened = false;

  notifications$!: Observable<any>;

  constructor(private notificationsService: NotificationsService) {}

  toggleContainer($event: MouseEvent) {
    $event.stopPropagation();
    this.isOpened = !this.isOpened;
    if (this.isOpened) {
      this.getNotifications();
    }
  }

  toggleClose = () => {
    this.isOpened = false;
  };

  getNotifications() {
    this.notifications$ = this.notificationsService.getLast().pipe(pluck('data'));
  }
}
