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
        100: 'hsl(0, 0%, 90%)',
        200: 'hsl(0, 0%, 80%)',
        300: 'hsl(0, 0%, 70%)',
        400: 'hsl(0, 0%, 56%)',
        500: 'hsl(0, 0%, 50%)',
        600: 'hsl(0, 0%, 36%)',
        700: 'hsl(0, 0%, 30%)',
        800: 'hsl(0, 0%, 15%)',
        900: 'hsl(0, 0%, 8%)',
      },
      glassColor: {
        100: 'hsla(0, 0%, 100%, .05)',
        200: 'hsla(0, 0%, 100%, .15)',
        300: 'hsla(0, 0%, 100%, .20)',
        400: 'hsla(0, 0%, 100%, .25)',
        500: 'hsla(0, 0%, 100%, .33)',
        600: 'hsla(0, 0%, 100%, .45)',
        700: 'hsla(0, 0%, 100%, .50)',
        800: 'hsla(0, 0%, 100%, .60)',
        900: 'hsla(0, 0%, 100%, .75)',
      },
    },
    light: {
      primaryColor: '#e2b306',
      bgColor: 'hsl(0,0%,90%)',
      bgColorDark: '#dedede',
      accentColor: 'blue',
      textColor: {
        100: 'hsl(0, 0%, 8%)',
        200: 'hsl(0, 0%, 15%)',
        300: 'hsl(0, 0%, 30%)',
        400: 'hsl(0, 0%, 36%)',
        500: 'hsl(0, 0%, 50%)',
        600: 'hsl(0, 0%, 56%)',
        700: 'hsl(0, 0%, 70%)',
        800: 'hsl(0, 0%, 80%)',
        900: 'hsl(0, 0%, 90%)',
      },
      glassColor: {
        100: 'hsla(0, 0%, 0%, .05)',
        200: 'hsla(0, 0%, 0%, .15)',
        300: 'hsla(0, 0%, 0%, .20)',
        400: 'hsla(0, 0%, 0%, .25)',
        500: 'hsla(0, 0%, 0%, .33)',
        600: 'hsla(0, 0%, 0%, .45)',
        700: 'hsla(0, 0%, 0%, .50)',
        800: 'hsla(0, 0%, 0%, .60)',
        900: 'hsla(0, 0%, 0%, .75)',
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
