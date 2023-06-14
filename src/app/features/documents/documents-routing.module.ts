import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DocumentView } from "../../data/presentation/Document.view";
import { BasicViewComponent, VIEW_CLAZZ } from "o2c_core";
import { DocumentFormComponent } from "./page/document-form/document-form.component";
import { ClientFormComponent } from "../clients/page/client-form/client-form.component";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        redirectTo: "list",
        pathMatch: "full"
      },
      {
        path: "list",
        component: BasicViewComponent,
        data: { breadcrumb: "Lista de documentos" },
        providers: [{ provide: VIEW_CLAZZ, useValue: DocumentView }],
      },
      {
        path: 'new',
        component: DocumentFormComponent,
        data: { breadcrumb: 'Agregar Documento' },
      },
      {
        path: ':id',
        component: DocumentFormComponent,
        data: { breadcrumb: 'Editar Documento' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentsRoutingModule {
}
