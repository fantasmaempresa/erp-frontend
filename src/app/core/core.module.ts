import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewModePermissionDirective } from './directives/view-mode-permission.directive';

@NgModule({
  declarations: [ViewModePermissionDirective],
  imports: [CommonModule],
  exports: [ViewModePermissionDirective],
})
export class CoreModule {
  constructor() {}
}
