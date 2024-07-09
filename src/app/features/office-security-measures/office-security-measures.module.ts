import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { OfficeSecurityMeasuresFormComponent } from './page/office-security-measures-form.component';
import { OfficeSecurityMeasuresRoutingModule } from './office-security-measures-routing.module';
import { ViewsModule } from 'o2c_core';


@NgModule({
  declarations: [
    OfficeSecurityMeasuresFormComponent
  ],
  imports: [
    CommonModule,
    OfficeSecurityMeasuresRoutingModule,
    SharedModule,
    ViewsModule
  ]
})
export class OfficeSecurityMeasuresModule { }
