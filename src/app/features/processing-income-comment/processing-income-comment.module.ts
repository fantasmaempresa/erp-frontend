import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcessingIncomeCommentRoutingModule } from './processing-income-comment-routing.module';
import { ProcessingIncomeCommentFormComponent } from './page/processing-income-comment-form/processing-income-comment-form.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ProcessingIncomeCommentFormComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    ProcessingIncomeCommentRoutingModule
  ]
})
export class ProcessingIncomeCommentModule { }
