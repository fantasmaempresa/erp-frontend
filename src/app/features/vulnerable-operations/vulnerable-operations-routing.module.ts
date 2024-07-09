import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicViewComponent, VIEW_CLAZZ } from 'o2c_core';
import { VulnerableOperationView } from 'src/app/data/presentation/VulnerableOperation.view';
import { VulnerableOperationsFormComponent } from './page/vulnerable-operations-form/vulnerable-operations-form.component';

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
        data: { breadcrumb: 'Lista de Operaciones vulnerables' },
        providers: [{ provide: VIEW_CLAZZ, useValue: VulnerableOperationView }],
      },
      {
        path: 'new',
        component: VulnerableOperationsFormComponent,
        data: { breadcrumb: 'Agregar Operaciones vulnerables' },
      },
      {
        path: ':id',
        component: VulnerableOperationsFormComponent,
        data: { breadcrumb: 'Editar Operaciones vulnerables' },
      },
      {
        path: 'procedure/:idProcedure',
        component: VulnerableOperationsFormComponent,
        data: { breadcrumb: 'Nueva operación vulnerable' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VulnerableOperationsRoutingModule { }
