import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicViewComponent, VIEW_CLAZZ } from 'o2c_core';
import { InversionUnitView } from 'src/app/data/presentation/InversionUnit.view';
import { InversionUnitFormComponent } from '../national-consumer-price-index/page/inversion-unit-form/inversion-unit-form.component';

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
        data: { breadcrumb: 'Lista de unidades de inversión' },
        providers: [{ provide: VIEW_CLAZZ, useValue: InversionUnitView }],
      },
      {
        path: 'new',
        component: InversionUnitFormComponent,
        data: { breadcrumb: 'Agregar unidad de inversión' },
      },
      {
        path: ':id',
        component: InversionUnitFormComponent,
        data: { breadcrumb: 'Editar unidad de inversión' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InversionUnitRoutingModule { }
