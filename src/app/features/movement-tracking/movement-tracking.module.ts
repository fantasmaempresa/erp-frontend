import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovementTrackingRoutingModule } from './movement-tracking-routing.module';
import { MovementTrackingFormComponent } from './page/movement-tracking-form/movement-tracking-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewsModule } from 'o2c_core';

@NgModule({
  declarations: [
    MovementTrackingFormComponent
  ],
  imports: [
    CommonModule,
    MovementTrackingRoutingModule,
    SharedModule,
    ViewsModule,
  ]
})
export class MovementTrackingModule { }
