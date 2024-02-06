import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicViewComponent, VIEW_CLAZZ } from 'o2c_core';
import { StakeView } from '../../data/presentation/Stake.view';
import { StakeFormComponent } from './page/stake-form/stake-form.component';

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
        data: { breadcrumb: 'Lista de Participaciones' },
        providers: [{ provide: VIEW_CLAZZ, useValue: StakeView }],
      },
      {
        path: 'new',
        component: StakeFormComponent,
        data: { breadcrumb: 'Agregar Participacion' },
      },
      {
        path: ':id',
        component: StakeFormComponent,
        data: { breadcrumb: 'Editar Participacion' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StakeRoutingModule {}
