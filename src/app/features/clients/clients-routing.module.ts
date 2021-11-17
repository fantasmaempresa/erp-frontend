import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListClientsComponent } from './list-clients/list-clients.component';

const routes: Routes = [
  {
    path: '',
    component: ListClientsComponent,
    children: [{ path: 'add', component: ListClientsComponent, data: { breadcrumb: 'Agregar' } }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsRoutingModule {}
