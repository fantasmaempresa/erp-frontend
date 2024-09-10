import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChildrenRouteLayoutComponent } from '../../layout/children-route-layout/children-route-layout.component';
import { ProjectFormComponent } from './page/project-form/project-form.component';
import { BasicViewComponent, VIEW_CLAZZ } from 'o2c_core';
import { ProjectView } from '../../data/presentation';
import { StartFormComponent } from './page/predefinedForms/SimpleSale/start-form/start-form.component';

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
        component: BasicViewComponent,
        data: { breadcrumb: 'Lista de Proyectos' },
        providers: [{ provide: VIEW_CLAZZ, useValue: ProjectView }],
      },
      {
        path: 'new',
        component: ProjectFormComponent,
        data: { breadcrumb: 'Agregar Proyecto' },
      },
      {
        path: 'test-test',
        component: StartFormComponent,
        data: { breadcrumb: 'Test' },
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
