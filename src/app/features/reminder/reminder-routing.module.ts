import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicViewComponent, VIEW_CLAZZ } from 'o2c_core';
import { ReminderView } from 'src/app/data/presentation/Reminder.view';
import { ReminderFormComponent } from './page/reminder-form/reminder-form.component';

const routes: Routes = [{
  path: '',
  children: [
    {
      path: '',
      redirectTo: 'list',
      pathMatch: 'full',
    },
    {
      path: 'list',
      component: BasicViewComponent,
      data: { breadcrumb: 'Lista de recordatorios' },
      providers: [{ provide: VIEW_CLAZZ, useValue: ReminderView }],
    },
    {
      path: 'new',
      component: ReminderFormComponent,
      data: { breadcrumb: 'Agregar recordatorio' },
    },
    {
      path: ':idReminder',
      component: ReminderFormComponent,
      data: { breadcrumb: 'Editar recordatorio' },
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReminderRoutingModule { }
