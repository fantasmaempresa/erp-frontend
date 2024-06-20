import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovementTrackingRoutingModule } from './movement-tracking-routing.module';
import { MovementTrackingFormComponent } from './page/movement-tracking-form/movement-tracking-form.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    MovementTrackingFormComponent
  ],
  imports: [
    CommonModule,
    MovementTrackingRoutingModule,
    SharedModule,
  ]
})
export class MovementTrackingModule { }
