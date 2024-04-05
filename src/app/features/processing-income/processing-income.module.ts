import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../../shared/shared.module";
import { ProcessingIncomeRoutingModule } from './processing-income-routing.module';
import { ProcessingIncomeFormComponent } from './page/processing-income-form/processing-income-form.component';
import { ViewsModule } from "o2c_core";

@NgModule({
  declarations: [
    ProcessingIncomeFormComponent
  ],
  imports: [
    CommonModule,
    ProcessingIncomeRoutingModule,
    SharedModule,
    ViewsModule
  ]
})
export class ProcessingIncomeModule { }
