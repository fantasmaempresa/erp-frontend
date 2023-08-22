import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BasicViewComponent, VIEW_CLAZZ } from "o2c_core";
import { GrantorView } from "../../data/presentation/Grantor.view";
import { GrantorFormComponent } from "./page/grantor-form/grantor-form.component";

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
        data: { breadcrumb: 'Lista de otorgantes' },
        providers: [{ provide: VIEW_CLAZZ, useValue: GrantorView }],
      },
      {
        path: 'new',
        component: GrantorFormComponent,
        data: { breadcrumb: 'Agregar otorgante' },
      },
      {
        path: ':id',
        component: GrantorFormComponent,
        data: { breadcrumb: 'Editar otorgante' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrantorRoutingModule { }
