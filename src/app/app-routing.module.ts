import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () => import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    component: ContentLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/dashboard/dashboard.module').then((m) => m.DashboardModule),
        data: { breadcrumb: 'Dashboard' },
      },
      {
        path: 'users',
        loadChildren: () => import('./features/users/users.module').then((m) => m.UsersModule),
        data: { breadcrumb: 'Usuarios' },
      },
      {
        path: 'roles',
        loadChildren: () => import('./features/roles/roles.module').then((m) => m.RolesModule),
        data: { breadcrumb: 'Roles' },
      },
      {
        path: 'clients',
        loadChildren: () =>
          import('./features/clients/clients.module').then((m) => m.ClientsModule),
        data: { breadcrumb: 'Clientes' },
      },
      {
        path: 'staff',
        loadChildren: () => import('./features/staff/staff.module').then((m) => m.StaffModule),
        data: { breadcrumb: 'Personal' },
      },
      {
        path: 'areas',
        loadChildren: () => import('./features/areas/areas.module').then((m) => m.AreasModule),
        data: { breadcrumb: 'Áreas' },
      },
      {
        path: 'concepts',
        loadChildren: () =>
          import('./features/concepts/concepts.module').then((m) => m.ConceptsModule),
        data: { breadcrumb: 'Conceptos' },
      },
      {
        path: 'quote-statuses',
        loadChildren: () =>
          import('./features/quote-status/quote-status.module').then((m) => m.QuoteStatusModule),
        data: { breadcrumb: 'Estado de la cotización' },
      },
      {
        path: '**',
        redirectTo: '404',
        pathMatch: 'full',
      },
      {
        path: '404',
        component: PageNotFoundComponent,
        data: { breadcrumb: { skip: true, alias: 'pageNotFound' } },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
