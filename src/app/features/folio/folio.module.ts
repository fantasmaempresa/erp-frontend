import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FolioRoutingModule } from './folio-routing.module';
import { FolioFormComponent } from './pages/folio-form/folio-form.component';
import { SharedModule } from "../../shared/shared.module";
import { ViewsModule, FormsModule, FormComponent } from "o2c_core";

@NgModule({
  declarations: [
    FolioFormComponent
  ],
  imports: [
    CommonModule,
    FolioRoutingModule,
    SharedModule,
    ViewsModule,
    FormComponent,
    FormsModule,
  ]
})
export class FolioModule { }
