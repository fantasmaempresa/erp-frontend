import { Component } from '@angular/core';
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
  constructor(private store: Store, private themeManager: ThemeManagerService) {}

  logout() {
    this.store.dispatch(logout());
  }

  changeTheme(change: MatSlideToggleChange) {
    if (change.checked) {
      this.themeManager.setTheme();
    } else {
      this.themeManager.setTheme('light');
    }
  }
}
