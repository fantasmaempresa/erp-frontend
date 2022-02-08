import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { startListenNotification } from '../../state/notifications/notification.actions';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss'],
})
export class ContentLayoutComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(startListenNotification());
  }
}
