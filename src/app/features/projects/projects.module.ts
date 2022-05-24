import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectFormComponent } from './page/project-form/project-form.component';
import { ProjectListComponent } from './page/project-list/project-list.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [ProjectFormComponent, ProjectListComponent],
  imports: [CommonModule, ProjectsRoutingModule, SharedModule],
})
export class ProjectsModule {}
