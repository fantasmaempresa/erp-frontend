import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicViewComponent, VIEW_CLAZZ } from 'o2c_core';
import { ProcedureFilterOVView } from 'src/app/data/presentation/ProcedureFilterOV.view';
import { ProceduresFormComponent } from '../procedures/pages/procedures-form/procedures-form.component';

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
        data: { breadcrumb: 'Lista de trámites' },
        providers: [{ provide: VIEW_CLAZZ, useValue: ProcedureFilterOVView }],
      },
      {
        path: ':id',
        component: ProceduresFormComponent,
        data: { breadcrumb: 'Editar trámite' },
      },
      {
        path: ':id/comments',
        loadChildren: () =>
          import('../procedure-comment/procedure-comment.module').then(
            (m) => m.ProcedureCommentModule,
          ),
        data: { breadcrumb: 'Documentos', view: 'procedures' },
      },
      {
        path: ':id/documentsLink',
        loadChildren: () =>
          import('../document-link/document-link.module').then(
            (m) => m.DocumentLinkModule,
          ),
        data: { breadcrumb: 'Documentos', view: 'procedures' },
      },
      {
        path: ':id/shapeLink',
        loadChildren: () =>
          import('../shape-link/shape-link.module').then(
            (m) => m.ShapeLinkModule,
          ),
        data: { breadcrumb: 'Formas', view: 'procedures' },
      },
      {
        path: ':id/registrationData',
        loadChildren: () =>
          import('../registration-procedure-data/registration-procedure-data.module').then(
            (m) => m.RegistrationProcedureDataModule,
          ),
        data: { breadcrumb: 'Registro'},
      },
      {
        path: ':id/incoming',
        loadChildren: () =>
          import('../processing-income/processing-income.module').then(
            (m) => m.ProcessingIncomeModule,
          ),
        data: { breadcrumb: 'Ingresos', view: 'incomming' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcedureVORoutingModule { }
