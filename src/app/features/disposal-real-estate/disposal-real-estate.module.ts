import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DisposalRealEstateRoutingModule } from './disposal-real-estate-routing.module';
import { DisposalRealEstateFormComponent } from './page/disposal-real-estate-form/disposal-real-estate-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewsModule, FormsModule } from "o2c_core";

@NgModule({
  declarations: [
    DisposalRealEstateFormComponent
  ],
  imports: [
    CommonModule,
    DisposalRealEstateRoutingModule,
    SharedModule,
    ViewsModule,
    FormsModule
  ]
})
export class DisposalRealEstateModule { }
