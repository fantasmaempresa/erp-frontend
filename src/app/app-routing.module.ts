import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
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
        data: { breadcrumb: 'Formas' },
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
        path: 'stakes',
        loadChildren: () =>
          import('./features/stake/stake.module').then((m) => m.StakeModule),
        data: { breadcrumb: 'Participaciones' },
      },
      {
        path: 'isoDocumentation',
        loadChildren: () =>
          import('./features/iso-documentation/iso-documentation.module').then(
            (m) => m.IsoDocumentationModule,
          ),
        data: { breadcrumb: 'Documentación interna norma ISO' },
      },
      {
        path: 'nationalConsumer',
        loadChildren: () =>
          import(
            './features/national-consumer-price-index/national-consumer-price-index.module'
          ).then((m) => m.NationalConsumerPriceIndexModule),
        data: { breadcrumb: 'Precio al Consumidor Nacional' },
      },
      {
        path: 'inversionUnit',
        loadChildren: () =>
          import('./features/inversion-unit/inversion-unit.module').then(
            (m) => m.InversionUnitModule,
          ),
        data: { breadcrumb: 'Unidad de inversión' },
      },
      {
        path: 'rate',
        loadChildren: () =>
          import('./features/rate/rate.module').then((m) => m.RateModule),
        data: { breadcrumb: 'Tasa' },
      },
      {
        path: 'unit',
        loadChildren: () =>
          import('./features/unit/unit.module').then((m) => m.UnitModule),
        data: { breadcrumb: 'Unidades' },
      },
      {
        path: 'vulnerableOperations',
        loadChildren: () =>
          import(
            './features/vulnerable-operations/vulnerable-operations.module'
          ).then((m) => m.VulnerableOperationsModule),
        data: { breadcrumb: 'Operaciones vulnerables' },
      },
      {
        path: 'disposalOperation',
        loadChildren: () =>
          import(
            './features/type-disposal-operation/type-disposal-operation.module'
          ).then((m) => m.TypeDisposalOperationModule),
        data: { breadcrumb: 'Operaciones de eliminación' },
      },
      {
        path: 'disposalRealEstate',
        loadChildren: () =>
          import(
            './features/disposal-real-estate/disposal-real-estate.module'
          ).then((m) => m.DisposalRealEstateModule),
        data: { breadcrumb: 'Enajenación de Bienes' },
      },
      {
        path: 'article',
        loadChildren: () =>
          import('./features/articles/articles.module').then(
            (m) => m.ArticlesModule,
          ),
        data: { breadcrumb: 'Artículos' },
      },
      {
        path: 'line',
        loadChildren: () =>
          import('./features/line/line.module').then((m) => m.LineModule),
        data: { breadcrumb: 'Línea' },
      },
      {
        path: 'warehouse',
        loadChildren: () =>
          import('./features/warehouse/warehouse.module').then(
            (m) => m.WarehouseModule,
          ),
        data: { breadcrumb: 'Almacén' },
      },
      {
        path: 'inventory',
        loadChildren: () =>
          import('./features/inventory/inventory.module').then(
            (m) => m.InventoryModule,
          ),
        data: { breadcrumb: 'Inventario' },
      },
      {
        path: 'movementTracking',
        loadChildren: () =>
          import('./features/movement-tracking/movement-tracking.module').then(
            (m) => m.MovementTrackingModule,
          ),
        data: { breadcrumb: 'Seguimiento de Movimientos' },
      },
      {
        path: 'officeSecurityMeasures',
        loadChildren: () =>
          import('./features/office-security-measures/office-security-measures.module').then(
            (m) => m.OfficeSecurityMeasuresModule,
          ),
        data: { breadcrumb: 'Medidas de Seguridad de la Oficina' },
      },
      {
        path: 'category-operation',
        loadChildren: () =>
          import(
            './features/category-operation/category-operation.module'
          ).then((m) => m.CategoryOperationModule),
        data: { breadcrumb: 'Catégorias de operación' },
      },
      {
        path: 'generalTemplates',
        loadChildren: () =>
          import('./features/general-template/general-template.module').then(
            (m) => m.GeneralTemplateModule,
          ),
        data: { breadcrumb: 'Plantillas generales' },
      },
      {
        path: 'proceduresVulnerableOperations',
        loadChildren: () =>
          import('./features/procedure-vo/procedure-vo.module').then(
            (m) => m.ProcedureVOModule,
          ),
        data: { breadcrumb: 'Operaciones Vulnerables' },
      },
      {
        path: 'disposalRealEstate',
        loadChildren: () =>
          import(
            './features/disposal-real-estate/disposal-real-estate.module'
          ).then((m) => m.DisposalRealEstateModule),
        data: { breadcrumb: 'Enajenación de Bienes' },
      },
      {
        path: 'books',
        loadChildren: () =>
          import(
            './features/book/book.module'
          ).then((m) => m.BookModule),
        data: { breadcrumb: 'Libros de Folios' },
      },
      {
        path: 'folios',
        loadChildren: () =>
          import(
            './features/folio/folio.module'
          ).then((m) => m.FolioModule),
        data: { breadcrumb: 'Instrumentos y folios' },
      },
      {
        path: 'reports',
        loadChildren: () =>
          import(
            './features/reports/reports.module'
          ).then((m) => m.ReportsModule),
        data: { breadcrumb: 'Reportes' },
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import(
            './features/notification/notification.module'
          ).then((m) => m.NotificationModule),
        data: { breadcrumb: 'Historial de notificaciones' },
      },
      {
        path: 'reminders',
        loadChildren: () =>
          import(
            './features/reminder/reminder.module'
          ).then((m) => m.ReminderModule),
        data: { breadcrumb: 'Historial de recordatorios' },
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

const settings: ExtraOptions = {
  enableTracing: true,
};

@NgModule({
  // imports: [RouterModule.forRoot(routes, settings)], //Descomentar para hacer tracing de rutas
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
