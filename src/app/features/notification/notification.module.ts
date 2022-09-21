import { NgModule } from '@angular/core';

import { NotificationRoutingModule } from './notification-routing.module';
import { NotificationComponent } from './Components/notification/notification.component';
import { NotificationListComponent } from './Pages/notification-list/notification-list.component';
import { SharedModule } from '../../shared/shared.module';
import { NotificationAreaComponent } from './Components/notification-area/notification-area.component';

@NgModule({
  declarations: [
    NotificationComponent,
    NotificationListComponent,
    NotificationAreaComponent,
  ],
  imports: [SharedModule, NotificationRoutingModule],
  exports: [NotificationComponent, NotificationAreaComponent],
})
export class NotificationModule {}
