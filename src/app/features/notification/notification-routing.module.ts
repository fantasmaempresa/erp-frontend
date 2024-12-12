import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationListComponent } from './Pages/notification-list/notification-list.component';
import { BasicViewComponent, VIEW_CLAZZ } from 'o2c_core';
import { NotificationsView } from 'src/app/data/presentation/Notification.view';

const routes: Routes = [
  { path: '', component: NotificationListComponent },
  {
    path: 'list',
    component: BasicViewComponent,
    data: { breadcrumb: 'Comentarios del Expediente' },
    providers: [{ provide: VIEW_CLAZZ, useValue: NotificationsView }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationRoutingModule {}
