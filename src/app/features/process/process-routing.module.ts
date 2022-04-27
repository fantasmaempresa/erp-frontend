import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChildrenRouteLayoutComponent } from '../../layout/children-route-layout/children-route-layout.component';
import { ProcessFormComponent } from './page/process-form/process-form.component';
import { ProcessListComponent } from './page/process-list/process-list.component';

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
        component: ProcessListComponent,
        data: { breadcrumb: 'Lista de Procesos' },
      },
      {
        path: 'new',
        component: ProcessFormComponent,
        data: { breadcrumb: 'Agregar Proceso' },
      },
      {
        path: ':id',
        component: ProcessFormComponent,
        data: { breadcrumb: 'Editar Proceso' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProcessRoutingModule {}
