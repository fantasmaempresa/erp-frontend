import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChildrenRouteLayoutComponent } from '../../layout/children-route-layout/children-route-layout.component';
import { RoleListComponent } from './page/role-list/role-list.component';
import { RoleFormComponent } from './page/role-form/role-form.component';

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
        component: RoleListComponent,
        data: { breadcrumb: 'Lista de roles' },
      },
      {
        path: 'new',
        component: RoleFormComponent,
        data: { breadcrumb: 'Nuevo rol' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RolesRoutingModule {}
