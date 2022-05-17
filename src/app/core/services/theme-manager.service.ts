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
    dark: {
      primaryColor: '#dfc356',
      bgColor: 'hsl(203, 66%, 20%)',
      bgColorDark: 'hsl(203, 65%, 15%)',
      accentColor: 'blue',
      textColor: {
        100: 'hsl(0, 0%, 95%)',
        200: 'hsl(0, 0%, 75%)',
        300: 'hsl(0, 0%, 65%)',
        400: 'hsl(0, 0%, 50%)',
        500: 'hsl(0, 0%, 45%)',
        600: 'hsl(0, 0%, 35%)',
        700: 'hsl(0, 0%, 25%)',
        800: 'hsl(0, 0%, 15%)',
        900: 'hsl(0, 0%, 5%)',
      },
    },
    light: {
      primaryColor: '#dfc356',
      bgColor: '#f1eaea',
      bgColorDark: '#dedede',
      accentColor: 'blue',
      textColor: {
        100: 'hsl(0, 0%, 5%)',
        200: 'hsl(0, 0%, 15%)',
        300: 'hsl(0, 0%, 25%)',
        400: 'hsl(0, 0%, 35%)',
        500: 'hsl(0, 0%, 45%)',
        600: 'hsl(0, 0%, 50%)',
        700: 'hsl(0, 0%, 65%)',
        800: 'hsl(0, 0%, 75%)',
        900: 'hsl(0, 0%, 95%)',
      },
    },
  };

  private themeStyle: CSSStyleDeclaration;

  constructor(@Inject(DOCUMENT) doc: Document) {
    this.themeStyle = doc.body.style;

    this.setTheme();
  }

  setTheme(theme: 'dark' | 'light' = 'dark') {
    const currentTheme = this.themes[theme];
    for (let customProperty of Object.keys(currentTheme)) {
      // @ts-ignore
      const propertyValue = currentTheme[customProperty];
      if (typeof propertyValue === 'string') {
        // @ts-ignore
        this.themeStyle.setProperty(`--${customProperty}`, propertyValue, 'important');
      } else {
        for (let nestedCustomProperty of Object.keys(propertyValue)) {
          const value = propertyValue[nestedCustomProperty];
          this.themeStyle.setProperty(
            `--${customProperty}-${nestedCustomProperty}`,
            value,
            'important',
          );
        }
      }
    }
  }
}
