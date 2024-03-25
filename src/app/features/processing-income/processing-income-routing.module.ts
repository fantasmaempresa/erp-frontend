import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicViewComponent, VIEW_CLAZZ } from 'o2c_core';
import { ProcessingIncomeView } from 'src/app/data/presentation/ProcessingIncome.view';
import { ProcessingIncomeFormComponent } from './page/processing-income-form/processing-income-form.component';

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
        data: { breadcrumb: 'Lista de Ingresos' },
        providers: [
          {
            provide: VIEW_CLAZZ,
            useValue: ProcessingIncomeView,
          },
        ],
      },
      {
        path: 'new',
        component: ProcessingIncomeFormComponent,
        data: { breadcrumb: 'Agregar Ingreso' },
      },
      {
        path: ':idProcessingIncome',
        component: ProcessingIncomeFormComponent,
        data: { breadcrumb: 'Editar Ingreso' },
      },
      {
        path: ':id/documentsLink',
        loadChildren: () =>
          import('../document-link/document-link.module').then(
            (m) => m.DocumentLinkModule,
          ),
        data: { breadcrumb: 'Documentos', view: 'incomming' },
      },
      {
        path: ':idProcessingIncome/comments',
        loadChildren: () =>
          import('../processing-income-comment/processing-income-comment.module').then(
            (m) => m.ProcessingIncomeCommentModule,
          ),
        data: { breadcrumb: 'Documentos', view: 'procedures' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcessingIncomeRoutingModule { }
