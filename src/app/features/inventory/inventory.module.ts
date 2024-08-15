import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryFormComponent } from './page/inventory-form/inventory-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewsModule } from 'o2c_core';

@NgModule({
  declarations: [
    InventoryFormComponent
  ],
  imports: [
    CommonModule,
    InventoryRoutingModule,
    SharedModule,
    ViewsModule,
  ]
})
export class InventoryModule { }
