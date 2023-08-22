import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { logout } from '../../state/auth';
import { ThemeManagerService } from '../../core/services/theme-manager.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  imageProfile: string = 'assets/images/profile_picture.jpg';

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

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('auth') ?? '[]');
    user = user.user;
    console.log('----> ', user);
    if (user.url) {
      console.log('user.url --> ', user.url);
      this.imageProfile = user.url;
    }
  }
}
