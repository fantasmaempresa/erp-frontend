import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicViewComponent, VIEW_CLAZZ } from 'o2c_core';
import { ProcedureCommentView } from '../../data/presentation/ProcedureComment.view';
import { ProcedureCommentFormComponent } from './page/procedure-comment-form/procedure-comment-form.component';

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
        data: { breadcrumb: 'Comentarios del Expediente' },
        providers: [{ provide: VIEW_CLAZZ, useValue: ProcedureCommentView }],
      },
      {
        path: 'new',
        component: ProcedureCommentFormComponent,
        data: { breadcrumb: 'Agregar comentarios al expediente' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProcedureCommentRoutingModule {}
