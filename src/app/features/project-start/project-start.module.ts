import { NgModule } from '@angular/core';

import { ProjectStartRoutingModule } from './project-start-routing.module';
import { ProjectStartListComponent } from './page/project-start-list/project-start-list.component';
import { SharedModule } from '../../shared/shared.module';
import { CurrentFormComponent } from './page/current-form/current-form.component';

@NgModule({
  declarations: [ProjectStartListComponent, CurrentFormComponent],
  imports: [SharedModule, ProjectStartRoutingModule],
})
export class ProjectStartModule {}
