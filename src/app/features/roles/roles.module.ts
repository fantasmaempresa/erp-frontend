import { NgModule } from '@angular/core';
import { RoleFormComponent } from './page/role-form/role-form.component';
import { SharedModule } from '../../shared/shared.module';
import { RolesRoutingModule } from './roles-routing.module';
import { CoreModule } from 'o2c_core';

@NgModule({
  declarations: [RoleFormComponent],
  imports: [SharedModule, RolesRoutingModule, CoreModule],
})
export class RolesModule {}
