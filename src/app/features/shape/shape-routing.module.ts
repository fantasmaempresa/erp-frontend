import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BasicViewComponent, VIEW_CLAZZ } from "o2c_core";
import { ShapeView } from "../../data/presentation/Shape.view";
import { ShapeFormComponent } from "./page/shape-form/shape-form.component";

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
        providers: [{ provide: VIEW_CLAZZ, useValue: ShapeView }],
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
export class ShapeRoutingModule { }
