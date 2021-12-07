import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChildrenRouteLayoutComponent } from '../../layout/children-route-layout/children-route-layout.component';
import { StaffListComponent } from './page/staff-list/staff-list.component';
import { StaffMemberFormComponent } from './page/staff-member-form/staff-member-form.component';

const routes: Routes = [
  {
    path: '',
    component: ChildrenRouteLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: StaffListComponent,
        data: { breadcrumb: 'Lista de personal' },
      },
      {
        path: 'new',
        component: StaffMemberFormComponent,
        data: { breadcrumb: 'Nuevo rol' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaffRoutingModule {}
