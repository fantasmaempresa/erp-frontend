import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { logout } from '../../state/auth/auth.actions';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ThemeManagerService } from '../../core/services/theme-manager.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output()
  readonly darkModeSwitched = new EventEmitter<boolean>();

  isDark = this.themeManager.isDark;

  constructor(
    private store: Store,
    private themeManager: ThemeManagerService,
  ) {}

  logout() {
    this.store.dispatch(logout());
  }

  changeTheme({ checked }: MatSlideToggleChange) {
    this.themeManager.toggleDarkTheme(checked);
    this.isDark = checked;
  }
}
