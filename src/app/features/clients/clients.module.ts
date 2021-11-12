import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ListClientsComponent } from './list-clients/list-clients.component';

@NgModule({
  declarations: [ListClientsComponent],
  imports: [CommonModule, ClientsRoutingModule],
})
export class ClientsModule {}
