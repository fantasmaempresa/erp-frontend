import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeManagerService {
  isDark = false;

  toggleDarkTheme(isDark: boolean) {
    this.isDark = isDark;
    if (this.isDark) {
      const href = 'dark-theme.css';
      this.getLinkElementForKey('dark-theme').setAttribute('href', href);
      document.body.classList.add('dark-theme');
    } else {
      this.removeStyle('dark-theme');
      document.body.classList.remove('dark-theme');
    }
  }

  removeStyle(key: string) {
    const existingLinkElement = this.getExistingLinkElementByKey(key);
    if (existingLinkElement) {
      document.head.removeChild(existingLinkElement);
    }
  }

  getClassNameForKey(key: string) {
    return `style-manager-${key}`;
  }

  getExistingLinkElementByKey(key: string) {
    return document.head.querySelector(
      `link[rel="stylesheet"].${this.getClassNameForKey(key)}`,
    );
  }

  createLinkElementWithKey(key: string) {
    const linkEl = document.createElement('link');
    linkEl.setAttribute('rel', 'stylesheet');
    linkEl.classList.add(this.getClassNameForKey(key));
    document.head.appendChild(linkEl);
    return linkEl;
  }

  getLinkElementForKey(key: string) {
    return (
      this.getExistingLinkElementByKey(key) ||
      this.createLinkElementWithKey(key)
    );
  }
}
