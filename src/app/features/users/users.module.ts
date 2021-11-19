import { NgModule } from '@angular/core';
import { UserFormComponent } from './user-form/user-form.component';
import { SharedModule } from '../../shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  declarations: [UserFormComponent],
  imports: [SharedModule, UsersRoutingModule],
})
export class UsersModule {}
