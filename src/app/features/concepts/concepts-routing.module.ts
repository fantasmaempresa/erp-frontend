import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChildrenRouteLayoutComponent } from '../../layout/children-route-layout/children-route-layout.component';
import { ConceptListComponent } from './page/concept-list/concept-list.component';
import { ConceptFormComponent } from './page/concept-form/concept-form.component';

const routes: Routes = [
  {
    path: '',
    component: ChildrenRouteLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: ConceptListComponent,
        data: { breadcrumb: 'Lista de conceptos' },
      },
      {
        path: 'concept',
        component: ConceptFormComponent,
        data: { breadcrumb: 'Editar concepto' },
      },
      {
        path: 'new',
        component: ConceptFormComponent,
        data: { breadcrumb: 'Nuevo concepto' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConceptsRoutingModule {}
