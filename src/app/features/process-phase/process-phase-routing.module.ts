import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcessPhaseFormComponent } from './page/process-phase-form/process-phase-form.component';
import { BasicViewComponent, VIEW_CLAZZ } from 'o2c_core';
import { ProcessPhaseView } from '../../data/presentation';

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
        component: BasicViewComponent,
        data: { breadcrumb: 'Lista de Fases' },
        providers: [
          {
            provide: VIEW_CLAZZ,
            useValue: ProcessPhaseView,
          },
        ],
      },
      {
        path: 'new',
        component: ProcessPhaseFormComponent,
        data: { breadcrumb: 'Agregar Fase', view: 'phase' },
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
