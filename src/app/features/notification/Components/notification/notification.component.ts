import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  isOpened = false;

  constructor() {}

  ngOnInit(): void {}

  toggleContainer($event: MouseEvent) {
    $event.stopPropagation();
    this.isOpened = !this.isOpened;
    console.log('entra');
  }
}
