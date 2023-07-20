import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicViewComponent, VIEW_CLAZZ } from 'o2c_core';
import { OperationFormComponent } from './page/operation-form/operation-form.component';
import { OperationView } from '../../data/presentation/Operation.view';

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
        data: { breadcrumb: 'Lista de operaciones' },
        providers: [{ provide: VIEW_CLAZZ, useValue: OperationView }],
      },
      {
        path: 'new',
        component: OperationFormComponent,
        data: { breadcrumb: 'Agregar Operación' },
      },
      {
        path: ':id',
        component: OperationFormComponent,
        data: { breadcrumb: 'Editar Operación' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OperationsRoutingModule {}
