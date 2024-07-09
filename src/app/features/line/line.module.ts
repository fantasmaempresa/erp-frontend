import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LineRoutingModule } from './line-routing.module';
import { LineFormComponent } from './page/line-form/line-form.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    LineFormComponent
  ],
  imports: [
    CommonModule,
    LineRoutingModule,
    SharedModule,
  ]
})
export class LineModule { }
