import { NgModule } from '@angular/core';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientFormComponent } from './page/client-form/client-form.component';
import { SharedModule } from '../../shared/shared.module';
import { ClientsListComponent } from './page/clients-list/clients-list.component';
import { DynamicViewsModule } from '../../shared/components/dinamyc-views/dynamic-views.module';

@NgModule({
  declarations: [ClientFormComponent, ClientsListComponent],
  imports: [SharedModule, ClientsRoutingModule, DynamicViewsModule],
  exports: [ClientsListComponent],
})
export class ClientsModule {}
