import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProceduresRoutingModule } from './procedures-routing.module';
import { ProceduresFormComponent } from './pages/procedures-form/procedures-form.component';
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatToolbarModule } from "@angular/material/toolbar";
import { SharedModule } from "../../shared/shared.module";
import { ViewsModule, FormsModule, FormComponent } from "o2c_core";
import { GrantorPercentageDialogComponent } from './pages/grantor-percentage-dialog/grantor-percentage-dialog.component';
import { NotPassedProcedureDialogComponent } from './pages/not-passed-procedure-dialog/not-passed-procedure-dialog.component';


@NgModule({
  declarations: [
    ProceduresFormComponent,
    GrantorPercentageDialogComponent,
    NotPassedProcedureDialogComponent
  ],
  imports: [
    CommonModule,
    ProceduresRoutingModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    ReactiveFormsModule,
    SharedModule,
    ViewsModule,
    FormComponent
  ]
})
export class ProceduresModule { }
