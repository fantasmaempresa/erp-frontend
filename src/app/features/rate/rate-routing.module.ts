import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicViewComponent, VIEW_CLAZZ } from 'o2c_core';
import { RateView } from 'src/app/data/presentation/Rate.view';
import { RateFormComponent } from './page/rate-form/rate-form.component';

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
        data: { breadcrumb: 'Tasa' },
        providers: [{ provide: VIEW_CLAZZ, useValue: RateView }],
      },
      {
        path: 'new',
        component: RateFormComponent,
        data: { breadcrumb: 'Agregar Tasa' },
      },
      {
        path: ':id',
        component: RateFormComponent,
        data: { breadcrumb: 'Editar Tasa' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RateRoutingModule { }
