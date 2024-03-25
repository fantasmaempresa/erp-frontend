import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicViewComponent, VIEW_CLAZZ } from 'o2c_core';
import { ProcessingIncomeCommentView } from 'src/app/data/presentation/ProcessingIncomeComment.view';
import { ProcessingIncomeCommentFormComponent } from './page/processing-income-comment-form/processing-income-comment-form.component';

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
        data: { breadcrumb: 'Comentarios del registro de ingreso' },
        providers: [{ provide: VIEW_CLAZZ, useValue: ProcessingIncomeCommentView }],
      },
      {
        path: 'new',
        component: ProcessingIncomeCommentFormComponent,
        data: { breadcrumb: 'Agregar comentarios' },
      },
      {
        path: ':idProcessingIncomeComment',
        component: ProcessingIncomeCommentFormComponent,
        data: { breadcrumb: 'Editar comentarios' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProcessingIncomeCommentRoutingModule {}
