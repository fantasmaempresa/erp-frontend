import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectFormComponent } from './page/project-form/project-form.component';
import { SharedModule } from '../../shared/shared.module';
import { BuildProjectComponent } from './page/build-project/build-project.component';
import { CoreModule, ViewsModule } from 'o2c_core';

@NgModule({
  declarations: [ProjectFormComponent, BuildProjectComponent],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    SharedModule,
    ViewsModule,
    CoreModule,
  ],
})
export class ProjectsModule {}
