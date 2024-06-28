import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatToolbarModule } from "@angular/material/toolbar";
import { ViewsModule } from "o2c_core";
import { SharedModule } from "../../shared/shared.module";
import { ProcedureCommentFormComponent } from './page/procedure-comment-form/procedure-comment-form.component';
import { ProcedureCommentRoutingModule } from './procedure-comment-routing.module';


@NgModule({
  declarations: [
    ProcedureCommentFormComponent
  ],
  imports: [
    CommonModule,
    ProcedureCommentRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    ReactiveFormsModule,
    SharedModule,
    ViewsModule
  ]
})
export class ProcedureCommentModule { }
