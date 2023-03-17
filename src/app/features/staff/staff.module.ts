import { NgModule } from '@angular/core';
import { StaffMemberFormComponent } from './page/staff-member-form/staff-member-form.component';
import { SharedModule } from '../../shared/shared.module';
import { StaffRoutingModule } from './staff-routing.module';

@NgModule({
  declarations: [StaffMemberFormComponent],
  imports: [SharedModule, StaffRoutingModule],
})
export class StaffModule {}
