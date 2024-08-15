import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationsRoutingModule } from './operations-routing.module';
import { OperationFormComponent } from './page/operation-form/operation-form.component';
import { OperationListComponent } from './page/operation-list/operation-list.component';
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatOptionModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { MatToolbarModule } from "@angular/material/toolbar";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../../shared/shared.module";
import { ViewsModule } from "o2c_core";



@NgModule({
  declarations: [
    OperationFormComponent,
    OperationListComponent
  ],
  imports: [
    CommonModule,
    OperationsRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatToolbarModule,
    ReactiveFormsModule,
    SharedModule,
    ViewsModule,
  ]
})
export class OperationsModule { }
