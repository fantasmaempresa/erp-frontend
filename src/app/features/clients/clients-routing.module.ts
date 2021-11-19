import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientFormComponent } from './client-form/client-form.component';
import { ListClientsComponent } from './list-clients/list-clients.component';

const routes: Routes = [
  {
    path: '',
    component: ClientFormComponent,
    children: [
      { path: 'add', component: ListClientsComponent, data: { breadcrumb: 'Agregar Cliente' } },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsRoutingModule {}
