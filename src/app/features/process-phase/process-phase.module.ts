import { NgModule } from '@angular/core';

import { ProcessPhaseRoutingModule } from './process-phase-routing.module';
import { ProcessPhaseFormComponent } from './page/process-phase-form/process-phase-form.component';
import { ProcessPhaseListComponent } from './page/process-phase-list/process-phase-list.component';
import { DynamicViewsModule } from '../../shared/components/dinamyc-views/dynamic-views.module';
import { SharedModule } from '../../shared/shared.module';
import { GeneratorFormModule } from '../../shared/components/generator-form/generator-form.module';

@NgModule({
  declarations: [ProcessPhaseFormComponent, ProcessPhaseListComponent],
  imports: [SharedModule, ProcessPhaseRoutingModule, DynamicViewsModule, GeneratorFormModule],
})
export class ProcessPhaseModule {}
