import { NgModule } from '@angular/core';

import { ProjectStartRoutingModule } from './project-start-routing.module';
import { ProjectStartListComponent } from './page/project-start-list/project-start-list.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [ProjectStartListComponent],
  imports: [SharedModule, ProjectStartRoutingModule],
})
export class ProjectStartModule {}
