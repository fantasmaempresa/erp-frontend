import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectStartListComponent } from './page/project-start-list/project-start-list.component';
import { CurrentFormComponent } from './page/current-form/current-form.component';
import { ResumeProcessComponent } from "./page/resume-process/resume-process.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: ProjectStartListComponent,
        data: { breadcrumb: 'Lista de Proyectos' },
      },
      {
        path: ':id/process/:idProcess',
        component: CurrentFormComponent,
        data: { breadcrumb: 'Fase Actual' },
      },
      {
        path: ':id/process/:idProcess/resume',
        component: ResumeProcessComponent,
        data: { breadcrumb: 'Resumen del avance del proceso' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectStartRoutingModule {}
