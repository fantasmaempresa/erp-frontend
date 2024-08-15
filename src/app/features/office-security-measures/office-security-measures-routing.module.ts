import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicViewComponent,VIEW_CLAZZ } from 'o2c_core';
import { OfficeSecurityMeasuresView } from 'src/app/data/presentation/OfficeSecurityMeasures.view';
import { OfficeSecurityMeasuresFormComponent } from './page/office-security-measures-form.component';

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
        data: { breadcrumb: 'Medidas de seguridad de la oficina' },
        providers: [{ provide: VIEW_CLAZZ, useValue: OfficeSecurityMeasuresView }],
      },
      {
        path: 'new',
        component: OfficeSecurityMeasuresFormComponent,
        data: { breadcrumb: 'Agregar medidas de seguridad de la oficina' },
      },
      {
        path: ':id',
        component: OfficeSecurityMeasuresFormComponent,
        data: { breadcrumb: 'Editar medidas de seguridad de la oficina' },
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfficeSecurityMeasuresRoutingModule { }