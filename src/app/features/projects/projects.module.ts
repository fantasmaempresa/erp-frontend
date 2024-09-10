import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectFormComponent } from './page/project-form/project-form.component';
import { SharedModule } from '../../shared/shared.module';
import { BuildProjectComponent } from './page/build-project/build-project.component';
import { CoreModule, ViewsModule, FormComponent, FormsModule } from 'o2c_core';
import { StartFormComponent } from './page/predefinedForms/SimpleSale/start-form/start-form.component';

@NgModule({
  declarations: [ProjectFormComponent, BuildProjectComponent, StartFormComponent],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    SharedModule,
    ViewsModule,
    CoreModule,
    FormComponent,
    FormsModule,
  ],
})
export class ProjectsModule {}
