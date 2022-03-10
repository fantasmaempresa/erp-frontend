import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientLinkListComponent } from './Page/client-link-list/client-link-list.component';
import { ClientLinkFormComponent } from './Page/client-link-form/client-link-form.component';
import { ChildrenRouteLayoutComponent } from '../../layout/children-route-layout/children-route-layout.component';

const routes: Routes = [
  {
    path: '',
    component: ChildrenRouteLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: ClientLinkListComponent,
        data: { breadcrumb: 'Lista de Enlaces' },
      },
      {
        path: '/:id',
        component: ClientLinkFormComponent,
        data: { breadcrumb: 'Editar Enlace' },
      },
      {
        path: 'new',
        component: ClientLinkFormComponent,
        data: { breadcrumb: 'Agregar Enlace' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsLinkRoutingModule {}
