import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DisposalRealEstateRoutingModule } from './disposal-real-estate-routing.module';
import { DisposalRealEstateFormComponent } from './page/disposal-real-estate-form/disposal-real-estate-form.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    DisposalRealEstateFormComponent
  ],
  imports: [
    CommonModule,
    DisposalRealEstateRoutingModule,
    SharedModule,
  ]
})
export class DisposalRealEstateModule { }
