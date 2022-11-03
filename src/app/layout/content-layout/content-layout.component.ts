import { Component, HostBinding, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { startListenNotification } from '../../state/notifications';
import { SystemActionSocketService } from '../../core/services/SocketChannels/system-action-socket.service';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss'],
})
export class ContentLayoutComponent implements OnInit {
  private isDark = false;

  @HostBinding('class')
  get themeMode() {
    return this.isDark ? 'theme-dark' : 'theme-light';
  }

  constructor(
    private store: Store,
    private systemActionSocket: SystemActionSocketService,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(startListenNotification());
    this.systemActionSocket.action$.subscribe();
  }

  switchMode(isDarkMode: boolean) {
    this.isDark = isDarkMode;
  }
}
