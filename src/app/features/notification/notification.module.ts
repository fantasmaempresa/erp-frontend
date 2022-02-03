import { NgModule } from '@angular/core';

import { NotificationRoutingModule } from './notification-routing.module';
import { NotificationComponent } from './Components/notification/notification.component';
import { NotificationListComponent } from './Pages/notification-list/notification-list.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [NotificationComponent, NotificationListComponent],
  imports: [SharedModule, NotificationRoutingModule],
  exports: [NotificationComponent],
})
export class NotificationModule {}
