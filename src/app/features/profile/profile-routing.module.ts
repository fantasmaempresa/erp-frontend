import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileFormComponent } from './pages/profile-form/profile-form.component';

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
        component: ProfileFormComponent,
        data: { breadcrumb: 'Información de perfil' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
