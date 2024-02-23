import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../../shared/shared.module";
import { IsoDocumentationRoutingModule } from './iso-documentation-routing.module';
import { IsoDocumentationFormComponent } from './page/iso-documentation-form/iso-documentation-form.component';


@NgModule({
  declarations: [
    IsoDocumentationFormComponent
  ],
  imports: [
    CommonModule,
    IsoDocumentationRoutingModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class IsoDocumentationModule { }
