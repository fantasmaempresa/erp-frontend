import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicViewComponent, VIEW_CLAZZ } from 'o2c_core';
import { NationalConsumerPriceIndexView } from 'src/app/data/presentation/NationalConsumerPriceIndex.view';
import { NationalConsumerPriceIndexFormComponent } from './page/national-consumer-price-index-form/national-consumer-price-index-form.component';

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
        data: { breadcrumb: 'Lista de precios al consumidor' },
        providers: [{ provide: VIEW_CLAZZ, useValue: NationalConsumerPriceIndexView }],
      },
      {
        path: 'new',
        component: NationalConsumerPriceIndexFormComponent,
        data: { breadcrumb: 'Agregar precio al consumidor' },
      },
      {
        path: ':id',
        component: NationalConsumerPriceIndexFormComponent,
        data: { breadcrumb: 'Editar precio al consumidor' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NationalConsumerPriceIndexRoutingModule { }
