import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NationalConsumerPriceIndexRoutingModule } from './national-consumer-price-index-routing.module';
import { NationalConsumerPriceIndexFormComponent } from './page/national-consumer-price-index-form/national-consumer-price-index-form.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    NationalConsumerPriceIndexFormComponent,
  ],
  imports: [
    CommonModule,
    NationalConsumerPriceIndexRoutingModule,
    SharedModule,
  ]
})
export class NationalConsumerPriceIndexModule { }
