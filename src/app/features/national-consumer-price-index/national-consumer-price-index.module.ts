import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NationalConsumerPriceIndexRoutingModule } from './national-consumer-price-index-routing.module';
import { NationalConsumerPriceIndexFormComponent } from './page/national-consumer-price-index-form/national-consumer-price-index-form.component';
import { InversionUnitFormComponent } from './page/inversion-unit-form/inversion-unit-form.component';


@NgModule({
  declarations: [
    NationalConsumerPriceIndexFormComponent,
    InversionUnitFormComponent
  ],
  imports: [
    CommonModule,
    NationalConsumerPriceIndexRoutingModule
  ]
})
export class NationalConsumerPriceIndexModule { }