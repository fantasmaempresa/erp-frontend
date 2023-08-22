import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BasicViewComponent, VIEW_CLAZZ } from "o2c_core";
import { ProceduresFormComponent } from "./pages/procedures-form/procedures-form.component";
import { ProcedureView } from "../../data/presentation/Procedure.view";

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
        providers: [{ provide: VIEW_CLAZZ, useValue: ProcedureView }],
      },
      {
        path: 'new',
        component: ProceduresFormComponent,
        data: { breadcrumb: 'Agregar trámite' },
      },
      {
        path: ':id',
        component: ProceduresFormComponent,
        data: { breadcrumb: 'Editar trámite' },
      },
      {
        path: ':id/documentsLink',
        loadChildren: () =>
          import('../document-link/document-link.module').then(
            (m) => m.DocumentLinkModule,
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
export class ProceduresRoutingModule { }