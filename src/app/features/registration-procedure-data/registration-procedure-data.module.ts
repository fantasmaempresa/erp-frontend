import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationProcedureDataRoutingModule } from './registration-procedure-data-routing.module';
import { RegistratitonProcedureDataFormComponent } from './page/registratiton-procedure-data-form/registratiton-procedure-data-form.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../../shared/shared.module";
import { ViewsModule, FormsModule } from "o2c_core";

@NgModule({
  declarations: [
    RegistratitonProcedureDataFormComponent,
  ],
  imports: [
    CommonModule,
    RegistrationProcedureDataRoutingModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    SharedModule,
    ViewsModule,
    FormsModule,
  ]
})
export class RegistrationProcedureDataModule { }
