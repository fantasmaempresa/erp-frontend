import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReminderRoutingModule } from './reminder-routing.module';
import { ReminderFormComponent } from './page/reminder-form/reminder-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormComponent, ViewsModule } from 'o2c_core';


@NgModule({
  declarations: [
    ReminderFormComponent
  ],
  imports: [
    CommonModule,
    ReminderRoutingModule,
    SharedModule,
    ViewsModule,
    FormComponent
  ]
})
export class ReminderModule { }
