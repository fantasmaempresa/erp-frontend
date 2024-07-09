import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryOperationRoutingModule } from './category-operation-routing.module';
import { CategoryOperationFormComponent } from './page/category-operation-form/category-operation-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewsModule } from "o2c_core";




@NgModule({
  declarations: [
    CategoryOperationFormComponent
  ],
  imports: [
    CommonModule,
    CategoryOperationRoutingModule,
    SharedModule,
    ViewsModule
  ]
})
export class CategoryOperationModule { }
