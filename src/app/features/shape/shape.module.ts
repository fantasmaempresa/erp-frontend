import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShapeRoutingModule } from './shape-routing.module';
import { ShapeFormComponent } from './page/shape-form/shape-form.component';
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatToolbarModule } from "@angular/material/toolbar";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../../shared/shared.module";
import { ViewsModule } from "o2c_core";


@NgModule({
  declarations: [
    ShapeFormComponent
  ],
  imports: [
    CommonModule,
    ShapeRoutingModule,
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
export class ShapeModule { }
