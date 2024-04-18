import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BasicViewComponent, VIEW_CLAZZ } from "o2c_core";
import { DocumentLinkView } from "../../data/presentation/DocumentLink.view";
import { DocumentLinkFormComponent } from "./page/document-link-form/document-link-form.component";

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
        data: { breadcrumb: "Expediente" },
        providers: [{ provide: VIEW_CLAZZ, useValue: DocumentLinkView }]
      },
      {
        path: "new",
        component: DocumentLinkFormComponent,
        data: { breadcrumb: "Agregar documentos" }
      },
      {
        path: ':idDoc/edit/:timestamp',
        component: DocumentLinkFormComponent,
        data: { breadcrumb: 'Editar Documento' },
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentLinkRoutingModule {
}
