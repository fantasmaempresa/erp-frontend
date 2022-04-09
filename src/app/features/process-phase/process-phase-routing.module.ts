import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChildrenRouteLayoutComponent } from '../../layout/children-route-layout/children-route-layout.component';
import { ProcessPhaseListComponent } from './page/process-phase-list/process-phase-list.component';
import { ProcessPhaseFormComponent } from './page/process-phase-form/process-phase-form.component';

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
        component: ProcessPhaseListComponent,
        data: { breadcrumb: 'Lista de Fases' },
      },
      {
        path: 'new',
        component: ProcessPhaseFormComponent,
        data: { breadcrumb: 'Agregar Fase' },
      },
      {
        path: ':id',
        component: ProcessPhaseFormComponent,
        data: { breadcrumb: 'Editar Fase' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProcessPhaseRoutingModule {}
