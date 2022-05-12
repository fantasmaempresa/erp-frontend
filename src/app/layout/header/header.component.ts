import { Component, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../state';
import { logout } from '../../state/auth/auth.actions';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  private style: CSSStyleDeclaration;

  private defaultStyle: CSSStyleDeclaration;

  constructor(private store: Store<AppState>, @Inject(DOCUMENT) document: Document) {
    this.style = document.body.style;
    this.defaultStyle = { ...document.body.style };
  }

  logout() {
    this.store.dispatch(logout());
  }

  changeTheme(change: MatSlideToggleChange) {
    if (change.checked) {
      this.style.setProperty('--primary-color-bg', 'hsl(203, 66%, 20%)');
    } else {
      this.style.setProperty('--primary-color-bg', '#ddd');
    }
  }
}
