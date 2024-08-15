import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RateRoutingModule } from './rate-routing.module';
import { RateFormComponent } from './page/rate-form/rate-form.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    RateFormComponent
  ],
  imports: [
    CommonModule,
    RateRoutingModule,
    SharedModule,
  ]
})
export class RateModule { }
