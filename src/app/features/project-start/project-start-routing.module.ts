import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TextEditorWithCategoryAutocompleteComponent } from 'src/app/shared/components/text-editor-with-category-autocomplete/text-editor-with-category-autocomplete.component';
import { CurrentFormComponent } from './page/current-form/current-form.component';
import { ProjectStartListComponent } from './page/project-start-list/project-start-list.component';
import { ResumeProcessComponent } from './page/resume-process/resume-process.component';
import { BuildPredefinedFormatComponent } from '../projects/page/predefinedForms/SimpleSale/first-prevent-notice/build-predefined-format.component';

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
export class ProjectStartRoutingModule {}
