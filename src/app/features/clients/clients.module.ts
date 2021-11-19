import { NgModule } from '@angular/core';

import { ClientsRoutingModule } from './clients-routing.module';
import { ListClientsComponent } from './list-clients/list-clients.component';
import { ClientFormComponent } from './client-form/client-form.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [ListClientsComponent, ClientFormComponent],
  imports: [SharedModule, ClientsRoutingModule],
})
export class ClientsModule {}
