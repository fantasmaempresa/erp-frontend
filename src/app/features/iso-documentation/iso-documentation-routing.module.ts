import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicViewComponent, VIEW_CLAZZ } from 'o2c_core';
import { IsoDocumentationView } from 'src/app/data/presentation/IsoDocumentation.view';
import { RegistrationProcedureDataView } from 'src/app/data/presentation/RegistrationProcedureData.view';
import { IsoDocumentationFormComponent } from './page/iso-documentation-form/iso-documentation-form.component';

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
        data: { breadcrumb: 'Lista de documentación interna norma ISO' },
        providers: [
          {
            provide: VIEW_CLAZZ,
            useValue: IsoDocumentationView,
          },
        ],
      },
      {
        path: 'new',
        component: IsoDocumentationFormComponent,
        data: { breadcrumb: 'Agregar documentación' },
      },
      {
        path: ':id',
        component: IsoDocumentationFormComponent,
        data: { breadcrumb: 'Editar documentación' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IsoDocumentationRoutingModule {}
