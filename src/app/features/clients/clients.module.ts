import { NgModule } from '@angular/core';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientFormComponent } from './page/client-form/client-form.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [ClientFormComponent],
  imports: [SharedModule, ClientsRoutingModule],
})
export class ClientsModule {}
