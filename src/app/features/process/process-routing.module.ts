import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChildrenRouteLayoutComponent } from '../../layout/children-route-layout/children-route-layout.component';
import { ProcessFormComponent } from './page/process-form/process-form.component';
import { BasicViewComponent, VIEW_CLAZZ } from 'o2c_core';
import { ProcessView } from '../../data/presentation';

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
        data: { breadcrumb: 'Lista de Procesos' },
        providers: [{ provide: VIEW_CLAZZ, useValue: ProcessView }],
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
