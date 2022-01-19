import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../state';
import { logout } from '../../state/auth/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private store: Store<AppState>) {}

  logout(event: Event) {
    event.preventDefault();
    this.store.dispatch(logout());
  }
}
