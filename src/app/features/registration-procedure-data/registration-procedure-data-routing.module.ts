import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicViewComponent, VIEW_CLAZZ } from 'o2c_core';
import { RegistrationProcedureDataView } from 'src/app/data/presentation/RegistrationProcedureData.view';
import { RegistratitonProcedureDataFormComponent } from './page/registratiton-procedure-data-form/registratiton-procedure-data-form.component';

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
        data: { breadcrumb: 'Lista de Registros' },
        providers: [
          {
            provide: VIEW_CLAZZ,
            useValue: RegistrationProcedureDataView,
          },
        ],
      },
      {
        path: 'new',
        component: RegistratitonProcedureDataFormComponent,
        data: { breadcrumb: 'Agregar Registro' },
      },
      {
        path: ':idRegistration',
        component: RegistratitonProcedureDataFormComponent,
        data: { breadcrumb: 'Editar Registro' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrationProcedureDataRoutingModule { }
