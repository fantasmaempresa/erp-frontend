import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GrantorLinkRoutingModule } from './grantor-link-routing.module';
import { GrantorLinkFormComponent } from './pages/grantor-link-form/grantor-link-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewsModule } from "o2c_core";


@NgModule({
  declarations: [
    GrantorLinkFormComponent
  ],
  imports: [
    CommonModule,
    GrantorLinkRoutingModule,
    SharedModule,
    ViewsModule
  ]
})
export class GrantorLinkModule { }
