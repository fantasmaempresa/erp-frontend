import { NgModule } from '@angular/core';

import { ProjectStartRoutingModule } from './project-start-routing.module';
import { ProjectStartListComponent } from './page/project-start-list/project-start-list.component';
import { SharedModule } from '../../shared/shared.module';
import { CurrentFormComponent } from './page/current-form/current-form.component';
import { GeneratorFormModule } from '../../shared/components/generator-form/generator-form.module';
import { ResumeProcessComponent } from './page/resume-process/resume-process.component';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { ViewsModule, FormComponent, FormsModule } from 'o2c_core';

@NgModule({
  declarations: [
    ProjectStartListComponent,
    CurrentFormComponent,
    ResumeProcessComponent,
  ],
  imports: [
    SharedModule,
    ProjectStartRoutingModule,
    GeneratorFormModule,
    NgxGraphModule,
    ViewsModule,
    FormComponent,
    FormsModule,
  ],
})
export class ProjectStartModule {}
