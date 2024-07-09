import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicViewComponent, VIEW_CLAZZ } from 'o2c_core';
import { CategoryOperationFormComponent } from './page/category-operation-form/category-operation-form.component';
import { CategoryOperationView } from 'src/app/data/presentation/CategoryOperation.view';

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
        data: { breadcrumb: 'Lista de catégorias' },
        providers: [{ provide: VIEW_CLAZZ, useValue: CategoryOperationView }],
      },
      {
        path: 'new',
        component: CategoryOperationFormComponent,
        data: { breadcrumb: 'Agregar catégoria' },
      },
      {
        path: ':id',
        component: CategoryOperationFormComponent,
        data: { breadcrumb: 'Editar catégoria' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryOperationRoutingModule { }
