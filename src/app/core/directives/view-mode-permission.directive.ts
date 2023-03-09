import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[appViewModePermission]',
})
export class ViewModePermissionDirective {
  @HostBinding('disabled')
  isViewModeEnable: boolean;

  @HostBinding('style.opacity')
  opacity = 1;

  constructor() {
    const {
      user: {
        role: { config },
      },
    } = JSON.parse(localStorage.getItem('auth') ?? '{}');
    this.isViewModeEnable = config?.view_mode ?? false;
    if (this.isViewModeEnable) {
      this.opacity = 0.33;
    }
  }
}
