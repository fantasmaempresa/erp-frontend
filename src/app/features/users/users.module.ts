import { NgModule } from '@angular/core';
import { UserFormComponent } from './page/user-form/user-form.component';
import { SharedModule } from '../../shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';
import { ViewsModule } from "o2c_core";

@NgModule({
  declarations: [UserFormComponent],
  imports: [SharedModule, UsersRoutingModule, ViewsModule]
})
export class UsersModule {}
