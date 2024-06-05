import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicViewComponent, VIEW_CLAZZ } from 'o2c_core';
import { DisposalRealEstateView } from 'src/app/data/presentation/DisposalRealEstate.view';
import { DisposalRealEstateFormComponent } from './page/disposal-real-estate-form/disposal-real-estate-form.component';

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
        data: { breadcrum: 'Enajenación de Bienes'},
        providers: [{ provide: VIEW_CLAZZ, useValue: DisposalRealEstateView }],
      },
      {
        path: 'new',
        component: DisposalRealEstateFormComponent,
        data: { breadcrumb: 'Agregar Enajenaciones de bienes'},
      },
      {
        path: ':id',
        component: DisposalRealEstateFormComponent,
        data: { breadcrumb: 'Editar Enajenaciones de bienes' },
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DisposalRealEstateRoutingModule { }
