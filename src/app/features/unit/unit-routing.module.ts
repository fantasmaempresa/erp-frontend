import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicViewComponent, VIEW_CLAZZ } from 'o2c_core';
import { UnitView } from 'src/app/data/presentation/Unit.view';
import { UnitFormComponent } from './page/unit-form/unit-form.component';

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
        data: { breadcrumb: 'Lista de Unidades' },
        providers: [{ provide: VIEW_CLAZZ, useValue: UnitView }],
      },
      {
        path: 'new',
        component: UnitFormComponent,
        data: { breadcrumb: 'Agregar Unidades' },
      },
      {
        path: ':id',
        component: UnitFormComponent,
        data: { breadcrumb: 'Editar Unidades' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnitRoutingModule { }
