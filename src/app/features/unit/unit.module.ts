import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnitRoutingModule } from './unit-routing.module';
import { UnitFormComponent } from './page/unit-form/unit-form.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    UnitFormComponent
  ],
  imports: [
    CommonModule,
    UnitRoutingModule,
    SharedModule,
  ]
})
export class UnitModule { }
