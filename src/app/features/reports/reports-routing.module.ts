import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportFormComponent } from './pages/report-form/report-form.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'new',
        pathMatch: 'full',
      },
      // {
      //   path: 'list',
      //   component: BasicViewComponent,
      //   data: { breadcrumb: 'Lista de Operaciones vulnerables' },
      //   providers: [{ provide: VIEW_CLAZZ, useValue: VulnerableOperationView }],
      // },
      {
        path: 'new',
        component: ReportFormComponent,
        data: { breadcrumb: 'Generar Nuevo reporte' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
