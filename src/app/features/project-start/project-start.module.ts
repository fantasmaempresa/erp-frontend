import { NgModule } from '@angular/core';

import { ProjectStartRoutingModule } from './project-start-routing.module';
import { ProjectStartListComponent } from './page/project-start-list/project-start-list.component';
import { SharedModule } from '../../shared/shared.module';
import { CurrentFormComponent } from './page/current-form/current-form.component';
import { GeneratorFormModule } from '../../shared/components/generator-form/generator-form.module';

@NgModule({
  declarations: [ProjectStartListComponent, CurrentFormComponent],
  imports: [SharedModule, ProjectStartRoutingModule, GeneratorFormModule],
})
export class ProjectStartModule {}
