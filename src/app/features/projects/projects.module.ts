import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectFormComponent } from './page/project-form/project-form.component';
import { ProjectListComponent } from './page/project-list/project-list.component';


@NgModule({
  declarations: [
    ProjectFormComponent,
    ProjectListComponent
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule
  ]
})
export class ProjectsModule { }
