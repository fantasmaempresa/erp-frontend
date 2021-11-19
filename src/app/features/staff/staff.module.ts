import { NgModule } from '@angular/core';
import { StaffFormComponent } from './staff-form/staff-form.component';
import { SharedModule } from '../../shared/shared.module';
import { StaffRoutingModule } from './staff-routing.module';

@NgModule({
  declarations: [StaffFormComponent],
  imports: [SharedModule, StaffRoutingModule],
})
export class StaffModule {}
