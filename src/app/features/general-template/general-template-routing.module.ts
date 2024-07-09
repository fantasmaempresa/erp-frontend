import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicViewComponent, VIEW_CLAZZ } from 'o2c_core';
import { GeneralTemplanteView } from 'src/app/data/presentation/GeneralTemplate.view';
import { GeneralTemplateFormComponent } from './page/general-template-form/general-template-form.component';

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
        data: { breadcrumb: 'Lista de Plantillas Generales' },
        providers: [{ provide: VIEW_CLAZZ, useValue: GeneralTemplanteView }],
      },
      {
        path: 'new',
        component: GeneralTemplateFormComponent,
        data: { breadcrumb: 'Agregar Plantilla' },
      },
      {
        path: ':id',
        component: GeneralTemplateFormComponent,
        data: { breadcrumb: 'Editar Plantilla' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralTemplateRoutingModule { }
