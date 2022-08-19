import { Component, HostBinding, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { autoLogin } from './state/auth/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'erp-frontend';

  private isDark = false;

  @HostBinding('class')
  get themeMode() {
    return this.isDark ? 'theme-dark' : 'theme-light';
  }

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(autoLogin());
  }
}
