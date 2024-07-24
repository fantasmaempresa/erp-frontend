import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { BookFormComponent } from './pages/book-form/book-form.component';
import { SharedModule } from "../../shared/shared.module";
import { ViewsModule, FormsModule, FormComponent } from "o2c_core";

@NgModule({
  declarations: [
    BookFormComponent
  ],
  imports: [
    CommonModule,
    BookRoutingModule,
    SharedModule,
    ViewsModule,
    FormComponent,
    FormsModule,
  ]
})
export class BookModule { }
