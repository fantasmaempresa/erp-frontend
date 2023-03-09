import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { throwIfAlreadyLoaded } from './guards/module-import.guard';
import { ViewModePermissionDirective } from './directives/view-mode-permission.directive';

@NgModule({
  declarations: [ViewModePermissionDirective],
  imports: [CommonModule],
  exports: [ViewModePermissionDirective],
})
export class CoreModule {
  constructor() {}
}
