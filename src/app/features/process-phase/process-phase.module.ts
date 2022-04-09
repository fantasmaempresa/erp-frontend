import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcessPhaseRoutingModule } from './process-phase-routing.module';
import { ProcessPhaseFormComponent } from './page/process-phase-form/process-phase-form.component';
import { ProcessPhaseListComponent } from './page/process-phase-list/process-phase-list.component';


@NgModule({
  declarations: [
    ProcessPhaseFormComponent,
    ProcessPhaseListComponent
  ],
  imports: [
    CommonModule,
    ProcessPhaseRoutingModule
  ]
})
export class ProcessPhaseModule { }
