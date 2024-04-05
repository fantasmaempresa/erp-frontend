import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TypeDisposalOperationRoutingModule } from './type-disposal-operation-routing.module';
import { TypeDisposalOperationFormComponent } from './page/type-disposal-operation-form/type-disposal-operation-form.component';


@NgModule({
  declarations: [
    TypeDisposalOperationFormComponent
  ],
  imports: [
    CommonModule,
    TypeDisposalOperationRoutingModule
  ]
})
export class TypeDisposalOperationModule { }
