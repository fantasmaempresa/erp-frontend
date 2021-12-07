import { NgModule } from '@angular/core';
import { StaffMemberFormComponent } from './page/staff-member-form/staff-member-form.component';
import { SharedModule } from '../../shared/shared.module';
import { StaffRoutingModule } from './staff-routing.module';
import { StaffListComponent } from './page/staff-list/staff-list.component';

@NgModule({
  declarations: [StaffMemberFormComponent, StaffListComponent],
  imports: [SharedModule, StaffRoutingModule],
})
export class StaffModule {}
