import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { FolioControlComponent } from './pages/folio-control/folio-control.component';
import { ReportFormComponent } from './pages/report-form/report-form.component';
import { SharedModule } from '../../shared/shared.module';
import { ViewsModule } from 'o2c_core';

@NgModule({
  declarations: [FolioControlComponent, ReportFormComponent],
  imports: [CommonModule, ReportsRoutingModule, SharedModule, ViewsModule],
})
export class ReportsModule {}
