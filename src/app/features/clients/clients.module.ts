import { NgModule } from '@angular/core';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientFormComponent } from './page/client-form/client-form.component';
import { SharedModule } from '../../shared/shared.module';
import { ClientsListComponent } from './page/clients-list/clients-list.component';

@NgModule({
  declarations: [ClientFormComponent, ClientsListComponent],
  imports: [SharedModule, ClientsRoutingModule],
  exports: [ClientsListComponent],
})
export class ClientsModule {}
