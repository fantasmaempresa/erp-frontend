import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientLinkFormComponent } from './Page/client-link-form/client-link-form.component';
import { BasicViewComponent, VIEW_CLAZZ } from 'o2c_core';
import { ClientLinkView } from '../../data/presentation';

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
        data: { breadcrumb: 'Lista de Enlaces' },
        providers: [{ provide: VIEW_CLAZZ, useValue: ClientLinkView }],
      },
      {
        path: 'new',
        component: ClientLinkFormComponent,
        data: { breadcrumb: 'Agregar Enlace' },
      },
      {
        path: ':id',
        component: ClientLinkFormComponent,
        data: { breadcrumb: 'Editar Enlace' },
      },
      {
        path: ':id/documentsLink',
        loadChildren: () =>
          import('../document-link/document-link.module').then(
            (m) => m.DocumentLinkModule,
          ),
        data: { breadcrumb: 'Documentos', view: 'client_link' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsLinkRoutingModule {}
