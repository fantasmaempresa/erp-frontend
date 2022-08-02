import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChildrenRouteLayoutComponent } from '../../layout/children-route-layout/children-route-layout.component';
import { ProjectStartListComponent } from './page/project-start-list/project-start-list.component';
import { CurrentFormComponent } from './page/current-form/current-form.component';

const routes: Routes = [
  {
    path: '',
    component: ChildrenRouteLayoutComponent,
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectStartRoutingModule {}
