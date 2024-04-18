import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InversionUnitRoutingModule } from './inversion-unit-routing.module';
import { InversionUnitFormComponent } from '../national-consumer-price-index/page/inversion-unit-form/inversion-unit-form.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    InversionUnitFormComponent,
  ],
  imports: [
    CommonModule,
    InversionUnitRoutingModule,
    SharedModule,
  ]
})
export class InversionUnitModule { }
