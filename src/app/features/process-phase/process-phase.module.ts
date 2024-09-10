import { NgModule } from '@angular/core';

import { ProcessPhaseRoutingModule } from './process-phase-routing.module';
import { ProcessPhaseFormComponent } from './page/process-phase-form/process-phase-form.component';
import { SharedModule } from '../../shared/shared.module';
import { GeneratorFormModule } from '../../shared/components/generator-form/generator-form.module';
import { ViewsModule, FormsModule, FormComponent } from 'o2c_core';

@NgModule({
  declarations: [ProcessPhaseFormComponent],
  imports: [
    SharedModule,
    ProcessPhaseRoutingModule,
    GeneratorFormModule,
    ViewsModule,
    FormsModule,
    FormComponent,
  ],
})
export class ProcessPhaseModule {}
