import { NgModule } from '@angular/core';

import { ClientsLinkRoutingModule } from './clients-link-routing.module';
import { ClientLinkListComponent } from './Page/client-link-list/client-link-list.component';
import { ClientLinkFormComponent } from './Page/client-link-form/client-link-form.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [ClientLinkListComponent, ClientLinkFormComponent],
  imports: [SharedModule, ClientsLinkRoutingModule],
  exports: [ClientLinkListComponent],
})
export class ClientsLinkModule {}
