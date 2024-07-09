import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicViewComponent, VIEW_CLAZZ } from 'o2c_core';
import { MovementTrackingView } from 'src/app/data/presentation/MovementTracking.view';
import { MovementTrackingFormComponent } from './page/movement-tracking-form/movement-tracking-form.component';

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
        data: { breadcrumb: 'Seguimiento de Movimientos'},
        providers: [{ provide: VIEW_CLAZZ, useValue: MovementTrackingView}],
      },
      {
        path: 'new',
        component: MovementTrackingFormComponent,
        data: { breadcrumb: 'Agregar Seguimiento de Movimientos'},
      },
      {
        path: 'id',
        component: MovementTrackingFormComponent,
        data: { breadcrumb: 'Editar Seguimiento de Movimientos'},
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovementTrackingRoutingModule { }
