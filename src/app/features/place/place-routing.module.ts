import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BasicViewComponent, VIEW_CLAZZ } from "o2c_core";
import { PlaceView } from "../../data/presentation/Place.view";
import { PlaceFormComponent } from "./page/place-form/place-form.component";

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
        data: { breadcrumb: 'Lista de Lugares' },
        providers: [{ provide: VIEW_CLAZZ, useValue: PlaceView }],
      },
      {
        path: 'new',
        component: PlaceFormComponent,
        data: { breadcrumb: 'Agregar Lugar' },
      },
      {
        path: ':id',
        component: PlaceFormComponent,
        data: { breadcrumb: 'Editar Lugar' },
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaceRoutingModule { }
