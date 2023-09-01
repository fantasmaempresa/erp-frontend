import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BasicViewComponent, VIEW_CLAZZ } from "o2c_core";
import { ShapeFormComponent } from "../shape/page/shape-form/shape-form.component";
import { ShapeLinkView } from "../../data/presentation/ShapeLink.view";

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
        data: { breadcrumb: 'Lista de formas' },
        providers: [{ provide: VIEW_CLAZZ, useValue: ShapeLinkView }],
      },
      {
        path: 'new',
        component: ShapeFormComponent,
        data: { breadcrumb: 'Agregar Forma' },
      },
      {
        path: ':id',
        component: ShapeFormComponent,
        data: { breadcrumb: 'Editar Forma' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShapeLinkRoutingModule { }
