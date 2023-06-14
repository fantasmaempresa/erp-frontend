import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientFormComponent } from './page/client-form/client-form.component';
import { BasicViewComponent, VIEW_CLAZZ } from 'o2c_core';
import { ClientView } from '../../data/presentation';

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
        data: { breadcrumb: 'Lista de clientes' },
        providers: [{ provide: VIEW_CLAZZ, useValue: ClientView }],
      },
      {
        path: 'new',
        component: ClientFormComponent,
        data: { breadcrumb: 'Agregar Cliente' },
      },
      {
        path: ':id',
        component: ClientFormComponent,
        data: { breadcrumb: 'Editar cliente' },
      },
      {
        path: ':id/clientsLink',
        loadChildren: () =>
          import('../clients-link/clients-link.module').then(
            (m) => m.ClientsLinkModule,
          ),
        data: { breadcrumb: 'Enlaces' },
      },
      {
        path: ':id/documentsLink',
        loadChildren: () =>
          import('../document-link/document-link.module').then(
            (m) => m.DocumentLinkModule,
          ),
        data: { breadcrumb: 'Documentos' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsRoutingModule {}
