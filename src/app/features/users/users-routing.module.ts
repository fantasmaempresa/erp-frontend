import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFormComponent } from './page/user-form/user-form.component';
import { BasicViewComponent, VIEW_CLAZZ } from 'o2c_core';
import { UserView } from '../../data/presentation';

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
        data: { breadcrumb: 'Lista de usuarios' },
        providers: [{ provide: VIEW_CLAZZ, useValue: UserView }],
      },
      {
        path: 'new',
        component: UserFormComponent,
        data: { breadcrumb: 'Nuevo usuario' },
      },
      {
        path: ':id',
        component: UserFormComponent,
        data: { breadcrumb: 'Editar usuario' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
