import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RateRoutingModule } from './rate-routing.module';
import { RateFormComponent } from './page/rate-form/rate-form.component';


@NgModule({
  declarations: [
    RateFormComponent
  ],
  imports: [
    CommonModule,
    RateRoutingModule
  ]
})
export class RateModule { }
