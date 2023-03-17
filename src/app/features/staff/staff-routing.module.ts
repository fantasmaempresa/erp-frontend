import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffMemberFormComponent } from './page/staff-member-form/staff-member-form.component';
import { BasicViewComponent, VIEW_CLAZZ } from 'o2c_core';
import { StaffView } from '../../data/presentation/staff.view';

const routes: Routes = [
  {
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
        data: { breadcrumb: 'Lista de personal' },
        providers: [{ provide: VIEW_CLAZZ, useValue: StaffView }],
      },
      {
        path: 'new',
        component: StaffMemberFormComponent,
        data: { breadcrumb: 'Nuevo miembro del personal' },
      },
      {
        path: ':id',
        component: StaffMemberFormComponent,
        data: { breadcrumb: 'Editar miembro del personal' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaffRoutingModule {}
