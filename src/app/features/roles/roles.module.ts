import { NgModule } from '@angular/core';
import { RoleFormComponent } from './page/role-form/role-form.component';
import { SharedModule } from '../../shared/shared.module';
import { RolesRoutingModule } from './roles-routing.module';
import { RoleListComponent } from './page/role-list/role-list.component';

@NgModule({
  declarations: [RoleFormComponent, RoleListComponent],
  imports: [SharedModule, RolesRoutingModule],
})
export class RolesModule {}
