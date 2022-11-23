import { Component, HostBinding, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { startListenNotification } from '../../state/notifications/notification.actions';
import { SystemActionSocketService } from '../../core/services/SocketChannels/system-action-socket.service';
import { RoleService } from '../../data/services';

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
    private roleService: RoleService,
  ) {}

  ngOnInit(): void {
    this.roleService.buildSidebar();
    this.store.dispatch(startListenNotification());
    this.systemActionSocket.action$.subscribe();
  }

  switchMode(isDarkMode: boolean) {
    this.isDark = isDarkMode;
  }
}
