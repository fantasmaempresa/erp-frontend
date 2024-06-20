import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WarehouseRoutingModule } from './warehouse-routing.module';
import { WarehouseFormComponent } from './page/warehouse-form/warehouse-form.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    WarehouseFormComponent
  ],
  imports: [
    CommonModule,
    WarehouseRoutingModule,
    SharedModule,
  ]
})
export class WarehouseModule { }
