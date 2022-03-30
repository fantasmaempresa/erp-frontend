import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChildrenRouteLayoutComponent } from '../../layout/children-route-layout/children-route-layout.component';
import { ClientsListComponent } from './page/clients-list/clients-list.component';
import { ClientFormComponent } from './page/client-form/client-form.component';

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
        component: ClientsListComponent,
        data: { breadcrumb: 'Lista de clientes' },
      },
      {
        path: 'client',
        component: ClientFormComponent,
        data: { breadcrumb: 'Editar cliente' },
      },
      {
        path: 'new',
        component: ClientFormComponent,
        data: { breadcrumb: 'Agregar Cliente' },
      },
      {
        path: ':id/clientsLink',
        loadChildren: () =>
          import('../clients-link/clients-link.module').then((m) => m.ClientsLinkModule),
        data: { breadcrumb: 'Enlaces' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsRoutingModule {}
