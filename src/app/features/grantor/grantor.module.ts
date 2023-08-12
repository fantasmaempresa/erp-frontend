import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GrantorRoutingModule } from './grantor-routing.module';
import { GrantorFormComponent } from './page/grantor-form/grantor-form.component';
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatToolbarModule } from "@angular/material/toolbar";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../../shared/shared.module";


@NgModule({
  declarations: [
    GrantorFormComponent
  ],
  imports: [
    CommonModule,
    GrantorRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class GrantorModule { }
