import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChildrenRouteLayoutComponent } from '../../layout/children-route-layout/children-route-layout.component';
import { ProjectListComponent } from './page/project-list/project-list.component';
import { ProjectFormComponent } from './page/project-form/project-form.component';

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
        component: ProjectListComponent,
        data: { breadcrumb: 'Lista de Proyectos' },
      },
      {
        path: 'new',
        component: ProjectFormComponent,
        data: { breadcrumb: 'Agregar Proyecto' },
      },
      {
        path: ':id',
        component: ProjectFormComponent,
        data: { breadcrumb: 'Editar Proyecto' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsRoutingModule {}
