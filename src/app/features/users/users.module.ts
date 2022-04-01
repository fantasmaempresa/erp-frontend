import { NgModule } from '@angular/core';
import { UserFormComponent } from './page/user-form/user-form.component';
import { SharedModule } from '../../shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';
import { UserListComponent } from './page/user-list/user-list.component';
import { DynamicViewsModule } from '../../shared/components/dinamyc-views/dynamic-views.module';

@NgModule({
  declarations: [UserFormComponent, UserListComponent],
  imports: [SharedModule, UsersRoutingModule, DynamicViewsModule],
})
export class UsersModule {}
