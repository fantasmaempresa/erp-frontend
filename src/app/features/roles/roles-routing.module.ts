import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleFormComponent } from './page/role-form/role-form.component';
import { BasicViewComponent, VIEW_CLAZZ } from 'o2c_core';
import { RoleView } from '../../data/presentation';

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
        data: { breadcrumb: 'Lista de roles' },
        providers: [{ provide: VIEW_CLAZZ, useValue: RoleView }],
      },
      {
        path: 'new',
        component: RoleFormComponent,
        data: { breadcrumb: 'Nuevo rol' },
      },
      {
        path: ':id',
        component: RoleFormComponent,
        data: { breadcrumb: 'Editar rol' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RolesRoutingModule {}
