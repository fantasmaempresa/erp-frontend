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
    const { user } = JSON.parse(localStorage.getItem('auth') ?? '{}');
    const { role } = user;
    const { config } = role;
    this.isViewModeEnable = config.view_mode;
    if (this.isViewModeEnable) {
      this.opacity = 0.33;
    }
  }
}
