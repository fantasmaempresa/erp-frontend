import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicViewComponent, VIEW_CLAZZ } from 'o2c_core';
import { TypeDisposalOperationView } from 'src/app/data/presentation/TypeDisposalOperation.view';
import { TypeDisposalOperationFormComponent } from './page/type-disposal-operation-form/type-disposal-operation-form.component';

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
        data: { breadcrumb: 'Operaciones de eliminación' },
        providers: [{ provide: VIEW_CLAZZ, useValue: TypeDisposalOperationView }],
      },
      {
        path: 'new',
        component: TypeDisposalOperationFormComponent,
        data: { breadcrumb: 'Agregar Operaciones de eliminación' },
      },
      {
        path: ':id',
        component: TypeDisposalOperationFormComponent,
        data: { breadcrumb: 'Editar Operaciones de eliminación' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypeDisposalOperationRoutingModule { }
