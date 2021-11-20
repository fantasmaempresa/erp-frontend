import { NgModule } from '@angular/core';
import { RoleFormComponent } from './role-form/role-form.component';
import { SharedModule } from '../../shared/shared.module';
import { RolesRoutingModule } from './roles-routing.module';

@NgModule({
  declarations: [RoleFormComponent],
  imports: [SharedModule, RolesRoutingModule],
})
export class RolesModule {}
