import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentLinkRoutingModule } from './document-link-routing.module';
import { DocumentLinkListComponent } from './page/document-link-list/document-link-list.component';
import { DocumentLinkFormComponent } from './page/document-link-form/document-link-form.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../../shared/shared.module";
import { ViewsModule } from "o2c_core";
import { DocumentViewPdfComponent } from './page/document-view-pdf/document-view-pdf.component';


@NgModule({
  declarations: [
    DocumentLinkListComponent,
    DocumentLinkFormComponent,
    DocumentViewPdfComponent
  ],
  imports: [
    CommonModule,
    DocumentLinkRoutingModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    SharedModule,
    ViewsModule
  ]
})
export class DocumentLinkModule { }
