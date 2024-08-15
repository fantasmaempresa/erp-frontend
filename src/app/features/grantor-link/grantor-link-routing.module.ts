import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicViewComponent, VIEW_CLAZZ } from 'o2c_core';
import { GrantorLinkView } from 'src/app/data/presentation/GrantorLink.view';
import { GrantorLinkFormComponent } from './pages/grantor-link-form/grantor-link-form.component';

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
        data: { breadcrumb: 'Lista de Representantes' },
        providers: [{ provide: VIEW_CLAZZ, useValue: GrantorLinkView }],
      },
      {
        path: 'new',
        component: GrantorLinkFormComponent,
        data: { breadcrumb: 'Agregar Representante' },
      },
      {
        path: ':id',
        component: GrantorLinkFormComponent,
        data: { breadcrumb: 'Editar Representante' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrantorLinkRoutingModule { }
