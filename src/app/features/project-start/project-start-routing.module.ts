import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuildPredefinedFormatComponent } from '../projects/page/predefinedForms/SimpleSale/first-prevent-notice/build-predefined-format.component';
import { CurrentFormComponent } from './page/current-form/current-form.component';
import { ProjectStartListComponent } from './page/project-start-list/project-start-list.component';
import { ResumeProcessComponent } from './page/resume-process/resume-process.component';
import { ShapePhaseFormComponent } from '../shape/page/shape-form/shape-form.component';
import { DocumentLinkPhaseFormComponent } from '../document-link/page/document-link-form/document-link-form.component';
import { ProcessingIncomePhaseFormComponent } from '../processing-income/page/processing-income-form/processing-income-form.component';
import { RegistratitonProcedureDataFormComponent, RegistratitonProcedureDataPhaseFormComponent } from '../registration-procedure-data/page/registratiton-procedure-data-form/registratiton-procedure-data-form.component';

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
        component: ProjectStartListComponent,
        data: { breadcrumb: 'Lista de Proyectos' },
      },
      {
        path: ':id/process/:idProcess',
        component: CurrentFormComponent,
        data: { breadcrumb: 'Fase Actual', view: 'phase' },
      },
      //Rutas para manipular funcionamiento de formas
      {
        path: ':id/process/:idProcess/shapes/:procedure_id/new',
        component: ShapePhaseFormComponent,
        data: { breadcrumb: 'Formas de expediente', view: 'phase' },
      },
      {
        path: ':id/process/:idProcess/shapes/:procedure_id/:idShape',
        component: ShapePhaseFormComponent,
        data: { breadcrumb: 'Formas de expediente', view: 'phase' },
      },
      //********************************************* */

      //Rutas para manipular DocumentLink
      {
        path: ':id/process/:idProcess/documentlink/:procedure_id/new',
        component: DocumentLinkPhaseFormComponent,
        data: { breadcrumb: 'Documentos de expediente', view: 'phase' },
      },
      {
        path: ':id/process/:idProcess/documentlink/:idDoc/:timestamp',
        component: DocumentLinkPhaseFormComponent,
        data: { breadcrumb: 'Documentos de expediente', view: 'phase' },
      },
      //********************************************* */

      //Rutas para manipular DocumentLink
      {
        path: ':id/process/:idProcess/incoming/:procedure_id/new',
        component: ProcessingIncomePhaseFormComponent,
        data: { breadcrumb: 'Documentos de expediente', view: 'phase' },
      },
      {
        path: ':id/process/:idProcess/incoming/:procedure_id/:idIncoming',
        component: ProcessingIncomePhaseFormComponent,
        data: { breadcrumb: 'Documentos de expediente', view: 'phase' },
      },
      {
        path: ':id/process/:idProcess/:idProcessingIncome/comments',
        loadChildren: () =>
          import('../processing-income-comment/processing-income-comment.module').then(
            (m) => m.ProcessingIncomeCommentModule,
          ),
        data: { breadcrumb: 'Proyecto en curso', view: 'procedures' },
      },
      {
        path: ':id/process/:idProcess/:idIncoming/documentsLink',
        loadChildren: () =>
          import('../document-link/document-link.module').then(
            (m) => m.DocumentLinkModule,
          ),
        data: { breadcrumb: 'Proyecto en curso', view: 'incomming' },
      },

      //********************************************* */
      //Rutas para manipular Registration Data
      {
        path: ':id/process/:idProcess/registrationData/:procedure_id/new',
        component: RegistratitonProcedureDataPhaseFormComponent,
        data: { breadcrumb: 'Agregar Registro', view: 'phase' },
      },
      {
        path: ':id/process/:idProcess/registrationData/:procedure_id/:idRegistration',
        component: RegistratitonProcedureDataPhaseFormComponent,
        data: { breadcrumb: 'Editar Registro', view: 'phase' },
      },
      //********************************************* */
      //********************************************* */
      //Rutas para manipular ProcedureComments
      {
        path: ':id/process/:idProcess/:procedure_id/Pcomments',
        loadChildren: () =>
          import('../procedure-comment/procedure-comment.module').then(
            (m) => m.ProcedureCommentModule,
          ),
        data: { breadcrumb: 'Proyecto en curso', view: 'phase' },
      },

      //********************************************* */
      {
        path: ':id/process/:idProcess/resume',
        component: ResumeProcessComponent,
        data: { breadcrumb: 'Resumen del avance del proceso', view: 'phase' },
      },
      {
        path: 'editor/test',
        component: BuildPredefinedFormatComponent,
        data: { breadcrumb: 'Prueba de editor' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectStartRoutingModule { }
