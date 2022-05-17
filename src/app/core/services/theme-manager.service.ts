import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export interface AppTheme {
  primaryColor: string;
  accentColor: string;
  bgColor: string;
  textColor: string;
}

@Injectable({
  providedIn: 'root',
})
export class ThemeManagerService {
  private themes = {
    dark: { bgColor: 'red', accentColor: 'blue', primaryColor: '#eee', textColor: 'black' },
    light: { bgColor: 'blue', accentColor: 'blue', primaryColor: '#777', textColor: 'black' },
  };

  private themeStyle: CSSStyleDeclaration;

  constructor(@Inject(DOCUMENT) doc: Document) {
    this.themeStyle = doc.body.style;
  }

  setTheme(theme: 'dark' | 'light' = 'dark') {
    const currentTheme = this.themes[theme];
    for (let customProperty of Object.keys(currentTheme)) {
      // @ts-ignore
      this.themeStyle.setProperty(`--${customProperty}`, currentTheme[customProperty], 'important');
    }
  }
}
