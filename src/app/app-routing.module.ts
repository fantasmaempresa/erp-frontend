import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { ModuleGuard } from './core/guards/module.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'app',
    component: ContentLayoutComponent,
    data: { breadcrumb: 'Inicio' },
    canActivateChild: [ModuleGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/dashboard/dashboard.module').then(
            (m) => m.DashboardModule,
          ),
        data: { breadcrumb: 'Dashboard' },
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./features/profile/profile.module').then(
            (m) => m.ProfileModule,
          ),
        data: { breadcrumb: 'Perfil' },
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./features/users/users.module').then((m) => m.UsersModule),
        data: {
          breadcrumb: 'Usuarios',
        },
      },
      {
        path: 'roles',
        loadChildren: () =>
          import('./features/roles/roles.module').then((m) => m.RolesModule),
        data: {
          breadcrumb: 'Roles',
        },
      },
      {
        path: 'clients',
        loadChildren: () =>
          import('./features/clients/clients.module').then(
            (m) => m.ClientsModule,
          ),
        data: {
          breadcrumb: 'Clientes',
        },
      },
      {
        path: 'staff',
        loadChildren: () =>
          import('./features/staff/staff.module').then((m) => m.StaffModule),
        data: {
          breadcrumb: 'Personal',
        },
      },
      {
        path: 'areas',
        loadChildren: () =>
          import('./features/areas/areas.module').then((m) => m.AreasModule),
        data: {
          breadcrumb: 'Áreas',
        },
      },
      {
        path: 'documents',
        loadChildren: () =>
          import('./features/documents/documents.module').then(
            (m) => m.DocumentsModule,
          ),
        data: {
          breadcrumb: 'Áreas',
        },
      },
      {
        path: 'concepts',
        loadChildren: () =>
          import('./features/concepts/concepts.module').then(
            (m) => m.ConceptsModule,
          ),
        data: {
          breadcrumb: 'Conceptos',
        },
      },
      {
        path: 'project-quote',
        loadChildren: () =>
          import('./features/project-quote/project-quote.module').then(
            (m) => m.ProjectQuoteModule,
          ),
        data: {
          breadcrumb: 'Cotizaciones de proyectos',
        },
      },
      {
        path: 'quote-statuses',
        loadChildren: () =>
          import('./features/quote-status/quote-status.module').then(
            (m) => m.QuoteStatusModule,
          ),
        data: { breadcrumb: 'Estado de la cotización' },
      },
      {
        path: 'project-quote-template',
        loadChildren: () =>
          import(
            './features/project-quote-template/project-quote-template.module'
          ).then((m) => m.ProjectQuoteTemplateModule),
        data: { breadcrumb: 'Plantillas de cotización' },
      },
      {
        path: 'process-phase',
        loadChildren: () =>
          import('./features/process-phase/process-phase.module').then(
            (m) => m.ProcessPhaseModule,
          ),
        data: { breadcrumb: 'Fases del Proceso' },
      },
      {
        path: 'process',
        loadChildren: () =>
          import('./features/process/process.module').then(
            (m) => m.ProcessModule,
          ),
        data: { breadcrumb: 'Proceso' },
      },
      {
        path: 'project',
        loadChildren: () =>
          import('./features/projects/projects.module').then(
            (m) => m.ProjectsModule,
          ),
        data: { breadcrumb: 'Proyectos' },
      },
      {
        path: 'project-start',
        loadChildren: () =>
          import('./features/project-start/project-start.module').then(
            (m) => m.ProjectStartModule,
          ),
        data: { breadcrumb: 'Comenzar Proyectos' },
      },
      {
        path: 'operations',
        loadChildren: () =>
          import('./features/operations/operations.module').then(
            (m) => m.OperationsModule,
          ),
        data: { breadcrumb: 'Operaciones' },
      },
      {
        path: 'places',
        loadChildren: () =>
          import('./features/place/place.module').then((m) => m.PlaceModule),
        data: { breadcrumb: 'Lugares' },
      },
      {
        path: 'grantors',
        loadChildren: () =>
          import('./features/grantor/grantor.module').then(
            (m) => m.GrantorModule,
          ),
        data: { breadcrumb: 'Otorgantes' },
      },
      {
        path: 'shapes',
        loadChildren: () =>
          import('./features/shape/shape.module').then((m) => m.ShapeModule),
        data: { breadcrumb: 'Lugares' },
      },
      {
        path: 'procedures',
        loadChildren: () =>
          import('./features/procedures/procedures.module').then(
            (m) => m.ProceduresModule,
          ),
        data: { breadcrumb: 'Trámites' },
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
