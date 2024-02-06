import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StakeRoutingModule } from './stake-routing.module';
import { StakeFormComponent } from './page/stake-form/stake-form.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatOptionModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { MatToolbarModule } from "@angular/material/toolbar";
import { SharedModule } from "../../shared/shared.module";


@NgModule({
  declarations: [
    StakeFormComponent
  ],
  imports: [
    CommonModule,
    StakeRoutingModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatToolbarModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class StakeModule { }
